// app/api/user/copy-trader/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { client_expert, experts } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { AuthAccount } from "@/types";

const bodySchema = z.object({
  user_id: z.number(),
  expert_id: z.number(),
});

export async function POST(req: Request) {
  // 1) ensure we’re logged in as a user
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;
  // auth.session should contain your user’s ID
  const user = auth.session?.auth_account as AuthAccount;
  const userId = Number(user.id);

  // 2) parse payload
  const body = await req.json();
  const expertId = Number(body.expert_id);
  if (!expertId) {
    return NextResponse.json(
      { message: "Missing or invalid expert_id" },
      { status: 400 }
    );
  }

  // 3) check if already copying
  const already = await db.query.client_expert.findFirst({
    where: and(
      eq(client_expert.user_id, userId),
      eq(client_expert.expert_id, expertId)
    ),
  });

  if (already) {
    return NextResponse.json(
      { message: "You are already copying this trader" },
      { status: 400 }
    );
  }

  // new starts here
  // check if this expert requires payment
  const expert = await db.query.experts.findFirst({
    where: eq(experts.id, expertId),
    columns: { needPayment: true },
  });
  if (!expert) {
    return NextResponse.json({ message: "Invalid expert" }, { status: 404 });
  }

  if (expert.needPayment === 1) {
    // insert as pending payment
    await db.insert(client_expert).values({
      user_id: userId,
      expert_id: expertId,
      payment_status: 0,
    });
    return NextResponse.json({
      success: false,
      needPayment: true,
      message: "Your request is pending admin payment confirmation",
    });
  }

  // ends here

  // 4) insert and respond
  await db.insert(client_expert).values({
    user_id: userId,
    expert_id: expertId,
    payment_status: 1,
  });

  return NextResponse.json({
    success: true,
    message: "Now copying signals from your chosen trader",
  });
}

export async function DELETE(req: Request) {
  const auth = await requireSession("user");
  if (auth instanceof NextResponse) return auth;

  const { user_id, expert_id } = bodySchema.parse(await req.json());
  await db
    .delete(client_expert)
    .where(
      and(
        eq(client_expert.user_id, user_id),
        eq(client_expert.expert_id, expert_id)
      )
    );
  return NextResponse.json({ success: true });
}
