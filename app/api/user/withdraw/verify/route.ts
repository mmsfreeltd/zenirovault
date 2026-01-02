// app/api/user/withdraw/verify/route.ts
import { NextResponse } from "next/server";
import { requireSession } from "@/server/lib/secure";
import { db } from "@/db";
import { transfer_codes } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  //   const session = auth.session;
  //   const userId = (session?.auth_account.id as any) && 0;

  const { code_id, code_input, user_id } = await req.json();
  const userId = user_id;

  if (!code_id || !code_input) {
    return NextResponse.json(
      { success: false, message: "Missing code or id" },
      { status: 400 }
    );
  }

  // 1) fetch the code record
  const codeRec = await db.query.transfer_codes.findFirst({
    where: and(
      eq(transfer_codes.id, code_id),
      eq(transfer_codes.user_id, userId)
    ),
  });
  if (!codeRec) {
    return NextResponse.json(
      { success: false, message: "Invalid code request " + userId },
      { status: 404 }
    );
  }

  // 2) verify
  if (codeRec.code !== code_input) {
    return NextResponse.json({
      success: false,
      message: "Code does not match. Please try again or contact support.",
    });
  }

  // 3) mark this code as used
  await db
    .update(transfer_codes)
    .set({ status: 1 })
    .where(eq(transfer_codes.id, code_id));

  // 4) do we have another pending code?
  const nextCode = await db.query.transfer_codes.findFirst({
    where: and(
      eq(transfer_codes.user_id, userId),
      eq(transfer_codes.status, 0)
    ),
  });
  if (nextCode) {
    return NextResponse.json({
      success: false,
      needCode: true,
      code: {
        id: nextCode.id,
        code_name: nextCode.code_name,
        code_message: nextCode.code_message,
      },
    });
  }

  // 5) all codes satisfied — client should now re-post to /withdraw to finish
  return NextResponse.json({
    success: true,
    message: "All codes verified — please submit withdrawal again to complete.",
  });
}
