// app/admin/upgrade-plan/page.tsx
import { NextResponse } from "next/server";
import dynamic from "next/dynamic";
import { db } from "@/db";
import { requireSession } from "@/server/lib/secure";
import { PlanType } from "@/types";

const AddUpgradePlanModal = dynamic(
  () => import("@/components/admin/upgrade-plan/add-upgrade-plan-modal")
);
const PlanTable = dynamic(
  () => import("@/components/admin/upgrade-plan/plan-table")
);

export const revalidate = 0;

export default async function UpgradePlanPage() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  let list: PlanType[];
  try {
    list = await db.query.plans.findMany();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error("Failed to load plans: " + e.message);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upgrade Plans</h1>
      <div className="mb-4">
        <AddUpgradePlanModal />
      </div>
      <PlanTable data={list} />
    </div>
  );
}
