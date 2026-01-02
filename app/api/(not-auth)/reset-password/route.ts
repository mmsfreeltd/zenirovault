// @/app/api/reset-password/route.ts
import { db } from "@/db";
import { clients, password_resets } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const record = await db.query.password_resets.findFirst({
    where: eq(password_resets.token, token),
  });

  if (!record || new Date(record.expires_at) < new Date()) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 400 }
    );
  }

  await db
    .update(clients)
    .set({ password }) // ⚠️ no hashing yet
    .where(eq(clients.id, record.user_id));

  await db.delete(password_resets).where(eq(password_resets.id, record.id));

  return NextResponse.json({ success: true });
}
