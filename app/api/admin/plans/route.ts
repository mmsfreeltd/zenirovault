// app/api/admin/plan/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { requireSession } from "@/server/lib/secure";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  // Protect route
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  try {
    // Fetch all plans
    const allPlans = await db.query.plans.findMany({
      columns: {
        id: true,
        plan_name: true,
        plan_roi: true,
        plan_min_deposit: true,
        plan_max_deposit: true,
        // add any other fields you need client‐side
      },
    });
    return NextResponse.json(allPlans);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching plans:", err);
    return NextResponse.json(
      { error: "Failed to load plans" },
      { status: 500 }
    );
  }
}
