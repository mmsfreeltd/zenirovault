// app/admin/admin-banks/page.tsx
import { NextResponse } from "next/server";
import { db } from "@/db";
import { requireSession } from "@/server/lib/secure";
import dynamic from "next/dynamic";

const AddAdminBankModal = dynamic(
  () => import("@/components/admin/admin-banks/add-admin-bank-modal")
);
const AdminBankTable = dynamic(
  () => import("@/components/admin/admin-banks/admin-bank-table")
);

export const revalidate = 0;

export default async function AdminBanksPage() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  let list;
  try {
    list = await db.query.admin_banks.findMany();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error("Failed to load banks: " + err.message);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Banks</h1>
      <div className="mb-4">
        <AddAdminBankModal />
      </div>
      <AdminBankTable data={list} />
    </div>
  );
}
