import {
  BadgeDollarSignIcon,
  ChartNoAxesColumnIcon,
  RocketIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react';

export interface Suggestion {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
}

export const SUGGESTIONS: Suggestion[] = [
  {
    id: 'launch-token',
    icon: RocketIcon,
    title: 'Launch a new token',
    subtitle: 'deploy a new token on pump.fun',
  },
  {
    id: 'swap-sol-usdc',
    icon: BadgeDollarSignIcon,
    title: 'Swap 1 SOL for USDC',
    subtitle: 'using Jupiter to swap on Solana',
  },
  {
    id: 'solana-trends',
    icon: TrendingUpIcon,
    title: "What's trending on Solana?",
    subtitle: 'find the current market trends',
  },
  {
    id: 'price-feed',
    icon: BadgeDollarSignIcon,
    title: "What's the price of SOL?",
    subtitle: 'find the current price of SOL',
  },
  {
    id: 'top-gainers-last-24h',
    icon: ChartNoAxesColumnIcon,
    title: 'Top gainers in the last 24h',
    subtitle: 'find the top gainers in the last 24 hours',
  },
  {
    id: 'check-my-wallet',
    icon: WalletIcon,
    title: 'Check my wallet',
    subtitle: 'check the portfolio of your wallet',
  },
];

export function getRandomSuggestions(count: number): Suggestion[] {
  // Ensure we don't request more items than available
  const safeCount = Math.min(count, SUGGESTIONS.length);
  const startIndex = Math.floor(Date.now() / 1000) % SUGGESTIONS.length;

  // Create a rotated copy of the array starting from startIndex
  const rotatedSuggestions = [
    ...SUGGESTIONS.slice(startIndex),
    ...SUGGESTIONS.slice(0, startIndex),
  ];

  // Return only the first safeCount items
  return rotatedSuggestions.slice(0, safeCount);
}
export const SUGGESTIONS2: Suggestion[] = [
  {
    id: 'top-gainers-last-24h',
    icon: ChartNoAxesColumnIcon,
    title: 'Top gainers in the last 24h',
    subtitle: 'find the top gainers in the last 24 hours',
  },
  {
    id: 'check-my-wallet',
    icon: WalletIcon,
    title: 'Check my wallet',
    subtitle: 'check the portfolio of your wallet',
  },
];

export function getRandomSuggestions2(count: number): Suggestion[] {
  // Ensure we don't request more items than available
  const safeCount = Math.min(count, SUGGESTIONS.length);
  const startIndex = Math.floor(Date.now() / 1000) % SUGGESTIONS2.length;

  // Create a rotated copy of the array starting from startIndex
  const rotatedSuggestions = [
    ...SUGGESTIONS.slice(startIndex),
    ...SUGGESTIONS.slice(0, startIndex),
  ];

  // Return only the first safeCount items
  return rotatedSuggestions.slice(0, safeCount);
}
