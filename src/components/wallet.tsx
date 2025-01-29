'use client';

import React from 'react';

import { userWalletPortfolio } from '@/hooks/user-wallet-protfolio';

import { FloatingWallet } from './floating-wallet';

export default function WalletComponent() {
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    refresh,
  } = userWalletPortfolio();

  console.log('kkkk data aayo', portfolio);
  return (
    <div className="z-20 mt-2 flex items-center justify-start gap-1 rounded-lg bg-[#27272a] p-1">
      {portfolio?.tokens && (
        <>
          <FloatingWallet data={portfolio} isLoading={isPortfolioLoading} />
        </>
      )}
    </div>
  );
}
