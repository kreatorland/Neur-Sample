'use client';

import { useRouter } from 'next/navigation';

import {
  Discord,
  OAuthTokens,
  Twitter,
  User,
  WalletWithMetadata,
  useOAuthTokens,
  usePrivy,
} from '@privy-io/react-auth';
import { useSolanaWallets } from '@privy-io/react-auth/solana';

import { WalletCard } from '@/components/dashboard/wallet-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CopyableText } from '@/components/ui/copyable-text';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/use-user';
import { useWalletPortfolio } from '@/hooks/use-wallet-portfolio';
import { useEmbeddedWallets } from '@/hooks/use-wallets';
import { cn } from '@/lib/utils';
import {
  formatPrivyId,
  formatUserCreationDate,
  formatWalletAddress,
} from '@/lib/utils/format';
import { getUserID, grantDiscordRole } from '@/lib/utils/grant-discord-role';
import { EmbeddedWallet } from '@/types/db';

import { LoadingStateSkeleton } from '../account/loading-skeleton';
import { WalletDetail } from './table';

export function AccountContent() {
  const router = useRouter();
  const { ready } = usePrivy();
  const {
    isLoading: isUserLoading,
    user,
    linkTwitter,
    unlinkTwitter,
    linkEmail,
    unlinkEmail,
    linkDiscord,
    unlinkDiscord,
    linkWallet,
    unlinkWallet,
  } = useUser();

  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    refresh,
  } = useWalletPortfolio();

  const {
    data: embeddedWallets = [],
    error: walletsError,
    isLoading: isWalletsLoading,
    mutate: mutateWallets,
  } = useEmbeddedWallets();

  const { createWallet: createSolanaWallet } = useSolanaWallets();

  const { reauthorize } = useOAuthTokens({
    onOAuthTokenGrant: (tokens: OAuthTokens, { user }: { user: User }) => {
      // Grant Discord role
      handleGrantDiscordRole(tokens.accessToken);
    },
  });

  if (isUserLoading || isWalletsLoading || !user) {
    return <LoadingStateSkeleton />;
  }
  if (walletsError) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load wallets: {walletsError.message}
      </div>
    );
  }

  const privyUser = user?.privyUser;

  const userData = {
    privyId: privyUser?.id,
    twitter: privyUser?.twitter as Twitter | undefined,
    email: privyUser?.email?.address,
    phone: privyUser?.phone?.number,
    walletAddress: privyUser?.wallet?.address || 'No wallet connected',
    createdAt: formatUserCreationDate(user?.createdAt?.toString()),
    discord: privyUser?.discord as Discord | undefined,
  };
  const privyWallets = embeddedWallets.filter(
    (w: EmbeddedWallet) => w.walletSource === 'PRIVY',
  );
  const legacyWallets = embeddedWallets.filter(
    (w: EmbeddedWallet) => w.walletSource === 'CUSTOM',
  );

  const allUserLinkedAccounts = privyUser?.linkedAccounts || [];
  const linkedSolanaWallet = allUserLinkedAccounts.find(
    (acct): acct is WalletWithMetadata =>
      acct.type === 'wallet' &&
      acct.walletClientType !== 'privy' &&
      acct.chainType === 'solana',
  );

  const avatarLabel = userData.walletAddress
    ? userData.walletAddress.substring(0, 2).toUpperCase()
    : '?';

  async function handleGrantDiscordRole(accessToken: string) {
    try {
      const discordUserId = await getUserID(accessToken);
      await grantDiscordRole(discordUserId);
    } catch (error) {
      throw new Error(`Failed to grant Discord role: ${error}`);
    }
  }

  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="w-full ">
        <div className=" space-y-6">
          <Card className="w-full">
            <CardContent className="pt-6">
              {/* Privy Embedded Wallet Section */}
              {/* <section className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground">
                  Privy Embedded Wallets
                </h2>
                {privyWallets.length > 0
                  ? privyWallets.map((wallet) => (
                      <WalletCard
                        key={wallet.id}
                        wallet={wallet}
                        mutateWallets={mutateWallets}
                      />
                    ))
                  : ready && (
                      <Card className="bg-sidebar">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div>
                                  <p className="text-sm font-medium">
                                    Public Key
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    None created yet
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  createSolanaWallet().then(() =>
                                    mutateWallets(),
                                  )
                                }
                                className={cn('min-w-[100px] text-xs')}
                              >
                                Create
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
              </section> */}

              {/* Legacy Embedded Wallet Section */}

              {/* <section className="space-y-4">
                {wallets?.map((wallet: EmbeddedWallet) => (
                  <WalletCard key={wallet.id} wallet={wallet} />
                ))}
              </section> */}

              <Card className="mt-2">
                {portfolio && (
                  <WalletDetail
                    data={portfolio}
                    isLoading={isPortfolioLoading}
                  ></WalletDetail>
                )}
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
