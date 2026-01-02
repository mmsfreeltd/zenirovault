// @api/admin/transactions
export const revalidate = 0;

import { db } from "@/db";
import { NextResponse } from "next/server";
import { requireSession } from "@/server/lib/secure";
import { transactions, clients, cryptos } from "@/db/schema";
import { sql, eq } from "drizzle-orm";
import { TransactionType } from "@/types";

export async function GET() {
  const authResult = await requireSession("user");
  if (authResult instanceof NextResponse) return authResult;

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
      // Cast the text column `transactions.wallet` to integer before comparing
      .leftJoin(cryptos, sql`${transactions.wallet}::integer = ${cryptos.id}`)
      .leftJoin(clients, eq(transactions.user_id, clients.id))
      .orderBy(sql`${transactions.id} DESC`)
      .execute();

    const txns = raw as TransactionType[];
    return NextResponse.json({ success: true, transactions: txns });
  } catch {
    return NextResponse.json({ success: false, transactions: [] });
  }
}
