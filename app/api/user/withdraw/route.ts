// app/api/user/withdraw/route.ts
import { NextResponse } from "next/server";
import { requireSession } from "@/server/lib/secure";
import { db } from "@/db";
import {
  deposit,
  transfer_codes,
  transactions,
  notifications,
  clients,
  cryptos,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { nanoid } from "nanoid";
import { sendWithdrawalEmail } from "@/server/lib/email";

export async function POST(req: Request) {
  // 1) auth
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  // 2) parse payload
  const {
    deposit_id,
    amount,
    method,
    // bank_name,
    // bene_name,
    // account_number,
    // routing_number,
    user_id,
  } = await req.json();

  const userId = user_id;

  const user = await db.query.clients.findFirst({
    where: eq(clients.id, userId),
  });

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
      needCode: false,
    });
  }

  const coinRec = await db.query.cryptos.findFirst({
    where: eq(cryptos.id, Number(deposit_id)),
    columns: { coin_symbol: true, coin_logo: true, coin_name: true },
  });

  // basic validation
  if (
    !deposit_id ||
    typeof amount !== "number" ||
    amount <= 0 ||
    !["bank", "cash", "crypto"].includes(method)
  ) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload" },
      { status: 400 }
    );
  }

  const depRec = await db.query.deposit.findFirst({
    where: eq(deposit.id, deposit_id),
  });
  if (!depRec) {
    return NextResponse.json(
      { success: false, message: "Deposit not found" },
      { status: 404 }
    );
  }

  const newBalance = (depRec.amount ?? 0) - amount;

  if (newBalance < 0) {
    return NextResponse.json(
      { success: false, message: "Insufficient Balance" },
      { status: 401 }
    );
  }

  // 3) do we still need a transfer code?
  const pendingCode = await db.query.transfer_codes.findFirst({
    where: and(
      eq(transfer_codes.user_id, userId),
      eq(transfer_codes.status, 0)
    ),
  });
  if (pendingCode) {
    return NextResponse.json({
      success: false,
      needCode: true,
      code: {
        id: pendingCode.id,
        code_name: pendingCode.code_name,
        code_message: pendingCode.code_message,
      },
    });
  }

  // 4) fetch & update deposit

  await db
    .update(deposit)
    .set({ amount: newBalance })
    .where(eq(deposit.id, deposit_id));

  // 5) create a transaction record
  const ref = nanoid(10);
  const subject = ` ${user.currency} ${amount} Withdrawal Request`;

  await db
    .insert(transactions)
    .values({
      date: new Date().toISOString().slice(0, 10),
      type: "Withdrawal",
      method: String(user.currency),
      amount: amount.toString(),
      status: "Processing",
      wallet: depRec.coin_id as string,
      deposit_id: deposit_id,
      user_id: userId,
      ref,
      description: subject,
    })
    .returning({ id: transactions.id });

  // 6) notify & email
  await db.insert(notifications).values({
    user_id: userId,
    status: 0,
    date: new Date().toISOString().slice(0, 10),
    subject: "Your withdrawal is processing",
    message: `We have received your withdrawal request of ${user.currency} ${amount}. Ref: ${ref}`,
  });
  // send a copy to user
  await sendWithdrawalEmail(
    user.email as string,
    subject,
    {
      f_name: user.f_name as string,
      l_name: user.l_name as string,
      email: user.email as string,
      currency: user.currency as string,
    },
    {
      ref,
      amount: amount.toString(),
      coin_amount: amount,
      coin_name: coinRec?.coin_name as string,
      coin_logo: coinRec?.coin_logo as string,
      date: new Date(),
    }
  );

  return NextResponse.json({
    success: true,
    message: "Withdrawal initiated and is now processing",
  });
}
