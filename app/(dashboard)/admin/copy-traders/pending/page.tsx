// app/admin/copy-traders/pending/page.tsx
import { NextResponse } from "next/server";
import { requireSession } from "@/server/lib/secure";
import { db } from "@/db";
import { client_expert, clients, experts, cryptos } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import {
  PendingCopy,
  PendingCopyTable,
} from "@/components/admin/experts/PendingCopyTable";

export const revalidate = 0;

export default async function PendingCopyPage() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  const pending = await db
    .select({
      id: client_expert.id,
      user_email: clients.email,
      expert_name: experts.expert_name,
      payment_address: experts.payment_address,
      coin_id: experts.coin_id,
      coin_logo: cryptos.coin_logo,
    })
    .from(client_expert)
    .leftJoin(clients, eq(client_expert.user_id, clients.id))
    .leftJoin(experts, eq(client_expert.expert_id, experts.id))
    .leftJoin(cryptos, sql`${experts.coin_id} = ${sql`${cryptos.id}::text`}`)
    .where(eq(client_expert.payment_status, 0))
    .execute();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Pending Copy-Traders Payments
      </h1>
      <PendingCopyTable data={pending as PendingCopy[]} />
    </div>
  );
}
