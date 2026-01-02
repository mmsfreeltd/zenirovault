// import UserTransactions from "@/components/user/common/user-transactions";
import ErrorBoundary from "@/components/user/ErrorBoundary";
import WithdrawalWrapper from "@/components/user/withdrawal/withdrawalWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Withdrawal",
};
export default async function UserWithdrawalPage() {
  return (
    <>
      <ErrorBoundary>
        {/* <UserTransactions /> */}
        <WithdrawalWrapper />
      </ErrorBoundary>
    </>
  );
}
