/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/withdraw-bill.ts
"use server";

import { db } from "@/db";
import { transfer_codes } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function createWithdrawBill(_: any, formData: FormData) {
  await requireSession("admin");

  const userId = parseInt(formData.get("user_id") as string, 10);
  const code = (formData.get("code") as string).trim();
  const code_name = (formData.get("code_name") as string).trim();
  const code_message = (formData.get("code_message") as string).trim();

  if (Number.isNaN(userId) || !code || !code_name || !code_message) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(transfer_codes).values({
    user_id: userId,
    code,
    code_name,
    code_message,
    status: 0,
  });

  return { success: true, message: "Withdraw code added" };
}

export async function updateWithdrawBill(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  const userId = parseInt(formData.get("user_id") as string, 10);
  const code = (formData.get("code") as string).trim();
  const status = Number(formData.get("status"));
  const code_name = (formData.get("code_name") as string).trim();
  const code_message = (formData.get("code_message") as string).trim();

  if (
    Number.isNaN(id) ||
    Number.isNaN(userId) ||
    !code ||
    !code_name ||
    !code_message
  ) {
    return { success: false, message: "Missing required fields" };
  }

  await db
    .update(transfer_codes)
    .set({ user_id: userId, code, code_name, code_message, status })
    .where(eq(transfer_codes.id, id));

  return { success: true, message: "Withdraw code updated" };
}

export async function deleteWithdrawBill(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  if (Number.isNaN(id)) {
    return { success: false, message: "Missing id" };
  }

  await db.delete(transfer_codes).where(eq(transfer_codes.id, id));
  return { success: true, message: "Withdraw code deleted" };
}
