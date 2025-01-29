'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { RiTwitterXFill } from '@remixicon/react';
import { useChat } from 'ai/react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import ChatInterface from '@/app/(user)/chat/[id]/chat-interface';
import { Badge } from '@/components/ui/badge';
import BlurFade from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TypingAnimation from '@/components/ui/typing-animation';
import { useConversations } from '@/hooks/use-conversations';
import { useUser } from '@/hooks/use-user';
import { SolanaUtils } from '@/lib/solana';
import { cn } from '@/lib/utils';
import { checkEAPTransaction } from '@/server/actions/eap';

import { IntegrationsGrid } from '../home/components/integrations-grid';
import { ConversationInput } from '../home/conversation-input';
import { getRandomSuggestions } from '../home/data/suggestions';
import { SuggestionCard } from '../home/suggestion-card';

const EAP_PRICE = 0.05;
const RECEIVE_WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_EAP_RECEIVE_WALLET_ADDRESS!;

const EAP_BENEFITS = [
  'Support platform growth',
  'Early access to features',
  'Unlimited AI interactions',
  'Join early governance and decisions',
];

interface SectionTitleProps {
  children: React.ReactNode;
}

function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-2 px-1 text-sm font-medium text-muted-foreground/80">
      {children}
    </h2>
  );
}

export function IntegrationContent() {
  const [chatId, setChatId] = useState(() => uuidv4());
  const { user, isLoading } = useUser();

  const { conversations, refreshConversations } = useConversations(user?.id);

  const { messages, input, handleSubmit, setInput } = useChat({
    id: chatId,
    initialMessages: [],
    body: { id: chatId },
    onFinish: () => {
      // Only refresh if we have a new conversation that's not in the list
      if (chatId && !conversations?.find((conv) => conv.id === chatId)) {
        refreshConversations();
      }
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // const hasEAP = true;
  const hasEAP = user?.earlyAccess === true;

  const mainContent = (
    <div
      className={cn(
        'mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-6',
        !hasEAP ? 'h-screen py-0' : 'py-12',
      )}
    >
      {/* <BlurFade delay={0.2}>
        <TypingAnimation
          className="mb-12 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent md:text-4xl lg:text-5xl"
          duration={50}
          text="What can I do for you?"
        />
      </BlurFade> */}

      <div className="mx-auto w-full max-w-3xl space-y-8">
        <BlurFade delay={0.4}>
          <div className="space-y-2">
            {/* <SectionTitle>Integrations</SectionTitle> */}
            <IntegrationsGrid />
          </div>
        </BlurFade>
      </div>
    </div>
  );
  return (
    <div className="relative h-screen">
      <div
        className={cn(
          'inset-0 flex items-center opacity-100 transition-opacity duration-300',
        )}
      >
        {mainContent}
      </div>
    </div>
  );
}
