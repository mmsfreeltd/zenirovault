"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { format, parseISO } from "date-fns";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  CircleDollarSign,
  Gift,
  BarChart3,
  LineChart,
  Wallet,
  RefreshCw,
  BadgeDollarSign,
  CircleAlert,
  Clock,
  Loader2,
  PieChartIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionType } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@/context/AuthUserContext";

// Colors for pie chart
const COLORS = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

// Utility function to format currency
const formatCurrency = (amount: number | string, currency: string = "USD") => {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(numAmount);
};

// Transaction Icon component
export const TransactionIcon = ({
  type,
}: {
  type: TransactionType["type"];
}) => {
  switch (String(type).toLowerCase()) {
    case "deposit":
      return <ArrowDownCircle className="h-4 w-4 text-green-500" />;
    case "withdrawal":
      return <ArrowUpCircle className="h-4 w-4 text-red-500" />;
    case "bonus":
      return <Gift className="h-4 w-4 text-amber-500" />;
    case "trade":
      return <CircleDollarSign className="h-4 w-4 text-blue-500" />;
    default:
      return <Wallet className="h-4 w-4" />;
  }
};

// Transaction Status Badge component
export const TransactionStatusBadge = ({
  status,
}: {
  status: TransactionType["status"];
}) => {
  switch (status) {
    case "Successful":
      return (
        <Badge variant="outline" className="border-green-500 text-green-600">
          Successful
        </Badge>
      );
    case "Pending":
      return (
        <Badge variant="outline" className="border-amber-500 text-amber-600">
          Pending
        </Badge>
      );
    case "Cancelled":
      return (
        <Badge variant="outline" className="border-red-500 text-red-600">
          Cancelled
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export type AccountSummary = {
  mainBalance: number;
  investmentBalance: number;
  transactions: TransactionType[];
};

export default function FinancialTab() {
  const { client } = useUser();
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError("Failed to load account summary.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [client]);

  if (loading)
    return (
      <div className="text-center">
        <Loader2 className="animate-spin" /> Loading account summary...
      </div>
    );
  if (error) return <p className="text-red-500">{error}</p>;
  if (!client) return null;

  // Calculate total balance
  const mainBalance = parseFloat(String(summary?.mainBalance) || "0");
  const demoBalance = parseFloat(client.demo_bal || "0");
  const bonusAmount = parseFloat(String(client.bonus) || "0");
  const investmentAmount = summary?.investmentBalance ?? 0;

  // Data for pie chart
  const balanceData = [
    { name: "Investment", value: investmentAmount },
    { name: "Demo Balance", value: demoBalance },
    { name: "Main Balance", value: mainBalance },
    { name: "Bonus", value: bonusAmount },
  ].filter((item) => item.value > 0);

  // Data for bar chart - transactions by type
  const transactionsByType = [
    {
      name: "Deposit",
      amount: summary?.transactions
        .filter((t) => String(t.type).toLowerCase() === "deposit")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    },
    {
      name: "Withdrawal",
      amount: summary?.transactions
        .filter((t) => String(t.type).toLowerCase() === "withdrawal")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    },
    {
      name: "Bonuses",
      amount: summary?.transactions
        .filter((t) => String(t.type).toLowerCase() === "bonus")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    },
    {
      name: "Trades",
      amount: summary?.transactions
        .filter((t) => String(t.type).toLowerCase() === "trade")
        .reduce((sum, t) => sum + Number(t.amount), 0),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Account Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Main Balance</p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatCurrency(mainBalance, client.currency as string)}
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-full">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Demo Balance</p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatCurrency(demoBalance, client.currency as string)}
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <BadgeDollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Investment</p>
                <h3 className="text-2xl font-bold mt-1">
                  {formatCurrency(investmentAmount, client.currency as string)}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <LineChart className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Bonus</p>

                <h3 className="text-2xl font-bold mt-1">
                  {formatCurrency(bonusAmount, client.currency as string)}
                </h3>
              </div>
              <div className="p-2 rounded-full">
                <Gift className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium">
                Financial Overview
              </CardTitle>
              <CardDescription>
                Balance distribution and transaction summary
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={chartType === "bar" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("bar")}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button
                variant={chartType === "pie" ? "default" : "outline"}
                size="icon"
                onClick={() => setChartType("pie")}
              >
                <PieChartIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="w-full h-[300px]">
            {chartType === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={transactionsByType}
                  margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number) => [
                      `${formatCurrency(value, client.currency as string)}`,
                      "Amount",
                    ]}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={balanceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {balanceData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      formatCurrency(value, client.currency as string)
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => toast.success("Financial data has been refreshed")}
          >
            <RefreshCw className="h-4 w-4" /> Refresh Data
          </Button>
        </CardFooter>
      </Card>

      {/* Recent Transactions */}
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
    </div>
  );
}
