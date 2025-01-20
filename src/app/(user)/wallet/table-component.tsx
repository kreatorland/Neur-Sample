'use client';

import { useEffect, useState } from 'react';

// import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ExternalLink, TrendingUp, Wallet } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';
import { WalletPortfolio as Portfolio } from '@/types/helius/portfolio';

interface FloatingWalletProps {
  data: Portfolio;
  className?: string;
  isLoading?: boolean;
}

export function FungableWalletDetail({
  data
 
}: any) {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Preload all token images
    if (data.tokens.length > 0) {
      Promise.all(
        data.fungibleTokens.map((token:any) => {
            if (!token.content.links.image) return Promise.resolve();
          return new Promise((resolve) => {
            const img = new Image();
            img.src = token.content.links.image;
            img.onload = resolve;
            img.onerror = resolve;
          });
        }),
      ).then(() => setImagesLoaded(true));
    } else {
      setImagesLoaded(true);
    }
  }, [data.tokens]);

  if (!mounted || !imagesLoaded) return null;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-lg font-medium">Currency</TableHead>
          <TableHead className="text-lg font-medium">Balance</TableHead>
          <TableHead className="text-lg font-medium">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        
        {data?.fungibleTokens.length > 0 ? (
          <>
            {data.fungibleTokens.map((token:any, index:any) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Avatar className="h-8 w-8 shrink-0 rounded-lg bg-background">
                      {/* <AvatarImage
                        src={token.content.links.image}
                        alt={token.name}
                        className="object-cover transition-transform duration-150 group-hover:scale-105"
                      /> */}
                      {/* <AvatarFallback className="rounded-lg text-xs">
                        {token.symbol.slice(0, 2)}
                      </AvatarFallback> */}
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="line text-md font-bold">{token.content.metadata.name}</p>
                      <p className="mt-[-4px] text-[10px] font-semibold">
                        {token.token_info.symbol}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-md md:text-md font-medium">
                    {token?.token_info.balance / 1000000000 || 0}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-md md:text-md font-medium">
                  
                   
                     {token?.token_info.price_info.total_price.toFixed(2) || 0}
                    
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <p className="text-md font-medium">No Tokens</p>
            </div>
          </>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {/* ${parseFloat(data.totalBalance.toFixed(2))} */}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
