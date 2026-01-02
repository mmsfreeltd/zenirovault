import { DepositForm } from "@/components/user/DepositForm";
import ErrorBoundary from "@/components/user/ErrorBoundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Deposit",
};
export default async function UserDepositPage() {
  return (
    <>
      <ErrorBoundary>
        <DepositForm />
      </ErrorBoundary>
    </>
  );
}
