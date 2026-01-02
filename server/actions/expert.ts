/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/expert.ts
"use server";

import { db } from "@/db";
import { experts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function createExpert(pre: any, formData: FormData) {
  await requireSession("admin");

  const expert_name = formData.get("expert_name") as string;
  const expert_win = formData.get("expert_win") as string;
  const profit_share = formData.get("profit_share") as string;
  const country = formData.get("country") as string;
  const needPaymentRaw = formData.get("needPayment") as string;
  const needPayment = needPaymentRaw === "yes" ? 1 : 0;
  const coin_id = formData.get("coin_id") as string | null;
  const payment_address = formData.get("payment_address") as string | null;
  const payment_desc = formData.get("payment_desc") as string | null;

  if (!expert_name || !expert_win || !profit_share || !country) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(experts).values({
    expert_name,
    expert_win,
    profit_share,
    country,
    needPayment,
    coin_id: needPayment ? coin_id : null,
    payment_address: needPayment ? payment_address : null,
    payment_desc: needPayment ? payment_desc : null,
    expert_pic: "", // or a default
  });

  return { success: true, message: "Expert added successfully" };
}

export async function updateExpert(pre: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  const expert_name = formData.get("expert_name") as string;
  const expert_win = formData.get("expert_win") as string;
  const profit_share = formData.get("profit_share") as string;
  const country = formData.get("country") as string;
  const needPaymentRaw = formData.get("needPayment") as string;
  const needPayment = needPaymentRaw === "yes" ? 1 : 0;
  const coin_id = formData.get("coin_id") as string | null;
  const payment_address = formData.get("payment_address") as string | null;
  const payment_desc = formData.get("payment_desc") as string | null;

  if (!id || !expert_name) {
    return { success: false, message: "Missing required fields" };
  }

  await db
    .update(experts)
    .set({
      expert_name,
      expert_win,
      profit_share,
      country,
      needPayment,
      coin_id: needPayment ? coin_id : null,
      payment_address: needPayment ? payment_address : null,
      payment_desc: needPayment ? payment_desc : null,
    })
    .where(eq(experts.id, id));

  return { success: true, message: "Expert updated" };
}

export async function deleteExpert(_re: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  if (!id) {
    return { success: false, message: "Missing id" };
  }

  await db.delete(experts).where(eq(experts.id, id));
  return { success: true, message: "Expert deleted" };
}
