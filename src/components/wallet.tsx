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
  } = useWalletPortfolio();

  const {
    data: newData,
    isLoading: isLoading,
    refresh:re,
  } = userWalletPortfolio();

  console.log("kkkk data aayo", portfolio,newData)
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
