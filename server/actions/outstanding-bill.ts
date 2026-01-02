/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/outstanding-bill.ts
"use server";

import { db } from "@/db";
import { outstanding_fees } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function createOutstandingBill(_: any, formData: FormData) {
  await requireSession("admin");

  const userId = parseInt(formData.get("user_id") as string, 10);
  const fee_name = formData.get("fee_name") as string;
  const fee_amount = formData.get("fee_amount") as string;
  const fee_desc = formData.get("fee_desc") as string;

  if (!userId || !fee_name || !fee_amount || !fee_desc) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(outstanding_fees).values({
    user_id: userId,
    fee_name,
    fee_amount,
    fee_desc,
    fee_status: 0, // default status
    fee_pop: "", // empty proof
  });

  return { success: true, message: "Outstanding bill added" };
}

export async function updateOutstandingBill(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  const userId = parseInt(formData.get("user_id") as string, 10);
  const fee_name = formData.get("fee_name") as string;
  const fee_amount = formData.get("fee_amount") as string;
  const fee_desc = formData.get("fee_desc") as string;
  const fee_status = formData.get("fee_status");

  if (!id || !userId || !fee_name || !fee_amount || !fee_desc || !fee_status) {
    return { success: false, message: "Missing required fields" };
  }

  await db
    .update(outstanding_fees)
    .set({
      fee_status: Number(fee_status),
      user_id: userId,
      fee_name,
      fee_amount,
      fee_desc,
    })
    .where(eq(outstanding_fees.id, id));

  return { success: true, message: "Outstanding bill updated" };
}

export async function deleteOutstandingBill(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  if (!id) {
    return { success: false, message: "Missing id" };
  }

  await db.delete(outstanding_fees).where(eq(outstanding_fees.id, id));
  return { success: true, message: "Outstanding bill deleted" };
}
