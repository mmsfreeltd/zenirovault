import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { updateClientById } from "@/server/actions/clients";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const { id } = await context.params;

  const parseID = parseInt(id, 10);
  if (Number.isNaN(parseID)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const user = await db.query.clients.findFirst({
    where: eq(clients.id, parseID),
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const { id } = await context.params;

  const parseID = parseInt(id, 10);
  if (Number.isNaN(parseID)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }

  const body = await req.json();

  const allClientKeys = Object.keys(clients) as (keyof typeof clients)[];
  const allowedKeys = allClientKeys.filter((key) => key !== "id");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updates: Record<string, any> = {};
  for (const key of allowedKeys) {
    if (key in body) {
      updates[key] = body[key];
    }
  }

  const result = await updateClientById(parseID, updates);
  if (!result.success) {
    return NextResponse.json(
      { error: result.message || "Update failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
