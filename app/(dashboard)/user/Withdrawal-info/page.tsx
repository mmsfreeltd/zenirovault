import UserTransactions from "@/components/user/common/user-transactions";
import ErrorBoundary from "@/components/user/ErrorBoundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Withdrawal Info",
};
export default async function UserHome() {
  return (
    <>
      <ErrorBoundary>
        <UserTransactions />
      </ErrorBoundary>
    </>
  );
}
