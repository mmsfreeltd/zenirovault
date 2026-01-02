"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientType } from "@/types";
import { useUser } from "@/context/UserContext";

export function AccountLimitEditor({ client }: { client: ClientType }) {
  const [limit, setLimit] = useState(client.account_limit || "");
  const { updateClient } = useUser();
  const handleUpdate = () => {
    if (!limit) {
      toast.error("Please enter a valid account limit");
      return;
    }
    updateClient({ id: client.id, account_limit: limit });
    toast.success("Account limit updated successfully");
  };

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <label htmlFor="account_limit" className="text-sm font-medium">
        Account Limit
      </label>
      <Input
        id="account_limit"
        type="number"
        placeholder="Enter new limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
      />
      <Button
        variant="default"
        size="sm"
        className="w-full justify-start gap-2"
        onClick={handleUpdate}
      >
        <Wallet className="h-4 w-4 " />
        Update Limit
      </Button>
    </div>
  );
}
