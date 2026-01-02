// app/api/admin/plan/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { plans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  // 1. Guard to admin only
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  // 2. Parse & validate plan ID
  const planId = parseInt(id, 10);
  if (Number.isNaN(planId)) {
    return NextResponse.json({ error: "Invalid plan ID" }, { status: 400 });
  }

  // 3. Fetch the plan
  const plan = await db.query.plans.findFirst({
    where: eq(plans.id, planId),
    columns: {
      id: true,
      plan_name: true,
      plan_roi: true,
      plan_min_deposit: true,
      plan_max_deposit: true,
      min_return: true,
      max_return: true,
      gift_bonus: true,
      plan_interval: true,
      topup_type: true,
      topup_amount: true,
      investment_duration: true,
      plan_description: true,
    },
  });

  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  // 4. Return it
  return NextResponse.json(plan);
}
