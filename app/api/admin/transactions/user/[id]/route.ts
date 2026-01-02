// app/api/admin/transactions/user/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, props: Params) {
  const params = await props.params;
  // Guard admin
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  // Parse & validate user ID
  const userId = parseInt(params.id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  // Fetch only this user’s transactions
  const userTxns = await db.query.transactions.findMany({
    where: eq(transactions.user_id, userId),
  });

  return NextResponse.json(userTxns);
}
