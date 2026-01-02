/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/deposit.ts
"use server";

import { db } from "@/db";
import { notifications, admin_wallets, clients } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function createUserDeposit(_: any, formData: FormData) {
  // Ensure the user is logged in
  await requireSession("user");

  // We assume the JWT payload includes the user's email
  const email = formData.get("email")?.toString() || "";

  // Find the user record
  const userRec = await db.query.clients.findFirst({
    where: eq(clients.email, email),
    columns: { id: true },
  });
  if (!userRec) {
    return { success: false, message: "User not found" };
  }
  const userId = userRec.id;

  // Validate amount
  const amount = parseFloat(formData.get("amount") as string);
  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Invalid amount" };
  }

  const method = formData.get("method");
  const now = new Date();

  // Build the deposit payload
  const data: Record<string, any> = {
    user_id: userId,
    amount,
    initial_deposit: amount,
    status: 0, // pending
    shown: 1,
    date_created: now,
  };

  if (method === "bank") {
    data.deposit_transfer_code = formData.get("bank_id");
  } else {
    const walletId = parseInt(formData.get("wallet_id") as string, 10);
    const wallet = await db.query.admin_wallets.findFirst({
      where: eq(admin_wallets.id, walletId),
      columns: { coin_id: true },
    });
    data.coin_id = wallet?.coin_id ?? null;
  }

  // Insert into deposit
  //   await db.insert(deposit).values(data);

  // Insert a notification
  await db.insert(notifications).values({
    user_id: userId,
    status: 0,
    subject: `Deposit Requested`,
    message: `Your deposit of ${amount} is pending approval.`,
  });

  return { success: true, message: "Deposit request submitted" };
}
