// app/api/user/tickets/[ticketId]/replies/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { ticket_replies } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
interface Params {
  params: Promise<{ ticketId: string }>;
}
export async function POST(req: Request, { params }: Params) {
  const auth = await requireSession("any"); // user or admin
  if (auth instanceof NextResponse) return auth;

  const { message, isAdmin } = await req.json();
  const { ticketId } = await params;

  const ticket_id = Number(ticketId);
  if (!ticket_id || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const [reply] = await db
    .insert(ticket_replies)
    .values({
      ticket_id,
      message,
      isAdmin: Boolean(isAdmin),
      date: new Date(),
    })
    .returning();

  return NextResponse.json(reply, { status: 201 });
}
