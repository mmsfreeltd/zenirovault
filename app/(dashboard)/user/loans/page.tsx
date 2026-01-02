import ErrorBoundary from "@/components/user/ErrorBoundary";
import { LoanRequestForm } from "@/components/user/LoanRequestForm";
import { UserLoansTable } from "@/components/user/UserLoansTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Loan",
};
export default async function UserNotificationPage() {
  return (
    <>
      <ErrorBoundary>
        <LoanRequestForm />
        <UserLoansTable />
      </ErrorBoundary>
    </>
  );
}
