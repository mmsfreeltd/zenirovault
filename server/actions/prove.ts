/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/prove.ts
"use server";
import { db } from "@/db";
import { prove } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";

export async function createProof(_: any, formData: FormData) {
  await requireSession("user");

  const user_id = formData.get("user_id") as string;
  const amount = formData.get("amount") as string;
  const pop = formData.get("pop") as string;
  const payment_mode = formData.get("payment_mode") as string;
  const reason = formData.get("reason") as string;
  const date_uploaded = new Date().toISOString();

  if (!user_id || !amount || !pop) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(prove).values({
    user_id,
    amount,
    pop,
    date_uploaded,
    payment_mode,
    status: "pending",
    reason,
  });

  return { success: true, message: "Proof submitted successfully" };
}
