'use client';

import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  Copy,
  CopyCheckIcon,
  ExternalLink,
  LogOutIcon,
  PlusIcon,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { toast } from 'react-toastify';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
// import { Toaster } from '@/components/ui/toaster';
import { useUser } from '@/hooks/use-user';
// import { useToast } from '@/hooks/use-wallets';
import { formatNumber } from '@/lib/format';
import { cn } from '@/lib/utils';
import { WalletPortfolio as Portfolio } from '@/types/helius/portfolio';

interface FloatingWalletProps {
  data: Portfolio;
  className?: string;
  isLoading?: boolean;
}

export function FloatingWallet({
  data,
  className,
  isLoading = false,
}: FloatingWalletProps) {
  console.log('floationg wallet dataa', data);
  const { isLoading: loading, user, logout } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);

    toast.success('Address copied to clipboard');
  };

  useEffect(() => {
    setMounted(true);
    // Preload all token images
    if (data.tokens?.length > 0) {
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
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className="flex w-full items-center justify-around rounded-md bg-[#1bea2c] p-2"
          >
            {/* <Wallet className="h-4 w-4 text-black" style={{ color: 'black' }} /> */}

            <span className="max-w-[120px] truncate text-sm text-black">
              {data?.address?.slice(0, 6)}...{data?.address?.slice(-6)}
            </span>
            <Button className="flex h-6 w-6 items-center justify-center bg-[#fff] p-0">
              <PlusIcon color="black"></PlusIcon>
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] bg-black p-1">
          <div className="flex flex-col gap-1 p-1">
            <div className="flex cursor-pointer items-center gap-1 text-white">
              <Wallet
                className="h-4 w-4 text-white"
                style={{ color: 'white' }}
              />
              <p className="text-sm font-medium text-white">
                ${formatNumber(data.totalBalance, 'currency')}
              </p>
            </div>
            <div className="border-t-2"></div>
            <div
              className="hover:bg-grey flex cursor-pointer items-center justify-between"
              onClick={() => handleCopy(data.address)}
            >
              <p className="max-w-[120px] truncate text-sm text-white">
                {data?.address.slice(0, 4)}...{data.address.slice(-4)}
              </p>
              {isCopied ? (
                <CopyCheckIcon className="h-3.5 w-3.5 text-white" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-white" />
              )}
            </div>

            <div className="border-t-2"></div>

            <div
              onClick={logout}
              className="flex cursor-pointer items-center gap-1 text-white"
            >
              <LogOutIcon className="h-3.5 w-3.5"></LogOutIcon>
              <p className="text-sm">Log out</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
