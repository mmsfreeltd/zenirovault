// app/admin/outstanding-bill/page.tsx
import { NextResponse } from "next/server";
import dynamic from "next/dynamic";
import { db } from "@/db";
import { outstanding_fees, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { OutstandingBillDisplay } from "@/types";

const AddOutstandingBillModal = dynamic(
  () => import("@/components/admin/outstanding-bill/add-outstanding-bill-modal")
);
const OutstandingBillTable = dynamic(
  () => import("@/components/admin/outstanding-bill/outstanding-bill-table")
);

export const revalidate = 0;

export default async function OutstandingBillPage() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let list: Array<any>;

  try {
    list = await db
      .select({
        id: outstanding_fees.id,
        user_id: outstanding_fees.user_id,
        fee_name: outstanding_fees.fee_name,
        fee_amount: outstanding_fees.fee_amount,
        fee_desc: outstanding_fees.fee_desc,
        fee_status: outstanding_fees.fee_status,
        client_email: clients.email,
      })
      .from(outstanding_fees)
      .leftJoin(clients, eq(outstanding_fees.user_id, clients.id))
      .execute();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error("Failed to load outstanding bills: " + e.message);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Outstanding Bills</h1>
      <div className="mb-4">
        <AddOutstandingBillModal />
      </div>
      <OutstandingBillTable data={list as OutstandingBillDisplay[]} />
    </div>
  );
}
