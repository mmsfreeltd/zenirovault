// @api/admin/clients
import { db } from "@/db";
import { NextResponse } from "next/server";
import { requireSession } from "@/server/lib/secure";

export async function GET() {
  const authResult = await requireSession("admin");
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const result = await db.query.clients.findMany({
    columns: {
      id: true,
      email: true,
      f_name: true,
      l_name: true,
    },
  });

  return NextResponse.json(result);
}
