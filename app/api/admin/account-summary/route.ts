import { NextResponse } from "next/server";
import { db } from "@/db";
import { deposit, transactions } from "@/db/schema";
import { eq, sum, sql } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function GET(req: Request) {
  const authResult = await requireSession("admin");
  if (authResult instanceof NextResponse) {
    return authResult;
  }
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get("user_id") || "", 10);

  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user_id" }, { status: 400 });
  }

  try {
    // Calculate mainBalance (sum of deposit.amount)
    const [main] = await db
      .select({ total: sum(deposit.amount).mapWith(Number) })
      .from(deposit)
      .where(eq(deposit.user_id, userId));

    // Calculate investmentBalance (sum of deposit.initial_deposit)
    const [investment] = await db
      .select({ total: sum(deposit.initial_deposit).mapWith(Number) })
      .from(deposit)
      .where(eq(deposit.user_id, userId));

    // Fetch transactions
    const txs = await db
      .select()
      .from(transactions)
      .orderBy(sql`${transactions.id} DESC`)
      .where(eq(transactions.user_id, userId))
      .limit(6);

    return NextResponse.json({
      mainBalance: main?.total || 0,
      investmentBalance: investment?.total || 0,
      transactions: txs,
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
