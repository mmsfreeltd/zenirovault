// server/actions/copy-traders.ts
"use server";

import { db } from "@/db";
import { client_expert } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function approveCopyPayment(_prev: any, formData: FormData) {
  await requireSession("admin");

  const id = Number(formData.get("id"));
  if (!id) {
    return { success: false, message: "Invalid record ID." };
  }

  await db
    .update(client_expert)
    .set({ payment_status: 1 })
    .where(eq(client_expert.id, id));

  return { success: true, message: "Payment marked as received.", id };
}
