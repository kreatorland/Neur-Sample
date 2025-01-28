'use client';

import Link from 'next/link';

import { RiDiscordFill, RiTwitterXFill } from '@remixicon/react';
import { BookOpenIcon, SendIcon } from 'lucide-react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const AppSidebarUser = () => {
  return (
    <div
      className={`flex h-full w-16 flex-col items-center justify-around rounded-md bg-[#1f1f1f] text-white`}
      style={{
        position: 'fixed',
        right: '5px',
        top: '31%',
        height: '270px',
        zIndex: '1000',
      }}
    >
      {/* Twitter */}
      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://x.com/NumbleAI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiTwitterXFill className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            <p>Follow us on Twitter</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* Telegram */}
      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://t.me/numble_ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SendIcon className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            <p>Join us on Telegram</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* Discord */}
      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://discord.gg/9MN5bjBF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiDiscordFill className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            <p>Join our Discord</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* Documentation */}
      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href="https://docs.numble.ai/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BookOpenIcon className="h-5 w-5" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            <p>Read our Docs</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
