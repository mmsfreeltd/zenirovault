"use client";

import PageLoadingSpinner from "@/components/common/loading-spinner";
import { useUser } from "@/context/AuthUserContext";
import { WithdrawForm } from "@/components/user/WithdrawForm";
export default function WithdrawalWrapper() {
  const { client } = useUser();

  if (!client) {
    return <PageLoadingSpinner />;
  }

  return <WithdrawForm userId={String(client.id)} />;
}
