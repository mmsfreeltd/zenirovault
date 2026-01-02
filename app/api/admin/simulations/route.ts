// app/api/admin/simulations/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { simulations } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  // List all simulations for all users (or filter by query param)
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const sims = await db
    .select()
    .from(simulations)
    .orderBy(simulations.date_created);
  return NextResponse.json(sims);
}

export async function POST(req: Request) {
  // Admin creates a simulation for any user
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const { user_id, name, starting_balance } = await req.json();
  if (
    typeof user_id !== "number" ||
    !name ||
    typeof starting_balance !== "number"
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 }
    );
  }

  const [newSim] = await db
    .insert(simulations)
    .values({
      user_id,
      name,
      starting_balance,
      current_balance: starting_balance,
    })
    .returning();
  return NextResponse.json(newSim, { status: 201 });
}
