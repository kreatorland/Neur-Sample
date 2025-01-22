import { revalidatePath } from 'next/cache';

import {
  CoreTool,
  Message,
  NoSuchToolError,
  appendResponseMessages,
  createDataStreamResponse,
  generateObject,
  streamText,
} from 'ai';
import { performance } from 'perf_hooks';
import { z } from 'zod';

import {
  defaultModel,
  defaultSystemPrompt,
  defaultTools,
  getToolsFromRequiredTools,
} from '@/ai/providers';
import { MAX_TOKEN_MESSAGES } from '@/lib/constants';
import { isValidTokenUsage, logWithTiming } from '@/lib/utils';
import {
  getConfirmationResult,
  getUnconfirmedConfirmationMessage,
  handleConfirmation,
} from '@/lib/utils/ai';
import { generateTitleFromUserMessage } from '@/server/actions/ai';
import { getToolsFromOrchestrator } from '@/server/actions/orchestrator';
import { verifyUser } from '@/server/actions/user';
import {
  dbCreateConversation,
  dbCreateMessages,
  dbCreateTokenStat,
  dbDeleteConversation,
  dbGetConversationMessages,
} from '@/server/db/queries';

export const maxDuration = 120;

export async function POST(req: Request) {
  const startTime = performance.now();

  try {
    // Verify user session and extract necessary data
    const session = await verifyUser();
    const userId = session?.data?.data?.id;
    const publicKey = session?.data?.data?.publicKey;

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!publicKey) {
      console.error('[chat/route] No public key found');
      return new Response('No public key found', { status: 400 });
    }

    // Parse the request body
    const { id: conversationId, message }: { id: string; message: Message } = await req.json();
    if (!message) {
      return new Response('No message found', { status: 400 });
    }

    logWithTiming(startTime, '[chat/route] message received');

    // Fetch existing conversation messages
    const existingMessages =
      (await dbGetConversationMessages({
        conversationId,
        limit: MAX_TOKEN_MESSAGES,
      })) ?? [];

    logWithTiming(startTime, '[chat/route] fetched existing messages');

    // Validate first message in conversation
    if (existingMessages.length === 0 && message.role !== 'user') {
      return new Response('No user message found', { status: 400 });
    }

    // Create a new conversation if none exists
    if (existingMessages.length === 0) {
      const title = await generateTitleFromUserMessage({
        message: message.content,
      });
      await dbCreateConversation({ conversationId, userId, title });
      revalidatePath('/api/conversations');
    }

    // Add the user message to the database if applicable
    const newUserMessage =
      message.role === 'user'
        ? await dbCreateMessages({
            messages: [
              {
                conversationId,
                role: 'user',
                content: message.content,
                toolInvocations: [],
                experimental_attachments: message.experimental_attachments
                  ? JSON.parse(JSON.stringify(message.experimental_attachments))
                  : undefined,
              },
            ],
          })
        : null;

    // Handle any unconfirmed confirmation messages
    const unconfirmed = getUnconfirmedConfirmationMessage(existingMessages);
    const { confirmationHandled, updates } = await handleConfirmation({
      current: message,
      unconfirmed,
    });

    logWithTiming(startTime, '[chat/route] handleConfirmation completed');

    // Construct the system prompt
    const attachments = existingMessages
      .filter((m) => m.experimental_attachments)
      .flatMap((m) => m.experimental_attachments!)
      .map((a) => ({ type: a.contentType, data: a.url }));

    const systemPrompt = [
      defaultSystemPrompt,
      `History of attachments: ${JSON.stringify(attachments)}`,
      `User Solana wallet public key: ${publicKey}`,
      `User ID: ${userId}`,
      `Conversation ID: ${conversationId}`,
    ].join('\n\n');

    // Filter and sort messages for processing
    const relevantMessages = existingMessages
      .filter((m) => m.content !== '')
      .sort(
        (a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0),
      );

    // Handle confirmation messages
    const confirmationResult = getConfirmationResult(message);
    if (confirmationResult !== undefined) {
      relevantMessages.push({
        id: message.id,
        content: confirmationResult,
        role: 'user',
        createdAt: new Date(),
      });
    } else {
      relevantMessages.push(message);
    }

    logWithTiming(startTime, '[chat/route] ready to stream response');

    // Begin streaming response
    return createDataStreamResponse({
      execute: async (dataStream) => {
        // Handle streaming errors
        if (dataStream.onError) {
          dataStream.onError((error: any) => {
            console.error('[chat/route] Data stream error:', error);
          });
        }

        // Write updates to the data stream
        updates.forEach((u) => dataStream.writeData(u));

        // Get tools required for the message
        const { toolsRequired, usage: orchestratorUsage } =
          await getToolsFromOrchestrator(relevantMessages, confirmationHandled);

        logWithTiming(startTime, '[chat/route] tools determined');

        const tools = toolsRequired
          ? getToolsFromRequiredTools(toolsRequired)
          : defaultTools;

        // Stream model response
        const result = streamText({
          model: defaultModel,
          system: systemPrompt,
          tools: tools as Record<string, CoreTool<any, any>>,
          experimental_toolCallStreaming: true,
          experimental_telemetry: { isEnabled: true, functionId: 'stream-text' },
          maxSteps: 15,
          messages: relevantMessages,
          async onFinish({ response, usage }) {
            try {
              const finalMessages = appendResponseMessages({
                messages: [],
                responseMessages: response.messages,
              }).filter(
                (m) => m.content !== '' || (m.toolInvocations || []).length > 0,
              );

              // Adjust timestamps to avoid duplicates
              finalMessages.forEach((m, index) => {
                if (m.createdAt) {
                  m.createdAt = new Date(m.createdAt.getTime() + index);
                }
              });

              // Save messages to the database
              const saved = await dbCreateMessages({
                messages: finalMessages.map((m) => ({
                  conversationId,
                  createdAt: m.createdAt,
                  role: m.role,
                  content: m.content,
                  toolInvocations: m.toolInvocations
                    ? JSON.parse(JSON.stringify(m.toolInvocations))
                    : undefined,
                  experimental_attachments: m.experimental_attachments
                    ? JSON.parse(JSON.stringify(m.experimental_attachments))
                    : undefined,
                })),
              });

              // Save token statistics
              if (saved && newUserMessage && isValidTokenUsage(usage)) {
                let { promptTokens, completionTokens, totalTokens } = usage;

                if (isValidTokenUsage(orchestratorUsage)) {
                  promptTokens += orchestratorUsage.promptTokens;
                  completionTokens += orchestratorUsage.completionTokens;
                  totalTokens += orchestratorUsage.totalTokens;
                }

                const messageIds = [...newUserMessage, ...saved].map((m) => m.id);

                await dbCreateTokenStat({
                  userId,
                  messageIds,
                  promptTokens,
                  completionTokens,
                  totalTokens,
                });
              }

              revalidatePath('/api/conversations');
            } catch (error) {
              console.error('[chat/route] Failed to save messages:', error);
            }
          },
        });

        result.mergeIntoDataStream(dataStream);
      },
      onError: (_) => {
        return 'An error occurred';
      },
    });
  } catch (error) {
    console.error('[chat/route] Unexpected error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await verifyUser();
  const userId = session?.data?.data?.id;

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { id: conversationId } = await req.json();
    await dbDeleteConversation({ conversationId, userId });
    revalidatePath('/api/conversations');

    return new Response('Conversation deleted', { status: 200 });
  } catch (error) {
    console.error('[chat/route] Delete error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
