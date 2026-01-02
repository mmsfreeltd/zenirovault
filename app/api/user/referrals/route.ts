// app/api/user/referrals/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function GET(req: Request) {
  // only logged-in users may fetch their own referrals
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  const userSession = auth.session?.auth_account;

  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get("user_id");
  if (!userIdParam) {
    return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
  }

  const userId = parseInt(userIdParam, 10);
  if (Number.isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user_id" }, { status: 400 });
  }

  // enforce that non-admin users can only fetch THEIR own referrals
  if (auth.role === "user" && Number(userSession?.id) !== userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // clients.referrer is stored as a string in the DB, so compare against the stringified id
  const referrerValue = String(userId);

  // pull just the fields we need
  const referrals = await db.query.clients.findMany({
    where: eq(clients.referrer, referrerValue),
    columns: {
      id: true,
      f_name: true,
      l_name: true,
      email: true,
      date_created: true,
    },
  });

  return NextResponse.json(referrals);
}
