"use client";

import { Badge } from "@/components/ui/badge";
import { AccountStatusType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UserStatusComponent({
  status_id,
}: {
  status_id?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [accountStatus, setAccountStatus] = useState<string | null>(null);

  const getAccountStatusName = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`/api/admin/statuses/${status_id}`);
      const status: AccountStatusType = res.data;
      setAccountStatus(status.status_text as string);
    } catch {
      setAccountStatus("Unknown");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccountStatusName();
  }, []);

  switch (Number(status_id)) {
    case 1:
      return (
        <Badge variant="default" className="bg-green-500">
          Active
        </Badge>
      );
    case 7:
      return (
        <Badge variant="outline" className="text-amber-500 border-amber-500">
          isSuspended
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary">
          {isLoading ? "checking..." : accountStatus}
        </Badge>
      );
  }
}
