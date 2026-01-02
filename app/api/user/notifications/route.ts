// app/api/user/notifications/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { notifications, clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: Request) {
  // ensure user
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  const userId = auth?.session?.auth_account.email || "";
  // assuming your session payload stores email -> lookup client
  // or if you stored user_id in payload, use that here instead

  // fetch client row to get its id
  const client = await db.query.clients.findFirst({
    where: eq(clients.email, userId),
    columns: { id: true },
  });
  if (!client) return NextResponse.json([], { status: 200 });

  const rows = await db.query.notifications.findMany({
    where: eq(notifications.user_id, client.id),
    columns: {
      id: true,
      subject: true,
      message: true,
      status: true,
      date: true,
    },
    orderBy: notifications.date,
  });

  return NextResponse.json(rows);
}
