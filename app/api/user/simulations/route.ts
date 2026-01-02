import { NextResponse } from "next/server";
import { db } from "@/db";
import { simulations } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { desc, eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  const userId = Number(auth.session?.auth_account.id);
  const sims = await db.query.simulations.findMany({
    where: eq(simulations.user_id, userId),
    orderBy: desc(simulations.date_created),
  });
  return NextResponse.json(sims);
}

export async function POST(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  const userId = auth.session?.auth_account.id;
  const { name, starting_balance } = await req.json();
  const sim = await db
    .insert(simulations)
    .values({
      user_id: Number(userId),
      name,
      starting_balance,
      current_balance: starting_balance,
    })
    .returning();
  return NextResponse.json(sim);
}
