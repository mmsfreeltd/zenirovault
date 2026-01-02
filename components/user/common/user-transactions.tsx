"use client";
import {
  AccountSummary,
  TransactionIcon,
  TransactionStatusBadge,
} from "@/components/admin/users/tabs/FinancialTab";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table";
import { CircleAlert, Clock, Loader2, RefreshCw } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/context/AuthUserContext";
import { useEffect, useState } from "react";
import axios from "axios";

const formatCurrency = (amount: number | string, currency: string = "USD") => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numAmount);
};

export default function UserTransactions() {
  const { client } = useUser();
  const [summary, setSummary] = useState<AccountSummary | null>({
    mainBalance: 0,
    investmentBalance: 0,
    transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get("/api/user/account-summary", {
          params: { user_id: client?.id || 0 },
        });
        setSummary(res.data);
      } catch {
        setError("Failed to load account summary.");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [client]);

  if (loading)
    return (
      <div className="text-center">
        <p>
          <Loader2 className="animate-spin" /> Loading Transactions
        </p>
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!client) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Recent Transactions
        </CardTitle>
        <CardDescription>
          Latest financial activities on the account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {summary?.transactions.length ?? [].length > 0 ? (
          <Table>
            <TableCaption>A list of recent transactions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary?.transactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <TransactionIcon type={transaction.type} />
                    <span className="capitalize">{transaction.type}</span>
                  </TableCell>
                  <TableCell>
                    {formatCurrency(
                      transaction.amount,
                      client.currency as string
                    )}
                  </TableCell>
                  <TableCell>
                    <TransactionStatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {format(parseISO(transaction.date), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <CircleAlert className="h-10 w-10 text-muted-foreground/40 mb-2" />
            <h3 className="font-medium">No Transactions Found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This user doesnt have any recorded transactions yet.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" className="gap-2" asChild>
          <Link href="/user/transactions">
            <Clock className="h-4 w-4" /> Transaction History
          </Link>
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}
