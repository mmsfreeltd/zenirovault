import { db } from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await db.query.cryptos.findMany({
    columns: {
      id: true,
      coin_name: true,
      coin_id: true,
      coin_symbol: true,
      coin_logo: true,
    },
  });
  return NextResponse.json(result);
}
