// @/app/api/forgot-password/route.ts
import { db } from "@/db";
import { clients, password_resets } from "@/db/schema";
import { requestPasswordReset } from "@/server/db_operation";
import { NextResponse } from "next/server";
import { and, gte, eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const user = await db.query.clients.findFirst({
    where: eq(clients.email, email),
  });

  if (!user) {
    return NextResponse.json(
      { message: "No account found with that email." },
      { status: 404 }
    );
  }

  // Check for recent request (within 5 minutes)
  const recentRequest = await db.query.password_resets.findFirst({
    where: and(
      eq(password_resets.user_id, user.id),
      gte(password_resets.expires_at, new Date(Date.now() - 5 * 60 * 1000)) // last 5 minutes
    ),
  });

  if (recentRequest) {
    return NextResponse.json(
      {
        message:
          "You've recently requested a reset. Please wait a few minutes.",
      },
      { status: 429 }
    );
  }

  await requestPasswordReset(user.id, user.email as string);
  return NextResponse.json({ success: true });
}
