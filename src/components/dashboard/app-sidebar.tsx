'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  ActivityIcon,
  BookOpen,
  BotIcon,
  Brain,
  DollarSignIcon,
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
import { APP_VERSION, IS_BETA } from '@/lib/constants';

import { Brand } from '../logo';
import NLogo from '../n-logo';
import { Card, CardContent } from '../ui/card';
import { AppSidebarConversations } from './app-sidebar-conversations';
import { AppSidebarUser } from './app-sidebar-user';

const AppSidebarHeader = ({ open }: { open: boolean }) => {
  return (
    <SidebarHeader>
      <div
        className={`border-b-1 flex h-[48px]  items-center border-[#5f5e5e]  py-1.5 ${open ? 'justify-between' : 'justify-center'}`}
      >
        <span className="pl-2 text-lg font-medium tracking-tight group-data-[collapsible=icon]:hidden">
          <Brand />
        </span>
        {!open && (
          <div className="ml-2 flex items-center gap-1.5">
            <NLogo></NLogo>
          </div>
        )}
      </div>
    </SidebarHeader>
  );
};

const AppSidebarFooter = () => {
  return (
    <div>
      {/* <Card>
        <CardContent>ss</CardContent>
      </Card> */}
      <SidebarFooter>
        <AppSidebarUser />
      </SidebarFooter>
    </div>
  );
};

const ExploreItems = [
  {
    title: 'Home',
    url: '/home',
    segment: 'home',
    icon: HomeIcon,
    external: false,
  },

  {
    title: 'Agents',
    url: '/agent',
    segment: 'agents',
    icon: ActivityIcon,
    external: false,
  },

  {
    title: 'Wallet',
    url: '/wallet',
    segment: 'Portfolio',
    icon: WalletIcon,
    external: false,
  },
  {
    title: 'Settings',
    url: '/setting',
    segment: 'setting',
    icon: SettingsIcon,
    external: false,
  },
  {
    title: 'Integration',
    url: '/integration',
    segment: 'integration',
    icon: Brain,
    external: false,
  },

  {
    title: 'Docs',
    url: 'https://docs.numble.ai/',
    segment: 'docs',
    icon: BookOpen,
    external: true,
  },
  {
    title: 'Support',
    url: '/memories',
    segment: 'support',
    icon: HeartHandshakeIcon,
    external: false,
  },
  // {
  //     title: "Agents",
  //     url: "/agents",
  //     segment: "agents",
  //     icon: Bot,
  //     external: false,
  // },
  // {
  //     title: "Automations",
  //     url: "/automations",
  //     segment: "automations",
  //     icon: Workflow,
  //     external: false,
  // }
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

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className=" fixed hidden h-screen bg-black md:flex"
      style={{ backgroundColor: 'black' }}
    >
      <AppSidebarHeader open={open} />
      <SidebarContent>
        <SidebarGroup className=" pl-3 pr-2">
          <SidebarGroupContent>
            <SidebarMenu
              className={`space-y-2 ${open ? '' : 'flex items-center '}`}
            >
              {ExploreItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className=" rounded-lg bg-[#27272A] p-1 hover:bg-white"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={getIsActive(item.segment)}
                    className="group"
                  >
                    <Link
                      className="text-white "
                      href={item.url}
                      target={item.external ? '_blank' : undefined}
                    >
                      <item.icon
                        style={{
                          height: '24px',
                          width: '24px',
                          marginLeft: '-4px',
                        }}
                        className="text-white group-hover:text-black"
                      />
                      <span className="text-white group-hover:text-black">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <AppSidebarConversations />
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
}
