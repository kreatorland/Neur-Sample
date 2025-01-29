'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import {
  ActivityIcon,
  BookOpen,
  BotIcon,
  Brain,
  DollarSignIcon,
  FilePenLine,
  HeartHandshakeIcon,
  HomeIcon,
  SettingsIcon,
  WalletIcon,
} from 'lucide-react';

import { ThemeToggle } from '@/components/theme-toggle';
import {
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { APP_VERSION, IS_BETA } from '@/lib/constants';

import { Brand } from '../logo';
import NLogo from '../n-logo';
import { Input } from '../ui/input';
import WalletComponent from '../wallet';
import { AppSidebarConversations } from './app-sidebar-conversations';
import { AppSidebarUser } from './app-sidebar-user';

const AppSidebarHeader = ({ open }: { open: boolean }) => {
  return (
    <SidebarHeader>
      <div
        className={`border-b-1 flex h-[48px] items-center  rounded-lg bg-[#1f1f1f] py-1.5  pl-[10px] ${open ? 'justify-between' : 'justify-center'}`}
      >
        <div className="flex items-center gap-2">
          <NLogo></NLogo>
          {open && <h2>Numble</h2>}
        </div>

        {/* <Tooltip>
          <TooltipTrigger asChild>
            <span className="pl-2 text-lg font-medium tracking-tight group-data-[collapsible=icon]:hidden">
              <SidebarTrigger></SidebarTrigger>
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close sidebar</p>
          </TooltipContent>
        </Tooltip>

        {open && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/home">
                <div className="rounded-md bg-[#444444] p-1">
                  <FilePenLine className="h-4 w-4"></FilePenLine>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>New message</p>
            </TooltipContent>
          </Tooltip>
        )} */}
      </div>
    </SidebarHeader>
  );
};

const ExploreItems = [
  {
    title: 'New Chat',
    url: '/home',
    segment: 'home',
    icon: FilePenLine,
    external: false,
  },

  // {
  //   title: 'Agents',
  //   url: '/agent',
  //   segment: 'agents',
  //   icon: ActivityIcon,
  //   external: false,
  // },

  {
    title: 'Wallet',
    url: '/wallet',
    segment: 'Portfolio',
    icon: WalletIcon,
    external: false,
  },

  // {
  //   title: 'Integration',
  //   url: '/integration',
  //   segment: 'integration',
  //   icon: Brain,
  //   external: false,
  // },

  // {
  //   title: 'Docs',
  //   url: 'https://docs.numble.ai/',
  //   segment: 'docs',
  //   icon: BookOpen,
  //   external: true,
  // },

  {
    title: 'Settings',
    url: '/setting',
    segment: 'setting',
    icon: SettingsIcon,
    external: false,
  },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();
  console.log('open', open);
  const getIsActive = (itemSegment: string) => {
    if (itemSegment === 'home') {
      return pathname === '/home';
    }
    return pathname.startsWith(`/${itemSegment}`);
  };

  function AppSearchBar() {
    return (
      <div className="mt-1 flex items-center justify-start gap-1 rounded-lg bg-primary/5 p-1">
        <MagnifyingGlassIcon
          className="h-6 w-6"
          color="white"
        ></MagnifyingGlassIcon>
        <Input
          placeholder="Search"
          className="border-none bg-primary/5 focus-visible:ring-0 "
        ></Input>
      </div>
    );
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className=" fixed left-5 top-5 hidden h-[95vh]  rounded-md md:flex"
      style={{ backgroundColor: 'black' }}
    >
      <AppSidebarHeader open={open} />
      <SidebarContent className="mt-2 rounded-lg bg-[#1f1f1f]">
        <SidebarGroup className=" pl-3 pr-2">
          <AppSearchBar></AppSearchBar>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu
              className={`mt-3 space-y-2 ${open ? '' : 'flex items-center '}`}
            >
              {ExploreItems.map((item, index) => (
                <SidebarMenuItem
                  key={item.title}
                  className=" rounded-lg  bg-[#fff] pl-2"
                >
                  <div className="sidebarMenuItem rounded-lg  bg-primary/5 p-1">
                    <SidebarMenuButton
                      asChild
                      isActive={getIsActive(item.segment)}
                      className="group rounded-lg"
                    >
                      <Link
                        href={item.url}
                        target={item.external ? '_blank' : undefined}
                      >
                        <item.icon
                          style={{
                            height: '24px',
                            width: '24px',
                            marginLeft: '-4px',
                          }}
                          className="iconImage "
                        />
                        <span className="span_text">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <AppSidebarConversations />
      </SidebarContent>
      <SidebarFooter>
        <WalletComponent></WalletComponent>
      </SidebarFooter>
    </Sidebar>
  );
}
