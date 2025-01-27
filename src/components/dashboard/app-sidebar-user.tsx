'use client';

import Link from 'next/link';

import { RiDiscordFill, RiTwitterXFill } from '@remixicon/react';
import {
  BookOpen,
  BookOpenIcon,
  ChevronsUpDown,
  HelpCircle,
  SendIcon,
  Settings,
} from 'lucide-react';

import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { useUser } from '@/hooks/use-user';

export const AppSidebarUser = () => {
  const { open } = useSidebar();
  return (
    <div
      className={` items-center justify-around ${open ? 'flex' : 'flex flex-col gap-1'}`}
    >
      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <a href="Twitter url: https://x.com/NumbleAI" target="_blank">
          <RiTwitterXFill className=" h-6 w-6" />
        </a>
      </div>
      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <a href="https://t.me/numble_ai" target="_blank">
          <SendIcon className="h-6 w-6" />
        </a>
      </div>
      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <a href="https://discord.gg/9MN5bjBF" target="_blank">
          <RiDiscordFill className="h-6 w-6" />
        </a>
      </div>

      <div className="flex justify-center rounded-md bg-[#302f2f] p-2">
        <a href="https://docs.numble.ai/" target="_blank">
          <BookOpenIcon className=" h-6 w-6" />
        </a>
      </div>
    </div>
  );
};
