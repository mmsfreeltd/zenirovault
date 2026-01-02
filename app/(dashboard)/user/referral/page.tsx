import ErrorBoundary from "@/components/user/ErrorBoundary";
import { ReferralInfo } from "@/components/user/ReferralInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referrals Info",
};
export default function Subscription() {
  return (
    <ErrorBoundary>
      <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
      <ReferralInfo />
    </ErrorBoundary>
  );
}
