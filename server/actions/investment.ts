// @/server/actions/investment.ts
"use server";

import { db } from "@/db";
import {
  clients,
  cryptos,
  deposit,
  notifications,
  transactions,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { fetchCoinData } from "@/lib/fetchCoin";
import { sendTransactionEmail } from "@/server/lib/email";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createDeposit(_: any, formData: FormData) {
  // 1) Ensure only admins can run this
  await requireSession("admin");

  // 2) Pull form values
  const userId = parseInt(formData.get("user_id") as string, 10);
  const coinId = formData.get("coin_id") as string;
  const amount = parseFloat(formData.get("amount") as string);

  if (!userId || !coinId || !amount) {
    return { success: false, message: "Missing required fields" };
  }

  // 3) Load the user (so we can get their currency, name, email)
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

  // 4) Fetch the current coin price (so we can compute coin_amount)
  let coinPrice = 0;
  try {
    const live = await fetchCoinData(coinId);
    coinPrice = live.price;
  } catch {
    // fail silently; coin_amount will be zero
  }

  // 5) Insert into `deposit`
  const [newDeposit] = await db
    .insert(deposit)
    .values({
      user_id: userId,
      coin_id: coinId,
      amount,
      initial_deposit: amount,
      status: 0,
      hasUsedTransferCode: 0,
      shown: 1,
      date_created: new Date(),
    })
    .returning({ id: deposit.id });

  // 6) Format a “neat” amount string in the user’s currency
  const neatAmount = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: user.currency || "USD",
    maximumFractionDigits: 2,
  }).format(amount);

  // 7) Build notification content
  const subject = `${user.currency || "USD"} ${neatAmount} Deposit Confirmed`;
  const message = `Deposit of ${
    user.currency || "USD"
  } ${neatAmount} has been confirmed in your live trading account. View transaction history for details.`;

  // 8) Insert into `notifications`

  await db.insert(notifications).values({
    user_id: userId,
    status: 0,
    subject,
    message,
  });

  // 11) Compute how much coin that amount bought
  const coinAmount = coinPrice ? amount / coinPrice : 0;

  // 12) Load the coin’s symbol & logo
  const coinRec = await db.query.cryptos.findFirst({
    where: eq(cryptos.coin_id, coinId),
    columns: { coin_symbol: true, coin_logo: true },
  });

  // 9) Generate a unique transaction reference
  const ref = `DEPOSIT|${nanoid()}${new Date().getFullYear()}`;
  const today = new Date().toISOString().slice(0, 10);
  // 10) Insert into `transactions`
  await db
    .insert(transactions)
    .values({
      date: today,
      type: "Deposit",
      method: (coinRec?.coin_symbol as string) ?? "USD",
      amount: String(amount),
      status: "Successful",
      wallet: coinId,
      deposit_id: newDeposit.id,
      user_id: userId,
      ref,
      description: subject,
    })
    .returning({
      id: transactions.id,
    });

  // 13) Send a transaction confirmation email
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
      amount: neatAmount,
      coin_amount: coinAmount,
      coin_name: coinRec?.coin_symbol ?? "",
      coin_logo: coinRec?.coin_logo ?? "",
      date: new Date(),
      ref,
    }
  );

  return { success: true, message: "Deposit created successfully" };
}
