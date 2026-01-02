// server/actions/document.ts
"use server";

import { db } from "@/db";
import { user_documents } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createDocument(_: any, formData: FormData) {
  await requireSession("user");

  const userId = parseInt(formData.get("user_id") as string, 10);
  const docType = formData.get("doc_type") as string;
  const fileUrl = formData.get("file_url") as string;
  const publicId = formData.get("public_id") as string;

  if (!userId || !docType || !fileUrl || !publicId) {
    return { success: false, message: "Missing required fields" };
  }

  await db.insert(user_documents).values({
    user_id: userId,
    doc_type: docType,
    file_url: fileUrl,
    public_id: publicId,
  });

  return { success: true, message: "Document uploaded" };
}
