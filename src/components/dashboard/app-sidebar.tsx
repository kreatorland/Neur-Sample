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
import { AppSidebarConversations } from './app-sidebar-conversations';
import { AppSidebarUser } from './app-sidebar-user';

const AppSidebarHeader = ({ open }: { open: boolean }) => {
  return (
    <SidebarHeader>
      <div
        className={`flex items-center  border-b-2 border-white  py-1.5 ${open ? 'justify-between' : 'justify-center'}`}
      >
        <span className="pl-2 text-lg font-medium tracking-tight group-data-[collapsible=icon]:hidden">
          <Brand />
        </span>
        <div className="ml-2 flex items-center gap-1.5">
          <NLogo></NLogo>
          {/* <ThemeToggle /> */}
          {/* <SidebarTrigger></SidebarTrigger> */}
          {/* <div className="flex items-center gap-1.5 group-data-[collapsible=icon]:hidden">
            {IS_BETA && (
              <span className="select-none rounded-md bg-primary/90 px-1.5 py-0.5 text-xs text-primary-foreground">
                BETA
              </span>
            )}
            <span className="select-none rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              {APP_VERSION}
            </span>
          </div> */}
        </div>
      </div>
    </SidebarHeader>
  );
};

const AppSidebarFooter = () => {
  return (
    <SidebarFooter>
      <AppSidebarUser />
    </SidebarFooter>
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
    segment: 'wallet',
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
    url: 'https://docs.neur.sh',
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
        {/* <div className="flex flex-col space-y-2 p-3 ">
          {ExploreItems.map((item) => (
            <div
              key={item.title}
              className=" flex items-center rounded-lg bg-[#27272A] p-2  hover:bg-[#3a3a3a]"
            >
              <Link
                className="flex items-center gap-2 pl-3 pr-2"
                href={item.url}
                target={item.external ? '_blank' : undefined}
              >
                <item.icon
                  style={{
                    height: '25px',
                    width: '25px',
                    marginLeft: '-4px',
                  }}
                />
                <span>{item.title}</span>
              </Link>
            </div>
          ))}
        </div> */}
        <SidebarGroup className=" pl-3 pr-2">
          <SidebarGroupContent>
            <SidebarMenu
              className={`space-y-2 ${open ? '' : 'flex items-center '}`}
            >
              {ExploreItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="rounded-lg bg-[#27272A]  p-1 hover:bg-[#fa8f8f]"
                >
                  <SidebarMenuButton
                    asChild
                    isActive={getIsActive(item.segment)}
                  >
                    <Link
                      className="color-white"
                      href={item.url}
                      target={item.external ? '_blank' : undefined}
                    >
                      <item.icon
                        style={{
                          height: '24px',
                          width: '24px',
                          marginLeft: '-4px',
                        }}
                        className="hover:text-[#fff]"
                      />
                      <span>{item.title}</span>
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
