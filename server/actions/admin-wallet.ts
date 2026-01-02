/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/admin-wallet.ts
"use server";

import { db } from "@/db";
import { admin_wallets } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function createAdminWallet(_: any, formData: FormData) {
  await requireSession("admin");

  const wallet_name = formData.get("wallet_name") as string;
  const coin_id = formData.get("coin_id") as string;
  const wallet_address = formData.get("wallet_address") as string;
  const wallet_network = formData.get("wallet_network") as string;

  if (!wallet_name || !coin_id || !wallet_address || !wallet_network) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(admin_wallets).values({
    wallet_name,
    coin_id,
    wallet_address,
    wallet_network,
    wallet_icon: "", // or supply via form if desired
  });

  return { success: true, message: "Funding address added" };
}

export async function updateAdminWallet(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  const wallet_name = formData.get("wallet_name") as string;
  const coin_id = formData.get("coin_id") as string;
  const wallet_address = formData.get("wallet_address") as string;
  const wallet_network = formData.get("wallet_network") as string;

  if (!id || !wallet_name) {
    return { success: false, message: "Missing required fields" };
  }

  await db
    .update(admin_wallets)
    .set({ wallet_name, coin_id, wallet_address, wallet_network })
    .where(eq(admin_wallets.id, id));

  return { success: true, message: "Funding address updated" };
}

export async function deleteAdminWallet(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  if (!id) {
    return { success: false, message: "Missing id" };
  }

  await db.delete(admin_wallets).where(eq(admin_wallets.id, id));
  return { success: true, message: "Funding address deleted" };
}
