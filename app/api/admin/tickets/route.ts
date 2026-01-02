// app/api/admin/tickets/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { tickets, ticket_replies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function GET(req: Request) {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");
  if (!userId) {
    return NextResponse.json([], { status: 400 });
  }
  const id = parseInt(userId, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json([], { status: 400 });
  }

  // fetch tickets + their replies
  const userTickets = await db.query.tickets.findMany({
    where: eq(tickets.user_id, id),
  });
  const ticketsWithReplies = await Promise.all(
    userTickets.map(async (t) => {
      const replies = await db.query.ticket_replies.findMany({
        where: eq(ticket_replies.ticket_id, t.id),
      });
      return { ...t, replies };
    })
  );

  return NextResponse.json(ticketsWithReplies);
}
