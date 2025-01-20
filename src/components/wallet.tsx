'use client';

import React from 'react';

import { useWalletPortfolio } from '@/hooks/use-wallet-portfolio';

import { FloatingWallet } from './floating-wallet';

export default function WalletComponent() {
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    refresh,
  } = useWalletPortfolio();

  console.log("kkkk data aayo", portfolio)
  return (
    <div>
      {portfolio && (
        <FloatingWallet data={portfolio} isLoading={isPortfolioLoading} />
      )}
    </div>
  );
}
