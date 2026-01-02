// app/api/user/experts/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { requireSession } from "@/server/lib/secure";

export async function GET() {
  // only authenticated users may fetch experts
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  const all = await db.query.experts.findMany();
  return NextResponse.json(all);
}
