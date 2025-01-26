import { cookies } from 'next/headers';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import WalletComponent from '@/components/wallet';

export const DEEPSEEK_API_KEY = 'sk-b703e705496345978edf916ae40046a3';
export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value !== 'false';

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <div className="flex w-full gap-x-2">
        <div className="relative h-screen ">
          <AppSidebar />
        </div>
        {/* <AppSidebar /> */}
        <main className="w-full flex-1">
          <div className="border-b-1 sticky top-0 z-10 flex h-[55px] items-center justify-between space-x-1  border-[#5f5e5e]  py-1.5">
            <SidebarTrigger />

            <div>
              <WalletComponent></WalletComponent>
            </div>
          </div>

          {/* <Banner>$NEUR is now live on Raydium 🎉</Banner> */}
          <div>{children}</div>
          <ToastContainer
            position="top-center"
            hideProgressBar={true}
            toastClassName="custom-toast"
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
