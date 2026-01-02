// app/admin/user/[id]/page.tsx
import { notFound } from "next/navigation";
import { requireSession } from "@/server/lib/secure";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import UserProfileHeader from "@/components/admin/users/UserProfileHeader";
import UserDetailTabs from "@/components/admin/users/UserDetailTabs";
import UserQuickActions from "@/components/admin/users/UserQuickActions";
import { UserProvider } from "@/context/UserContext";

interface Props {
  params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function UserPage(props: Props) {
  await requireSession("admin");
  const params = await props.params;

  const id = parseInt(params.id, 10);
  if (Number.isNaN(id)) notFound();
  const user = await db.query.clients.findFirst({
    where: eq(clients.id, id),
  });
  if (!user) notFound();

  return (
    <div className="p-6 space-y-6">
      <UserProvider userId={String(id)}>
        <div className="container mx-auto p-4 md:p-6 space-y-6">
          <UserProfileHeader />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <UserDetailTabs />
            </div>
            <div className="lg:col-span-1">
              <UserQuickActions />
            </div>
          </div>
        </div>
      </UserProvider>
    </div>
  );
}
