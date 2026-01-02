"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientType } from "@/types";
import { useUser } from "@/context/UserContext";

export function AccountManagerEditor({ client }: { client: ClientType }) {
  const [manager, setManager] = useState(client.account_manager || "");
  const [email, setEmail] = useState(client.account_manager_email || "");
  const { updateClient } = useUser();
  const handleUpdate = async () => {
    if (!manager.trim() || !email.trim()) {
      toast.error("Please provide both name and email");
      return;
    }

    updateClient({
      id: client.id,
      account_manager: manager,
      account_manager_email: email,
    });

    toast.success("Account manager updated successfully");
  };

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <label className="text-sm font-medium">Account Manager</label>
      <Input
        placeholder="Manager's full name"
        value={manager}
        onChange={(e) => setManager(e.target.value)}
      />

      <label className="text-sm font-medium">Manager Email</label>
      <Input
        type="email"
        placeholder="Manager's email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        variant="default"
        size="sm"
        className="mt-2 w-full justify-start gap-2"
        onClick={handleUpdate}
      >
        <UserCog className="h-4 w-4 " />
        Update Manager
      </Button>
    </div>
  );
}
