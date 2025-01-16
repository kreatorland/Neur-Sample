import {
  ActivityIcon,
  BadgeDollarSign,
  BookOpenIcon,
  BotIcon,
  BrainCircuitIcon,
  BrainIcon,
  DollarSign,
  FileQuestion,
  FingerprintIcon,
  FolderKanbanIcon,
  LinkIcon,
  SendIcon,
  ShieldIcon,
  TwitterIcon,
  WalletIcon,
  WorkflowIcon,
  XIcon,
  ZapIcon,
} from 'lucide-react';

export interface IntegrationTheme {
  primary: string;
  secondary: string;
}

export interface DataIntegration {
  icon: any;
  label: string;
  description?: string;
}

export const FeatureLists: DataIntegration[] = [
  {
    icon: BrainCircuitIcon,
    label: 'Natural Language Transactions',
    description:
      'Users can send tokens, stake, or swap assets by simply typing commands like "Stake 10 $SOL for 30 days.',
  },
  {
    icon: BrainCircuitIcon,
    label: 'On-Chain Automation',
    description:
      ' Numble simplifies complex tasks on Solana by automating smart contract interactions, making blockchain processes seamless.',
  },
  {
    icon: BrainCircuitIcon,
    label: 'DeFi Optimization',
    description:
      ' Boost yield farming and liquidity management by executing real-time strategies with precision.',
  },
  {
    icon: BrainCircuitIcon,
    label: 'Adoption Catalyst',
    description:
      ' Drive mass adoption by simplifying blockchain interactions, making crypto accessible for non-technical users.',
  },
  {
    icon: BrainCircuitIcon,
    label: 'Market Analytics',
    description:
      'Provides insights into market trends, token performance, and user behavior with real-time and historical data visualization.',
  },
  {
    icon: BrainCircuitIcon,
    label: 'Web2-Like UX:',
    description:
      'Offers a user-friendly interface with dashboards, one-click actions, and mobile optimization, ensuring familiarity for mainstream users.',
  },
];
