// app/api/user/notifications/read/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function POST(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const id = Number(body.id);
  if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  await db
    .update(notifications)
    .set({ status: 1 })
    .where(eq(notifications.id, id));

  return NextResponse.json({ success: true });
}
