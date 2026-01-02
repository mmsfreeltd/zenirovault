import { NextResponse } from "next/server";
import { db } from "@/db";
import { simulations } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;

  const sim = await db.query.simulations.findFirst({
    where: eq(simulations.id, Number(id)),
  });
  if (!sim) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(sim);
}
