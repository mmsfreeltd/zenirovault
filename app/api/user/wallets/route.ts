// app/api/admin/wallets/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { requireSession } from "@/server/lib/secure";
import { admin_wallets, cryptos } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  // make sure caller is authenticated (admin or user)
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  // pull wallets + coin_logo
  const wallets = await db
    .select({
      id: admin_wallets.id,
      wallet_name: admin_wallets.wallet_name,
      wallet_address: admin_wallets.wallet_address,
      wallet_icon: cryptos.coin_logo,
      wallet_network: admin_wallets.wallet_network,
      coin_id: admin_wallets.coin_id,
      coin_logo: cryptos.coin_logo, // from the joined cryptos row
    })
    .from(admin_wallets)
    .leftJoin(
      cryptos,
      // cast the varchar coin_id → integer so it matches cryptos.id
      eq(sql`CAST(${admin_wallets.coin_id} AS INTEGER)`, cryptos.id)
    )
    .execute();

  return NextResponse.json(wallets);
}
