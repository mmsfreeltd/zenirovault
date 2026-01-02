// components/user/AccountSummary.tsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/AuthUserContext';
import { PlanType } from '@/types';
import { Loader } from 'lucide-react';

interface SummaryData {
  mainBalance: number;
  investmentBalance: number;
}

interface AccountSummaryProps {
  /** ISO currency code, e.g. "USD", "EUR" */
  currency: string;
  /** The name of the user’s current plan */
  planName: string;
  /** Optional overrides for the Deposit / Withdraw links */
  depositHref?: string;
  withdrawHref?: string;
}

export function AccountSummary({
  currency,
  depositHref = '/user/deposit',
  withdrawHref = '/user/withdraw',
}: AccountSummaryProps) {
  const [data, setData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const { client } = useUser();
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    async function loadSummary() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<SummaryData>('/api/user/account-summary', {
          params: { user_id: client?.id || 0 },
        });
        setData(res.data);
      } catch {
        setError('Failed to load account summary');
      } finally {
        setLoading(false);
      }
    }

    const getAccountTypeName = async (type: number) => {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/plans/${type}`);
        const plan: PlanType = await res.json();
        setAccountType(plan.plan_name as string);
      } catch {
        setAccountType('Unknown');
      } finally {
        setLoading(false);
      }
    };

    getAccountTypeName(client?.account_type ?? 0);
    loadSummary();
  }, [client]);

  // Formatter for the user’s currency
  const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.toUpperCase(),
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 2,
  });

  if (loading) {
    return (
      <Card className="animate-pulse bg-transparent shadow-none border-none">
        <CardContent className="h-40" />
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="h-40 flex items-center justify-center bg-transparent shadow-none border-none">
          <Loader className="animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const { mainBalance, investmentBalance } = data;
  const profit = mainBalance - investmentBalance;

  return (
    <Card className="max-w-sm mx-auto bg-transparent shadow-none border-none">
      <CardContent className="space-y-2">
        <CardTitle>Main Balance</CardTitle>
        <div className="text-3xl font-semibold">{fmt.format(mainBalance)}</div>

        <div className="text-sm text-muted-foreground">
          Invested:{' '}
          <span className="font-medium">{fmt.format(investmentBalance)}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          P/L: <span className="font-medium">{fmt.format(profit)}</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Current Plan: <span className="font-medium">{accountType}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1">
          <Link href={depositHref}>Deposit</Link>
        </Button>
        <Button variant="secondary" asChild className="flex-1">
          <Link href={withdrawHref}>Withdraw</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
