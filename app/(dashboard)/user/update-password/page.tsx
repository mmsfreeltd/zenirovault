import { ChangePasswordCard } from "@/components/user/ChangePasswordCard";
import ErrorBoundary from "@/components/user/ErrorBoundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Your Password",
};
export default function Subscription() {
  return (
    <ErrorBoundary>
      <ChangePasswordCard />
    </ErrorBoundary>
  );
}
