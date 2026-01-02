// app/api/user/tickets/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { tickets, ticket_replies } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

// GET  /api/user/tickets?user_id=123
// POST /api/user/tickets
export async function GET(req: Request) {
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const userId = Number(searchParams.get("user_id"));
  if (!userId) return NextResponse.json([], { status: 400 });

  // fetch tickets
  const userTickets = await db
    .select()
    .from(tickets)
    .where(eq(tickets.user_id, userId))
    .orderBy(desc(tickets.date))
    .execute();

  // attach replies
  const withReplies = await Promise.all(
    userTickets.map(async (t) => ({
      ...t,
      replies: await db
        .select()
        .from(ticket_replies)
        .where(eq(ticket_replies.ticket_id, t.id))
        .orderBy(asc(ticket_replies.date))
        .execute(),
    }))
  );

  return NextResponse.json(withReplies);
}

export async function POST(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  const { user_id, subject, message } = await req.json();
  if (!user_id || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const now = new Date();
  const [newTicket] = await db
    .insert(tickets)
    .values({
      user_id,
      subject,
      message,
      status: "open",
      date: now,
    })
    .returning();

  return NextResponse.json(newTicket, { status: 201 });
}
