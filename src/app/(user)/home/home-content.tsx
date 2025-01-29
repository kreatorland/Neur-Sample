'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SavedPrompt } from '@prisma/client';
import { RiTwitterXFill } from '@remixicon/react';
import { JSONValue } from 'ai';
import { useChat } from 'ai/react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

import ChatInterface from '@/app/(user)/chat/[id]/chat-interface';
import NLogo from '@/components/n-logo';
import { Badge } from '@/components/ui/badge';
import BlurFade from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Circle } from '@/components/ui/circle';
import TypingAnimation from '@/components/ui/typing-animation';
import { useConversations } from '@/hooks/use-conversations';
import { useUser } from '@/hooks/use-user';
import { SolanaUtils } from '@/lib/solana';
import { cn } from '@/lib/utils';
import { checkEAPTransaction } from '@/server/actions/eap';
import { getSavedPrompts } from '@/server/actions/saved-prompt';

import { IntegrationsGrid } from './components/integrations-grid';
import { ConversationInput } from './conversation-input';
import { getRandomSuggestions } from './data/suggestions';
import { getRandomSuggestions2 } from './data/suggestions';
import { SuggestionCard } from './suggestion-card';

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

export function HomeContent() {
  const pathname = usePathname();
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [isFetchingSavedPrompts, setIsFetchingSavedPrompts] =
    useState<boolean>(true);
  const suggestions = useMemo(() => getRandomSuggestions(6), []);
  const suggestions2 = useMemo(() => getRandomSuggestions2(2), []);
  const [showChat, setShowChat] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatId, setChatId] = useState(() => uuidv4());
  const { user, isLoading } = useUser();
  const [verifyingTx, setVerifyingTx] = useState<string | null>(null);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const MAX_VERIFICATION_ATTEMPTS = 20;

  const { conversations, refreshConversations } = useConversations(user?.id);

  const resetChat = useCallback(() => {
    setShowChat(false);
    setChatId(uuidv4());
  }, []);

  useEffect(() => {
    async function fetchSavedPrompts() {
      try {
        const res = await getSavedPrompts();
        const savedPrompts = res?.data?.data || [];

        setSavedPrompts(savedPrompts);
      } catch (err) {
        console.error(err);
      }
      setIsFetchingSavedPrompts(false);
    }
    fetchSavedPrompts();
  }, []);

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
    experimental_prepareRequestBody: ({ messages }) => {
      return {
        message: messages[messages.length - 1],
        id: chatId,
      } as unknown as JSONValue;
    },
  });

  // Verification effect
  useEffect(() => {
    if (!verifyingTx) return;

    const verify = async () => {
      try {
        const response = await checkEAPTransaction({ txHash: verifyingTx });
        if (response?.data?.success) {
          toast.success('EAP Purchase Successful', {
            description:
              'Your Early Access Program purchase has been verified. Please refresh the page.',
          });
          setVerifyingTx(null);
          return;
        }

        // Continue verification if not reached max attempts
        if (verificationAttempts < MAX_VERIFICATION_ATTEMPTS) {
          setVerificationAttempts((prev) => prev + 1);
        } else {
          // Max attempts reached, show manual verification message
          toast.error('Verification Timeout', {
            description:
              'Please visit the FAQ page to manually verify your transaction.',
          });
          setVerifyingTx(null);
        }
      } catch (error) {
        console.error('Verification error:', error);
        // Continue verification if not reached max attempts
        if (verificationAttempts < MAX_VERIFICATION_ATTEMPTS) {
          setVerificationAttempts((prev) => prev + 1);
        }
      }
    };

    const timer = setTimeout(verify, 3000);
    return () => clearTimeout(timer);
  }, [verifyingTx, verificationAttempts]);

  const handleSend = async (value: string) => {
    if (!value.trim()) return;

    if (!user?.earlyAccess) {
      return;
    }

    const fakeEvent = new Event('submit') as any;
    fakeEvent.preventDefault = () => {};

    await handleSubmit(fakeEvent, { data: { content: value } });
    setShowChat(true);
    window.history.replaceState(null, '', `/chat/${chatId}`);
  };

  const handlePurchase = async () => {
    if (!user) return;
    setIsProcessing(true);
    setVerificationAttempts(0);

    try {
      const tx = await SolanaUtils.sendTransferWithMemo({
        to: RECEIVE_WALLET_ADDRESS,
        amount: EAP_PRICE,
        memo: `{
                    "type": "EAP_PURCHASE",
                    "user_id": "${user.id}"
                }`,
      });

      if (tx) {
        setVerifyingTx(tx);
        toast.success('Transaction Sent', {
          description: 'Transaction has been sent. Verifying your purchase...',
        });
      } else {
        toast.error('Transaction Failed', {
          description: 'Failed to send the transaction. Please try again.',
        });
      }
    } catch (error) {
      console.error('Transaction error:', error);

      let errorMessage = 'Failed to send the transaction. Please try again.';

      if (error instanceof Error) {
        const errorString = error.toString();
        if (
          errorString.includes('TransactionExpiredBlockheightExceededError')
        ) {
          toast.error('Transaction Timeout', {
            description: (
              <>
                <span className="font-semibold">
                  Transaction might have been sent successfully.
                </span>
                <br />
                If SOL was deducted from your wallet, please visit the FAQ page
                and input your transaction hash for manual verification.
              </>
            ),
          });
          return;
        }
        errorMessage = error.message;
      }

      toast.error('Transaction Failed', {
        description: errorMessage,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Reset chat when pathname changes to /home
  useEffect(() => {
    if (pathname === '/home') {
      resetChat();
    }
  }, [pathname, resetChat]);

  // 监听浏览器的前进后退
  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname === '/home') {
        resetChat();
      } else if (location.pathname === `/chat/${chatId}`) {
        setShowChat(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [chatId, resetChat]);

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
        'mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center space-y-8 rounded-md bg-[#1f1f1f] px-6',
        !hasEAP ? 'h-screen py-0' : 'py-12',
      )}
    >
      <BlurFade delay={0.2}>
        <div className=" flex justify-center">
          <NLogo></NLogo>
        </div>
      </BlurFade>
      <BlurFade delay={0.2}>
        <TypingAnimation
          className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent md:text-4xl lg:text-5xl"
          duration={50}
          text="How can i help you today?"
        />
      </BlurFade>

      {hasEAP && (
        <div className="mx-auto w-full space-y-8">
          <BlurFade delay={0.2}>
            <div className="space-y-2">
              {/* <SectionTitle>Suggestions</SectionTitle> */}
              <div className="grid grid-cols-3 gap-4">
                {suggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={suggestion.title}
                    {...suggestion}
                    delay={0.3 + index * 0.1}
                    onSelect={setInput}
                  />
                ))}
              </div>
            </div>
          </BlurFade>

          {/* {!isFetchingSavedPrompts && savedPrompts.length !== 0 && (
              <BlurFade delay={0.3}>
                <div className="space-y-2">
                  <SectionTitle>Saved Prompts</SectionTitle>
                  {isFetchingSavedPrompts ? (
                    <div className="flex w-full items-center justify-center pt-20">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {savedPrompts
                        .slice(0, Math.min(4, savedPrompts.length))
                        .map((savedPrompt, index) => (
                          <SuggestionCard
                            id={savedPrompt.id}
                            useSubtitle={true}
                          
                            title={savedPrompt.title}
                            subtitle={savedPrompt.content}
                            key={savedPrompt.id}
                            delay={0.3 + index * 0.1}
                            onSelect={setInput}
                          />
                        ))}
                    </div>
                  )}
                </div>
              </BlurFade>
            )} */}
        </div>
      )}
      <BlurFade delay={0.2}>
        <div className=" flex justify-around space-x-11">
          <h1 className="text-green-600 underline">All</h1>
          <h1>Text</h1>
          <h1>Image</h1>
          <h1>Video</h1>
          <h1>Music</h1>
          <h1>Analytics</h1>
        </div>
      </BlurFade>

      <div className="mx-auto w-full  space-y-8">
        <BlurFade delay={0.1}>
          <ConversationInput
            value={input}
            onChange={setInput}
            onSubmit={handleSend}
          />
        </BlurFade>
      </div>
    </div>
  );

  if (!hasEAP) {
    return (
      <div className="relative h-screen w-full overflow-hidden text-xs sm:text-base">
        <div className="absolute inset-0 z-10 bg-background/30 backdrop-blur-md" />
        {mainContent}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="mx-auto h-[400px] max-w-xl overflow-y-auto p-6">
            <Card className="relative flex max-h-full flex-col border-white/[0.1] bg-gradient-to-b from-[#1bea2c]/80 to-[#1bea2c]/60 p-4 backdrop-blur-sm backdrop-saturate-150 sm:p-8">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02] dark:from-white/[0.02] dark:to-white/[0.01]" />
              <div className="flex flex-1 items-center justify-center">
                <Circle>
                  <NLogo></NLogo>
                  <BorderBeam
                    className="opacity-0 group-hover:opacity-100"
                    duration={10}
                    size={300}
                  />
                </Circle>
              </div>

              <div className="flex  flex-col gap-2">
                <h2 className="text-lg font-semibold text-black sm:text-2xl">
                  Early Access
                </h2>
                <div className="text-black text-muted-foreground">
                  {/* <Badge>BETA</Badge> */}
                  We&apos;re offering BETA access to a limited number of users
                  to maintain stability and improve features.
                </div>

                <Button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-[50%] bg-[#fff] text-xs ring-offset-0  focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    `Join Early Access (${EAP_PRICE} SOL)`
                  )}
                </Button>
              </div>
              {/* <div className="relative space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-lg font-semibold text-black sm:text-2xl">
                    Early Access
                  </h2>
                  <div className="text-muted-foreground">
                  
                    We&apos;re offering BETA access to a limited number of users
                    to maintain stability and improve features.
                  </div>
                </div>

                <div className="rounded-lg p-4 backdrop-blur-sm dark:bg-black/[0.01]">
                  <div className="text-center text-xs text-muted-foreground sm:text-sm">
                    All proceeds from early adopters will directly support
                    development, covering costs for Deepseek API, RPC services,
                    and other essential integrations.
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="bg-[#fff] text-xs ring-offset-0  focus-visible:ring-0 focus-visible:ring-offset-0 sm:text-sm"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing
                      </>
                    ) : (
                      `Join Early Access (${EAP_PRICE} SOL)`
                    )}
                  </Button>
                </div>
              </div> */}
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      {!showChat && (
        <div
          className={cn(
            'fixed inset-0 mt-5 overflow-y-auto overflow-x-hidden transition-opacity duration-300',
            showChat ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
          style={{ top: '8%', left: '14%' }}
        >
          {mainContent}
        </div>
      )}
      {showChat && (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            showChat ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <ChatInterface id={chatId} initialMessages={messages} />
        </div>
      )}
    </div>
  );
}
