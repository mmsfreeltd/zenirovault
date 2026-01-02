// import UserTransactions from "@/components/user/common/user-transactions";
import UserTransactionRefresh from "@/components/user/common/user-transactions-refresh";
import ErrorBoundary from "@/components/user/ErrorBoundary";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Transactions",
};
export default async function UserHome() {
  return (
    <>
      <ErrorBoundary>
        {/* <UserTransactions /> */}
        <UserTransactionRefresh />
      </ErrorBoundary>
    </>
  );
}
