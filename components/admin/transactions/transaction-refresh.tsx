"use client";

import { TransactionTable } from "@/components/admin/transactions/transaction-table";
import { TransactionType } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function TransactionRefresh() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(false);
    try {
      // Assuming API returns { success: boolean; transactions: TransactionType[] }
      const response = await axios.get<{
        success: boolean;
        transactions: TransactionType[];
      }>("/api/admin/transactions");
      console.log(response);
      if (response.data.success) {
        setTransactions(response.data.transactions);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <p>
          Loading... <Loader2 className="inline-block animate-spin" />
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center space-y-2">
        <p className="text-sm text-red-600">Failed to load transactions.</p>
        <Button variant="outline" onClick={fetchTransactions}>
          Retry
        </Button>
      </div>
    );
  }

  return <TransactionTable data={transactions} />;
}
