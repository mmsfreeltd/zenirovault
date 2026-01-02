// app/api/admin/plan/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { account_status } from "@/db/schema";
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
  const statusId = parseInt(id, 10);

  if (Number.isNaN(statusId)) {
    return NextResponse.json({ error: "Invalid plan ID" }, { status: 400 });
  }
  // 3. Fetch the plan
  const status = await db.query.account_status.findFirst({
    where: eq(account_status.id, statusId),
  });

  if (!status) {
    return NextResponse.json({ error: "Status not found" }, { status: 404 });
  }

  // 4. Return it
  return NextResponse.json(status);
}
