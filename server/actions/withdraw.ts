/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/withdraw.ts
"use server";

import { db } from "@/db";
import {
  deposit,
  transfer_codes,
  notifications,
  transactions,
  banks,
  clients,
  cryptos,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";

import { requireSession } from "@/server/lib/secure";
import { sendTransactionEmail } from "@/server/lib/email";

export async function createWithdrawal(_: any, formData: FormData) {
  // 1) Auth
  await requireSession("user");
  const userId = Number(formData.get("user_id") as string);

  // 2) Extract common fields
  const method = formData.get("method") as string;
  const depositId = Number(formData.get("deposit_id") as string);
  const amount = parseFloat(formData.get("amount") as string);

  if (!depositId || !amount || isNaN(amount)) {
    return {
      success: false,
      message: "Missing or invalid amount/deposit",
      needCode: false,
    };
  }

  const user = await db.query.clients.findFirst({
    where: eq(clients.id, userId),
  });

  if (!user) {
    return { success: false, message: "User not found", needCode: false };
  }

  const coinRec = await db.query.cryptos.findFirst({
    where: eq(cryptos.id, Number(depositId)),
    columns: { coin_symbol: true, coin_logo: true, coin_name: true },
  });

  // 3) If bank withdrawal, persist the bank details
  if (method === "bank") {
    const bank_name = formData.get("bank_name") as string;
    const bene_name = formData.get("bene_name") as string;
    const account_number = formData.get("account_number") as string;
    const routing_number = formData.get("routing_number") as string;
    if (!bank_name || !bene_name || !account_number || !routing_number) {
      return {
        success: false,
        message: "Please fill all bank details",
        needCode: false,
      };
    }
    await db.insert(banks).values({
      user_id: userId,
      bank_name,
      bene_name,
      account_number,
      routing_number,
    });
  }

  // 4) Check for any pending transfer codes
  const pending = await db.query.transfer_codes.findMany({
    where: and(
      eq(transfer_codes.user_id, userId),
      eq(transfer_codes.status, 0)
    ),
    limit: 1,
    columns: {
      id: true,
      code_name: true,
      code_message: true,
    },
  });
  if (pending.length) {
    const c = pending[0];
    return {
      success: false,
      message: "Withdrawal code required",
      needCode: true,
      code: {
        id: c.id,
        code_name: c.code_name!,
        code_message: c.code_message!,
      },
    };
  }

  // 5) Debit the deposit
  const d = await db.query.deposit.findFirst({
    where: eq(deposit.id, depositId),
    columns: { amount: true, coin_id: true },
  });
  if (!d) {
    return { success: false, message: "Deposit not found", needCode: false };
  }
  if (d.amount! < amount) {
    return { success: false, message: "Insufficient balance", needCode: false };
  }
  const newAmt = d.amount! - amount;
  await db
    .update(deposit)
    .set({ amount: newAmt })
    .where(eq(deposit.id, depositId));

  // 6) Create notification
  const now = new Date().toISOString();
  const subject = "Withdrawal Request Received";
  await db.insert(notifications).values({
    user_id: userId,
    status: 0,
    date: now,
    subject,
    message: `Your withdrawal of ${amount.toFixed(2)} is being processed.`,
  });

  // 7) Create transaction
  const ref = `WD|${crypto.randomUUID().slice(0, 8)}`;
  await db.insert(transactions).values({
    date: now,
    type: "Withdrawal",
    method,
    amount: amount.toString(),
    status: "Processing",
    wallet: method,
    deposit_id: depositId,
    user_id: userId,
    ref,
    description: subject,
  });

  // 8) Send email
  await sendTransactionEmail(
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

  return { success: true, message: "Withdrawal initiated" };
}
