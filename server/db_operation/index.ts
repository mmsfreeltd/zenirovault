// @/server/db_operation/index/login.ts
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import {
  admin,
  clients,
  account_status,
  email_verifications,
  password_resets,
} from "@/db/schema";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/server/lib/email";
import { randomBytes } from "crypto";
import { FrontendResponseType } from "@/types";

interface LoginPayload {
  identifier: string; // userid for admin, email for client
  password: string;
}

type LoginResult =
  | {
      role: "admin";
      data: { id: number; userid: string | null; success: true };
    }
  | { role: "client"; data: { id: number; email: string | null } }
  | { role: "client"; data: FrontendResponseType }
  | null;

export async function attemptLogin({
  identifier,
  password,
}: LoginPayload): Promise<LoginResult> {
  // Admin login
  const adminMatch = await db.query.admin.findFirst({
    where: and(eq(admin.userid, identifier), eq(admin.password, password)),
  });

  if (adminMatch) {
    return {
      role: "admin",
      data: { id: adminMatch.id, userid: adminMatch.userid, success: true },
    };
  }

  // Client login
  const clientMatch = await db.query.clients.findFirst({
    where: and(eq(clients.email, identifier), eq(clients.password, password)),
  });

  if (clientMatch) {
    if (clientMatch.isVerified !== 1) {
      return {
        role: "client",
        data: {
          success: false,
          message: "Please verify your email before logging in.",
        },
      };
    }

    return {
      role: "client",
      data: { id: clientMatch.id, email: clientMatch.email, success: true },
    };
  }

  return null;
}

export async function createEmailVerification(user_id: number, email: string) {
  const token = randomBytes(32).toString("hex");
  const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

  await db.insert(email_verifications).values({
    user_id,
    token,
    expires_at,
  });

  await sendVerificationEmail(email, token);
}

export async function requestPasswordReset(user_id: number, email: string) {
  const token = randomBytes(32).toString("hex");
  const expires_at = new Date(Date.now() + 15 * 60 * 1000); // 15 min

  await db.insert(password_resets).values({ user_id, token, expires_at });
  await sendPasswordResetEmail(email, token);
}

export async function getAllStatuses() {
  return await db.select().from(account_status);
}
