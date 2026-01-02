import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { FlashAlert } from '@/components/common/FlashAlertServer';
import NextTopLoader from 'nextjs-toploader';
import { Metadata } from 'next';
import { AuthUserProvider } from '@/context/AuthUserContext';
import { getSession, userSessionKey } from '@/server/lib/auth';
export const iframeHeight = '800px';

export const metadata: Metadata = { title: 'User Portal' };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getSession(userSessionKey);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <NextTopLoader />
      <AuthUserProvider userId={String(auth?.auth_account?.id)}>
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <FlashAlert />
              <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </AuthUserProvider>
    </div>
  );
}
