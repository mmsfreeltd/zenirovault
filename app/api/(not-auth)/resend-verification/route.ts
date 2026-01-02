import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createEmailVerification } from "@/server/db_operation"; // reuse existing function

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Missing email" },
      { status: 400 }
    );
  }

  const user = await db.query.clients.findFirst({
    where: eq(clients.email, email),
  });

  if (!user) {
    return NextResponse.json(
      { success: false, message: "No user found" },
      { status: 404 }
    );
  }

  if (user.isVerified === 1) {
    return NextResponse.json(
      { success: false, message: "User is already verified" },
      { status: 409 }
    );
  }

  await createEmailVerification(user.id, user.email as string);

  return NextResponse.json({ success: true });
}
