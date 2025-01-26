import { ReactNode } from 'react';

import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

import { actionTools } from './generic/action';
import { jinaTools } from './generic/jina';
import { telegramTools } from './generic/telegram';
import { utilTools } from './generic/util';
import { birdeyeTools } from './solana/birdeye';
import { chartTools } from './solana/chart';
import { definedTools } from './solana/defined-fi';
import { dexscreenerTools } from './solana/dexscreener';
import { jupiterTools } from './solana/jupiter';
import { magicEdenTools } from './solana/magic-eden';
import { pumpfunTools } from './solana/pumpfun';
import { solanaTools } from './solana/solana';

const usingAnthropic = !!process.env.ANTHROPIC_API_KEY;

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const claude35Sonnet = anthropic('claude-3-5-sonnet-20241022');

const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});

export const orchestratorModel = openai('gpt-4o-mini');

const openAiModel = openai(process.env.OPENAI_MODEL_NAME || 'gpt-4o');

export const defaultSystemPrompt = `
Your name is Lyth.
You are powered by Deepseek R1.
You are a specialized AI assistant for Solana blockchain and DeFi operations, designed to provide secure, accurate, and user-friendly assistance.

About Deepseek:
Deepseek is a next-generation AI-driven orchestration platform designed to enable seamless integration and operation of blockchain and DeFi tools. It ensures high performance, security, and adaptability for complex financial and blockchain-related tasks.

 Critical Rules:
- If the previous tool result contains the key-value pair \`noFollowUp: true\`:
 Do not respond with anything.
- If the previous tool result contains the key-value pair \`suppressFollowUp: true\`:
 Respond only with something like:
    - "Take a look at the results above."
    - "I've displayed the information above."
    - "The results are shown above."
    - "You can see the details above."
- Always use the \`searchToken\` tool to get the correct token mint first and ask for user confirmation.


---


 Confirmation Handling
1. Pre-Execution Confirmation:
  - For tools with the parameter \`requiresConfirmation: true\` or where the description includes "requiresConfirmation":
    - Always call the \`askForConfirmation\` tool to request explicit user confirmation.
    - STOP your response immediately after calling \`askForConfirmation\` without providing additional information or context.
    - WAIT for explicit user confirmation or rejection.


2. Post-Confirmation Handling:
  - If the user confirms:
    - Execute the tool in a new response with the confirmed details.
    - Provide a clear success or error message based on the tool execution result.
  - If the user rejects:
    - Acknowledge the rejection with a concise message, such as "Understood, the action will not be executed."
    - DO NOT re-prompt for the same action unless explicitly instructed by the user.


3. Avoid Confirmation Loops:
  - Do not repeat the confirmation request if the user has already rejected it.
  - Avoid asking for confirmation multiple times for the same action unless the user provides new inputs or requests clarification.


4. Chaining Restrictions:
  - NEVER combine the confirmation request and tool execution in the same response.
  - Each step (confirmation, execution) should occur as a separate response.


---


   NFT Listing on Magic Eden
- Listing an NFT for sale requires explicit user confirmation.
- Before using the listing tool:
 - Confirm the collection symbol, token address, price, and seller's wallet address.
 - Ensure the user has reviewed and approved all details.
- Post-execution:
 - If successful, provide a success message with relevant details.
 - If failed, provide an error message with troubleshooting suggestions.


---


  Scheduled Actions
- Always ask for confirmation before scheduling any action.
- Follow the rules in the "Confirmation Handling" section to ensure clarity and prevent unnecessary repetition.
- After scheduling an action:
 - Respond with something like:
   - "The action has been scheduled successfully."
   - "The action has been created and scheduled."
   - "The action has been set up for execution."


---


   Response Formatting
- Use proper line breaks between sections for readability.
- Utilize markdown effectively:
 - Use \`code blocks\` for technical terms like addresses or transactions.
 - Use **bold** for emphasis.
 - Use bullet points, numbered lists, and tables for clarity.
 - Use > blockquotes for warnings or key information.
 - Use ### headings for organizing long responses.
- Keep responses concise and well-structured.
- Use emojis sparingly and contextually.


---


  Common Knowledge
- { user: toly, description: Co-Founder of Solana Labs, twitter: @aeyakovenko, wallet: toly.sol }
`;

export const defaultModel = usingAnthropic ? claude35Sonnet : openAiModel;

export interface ToolConfig {
  displayName?: string;
  icon?: ReactNode;
  isCollapsible?: boolean;
  isExpandedByDefault?: boolean;
  description: string;
  parameters: z.ZodType<any>;
  execute?: <T>(
    params: z.infer<T extends z.ZodType ? T : never>,
  ) => Promise<any>;
  render?: (result: unknown) => React.ReactNode | null;
  agentKit?: any;
  userId?: any;
  requiresConfirmation?: boolean;
}

export function DefaultToolResultRenderer({ result }: { result: unknown }) {
  if (result && typeof result === 'object' && 'error' in result) {
    return (
      <div className="mt-2 pl-3.5 text-sm text-destructive">
        {String((result as { error: unknown }).error)}
      </div>
    );
  }

  return (
    <div className="mt-2 border-l border-border/40 pl-3.5 font-mono text-xs text-muted-foreground/90">
      <pre className="max-h-[200px] max-w-[400px] truncate whitespace-pre-wrap break-all">
        {JSON.stringify(result, null, 2).trim()}
      </pre>
    </div>
  );
}

export const defaultTools: Record<string, ToolConfig> = {
  ...actionTools,
  ...solanaTools,
  ...definedTools,
  ...pumpfunTools,
  ...jupiterTools,
  ...dexscreenerTools,
  ...magicEdenTools,
  ...jinaTools,
  ...utilTools,
  ...chartTools,
  ...telegramTools,
  ...birdeyeTools,
};

export const coreTools: Record<string, ToolConfig> = {
  ...actionTools,
  ...utilTools,
  ...jinaTools,
};

export const toolsets: Record<
  string,
  { tools: string[]; description: string }
> = {
  coreTools: {
    tools: ['actionTools', 'utilTools', 'jupiterTools'],
    description:
      'Core utility tools for general operations, including actions, searching token info, utility functions.',
  },
  webTools: {
    tools: ['jinaTools'],
    description:
      'Web scraping and content extraction tools for reading web pages and extracting content.',
  },
  defiTools: {
    tools: ['solanaTools', 'dexscreenerTools'],
    description:
      'Tools for interacting with DeFi protocols on Solana, including swaps, market data, token definitions.',
  },
  traderTools: {
    tools: ['birdeyeTools'],
    description:
      'Tools for analyzing and tracking traders and trades on Solana DEXes.',
  },
  financeTools: {
    tools: ['definedTools'],
    description:
      'Tools for retrieving and applying logic to static financial data, including analyzing trending tokens.',
  },
  tokenLaunchTools: {
    tools: ['pumpfunTools'],
    description:
      'Tools for launching tokens on PumpFun, including token deployment and management.',
  },
  chartTools: {
    tools: ['chartTools'],
    description: 'Tools for generating and displaying various types of charts.',
  },
  nftTools: {
    tools: ['magicEdenTools'],
    description:
      'Tools for interacting with NFTs, including Magic Eden integrations.',
  },
  socialTools: {
    tools: ['telegramTools'],
    description:
      'Tools for interacting with Telegram for notifications and messaging.',
  },
};

export const orchestrationPrompt = `
You are Lyth, an AI assistant specialized in Solana blockchain and DeFi operations powered by Deepseek R1.

Your Task:
Analyze the user's message and return the appropriate tools as a **JSON array of strings**.  

Rules:
- Only include the askForConfirmation tool if the user's message requires a transaction signature or if they are creating an action.
- Only return the toolsets in the format: ["toolset1", "toolset2", ...].  
- Do not add any text, explanations, or comments outside the array.  
- Be minimal — include only the toolsets necessary to handle the request.
- If the request cannot be completed with the available toolsets, return an array describing the unknown tools ["INVALID_TOOL:\${INVALID_TOOL_NAME}"].

Available Tools:
${Object.entries(defaultTools)
  .map(([name, { description }]) => `- **${name}**: ${description}`)
  .join('\n')}
`;

export function getToolConfig(toolName: string): ToolConfig | undefined {
  return defaultTools[toolName];
}

export function getToolsFromRequiredTools(
  toolNames: string[],
): Record<string, ToolConfig> {
  return toolNames.reduce((acc: Record<string, ToolConfig>, toolName) => {
    const tool = defaultTools[toolName];
    if (tool) {
      acc[toolName] = tool;
    }
    return acc;
  }, {});
}
