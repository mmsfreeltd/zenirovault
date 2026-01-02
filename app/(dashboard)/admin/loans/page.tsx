// app/admin/loans/page.tsx
import { db } from "@/db";
import { loans, clients } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { AdminLoanTable } from "@/components/admin/loans/AdminLoanTable";
import { requireSessionPage } from "@/server/lib/secure/pageSecure";

export const revalidate = 0;

export default async function AdminLoansPage() {
await requireSessionPage("admin");

  const all = await db
    .select({
      id: loans.id,
      user_id: clients.id,
      user_email: clients.email,
      amount_requested: loans.amount_requested,
      amount_approved: loans.amount_approved,
      status: loans.status,
      date_requested: loans.date_requested,
      date_updated: loans.date_updated,
    })
    .from(loans)
    .leftJoin(clients, eq(loans.user_id, clients.id))
    .orderBy(sql`${loans.date_requested} DESC`)
    .execute();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <AdminLoanTable data={all as any} />;
}
