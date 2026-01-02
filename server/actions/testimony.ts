/* eslint-disable @typescript-eslint/no-explicit-any */
// server/actions/testimony.ts
"use server";

import { db } from "@/db";
import { testimonies } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

// 1) Create a new testimony
export async function createTestimony(_: any, formData: FormData) {
  // Only admin can create
  await requireSession("admin");

  const tpix = formData.get("tpix") as string; // URL from FileUpload
  const tname = formData.get("tname") as string;
  const toccupation = formData.get("toccupation") as string;
  const tdescription = formData.get("tdescription") as string;

  if (!tpix || !tname || !toccupation || !tdescription) {
    return { success: false, message: "All fields are required." };
  }

  await db.insert(testimonies).values({
    tpix,
    tname,
    toccupation,
    tdescription,
  });

  return { success: true, message: "Testimony created successfully." };
}

// 2) Update an existing testimony
export async function updateTestimony(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  const tpix = formData.get("tpix") as string;
  const tname = formData.get("tname") as string;
  const toccupation = formData.get("toccupation") as string;
  const tdescription = formData.get("tdescription") as string;

  if (!id || !tpix || !tname || !toccupation || !tdescription) {
    return { success: false, message: "Missing or invalid fields." };
  }

  await db
    .update(testimonies)
    .set({
      tpix,
      tname,
      toccupation,
      tdescription,
    })
    .where(eq(testimonies.id, id));

  return { success: true, message: "Testimony updated successfully." };
}

// 3) Delete a testimony
export async function deleteTestimony(_: any, formData: FormData) {
  await requireSession("admin");

  const id = parseInt(formData.get("id") as string, 10);
  if (!id) {
    return { success: false, message: "Invalid testimony ID." };
  }

  await db.delete(testimonies).where(eq(testimonies.id, id));
  return { success: true, message: "Testimony deleted." };
}
