import CopiedExpertsList from "@/components/user/copy-trading/CopiedExpertsList";
import ErrorBoundary from "@/components/user/ErrorBoundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Trades",
};
export default function Subscription() {
  return (
    <ErrorBoundary>
      <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
      <CopiedExpertsList />
    </ErrorBoundary>
  );
}
