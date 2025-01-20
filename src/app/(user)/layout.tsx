import { cookies } from 'next/headers';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { ThemeToggle } from '@/components/theme-toggle';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import WalletComponent from '@/components/wallet';
import { IS_BETA } from '@/lib/constants';
import { APP_VERSION } from '@/lib/constants';

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
              {/* <WalletComponent></WalletComponent> */}
            </div>
            {/* <div className="flex items-center gap-1.5">
              <ThemeToggle />

              <div className="flex items-center gap-1.5 group-data-[collapsible=icon]:hidden">
                {IS_BETA && (
                  <span className="select-none rounded-md bg-primary/90 px-1.5 py-0.5 text-xs text-primary-foreground">
                    BETA
                  </span>
                )}
                <span className="select-none rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
                  {APP_VERSION}
                </span>
              </div>
            </div> */}
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
