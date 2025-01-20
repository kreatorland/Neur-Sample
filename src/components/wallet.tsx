'use client';

import React from 'react';

import { useWalletPortfolio } from '@/hooks/use-wallet-portfolio';

import { FloatingWallet } from './floating-wallet';
import { ChangeFloatingWallet } from './different-wallet';
import { userWalletPortfolio } from '@/hooks/user-wallet-protfolio';
export default function WalletComponent() {
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    refresh,
  } = userWalletPortfolio();



  console.log("kkkk data aayo", portfolio)
  return (
    <div>
    
{
   portfolio?.tokens  &&(
    <>
    <FloatingWallet data={portfolio} isLoading={isPortfolioLoading} />
    </>
  ) 
}

      
    </div>
  );
}
