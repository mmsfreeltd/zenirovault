/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/admin-bank.ts
"use server";

import { db } from "@/db";
import { admin_banks } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function createAdminBank(_: any, formData: FormData) {
  await requireSession("admin");

  const bank_name = formData.get("bank_name") as string;
  const account_name = formData.get("account_name") as string;
  const instruction = formData.get("instruction") as string;
  const account_number = formData.get("account_number") as string;

  if (!bank_name || !account_name || !instruction || !account_number) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(admin_banks).values({
    bank_name,
    account_name,
    instruction,
    account_number,
  });

  return { success: true, message: "Bank added" };
}

export async function updateAdminBank(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  const bank_name = formData.get("bank_name") as string;
  const account_name = formData.get("account_name") as string;
  const instruction = formData.get("instruction") as string;
  const account_number = formData.get("account_number") as string;

  if (!id || !bank_name) {
    return { success: false, message: "Missing required fields" };
  }

  await db
    .update(admin_banks)
    .set({ bank_name, account_name, instruction, account_number })
    .where(eq(admin_banks.id, id));

  return { success: true, message: "Bank updated" };
}

export async function deleteAdminBank(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  if (!id) {
    return { success: false, message: "Missing id" };
  }

  await db.delete(admin_banks).where(eq(admin_banks.id, id));
  return { success: true, message: "Bank deleted" };
}
