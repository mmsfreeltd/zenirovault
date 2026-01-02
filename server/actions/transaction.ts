// server/actions/transaction.ts
"use server";
import { db } from "@/db";
import { transactions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateTransaction(_: any, formData: FormData) {
  // 1️⃣ enforce admin
  await requireSession("admin");

  // 2️⃣ extract & validate
  const id = parseInt(formData.get("id") as string, 10);
  const status = formData.get("status") as string;
  const amount = formData.get("amount") as string;
  if (!id || !status || !amount) {
    return { success: false, message: "Missing amount or status" };
  }

  // 3️⃣ update
  await db.update(transactions).set({ status, amount }).where(eq(transactions.id, id));

  return { success: true, message: "Transaction updated successfully" };
}
