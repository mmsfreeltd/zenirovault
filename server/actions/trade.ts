// server/actions/trade.ts
"use server";

import { db } from "@/db";
import {
  clients,
  cryptos,
  deposit,
  notifications,
  trades,
  transactions,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { customAlphabet } from "nanoid";
import { sendTransactionEmail } from "@/server/lib/email";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createTrade(_: any, formData: FormData) {
  // 1️⃣ Ensure admin
  await requireSession("admin");

  // 2️⃣ Extract & validate
  const userId = parseInt(formData.get("user_id") as string, 10);
  const depositId = parseInt(formData.get("deposit_id") as string, 10);
  const pair = formData.get("trade_pair") as string;
  const type = formData.get("trade_type") as string; // Buy/Sell
  const status = formData.get("status") as string; // Profit/Loss
  const payoutRaw = formData.get("payout") as string;
  const payout = parseFloat(payoutRaw);

  if (!userId || !depositId || !pair || !type || !status || isNaN(payout)) {
    return { success: false, message: "Missing or invalid fields" };
  }

  // 3️⃣ Load user (for email/currency)
  const user = await db.query.clients.findFirst({
    where: eq(clients.id, userId),
    columns: {
      f_name: true,
      l_name: true,
      email: true,
      currency: true,
    },
  });
  if (!user) {
    return { success: false, message: "User not found" };
  }

  // 4️⃣ Load deposit (old balance & coin_id)
  const depRec = await db.query.deposit.findFirst({
    where: eq(deposit.id, depositId),
    columns: { amount: true, coin_id: true },
  });
  if (!depRec) {
    return { success: false, message: "Deposit not found" };
  }

  const oldAmount = depRec.amount ?? 0;
  const newAmount =
    status === "Profit" ? oldAmount + payout : oldAmount - payout;

  // 5️⃣ Update deposit balance
  await db
    .update(deposit)
    .set({ amount: newAmount })
    .where(eq(deposit.id, depositId));

  // 6️⃣ Record the trade
  const now = new Date();
  const date = now.toISOString().slice(0, 10); // YYYY-MM-DD
  const time = now.toTimeString().slice(0, 8); // HH:MM:SS
  const ref = `TRADE|${nanoid()}${now.getFullYear()}`;
  await db.insert(trades).values({
    trade_type: type,
    asset: depRec.coin_id,
    trade_pair: pair,
    date,
    time,
    payout: payout.toString(),
    user_id: userId,
    stake_price: oldAmount.toString(),
    trade_price: newAmount.toString(),
    status,
    deposit_id: depositId,
    is_trading: 0,
    isLive: 0,
  });

  // 7️⃣ Neat formatting of payout
  const neatPayout = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: user.currency || "USD",
    maximumFractionDigits: 2,
  }).format(payout);

  // 8️⃣ Insert notification
  const subject = `${user.currency || "USD"} ${neatPayout} Trade ${status}`;
  const message = `Your ${status.toLowerCase()} of ${
    user.currency || "USD"
  } ${neatPayout} on ${pair} has been recorded.`;

  await db.insert(notifications).values({
    user_id: userId,
    status: 0,
    date: date,
    subject,
    message,
  });

  // 9️⃣ Insert transaction record
  await db
    .insert(transactions)
    .values({
      date: date,
      type: "Trade",
      method: pair as string,
      amount: String(payout),
      status: "Successful",
      wallet: depRec.coin_id as string,
      deposit_id: depositId,
      user_id: userId,
      ref,
      description: subject,
    })
    .returning({ id: transactions.id });

  // 🔟 Fetch coin details for email
  const coinRec = await db.query.cryptos.findFirst({
    where: eq(cryptos.id, Number(depRec.coin_id)),
    columns: { coin_symbol: true, coin_logo: true },
  });

  // 1️⃣1️⃣ Send transaction confirmation email
  sendTransactionEmail(
    user.email as string,
    subject,
    {
      f_name: user.f_name as string,
      l_name: user.l_name as string,
      email: user.email as string,
      currency: user.currency as string,
    },
    {
      amount: neatPayout,
      coin_amount: payout, // raw payout
      coin_name: coinRec?.coin_symbol ?? depRec.coin_id ?? "",
      coin_logo: coinRec?.coin_logo ?? "",
      date: now,
      ref,
    }
  );

  return { success: true, message: "Trade recorded successfully" };
}
