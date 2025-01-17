import { CoreTool, NoSuchToolError, generateObject, generateText } from 'ai';
import _ from 'lodash';
import moment from 'moment';
import { z } from 'zod';

import {
  defaultModel,
  defaultSystemPrompt,
  defaultTools,
  getToolsFromRequiredTools,
} from '@/ai/providers';
import prisma from '@/lib/prisma';
import { isValidTokenUsage } from '@/lib/utils';
import { sanitizeResponseMessages } from '@/lib/utils/ai';
import { retrieveAgentKit } from '@/server/actions/ai';
import {
  dbCreateMessages,
  dbCreateTokenStat,
  dbGetConversation,
} from '@/server/db/queries';
import { ActionWithUser } from '@/types/db';

import { getToolsFromOrchestrator } from './orchestrator';

const ACTION_PAUSE_THRESHOLD = 3;

export async function processAction(action: ActionWithUser) {
  console.log(
    `[action:${action.id}] Processing action ${action.id} with prompt "${action.description}"`,
  );

  // flags for successful execution
  let successfulExecution = false;
  let noToolExecution = false;

  try {
    const conversation = await dbGetConversation({
      conversationId: action.conversationId,
    });

    if (!conversation) {
      console.error(
        `[action:${action.id}] Conversation ${action.conversationId} not found`,
      );
      return;
    }

    // Get user wallet
    const activeWallet = action.user.wallets.find((w) => w.active);
    if (!activeWallet) {
      console.error(
        `[action:${action.id}] No active wallet found for user ${action.userId}`,
      );
      return;
    }
    const systemPrompt =
      defaultSystemPrompt +
      `\n\nUser Solana wallet public key: ${activeWallet.publicKey}`;

    // Run messages through orchestration
    const { toolsRequired, usage: orchestratorUsage } =
      await getToolsFromOrchestrator([
        {
          role: 'user',
          content: action.description,
        },
      ]);
    const agent = (await retrieveAgentKit({ walletId: activeWallet.id }))?.data
      ?.data?.agent;

    console.log('[action:${action.id}] toolsRequired', toolsRequired);

    const tools = toolsRequired
      ? getToolsFromRequiredTools(toolsRequired)
      : defaultTools;

    const clonedTools = _.cloneDeep(tools);
    for (const toolName in clonedTools) {
      const tool = clonedTools[toolName as keyof typeof clonedTools];
      clonedTools[toolName as keyof typeof clonedTools] = {
        ...tool,
        agentKit: agent,
        userId: action.userId,
      };
    }

    // Remove createAction from tools, prevent recursive action creation
    delete tools.createAction;

    // Call the AI model
    const { response, usage } = await generateText({
      model: defaultModel,
      system: systemPrompt,
      tools: clonedTools as Record<string, CoreTool<any, any>>,
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'generate-text',
      },
      experimental_repairToolCall: async ({
        toolCall,
        tools,
        parameterSchema,
        error,
      }) => {
        if (NoSuchToolError.isInstance(error)) {
          return null;
        }

        console.log('[action:${action.id}] repairToolCall', toolCall);

        const tool = tools[toolCall.toolName as keyof typeof tools];
        const { object: repairedArgs } = await generateObject({
          model: defaultModel,
          schema: tool.parameters as z.ZodType<any>,
          prompt: [
            `The model tried to call the tool "${toolCall.toolName}"` +
              ` with the following arguments:`,
            JSON.stringify(toolCall.args),
            `The tool accepts the following schema:`,
            JSON.stringify(parameterSchema(toolCall)),
            'Please fix the arguments.',
          ].join('\n'),
        });

        console.log('[action:${action.id}] repairedArgs', repairedArgs);
        console.log('[action:${action.id}] toolCall', toolCall);

        return { ...toolCall, args: JSON.stringify(repairedArgs) };
      },
      onStepFinish({ toolResults, stepType }) {
        if (stepType === 'initial' && toolResults.length === 0) {
          noToolExecution = true;
        }
      },
      maxSteps: 15,
      prompt: action.description,
    });

    const sanitizedResponses = sanitizeResponseMessages(response.messages);
    const messages = await dbCreateMessages({
      messages: sanitizedResponses.map((message) => {
        return {
          conversationId: action.conversationId,
          role: message.role,
          content: JSON.parse(JSON.stringify(message.content)),
        };
      }),
    });

    // Save the token stats
    if (messages && isValidTokenUsage(usage)) {
      const messageIds = messages.map((message) => message.id);
      let { promptTokens, completionTokens, totalTokens } = usage;

      // Attach orchestrator usage
      if (isValidTokenUsage(orchestratorUsage)) {
        promptTokens += orchestratorUsage.promptTokens;
        completionTokens += orchestratorUsage.completionTokens;
        totalTokens += orchestratorUsage.totalTokens;
      }

      await dbCreateTokenStat({
        userId: action.userId,
        messageIds,
        promptTokens,
        completionTokens,
        totalTokens,
      });
    }
    console.log(`[action:${action.id}] Processed action ${action.id}`);

    // If no tool was executed, mark the action as failure
    if (!noToolExecution) {
      successfulExecution = true;
    }
  } catch (error) {
    console.error(
      `[action:${action.id}] Failed to process action ${action.id}`,
      error,
    );
    successfulExecution = false;
  } finally {
    // Increment the action's execution count and state
    const now = new Date();

    const update = {
      timesExecuted: { increment: 1 },
      lastExecutedAt: now,
      completed:
        !!action.maxExecutions &&
        action.timesExecuted + 1 >= action.maxExecutions,
      lastSuccessAt: successfulExecution ? now : undefined,
      lastFailureAt: !successfulExecution ? now : undefined,
      paused: action.paused,
    };

    if (!successfulExecution && action.lastSuccessAt) {
      // Action failed, but has succeeded before. If lastSuccessAt is more than 1 day ago, pause the action
      const lastSuccessAt = moment(action.lastSuccessAt);
      const oneDayAgo = moment().subtract(1, 'days');

      if (lastSuccessAt.isBefore(oneDayAgo)) {
        update.paused = true;

        console.log(
          `[action:${action.id}] paused - execution failed and no recent success`,
        );

        await dbCreateMessages({
          messages: [
            {
              conversationId: action.conversationId,
              role: 'assistant',
              content: `I've paused action ${action.id} because it has not executed successfully in the last 24 hours.`,
            },
          ],
        });
      }
    } else if (!successfulExecution && !action.lastSuccessAt) {
      // Action failed and has never succeeded before. If execution count is more than N, pause the action
      if (action.timesExecuted >= ACTION_PAUSE_THRESHOLD) {
        update.paused = true;

        console.log(
          `[action:${action.id}] paused - execution failed repeatedly`,
        );

        await dbCreateMessages({
          messages: [
            {
              conversationId: action.conversationId,
              role: 'assistant',
              content: `I've paused action ${action.id} because it has failed to execute successfully more than ${ACTION_PAUSE_THRESHOLD} times.`,
            },
          ],
        });
      }
    }

    await prisma.action.update({
      where: { id: action.id },
      data: update,
    });
  }
}
