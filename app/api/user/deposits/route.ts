// app/api/user/deposits/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { deposit, cryptos } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { requireSession } from '@/server/lib/secure';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('user_id');
  if (!userId) {
    return NextResponse.json(
      { error: 'Missing `user_id` parameter' },
      { status: 400 }
    );
  }

  // Only allow the logged-in user to fetch their own deposits
  const auth = await requireSession('current_user', userId);
  if (auth instanceof NextResponse) return auth;

  // 1. Pull every deposit record + its coin info
  const rawRows = await db
    .select({
      amount: deposit.amount,
      coin_api_id: cryptos.coin_id, // e.g. "btc-bitcoin"
      coin_name: cryptos.coin_name,
      coin_symbol: cryptos.coin_symbol,
      coin_logo: cryptos.coin_logo,
    })
    .from(deposit)
    .leftJoin(
      cryptos,
      // deposit.coin_id is a string FK to cryptos.id, so cast it:
      eq(sql`${deposit.coin_id}::integer`, cryptos.id)
    )
    .where(eq(deposit.user_id, Number(userId)))
    .execute();

  const rows = rawRows.filter(
    (r): r is typeof r & { coin_api_id: string } => r.coin_api_id !== null
  );

  // 2. Group by coin_api_id and sum amounts

  const grouped = rows.reduce<{
    [coinApiId: string]: {
      amount: number;
      coin_api_id: string;
      coin_name: string;
      coin_symbol: string;
      coin_logo: string;
    };
  }>((acc, row) => {
    const key = row.coin_api_id; // now definitely a string
    if (!acc[key]) {
      acc[key] = {
        amount: 0,
        coin_api_id: row.coin_api_id,
        coin_name: row.coin_name as string,
        coin_symbol: row.coin_symbol as string,
        coin_logo: row.coin_logo as string,
      };
    }
    acc[key].amount += Number(row.amount ?? 0);
    return acc;
  }, {});

  // 3. Turn into an array with a simple index-based `id`
  const result = Object.values(grouped).map((entry, idx) => ({
    id: idx + 1,
    amount: entry.amount,
    coin_api_id: entry.coin_api_id,
    coin_name: entry.coin_name,
    coin_symbol: entry.coin_symbol,
    coin_logo: entry.coin_logo,
  }));
  return NextResponse.json(result);
}
