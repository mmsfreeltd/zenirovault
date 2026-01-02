"use client";
import PageLoadingSpinner from "@/components/common/loading-spinner";
import ErrorBoundary from "@/components/user/ErrorBoundary";
import { LiveTradeForm } from "@/components/user/simulations/live-trading/LiveTradeForm";
import { useUser } from "@/context/AuthUserContext";

export default function LiveTradingWrapper() {
  const { client } = useUser();

  if (!client) return <PageLoadingSpinner />;
  return (
    <ErrorBoundary>
      <LiveTradeForm userId={String(client?.id)} />
    </ErrorBoundary>
  );
}
