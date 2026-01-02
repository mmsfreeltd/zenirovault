import { NextResponse } from "next/server";
import { db } from "@/db";
import { simulation_trades, simulations } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq, desc, sql } from "drizzle-orm";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  await requireSession("user");

  const { id } = await params;

  const trades = await db.query.simulation_trades.findMany({
    where: eq(simulation_trades.simulation_id, Number(id)),
    orderBy: desc(simulation_trades.opened_at),
  });
  return NextResponse.json(trades);
}

export async function POST(req: Request, { params }: Params) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  const { id } = await params;

  const { coin_id, type, amount, entry_price, exit_price, profit_loss } =
    await req.json();
  const trade = await db
    .insert(simulation_trades)
    .values({
      simulation_id: Number(id),
      coin_id,
      type,
      amount,
      entry_price,
      exit_price,
      profit_loss,
      closed_at: new Date(),
    })
    .returning();
  // also update simulation current_balance
  await db
    .update(simulations)
    .set({ current_balance: sql`curr_bal + ${profit_loss}` })
    .where(eq(simulations.id, Number(id)));
  return NextResponse.json(trade);
}
