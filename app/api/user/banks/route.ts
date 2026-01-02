// app/api/admin/banks/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { requireSession } from "@/server/lib/secure";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  const banks = await db.query.admin_banks.findMany();
  return NextResponse.json(banks);
}
