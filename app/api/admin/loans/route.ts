import { NextResponse } from "next/server";
import { db } from "@/db";
import { loans, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function GET() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const all = await db
    .select({
      id: loans.id,
      user_id: loans.user_id,
      amount_requested: loans.amount_requested,
      amount_approved: loans.amount_approved,
      status: loans.status,
      date_requested: loans.date_requested,
      date_updated: loans.date_updated,
      email: clients.email,
    })
    .from(loans)
    .leftJoin(clients, eq(loans.user_id, clients.id))
    .orderBy(loans.date_requested)
    .execute();

  return NextResponse.json(all);
}
