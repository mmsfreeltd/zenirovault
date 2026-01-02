// app/api/admin/loans/reject/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { loans } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";

export async function POST(req: Request) {
  // only admins may call
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const body = await req.json();
  const { loan_id } = body;

  if (loan_id === undefined) {
    return NextResponse.json(
      { error: "Missing loan_id in request body" },
      { status: 400 }
    );
  }

  const id = parseInt(loan_id, 10);
  if (Number.isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid loan_id, must be a number" },
      { status: 400 }
    );
  }

  try {
    await db
      .update(loans)
      .set({
        status: "rejected",
        date_updated: new Date(),
      })
      .where(eq(loans.id, id));

    return NextResponse.json({ success: true, message: "Loan rejected" });
  } catch (err) {
    console.error("Error rejecting loan:", err);
    return NextResponse.json(
      { error: "Failed to reject loan" },
      { status: 500 }
    );
  }
}
