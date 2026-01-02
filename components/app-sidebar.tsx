"use client";
import {
  ArrowRightSquareIcon,
  Contact,
  FunctionSquare,
  Home,
  PiggyBank,
  Recycle,
  Settings2,
  Signal,
  SignalHigh,
  User,
} from "lucide-react";
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
import { useUser } from "@/context/AuthUserContext";
import UserStatusComponent from "./user/common/userStatusComponent";
import { AccountSummary } from "./user/common/SummaryCard";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/user",
      icon: Home,
      isActive: true,
    },
    {
      title: "Accounts",
      url: "#",
      icon: User,
      items: [
        {
          title: "Withdrawal Info",
          url: "/user/Withdrawal-info",
        },
        {
          title: "Deposit",
          url: "/user/deposit",
        },
        {
          title: "Upload Payment Proof",
          url: "/user/prove",
        },
        {
          title: "View Payments",
          url: "/user/prove/all",
        },
        {
          title: "Notifications",
          url: "/user/notification",
        },
      ],
    },
    {
      title: "Trading",
      url: "#",
      icon: SignalHigh,
      items: [
        {
          title: "Live Trading",
          url: "/user/live-trading",
        },
        {
          title: "Demo Trading",
          url: "/user/simulations",
        },
        {
          title: "Copy Trading",
          url: "/user/copy-trading",
        },
      ],
    },
    {
      title: "Loan",
      url: "/user/loans",
      icon: PiggyBank,
    },

    {
      title: "Support",
      url: "#",
      icon: Contact,
    },

    {
      title: "Transaction History",
      url: "/user/transactions",
      icon: Signal,
    },
    {
      title: "Withdraw Fund",
      url: "/user/Withdrawal-info",
      icon: ArrowRightSquareIcon,
    },
    {
      title: "Subscription Trade",
      url: "/user/subscription",
      icon: Settings2,
    },
    {
      title: "Packages",
      url: "#",
      icon: FunctionSquare,
      items: [{ title: "Investment Plan", url: "/user/plans" }],
    },
    {
      title: "Referral and Earn",
      url: "/user/referral",
      icon: Recycle,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { client } = useUser();
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
                  <span className="truncate font-medium uppercase">
                    {client?.username}
                  </span>
                  <span className="truncate text-xs">
                    {client && (
                      <UserStatusComponent
                        status_id={client?.status as string}
                      />
                    )}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <AccountSummary
              planName={client?.accountType as string}
              currency={client?.currency || "USD"}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={client} />
      </SidebarFooter>
    </Sidebar>
  );
}
