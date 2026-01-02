// app/admin/transactions/page.tsx

import TransactionRefresh from "@/components/admin/transactions/transaction-refresh";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Transactions",
};

export default function TransactionsPage() {
  // 4) Render
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Transactions</h1>
      <TransactionRefresh />
    </div>
  );
}
