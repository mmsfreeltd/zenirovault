// app/api/user/prove/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { prove } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function GET(req: Request) {
  // only allow the logged-in user to fetch their own proofs
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");
  if (!userId) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  // fetch all proofs for that user
  const proofs = await db.query.prove.findMany({
    where: eq(prove.user_id, userId),
    columns: {
      id: true,
      amount: true,
      pop: true,
      date_uploaded: true,
      payment_mode: true,
      status: true,
      reason: true,
    },
  });

  return NextResponse.json(proofs);
}
