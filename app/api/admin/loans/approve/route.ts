import { NextResponse } from "next/server";
import { db } from "@/db";
import { loans, deposit, transactions, notifications } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { customAlphabet } from "nanoid";
import { eq } from "drizzle-orm";
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

export async function POST(req: Request) {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const { loan_id, amount_approved } = await req.json();
  if (!loan_id || typeof amount_approved !== "number") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 1) Update loan
  await db
    .update(loans)
    .set({ amount_approved, status: "approved", date_updated: new Date() })
    .where(eq(loans.id, loan_id));

  // 2) Credit deposit
  const loan = (await db.query.loans.findFirst({
    where: eq(loans.id, loan_id),
  }))!;

  const coinRec = await db.query.cryptos.findFirst({
    columns: { coin_symbol: true, coin_logo: true, coin_id: true, id: true },
  });

  const dep = await db
    .insert(deposit)
    .values({
      user_id: loan.user_id,
      coin_id: String(coinRec?.id), // or your default coin_id for “USD”, etc.
      amount: amount_approved,
      initial_deposit: amount_approved,
      status: 0,
      shown: 1,
      date_created: new Date(),
    })
    .returning();

  // 3) Record transaction
  const ref = `LOAN|${nanoid(5)}`;
  await db.insert(transactions).values({
    date: new Date().toISOString(),
    type: "Loan",
    method: (coinRec?.coin_symbol as string) ?? "USD",
    amount: String(amount_approved),
    status: "Successful",
    wallet: String(coinRec?.id),
    deposit_id: dep[0].id,
    user_id: loan.user_id,
    ref,
    description: `Loan approved: ${amount_approved}`,
  });

  // 4) Notification
  await db.insert(notifications).values({
    user_id: loan.user_id,
    status: 0,
    date: new Date().toISOString(),
    subject: "Loan Approved",
    message: `Your loan request for ${amount_approved} has been approved and credited to your account.`,
  });

  return NextResponse.json({ success: true });
}
