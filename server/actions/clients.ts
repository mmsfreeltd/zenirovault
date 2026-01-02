/* eslint-disable @typescript-eslint/no-explicit-any */
// @/server/actions/clients
"use server";
import { db } from "@/db";
import {
  clients,
  account_status,
  transactions,
  notifications,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { ClientType } from "@/types";
import { sendMail } from "@/server/lib/email";
import { customAlphabet } from "nanoid";

// Optional: import your session handler if you want auth check
// import { getSessionUser } from "@/lib/auth";
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

export async function fetchClients() {
  try {
    const [users, statuses] = await Promise.all([
      db.select().from(clients),
      db.select().from(account_status),
    ]);

    const statusMap = new Map<number | string, string>();
    statuses.forEach((s) => statusMap.set(s.id, s.status_text as string));

    const usersWithStatusText = users.map((user) => ({
      ...user,
      status_text: statusMap.get(Number(user.status)) ?? "unknown",
    }));

    return usersWithStatusText;
  } catch (error) {
    console.error("Server Action Error:", error);
    throw new Error("Failed to fetch users");
  }
}

export async function assignPlan(_prev: any, formData: FormData) {
  await requireSession("admin");

  const userId = parseInt(formData.get("userId") as string, 10);
  const planId = parseInt(formData.get("planId") as string, 10);

  if (isNaN(userId) || isNaN(planId)) {
    return { success: false, message: "Missing required fields" };
  }

  await db
    .update(clients)
    .set({ account_type: planId })
    .where(eq(clients.id, userId));

  return { success: true, message: "Plan assigned successfully" };
}

export async function assignStatus(_pre: any, formData: FormData) {
  // Only admins
  await requireSession("admin");

  const userId = parseInt(formData.get("userId") as string, 10);
  const statusId = formData.get("statusId") as string;

  if (isNaN(userId) || !statusId) {
    return { success: false, message: "Missing required fields" };
  }

  // Update the client's status (stored as varchar) to the chosen statusId
  await db
    .update(clients)
    .set({ status: statusId })
    .where(eq(clients.id, userId));

  return { success: true, message: "Account status updated successfully" };
}

export async function updateClientById(
  id: number,
  updates: Partial<Omit<ClientType, "id">>
): Promise<{ success: boolean; message?: string }> {
  if (!id || Object.keys(updates).length === 0) {
    return { success: false, message: "Invalid ID or no fields to update" };
  }

  try {
    await db.update(clients).set(updates).where(eq(clients.id, id));
    return { success: true, message: "updated account" };
  } catch (error) {
    console.error("Error updating client:", error);
    return { success: false, message: "Database update failed" };
  }
}

export async function updateClientAction(_prev: any, formData: FormData) {
  const id = Number(formData.get("id"));
  if (Number.isNaN(id)) return { success: false, message: "Invalid ID" };
  const allowedFields = [
    "f_name",
    "l_name",
    "email",
    "phone",
    "country",
    "currency",
    "state",
    "city",
    "address",
    "zip_code",
    "dob",
    // add more as needed
  ];

  const updates: Record<string, any> = {};

  for (const key of allowedFields) {
    const val = formData.get(key);
    if (val !== null) updates[key] = val;
  }

  return await updateClientById(id, updates);
}

export async function updateBonus(_prev: any, formData: FormData) {
  await requireSession("admin");
  const ref = `BONUS|${nanoid()}${new Date().getFullYear()}`;
  const userId = parseInt(formData.get("userId") as string, 10);
  const delta = parseFloat(formData.get("bonus") as string);

  if (isNaN(userId) || isNaN(delta)) {
    return { success: false, message: "Missing or invalid fields" };
  }

  // 1) read current bonus
  const user = await db.query.clients.findFirst({
    where: eq(clients.id, userId),
    columns: { bonus: true, currency: true },
  });
  // const oldBonus = parseFloat(String(user?.bonus) ?? "0");

  // 2) compute new bonus
  // const newBonus = (Number(oldBonus) ?? 0) + Number(delta);

  // 3) update clients.bonus
  // await db
  //   .update(clients)
  //   .set({ bonus: newBonus })
  //   .where(eq(clients.id, userId));

  // 4) record a transaction entry
  const now = new Date().toISOString();

  await db.insert(transactions).values({
    date: now, // date type
    type: "Bonus", // custom type
    method: "USD",
    amount: delta.toString(),
    status: "Successful",
    wallet: "1", // placeholder
    deposit_id: null,
    user_id: userId,
    description: `Bonus of ${user?.currency || ""}${delta.toFixed(2)}`,
    ref,
  });

  return { success: true, message: "User bonus updated" };
}

export async function sendClientEmail(_prev: any, formData: FormData) {
  // 1. Only admin may send
  await requireSession("admin");

  // 2. Extract & validate
  const userId = parseInt(formData.get("user_id") as string, 10);
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (isNaN(userId) || !subject || !message) {
    return { success: false, message: "Missing required fields" };
  }

  // 3. Look up client email
  const client = await db.query.clients.findFirst({
    where: eq(clients.id, userId),
    columns: { email: true },
  });
  if (!client?.email) {
    return { success: false, message: "Client not found" };
  }

  // 4. Send the email using your mailable util
  sendMail(client.email, subject, message);

  // 5. Record it in notifications table
  await db.insert(notifications).values({
    user_id: userId,
    status: 0,
    subject,
    message,
    // date will default to NOW() via schema.defaultNow()
  });

  return { success: true, message: "Email sent and notification recorded" };
}

export async function updateUserPassword(_: any, formData: FormData) {
  // 1) Ensure we have an authenticated user
  await requireSession("user");

  // 2) Pull passwords from the form
  const currentPassword = formData.get("currentPassword")?.toString() ?? "";
  const newPassword = formData.get("newPassword")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";
  const userId = Number(formData.get("user_id")) ?? 0;

  // 3) Basic validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "All fields are required." };
  }
  if (newPassword !== confirmPassword) {
    return { success: false, message: "New passwords do not match." };
  }

  // 4) Fetch the user’s current password from the DB
  const user = await db.query.clients.findFirst({
    where: eq(clients.id, userId),
    columns: { password: true },
  });
  if (!user) {
    return { success: false, message: "User not found." };
  }

  // 5) Check the current password
  if (user.password !== currentPassword) {
    return { success: false, message: "Current password is incorrect." };
  }

  // 6) Update to the new password
  await db
    .update(clients)
    .set({ password: newPassword })
    .where(eq(clients.id, userId));

  return { success: true, message: "Password updated successfully." };
}
