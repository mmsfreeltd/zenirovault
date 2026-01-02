import { db } from "@/db";
import { clients, email_verifications } from "@/db/schema";
import { sendWelcomeEmail } from "@/server/lib/email";
import { eq, and, gt } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/verify-email/failed", req.url));
  }

  const now = new Date();

  const record = await db.query.email_verifications.findFirst({
    where: and(
      eq(email_verifications.token, token),
      gt(email_verifications.expires_at, now)
    ),
  });

  if (!record) {
    return NextResponse.redirect(new URL("/verify-email/failed", req.url));
  }

  // Mark user as verified
  await db
    .update(clients)
    .set({ isVerified: 1 })
    .where(eq(clients.id, record.user_id));

  // Optionally delete the token
  await db
    .delete(email_verifications)
    .where(eq(email_verifications.id, record.id));

  const user = await db.query.clients.findFirst({
    where: eq(clients.id, record.user_id),
  });
  if (user) {
    await sendWelcomeEmail(
      user.email as string,
      user.f_name || user.username || "there"
    );
  }
  return NextResponse.redirect(new URL("/verify-email/success", req.url));
}
