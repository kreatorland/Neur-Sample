// import { revalidatePath } from 'next/cache';

// import {
//   CoreTool,
//   Message,
//   NoSuchToolError,
//   appendResponseMessages,
//   createDataStreamResponse,
//   generateObject,
//   streamText,
// } from 'ai';
// import { performance } from 'perf_hooks';
// import { z } from 'zod';

// import {
//   defaultModel,
//   defaultSystemPrompt,
//   defaultTools,
//   getToolsFromRequiredTools,
// } from '@/ai/providers';
// import { MAX_TOKEN_MESSAGES } from '@/lib/constants';
// import { isValidTokenUsage, logWithTiming } from '@/lib/utils';
// import {
//   getConfirmationResult,
//   getUnconfirmedConfirmationMessage,
//   handleConfirmation,
// } from '@/lib/utils/ai';
// import { generateTitleFromUserMessage } from '@/server/actions/ai';
// import { getToolsFromOrchestrator } from '@/server/actions/orchestrator';
// import { verifyUser } from '@/server/actions/user';
// import {
//   dbCreateConversation,
//   dbCreateMessages,
//   dbCreateTokenStat,
//   dbDeleteConversation,
//   dbGetConversationMessages,
// } from '@/server/db/queries';

// export const maxDuration = 300;

// export async function POST(req: Request) {
//   const startTime = performance.now();

//   // Check for valid user session and required parameters
//   const session = await verifyUser();
//   const userId = session?.data?.data?.id;
//   const publicKey = session?.data?.data?.publicKey;

//   if (!userId) {
//     return new Response('Unauthorized', { status: 401 });
//   }

//   if (!publicKey) {
//     console.error('[chat/route] No public key found');
//     return new Response('No public key found', { status: 400 });
//   }

//   try {
//     // Get the (newest) message sent to the API
//     const { id: conversationId, message }: { id: string; message: Message } =
//       await req.json();
//     if (!message) return new Response('No message found', { status: 400 });
//     logWithTiming(startTime, '[chat/route] message received');

//     // Fetch existing messages for the conversation
//     const existingMessages =
//       (await dbGetConversationMessages({
//         conversationId,
//         limit: MAX_TOKEN_MESSAGES,
//       })) ?? [];

//     logWithTiming(startTime, '[chat/route] fetched existing messages');

//     if (existingMessages.length === 0 && message.role !== 'user') {
//       return new Response('No user message found', { status: 400 });
//     }

//     // Create a new conversation if it doesn't exist
//     if (existingMessages.length === 0) {
//       const title = await generateTitleFromUserMessage({
//         message: message.content,
//       });
//       await dbCreateConversation({ conversationId, userId, title });
//       revalidatePath('/api/conversations');
//     }

//     // Create a new user message in the DB if the current message is from the user
//     const newUserMessage =
//       message.role === 'user'
//         ? await dbCreateMessages({
//             messages: [
//               {
//                 conversationId,
//                 role: 'user',
//                 content: message.content,
//                 toolInvocations: [],
//                 experimental_attachments: message.experimental_attachments
//                   ? JSON.parse(JSON.stringify(message.experimental_attachments))
//                   : undefined,
//               },
//             ],
//           })
//         : null;

//     // Check if there is an unconfirmed confirmation message that we need to handle
//     const unconfirmed = getUnconfirmedConfirmationMessage(existingMessages);

//     // Handle the confirmation message if it exists
//     const { confirmationHandled, updates } = await handleConfirmation({
//       current: message,
//       unconfirmed,
//     });
//     logWithTiming(startTime, '[chat/route] handleConfirmation completed');

//     // Build the system prompt and append the history of attachments
//     const attachments = existingMessages
//       .filter((m) => m.experimental_attachments)
//       .flatMap((m) => m.experimental_attachments!)
//       .map((a) => ({ type: a.contentType, data: a.url }));

//     const systemPrompt = [
//       defaultSystemPrompt,
//       `History of attachments: ${JSON.stringify(attachments)}`,
//       `User Solana wallet public key: ${publicKey}`,
//       `User ID: ${userId}`,
//       `Conversation ID: ${conversationId}`,
//     ].join('\n\n');

//     // Filter out empty messages and ensure sorting by createdAt ascending
//     const relevant = existingMessages
//       .filter((m) => m.content !== '')
//       .sort(
//         (a, b) => (a.createdAt?.getTime() || 0) - (b.createdAt?.getTime() || 0),
//       );

//     // Convert the message to a confirmation ('confirm' or 'deny') if it is for a confirmation prompt, otherwise add it to the relevant messages
//     const confirmationResult = getConfirmationResult(message);
//     if (confirmationResult !== undefined) {
//       // Fake message to provide the confirmation selection to the model
//       relevant.push({
//         id: message.id,
//         content: confirmationResult,
//         role: 'user',
//         createdAt: new Date(),
//       });
//     } else {
//       relevant.push(message);
//     }

//     logWithTiming(startTime, '[chat/route] calling createDataStreamResponse');

//     // Begin the stream response
//     return createDataStreamResponse({
//       execute: async (dataStream) => {
//         if (dataStream.onError) {
//           dataStream.onError((error: any) => {
//             console.error(
//               '[chat/route] createDataStreamResponse.execute dataStream error:',
//               error,
//             );
//           });
//         }

//         // Write any updates to the data stream (e.g. tool updates)
//         if (updates.length) {
//           updates.forEach((u) => dataStream.writeData(u));
//         }

//         // Exclude the confirmation tool if we are handling a confirmation
//         const { toolsRequired, usage: orchestratorUsage } =
//           await getToolsFromOrchestrator(relevant, confirmationHandled);

//         logWithTiming(
//           startTime,
//           '[chat/route] getToolsFromOrchestrator complete',
//         );

//         // Get a list of required tools from the orchestrator
//         const tools = toolsRequired
//           ? getToolsFromRequiredTools(toolsRequired)
//           : defaultTools;

//         // Begin streaming text from the model
//         const result = streamText({
//           model: defaultModel,
//           system: systemPrompt,
//           tools: tools as Record<string, CoreTool<any, any>>,
//           experimental_toolCallStreaming: true,
//           experimental_telemetry: {
//             isEnabled: true,
//             functionId: 'stream-text',
//           },
//           experimental_repairToolCall: async ({
//             toolCall,
//             tools,
//             parameterSchema,
//             error,
//           }) => {
//             if (NoSuchToolError.isInstance(error)) {
//               return null;
//             }

//             console.log('[chat/route] repairToolCall', toolCall);

//             const tool = tools[toolCall.toolName as keyof typeof tools];
//             const { object: repairedArgs } = await generateObject({
//               model: defaultModel,
//               schema: tool.parameters as z.ZodType<any>,
//               prompt: [
//                 `The model tried to call the tool "${toolCall.toolName}"` +
//                   ` with the following arguments:`,
//                 JSON.stringify(toolCall.args),
//                 `The tool accepts the following schema:`,
//                 JSON.stringify(parameterSchema(toolCall)),
//                 'Please fix the arguments.',
//               ].join('\n'),
//             });
//             return { ...toolCall, args: JSON.stringify(repairedArgs) };
//           },
//           maxSteps: 15,
//           messages: relevant,
//           async onFinish({ response, usage }) {
//             if (!userId) return;
//             try {
//               logWithTiming(
//                 startTime,
//                 '[chat/route] streamText.onFinish complete',
//               );

//               const finalMessages = appendResponseMessages({
//                 messages: [],
//                 responseMessages: response.messages,
//               }).filter(
//                 (m) =>
//                   // Accept either a non-empty message or a tool invocation
//                   m.content !== '' || (m.toolInvocations || []).length !== 0,
//               );

//               // Increment createdAt by 1ms to avoid duplicate timestamps
//               finalMessages.forEach((m, index) => {
//                 if (m.createdAt) {
//                   m.createdAt = new Date(m.createdAt.getTime() + index);
//                 }
//               });

//               // Save the messages to the database
//               const saved = await dbCreateMessages({
//                 messages: finalMessages.map((m) => ({
//                   conversationId,
//                   createdAt: m.createdAt,
//                   role: m.role,
//                   content: m.content,
//                   toolInvocations: m.toolInvocations
//                     ? JSON.parse(JSON.stringify(m.toolInvocations))
//                     : undefined,
//                   experimental_attachments: m.experimental_attachments
//                     ? JSON.parse(JSON.stringify(m.experimental_attachments))
//                     : undefined,
//                 })),
//               });

//               logWithTiming(
//                 startTime,
//                 '[chat/route] dbCreateMessages complete',
//               );

//               // Save the token stats
//               if (saved && newUserMessage && isValidTokenUsage(usage)) {
//                 let { promptTokens, completionTokens, totalTokens } = usage;

//                 if (isValidTokenUsage(orchestratorUsage)) {
//                   promptTokens += orchestratorUsage.promptTokens;
//                   completionTokens += orchestratorUsage.completionTokens;
//                   totalTokens += orchestratorUsage.totalTokens;
//                 }

//                 const messageIds = [...newUserMessage, ...saved].map(
//                   (m) => m.id,
//                 );

//                 await dbCreateTokenStat({
//                   userId,
//                   messageIds,
//                   promptTokens,
//                   completionTokens,
//                   totalTokens,
//                 });

//                 logWithTiming(
//                   startTime,
//                   '[chat/route] dbCreateTokenStat complete',
//                 );
//               }

//               revalidatePath('/api/conversations');
//             } catch (error) {
//               console.error('[chat/route] Failed to save messages', error);
//             }
//           },
//         });
//         result.mergeIntoDataStream(dataStream);
//       },
//       onError: (_) => {
//         return 'An error occurred';
//       },
//     });
//   } catch (error) {
//     console.error('[chat/route] Unexpected error:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }

// export async function DELETE(req: Request) {
//   const session = await verifyUser();
//   const userId = session?.data?.data?.id;

//   if (!userId) {
//     return new Response('Unauthorized', { status: 401 });
//   }

//   try {
//     const { id: conversationId } = await req.json();
//     await dbDeleteConversation({ conversationId, userId });
//     revalidatePath('/api/conversations');

//     return new Response('Conversation deleted', { status: 200 });
//   } catch (error) {
//     console.error('[chat/route] Delete error:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }



import { revalidatePath } from 'next/cache';

import {
  CoreMessage,
  CoreTool,
  Message,
  NoSuchToolError,
  convertToCoreMessages,
  generateObject,
  streamText,
} from 'ai';
import { z } from 'zod';

import {
  defaultModel,
  defaultSystemPrompt,
  defaultTools,
} from '@/ai/providers';
import { MAX_TOKEN_MESSAGES } from '@/lib/constants';
import {
  getMostRecentUserMessage,
  sanitizeResponseMessages,
} from '@/lib/utils/ai';
import { generateTitleFromUserMessage } from '@/server/actions/ai';
import { verifyUser } from '@/server/actions/user';
import {
  dbCreateConversation,
  dbCreateMessages,
  dbCreateTokenStat,
  dbDeleteConversation,
  dbGetConversation,
} from '@/server/db/queries';

export const maxDuration = 30;

export async function POST(req: Request) {
  const session = await verifyUser();
  const userId = session?.data?.data?.id;
  const publicKey = session?.data?.data?.publicKey;

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  // if (!publicKey) {
  //   console.error('[chat/route] No public key found');
  //   return new Response('No public key found', { status: 400 });
  // }

  try {
    const {
      id: conversationId,
      messages,
    }: { id: string; messages: Array<Message> } = await req.json();
    const coreMessages = convertToCoreMessages(messages);
    const userMessage: CoreMessage | undefined =
      getMostRecentUserMessage(coreMessages);

    if (!userMessage) {
      return new Response('No user message found', { status: 400 });
    }

    const conversation = await dbGetConversation({ conversationId });

    if (!conversation) {
      const title = await generateTitleFromUserMessage({
        message: userMessage,
      });
      await dbCreateConversation({ conversationId, userId, title });
      revalidatePath('/api/conversations');
    }

    const newUserMessage = await dbCreateMessages({
      messages: [
        {
          conversationId,
          role: userMessage.role,
          content: JSON.parse(JSON.stringify(userMessage)),
        },
      ],
    });

    // extract all attachments from the user message
    const attachments = messages
      .filter((message) => message.experimental_attachments)
      .map((message) => message.experimental_attachments)
      .flat()
      .map((attachment) => {
        return {
          type: attachment?.contentType,
          data: attachment?.url,
        };
      });
    // append to system prompt
    const systemPrompt =
      defaultSystemPrompt +
      `\n\nHistory of attachments: ${JSON.stringify(attachments)}` +
      `\n\nUser Solana wallet public key: ${publicKey}` +
      `\n\nUser ID: ${userId}` +
      `\n\nConversation ID: ${conversationId}`;

    // Filter to relevant messages for context sizing
    const relevantMessages: CoreMessage[] = messages.slice(
      -MAX_TOKEN_MESSAGES,
    ) as CoreMessage[];

    const result = streamText({
      model: defaultModel,
      system: systemPrompt,
      tools: defaultTools as Record<string, CoreTool<any, any>>,
      experimental_toolCallStreaming: true,
      experimental_telemetry: {
        isEnabled: true,
        functionId: 'stream-text',
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

        console.log('[chat/route] repairToolCall', toolCall);

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

        console.log('[chat/route] repairedArgs', repairedArgs);
        console.log('[chat/route] toolCall', toolCall);

        return { ...toolCall, args: JSON.stringify(repairedArgs) };
      },

      maxSteps: 15,
      messages: relevantMessages,
      async onFinish({ response, usage }) {
        if (!userId) return;

        try {
          const sanitizedResponses = sanitizeResponseMessages(
            response.messages,
          );

          // Create messages and get their IDs back
          const messages = await dbCreateMessages({
            messages: sanitizedResponses.map((message) => {
              return {
                conversationId,
                role: message.role,
                content: JSON.parse(JSON.stringify(message.content)),
              };
            }),
          });

          // Save the token stats
          if (
            messages &&
            newUserMessage &&
            !isNaN(usage.promptTokens) &&
            !isNaN(usage.completionTokens) &&
            !isNaN(usage.totalTokens)
          ) {
            const messageIds = newUserMessage
              .concat(messages)
              .map((message) => message.id);
            const { promptTokens, completionTokens, totalTokens } = usage;

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
          console.error('[chat/route] Failed to save messages', error);
        }
      },
    });

    return result.toDataStreamResponse();
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
