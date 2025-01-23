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
    <div>
      {portfolio?.tokens && (
        <>
          <FloatingWallet data={portfolio} isLoading={isPortfolioLoading} />
        </>
      )}
    </div>
  );
}
