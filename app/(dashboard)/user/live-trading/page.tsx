import ErrorBoundary from "@/components/user/ErrorBoundary";
import UserTransactions from "@/components/user/common/user-transactions";
import { AdvancedRealTimeChart } from "@/components/common/trading-widget";

import LiveTradingWrapper from "@/components/user/simulations/live-trading/LiveTradingWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Trading",
};
export default function Subscription() {
  return (
    <ErrorBoundary>
      <div className="h-96">
        <AdvancedRealTimeChart autosize />
      </div>
      <LiveTradingWrapper />
      <UserTransactions />
    </ErrorBoundary>
  );
}
