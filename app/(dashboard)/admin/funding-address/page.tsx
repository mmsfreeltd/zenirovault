/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/funding-address/page.tsx
import { NextResponse } from "next/server";
import { db } from "@/db";
import { admin_wallets, cryptos } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { requireSession } from "@/server/lib/secure";
import dynamic from "next/dynamic";
import { AdminWalletType } from "@/types";

const AddAdminWalletModal = dynamic(
  () => import("@/components/admin/admin-wallets/add-admin-wallet-modal")
);
const AdminWalletTable = dynamic(
  () => import("@/components/admin/admin-wallets/admin-wallet-table")
);

export const revalidate = 0;

export default async function FundingAddressPage() {
  const auth = await requireSession("admin");
  if (auth instanceof NextResponse) return auth;

  let list;
  try {
    list = await db
      .select({
        id: admin_wallets.id,
        wallet_name: admin_wallets.wallet_name,
        wallet_address: admin_wallets.wallet_address,
        wallet_icon: cryptos.coin_logo,
        coin_id: admin_wallets.coin_id,
        wallet_network: admin_wallets.wallet_network,
        coin_symbol: cryptos.coin_symbol,
        coin_logo: cryptos.coin_logo,
      })
      .from(admin_wallets)
      .leftJoin(cryptos, eq(cryptos.id, sql`${admin_wallets.coin_id}::integer`))
      .execute();
  } catch (err: any) {
    throw new Error("Failed to load funding addresses: " + err.message);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Funding Addresses</h1>
      <div className="mb-4">
        <AddAdminWalletModal />
      </div>
      <AdminWalletTable data={list as AdminWalletType[]} />
    </div>
  );
}
