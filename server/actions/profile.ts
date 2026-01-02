/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/profile.ts
"use server";

import { db } from "@/db";
import { admin, settings } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function updateAdminSecurity(_: any, formData: FormData) {
  await requireSession("admin");

  const current = formData.get("currentPassword") as string;
  const next = (formData.get("newPassword") as string).trim();

  // fetch the single admin record
  const adm = await db.query.admin.findFirst();
  if (!adm) {
    return { success: false, message: "No admin found" };
  }
  if (adm.password !== current) {
    return { success: false, message: "Incorrect current password" };
  }
  if (!next) {
    return { success: false, message: "New password cannot be empty" };
  }

  await db.update(admin).set({ password: next }).where(eq(admin.id, adm.id));

  return { success: true, message: "Password updated" };
}

export async function updatePlatformSettings(_: any, formData: FormData) {
  await requireSession("admin");

  // parse & trim
  const site_phone = (formData.get("site_phone") as string).trim();
  const signup_bonus = parseFloat(formData.get("signup_bonus") as string);
  const allow_signup_bonus =
    formData.get("allow_signup_bonus") === "on" ? 1 : 0;
  const site_location = (formData.get("site_location") as string).trim();
  const other = (formData.get("other") as string).trim();
  const allow_ref_bonus = formData.get("allow_ref_bonus") === "on" ? 1 : 0;
  const ref_bonus_percentage = parseFloat(
    formData.get("ref_bonus_percentage") as string
  );
  const currency = (formData.get("currency") as string).trim();
  const facebook = (formData.get("facebook") as string).trim() || null;
  const twitter = (formData.get("twitter") as string).trim() || null;
  const instagram = (formData.get("instagram") as string).trim() || null;
  const telegram = (formData.get("telegram") as string).trim() || null;
  const needVerification = (formData.get("needVerification") as string) || "1";
  const verificationType = (formData.get("verificationType") as string) || "1";
  const allowRegistration =
    (formData.get("allowRegistration") as string) || "1";

  // simple validation
  if (
    !site_phone ||
    Number.isNaN(signup_bonus) ||
    !site_location ||
    !currency
  ) {
    return {
      success: false,
      message: "Missing Phone, signup_bonus, site location, currency",
    };
  }

  // assume settings row id=1
  await db
    .update(settings)
    .set({
      site_phone,
      signup_bonus,
      allow_signup_bonus,
      site_location,
      other,
      allow_ref_bonus,
      ref_bonus_percentage,
      currency,
      facebook,
      twitter,
      instagram,
      telegram,
      needVerification,
      verificationType,
      allowRegistration,
    })
    .where(eq(settings.id, 1));

  return { success: true, message: "Platform settings saved" };
}
