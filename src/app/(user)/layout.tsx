import { cookies } from 'next/headers';

import { FilePenLine } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { AppSidebarUser } from '@/components/dashboard/app-sidebar-user';
import { Brand } from '@/components/logo';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useSidebar } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import WalletComponent from '@/components/wallet';

import HeaderPart from './header';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value !== 'false';
  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <div className="bg-grey-900 flex w-full gap-x-2 p-5">
          <AppSidebar />
          <main className="w-full flex-1">
            <div className="border-b-1 sticky top-5 z-10 flex h-[55px] items-center justify-between space-x-1  border-[#5f5e5e]  py-1.5">
              <HeaderPart></HeaderPart>

              {/* <div>
                <WalletComponent></WalletComponent>
              </div> */}
            </div>
            <AppSidebarUser></AppSidebarUser>

            <div>{children}</div>
            <ToastContainer
              position="top-center"
              hideProgressBar={true}
              toastClassName="custom-toast"
            />
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
