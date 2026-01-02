// app/api/user/loans/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { loans } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  const user = auth.session?.auth_account;
  const userId = Number(user?.id);

  const userLoans = await db.query.loans.findMany({
    where: eq(loans.user_id, userId),
    orderBy: (loans) => loans.date_requested,
  });

  return NextResponse.json(userLoans);
}

export async function POST(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  const { amount_requested } = await req.json();
  if (typeof amount_requested !== "number" || amount_requested <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const userId = auth.session?.auth_account.id;
  const record = await db
    .insert(loans)
    .values({
      user_id: Number(userId),
      amount_requested,
    })
    .returning();

  return NextResponse.json({ success: true, loan: record[0] });
}
