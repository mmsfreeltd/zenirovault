// app/api/user/profile/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import { updateClientById } from "@/server/actions/clients";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Params) {
  // guard
  const { id } = await params;
  // validate id
  const parseID = parseInt(id, 10);

  try {
    const auth = await requireSession("current_user", parseID);
    if (auth instanceof NextResponse) return auth;
  } catch {
    return NextResponse.json({ error: "Unauthorize user" }, { status: 401 });
  }

  if (Number.isNaN(parseID)) {
    return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  }
  // fetch user
  const user = await db.query.clients.findFirst({
    where: eq(clients.id, parseID),
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user);
}

export async function POST(req: Request, { params }: Params) {
  const { id } = await params;

  // validate id
  const parseID = parseInt(id, 10);
  const auth = await requireSession("current_user", parseID);
  if (auth instanceof NextResponse) return auth;

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
