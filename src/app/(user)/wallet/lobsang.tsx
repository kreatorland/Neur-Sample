'use client';

import { useRouter } from 'next/navigation';

import {
  Discord,
  OAuthTokens,
  Twitter,
  User,
  useOAuthTokens,
} from '@privy-io/react-auth';

import { WalletCard } from '@/components/dashboard/wallet-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CopyableText } from '@/components/ui/copyable-text';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/lib/utils';
import {
  formatPrivyId,
  formatUserCreationDate,
  formatWalletAddress,
} from '@/lib/utils/format';
import { getUserID, grantDiscordRole } from '@/lib/utils/grant-discord-role';
import { EmbeddedWallet } from '@/types/db';

// import { LoadingStateSkeleton } from './loading-skeleton';

export function AccountContent() {
  const router = useRouter();
  const {
    isLoading,
    user,
    linkTwitter,
    unlinkTwitter,
    linkEmail,
    unlinkEmail,
    linkDiscord,
    unlinkDiscord,
  } = useUser();

  const { reauthorize } = useOAuthTokens({
    onOAuthTokenGrant: (tokens: OAuthTokens, { user }: { user: User }) => {
      // Grant Discord role
      handleGrantDiscordRole(tokens.accessToken);
    },
  });

  if (isLoading || !user) {
    // return <LoadingStateSkeleton />;
    <>loading</>;
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

  const wallets = user?.wallets || [];
  const avatarLabel = userData.walletAddress
    ? userData.walletAddress.substring(0, 2).toUpperCase()
    : '?';

  const handleGrantDiscordRole = async (accessToken: string) => {
    try {
      const discordUserId = await getUserID(accessToken);
      await grantDiscordRole(discordUserId);
    } catch (error) {
      throw new Error(`Failed to grant Discord role: ${error}`);
    }
  };

  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="w-full px-8">
        <div className=" space-y-6">
          {/* Embedded Wallet Section */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Embedded Wallet
            </h2>
            {wallets?.map((wallet: EmbeddedWallet) => (
              <WalletCard key={wallet.id} wallet={wallet} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
