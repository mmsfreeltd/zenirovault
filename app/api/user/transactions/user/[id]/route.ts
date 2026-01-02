// app/api/admin/transactions/user/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { transactions, clients, cryptos } from "@/db/schema";
import { sql, eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { TransactionType } from "@/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, props: Params) {
  const params = await props.params;
  // Guard admin

  const userId = parseInt(params.id, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
  const auth = await requireSession("current_user", userId);
  if (auth instanceof NextResponse) return auth;

  // Parse & validate user ID

  // Fetch only this user’s transactions
  // const userTxns = await db.query.transactions.findMany({
  //   where: eq(transactions.user_id, userId),
  // });

  try {
    const raw = await db
      .select({
        id: transactions.id,
        ref: transactions.ref,
        date: transactions.date,
        type: transactions.type,
        method: transactions.method,
        amount: transactions.amount,
        status: transactions.status,
        wallet: cryptos.coin_name,
        user_email: clients.email,
        user_currency: clients.currency,
        deposit_id: transactions.deposit_id,
        user_id: transactions.user_id,
        description: transactions.description,
      })
      .from(transactions)
      // .where(eq(transactions.user_id, userId))
      // Cast the text column `transactions.wallet` to integer before comparing
      .leftJoin(cryptos, sql`${transactions.wallet}::integer = ${cryptos.id}`)
      .leftJoin(clients, eq(transactions.user_id, clients.id))
      .where(eq(transactions.user_id, userId))
      .orderBy(sql`${transactions.id} DESC`)
      .execute();

    const txns = raw as TransactionType[];
    return NextResponse.json({ success: true, transactions: txns });
  } catch {
    return NextResponse.json({ success: false, transactions: [] });
  }
}
