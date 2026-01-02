import { NextResponse } from "next/server";
import { db } from "@/db";
import { deposit, cryptos } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function GET(req: Request) {
  // 1. enforce auth
  const authResult = await requireSession("any");
  if (authResult instanceof NextResponse) return authResult;

  // 2. read & validate user_id
  const url = new URL(req.url);
  const userIdParam = url.searchParams.get("user_id");
  if (!userIdParam) {
    return NextResponse.json([], { status: 400 });
  }
  const userId = parseInt(userIdParam, 10);

  // 3. get raw deposits (id, amount, coin_id as string)
  const raw = await db.query.deposit.findMany({
    where: eq(deposit.user_id, userId),
    columns: { id: true, amount: true, coin_id: true },
  });

  // 4. for each deposit, look up coin_symbol by parsing deposit.coin_id to int
  const enriched = await Promise.all(
    raw.map(async (d) => {
      // attempt to convert the stored coin_id string to a number
      const coinPk = parseInt(d.coin_id as string, 10);
      let symbol = "";
      if (!isNaN(coinPk)) {
        const coinRec = await db.query.cryptos.findFirst({
          where: eq(cryptos.id, coinPk),
          columns: { coin_symbol: true },
        });
        symbol = coinRec?.coin_symbol ?? "";
      }
      return {
        id: d.id,
        amount: d.amount,
        coin_symbol: symbol,
      };
    })
  );

  return NextResponse.json(enriched);
}
