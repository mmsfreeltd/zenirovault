// app/api/user/copied-experts/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { client_expert, experts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { AuthAccount } from "@/types";

export async function GET() {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  // assume auth.session.user.id is your logged‐in user
  const user = auth?.session?.auth_account as AuthAccount;
  const userId = Number(user.id);

  const subs = await db
    .select({
      id: client_expert.id,
      payment_status: client_expert.payment_status,
      expert: experts,
    })
    .from(client_expert)
    .leftJoin(experts, eq(client_expert.expert_id, experts.id))
    .where(eq(client_expert.user_id, userId))
    .execute();

  // flatten expert fields
  const result = subs.map((row) => ({
    subscriptionId: row.id,
    expert: row.expert,
    payment_status: row.payment_status,
  }));
  return NextResponse.json(result);
}
