"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import FinancialTab from "./tabs/FinancialTab";
import CommunicationTab from "./tabs/CommunicationTab";
import TicketsTab from "./tabs/TicketsTab";
import DocumentsTab from "./tabs/DocumentsTab";
import { useUser } from "@/context/UserContext";
import {
  LayoutDashboard,
  DollarSign,
  Mail,
  TicketCheck,
  FileText,
  Loader2,
} from "lucide-react";

export default function UserDetailTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const { loading, client } = useUser();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  }

  if (!client) return null;

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 mb-6">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <LayoutDashboard className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="financial" className="flex items-center gap-2">
          <DollarSign className="h-4 w-4" />
          <span className="hidden sm:inline">Financial</span>
        </TabsTrigger>
        <TabsTrigger value="communication" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Communication</span>
        </TabsTrigger>
        <TabsTrigger value="tickets" className="flex items-center gap-2">
          <TicketCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Tickets</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Documents</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="overview"
        className="bg-card rounded-lg p-4 shadow animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
      >
        <OverviewTab />
      </TabsContent>

      <TabsContent
        value="financial"
        className="bg-card rounded-lg p-4 shadow animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
      >
        <FinancialTab />
      </TabsContent>

      <TabsContent
        value="communication"
        className="bg-card rounded-lg p-4 shadow animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
      >
        <CommunicationTab />
      </TabsContent>

      <TabsContent
        value="tickets"
        className="bg-card rounded-lg p-4 shadow animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
      >
        <TicketsTab userId={client.id} />
      </TabsContent>

      <TabsContent
        value="documents"
        className="bg-card rounded-lg p-4 shadow animate-in fade-in-50 data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0"
      >
        <DocumentsTab />
      </TabsContent>
    </Tabs>
  );
}
