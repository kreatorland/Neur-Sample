'use client';

import React from 'react';

import { useWalletPortfolio } from '@/hooks/use-wallet-portfolio';

import { FloatingWallet } from './floating-wallet';
import { ChangeFloatingWallet } from './different-wallet';
export default function WalletComponent() {
  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    refresh,
  } = useWalletPortfolio();

  console.log("kkkk data aayo", portfolio)
  return (
    <div>
    


      {
      
                        portfolio?.tokens  && portfolio.address  ? (
                          <>
                          <FloatingWallet data={portfolio} isLoading={isPortfolioLoading} />
                          </>
                        ) : (
                          <>
                           <ChangeFloatingWallet
                            data={portfolio}
                        ></ChangeFloatingWallet>
                          </>
                        )
      
                      }
    </div>
  );
}
