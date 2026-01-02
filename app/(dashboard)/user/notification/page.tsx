import ErrorBoundary from "@/components/user/ErrorBoundary";
import { UserNotificationsTable } from "@/components/user/UserNotificationsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Notifications",
};
export default async function UserNotificationPage() {
  return (
    <>
      <ErrorBoundary>
        <UserNotificationsTable />
      </ErrorBoundary>
    </>
  );
}
