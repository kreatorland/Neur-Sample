'use client';

import { Card, CardContent } from '@/components/ui/card';

import { useWalletPortfolio } from '@/hooks/use-wallet-portfolio';
import { WalletDetail } from './table';

export function TableComponent() {


  const {
    data: portfolio,
    isLoading: isPortfolioLoading,
    refresh,
  } = useWalletPortfolio();
  
  console.log("wallelt profolio", portfolio, isPortfolioLoading)

  
 
  return (
    <div className="flex flex-1 flex-col py-8">
      <div className="w-full ">
        <div className=" space-y-6">
          <Card className="w-full">
            <CardContent className="pt-6">
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
