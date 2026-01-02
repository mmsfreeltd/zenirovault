/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Home, Newspaper, Settings2, Signal, User, User2 } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SITE_URL } from "@/global/constants";

const data = {
  user: {
    name: "admin",
    email: "admin@" + SITE_URL,
    avatar: "/images/profile.jpg",
  },
  navMain: [
    {
      title: "Clients",
      url: "/admin",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "View/Modify Client",
          url: "/admin",
        },
        {
          title: "Add Investment/Deposit",
          url: "/admin/investment",
        },
        { title: "Trade Profit/Loss", url: "/admin/trade" },
        { title: "View Client Info", url: "/admin/modify" },
        { title: "Add Withdrawal Bill", url: "/admin/withdrawal-bill" },
        { title: "Add Outstanding Bill", url: "/admin/outstanding-bill" },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/admin/profile" },
        { title: "Funding address", url: "/admin/funding-address" },
        { title: "Admin Banks", url: "/admin/admin-banks" },
        { title: "Upgrade Plan", url: "/admin/upgrade-plan" },
      ],
    },
    {
      title: "Loan",
      url: "/admin/loans",
      icon: Newspaper,
    },
    {
      title: "Trades",
      url: "#",
      icon: Signal,
      items: [
        {
          title: "Copy Traders",
          url: "/admin/copy-traders",
        },
        {
          title: "Simulation Trading",
          url: "/admin/simulations",
        },
        {
          title: "View Pending Expert Sub",
          url: "/admin/copy-traders/pending",
        },
        { title: "Transactions", url: "/admin/transactions" },
      ],
    },
    { title: "Testimonies", url: "/admin/testimonies", icon: User2 },
  ],
};

export function AppAdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <User className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Admin Portal</span>
                  <span className="truncate text-xs">Super User</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user as any} />
      </SidebarFooter>
    </Sidebar>
  );
}
