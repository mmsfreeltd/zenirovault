import { AdminHeader } from "@/components/admin/admin-header";
import { AppAdminSidebar } from "@/components/admin/admin-sidebar";
import { FlashAlert } from "@/components/common/FlashAlertServer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Admin Portal" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <AdminHeader />
        <div className="flex flex-1">
          <AppAdminSidebar />
          <SidebarInset>
            <FlashAlert />
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
