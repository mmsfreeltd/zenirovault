// app/admin/withdraw-bill/page.tsx
import { NextResponse } from "next/server";
import dynamic from "next/dynamic";
import { db } from "@/db";
import { transfer_codes, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { WithdrawBillDisplayType } from "@/types";

const AddWithdrawBillModal = dynamic(
  () => import("@/components/admin/withdraw-bill/add-withdraw-bill-modal")
);
const WithdrawBillTable = dynamic(
  () => import("@/components/admin/withdraw-bill/withdraw-bill-table")
);

export const revalidate = 0;

export default async function WithdrawBillPage() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let list: Array<any>;

  try {
    list = await db
      .select({
        id: transfer_codes.id,
        user_id: transfer_codes.user_id,
        code: transfer_codes.code,
        status: transfer_codes.status,
        code_name: transfer_codes.code_name,
        code_message: transfer_codes.code_message,
        client_email: clients.email,
      })
      .from(transfer_codes)
      .leftJoin(clients, eq(transfer_codes.user_id, clients.id))
      .execute();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error("Failed to load withdraw bills: " + e.message);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Withdraw Bills</h1>
      <div className="mb-4">
        <AddWithdrawBillModal />
      </div>
      <WithdrawBillTable data={list as WithdrawBillDisplayType[]} />
    </div>
  );
}
