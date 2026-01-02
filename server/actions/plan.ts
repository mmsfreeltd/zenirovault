/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/plan.ts
"use server";

import { db } from "@/db";
import { plans } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function createPlan(_: any, formData: FormData) {
  await requireSession("admin");

  const plan_name = formData.get("plan_name") as string;
  const plan_roi = formData.get("plan_roi") as string;
  const plan_min_deposit = formData.get("plan_min_deposit") as string;
  const plan_max_deposit = formData.get("plan_max_deposit") as string;
  const plan_description = formData.get("plan_description") as string;
  const gift_bonus = formData.get("gift_bonus") as string;
  const plan_interval = formData.get("plan_interval") as string;
  const topup_amount = formData.get("topup_amount") as string;
  const investment_duration = formData.get("investment_duration") as string;

  if (
    !plan_name ||
    !plan_roi ||
    !plan_min_deposit ||
    !plan_max_deposit ||
    !plan_description
  ) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(plans).values({
    plan_name,
    plan_roi,
    plan_min_deposit,
    plan_max_deposit,
    plan_description,
    plan_interval,
    investment_duration,
    gift_bonus,
    topup_amount,
  });

  return { success: true, message: "Plan added" };
}

export async function updatePlan(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  const plan_name = formData.get("plan_name") as string;
  const plan_roi = formData.get("plan_roi") as string;
  const plan_min_deposit = formData.get("plan_min_deposit") as string;
  const plan_max_deposit = formData.get("plan_max_deposit") as string;
  const plan_description = formData.get("plan_description") as string;
  const gift_bonus = formData.get("gift_bonus") as string;
  const plan_interval = formData.get("plan_interval") as string;
  const topup_amount = formData.get("topup_amount") as string;
  const investment_duration = formData.get("investment_duration") as string;

  if (!id || !plan_name) {
    return { success: false, message: "Missing required fields" };
  }

  await db
    .update(plans)
    .set({
      plan_name,
      plan_roi,
      plan_min_deposit,
      plan_max_deposit,
      plan_description,
      plan_interval,
      investment_duration,
      gift_bonus,
      topup_amount,
    })
    .where(eq(plans.id, id));

  return { success: true, message: "Plan updated" };
}

export async function deletePlan(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  if (!id) {
    return { success: false, message: "Missing id" };
  }

  await db.delete(plans).where(eq(plans.id, id));
  return { success: true, message: "Plan deleted" };
}
