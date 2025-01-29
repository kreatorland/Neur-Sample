'use client';

import React from 'react';

import Link from 'next/link';

import { FilePenLine } from 'lucide-react';

import Brand from '@/components/logo';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function HeaderPart() {
  const { open } = useSidebar();
  return (
    <div className="flex items-center gap-2">
      {/* {!open && (
        <>
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger />
            </TooltipTrigger>
            <TooltipContent>
              <p>Open sidebar</p>
            </TooltipContent>
          </Tooltip>
        </>
      )} */}
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent>
          <p>Open sidebar</p>
        </TooltipContent>
      </Tooltip>
      {/* <Brand></Brand> */}
    </div>
  );
}
