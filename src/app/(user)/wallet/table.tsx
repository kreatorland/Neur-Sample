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

export function WalletDetail({
  data,
  className,
  isLoading = false,
}: FloatingWalletProps) {
  console.log('profolio data', data);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Preload all token images
    if (data.tokens.length > 0) {
      Promise.all(
        data.tokens.map((token) => {
          if (!token.imageUrl) return Promise.resolve();
          return new Promise((resolve) => {
            const img = new Image();
            img.src = token.imageUrl;
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
        {data?.tokens.length > 1 ? (
          <>
            {data.tokens.map((token, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Avatar className="h-8 w-8 shrink-0 rounded-lg bg-background">
                      <AvatarImage
                        src={token.imageUrl}
                        alt={token.name}
                        className="object-cover transition-transform duration-150 group-hover:scale-105"
                      />
                      <AvatarFallback className="rounded-lg text-xs">
                        {token.symbol.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p className="line text-lg font-bold">{token.name}</p>
                      <p className="text-sm font-semibold">{token.symbol}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-md font-medium md:text-lg">
                    {token.balance}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-md font-medium md:text-lg">
                    {/* {token.balance * token.pricePerToken} */}
                    {parseFloat(
                      (token.balance * token.pricePerToken).toFixed(2),
                    )}
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
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">${data.totalBalance}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
