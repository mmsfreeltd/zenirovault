'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@/context/AuthUserContext';
import { ClientType, PlanType } from '@/types';

interface SummaryData {
  mainBalance: number;
  investmentBalance: number;
}

type DepositSummary = {
  id: number;
  amount: number;
  coin_api_id: string;
  coin_name: string;
  coin_symbol: string;
  coin_logo: string;
};

interface UseAccountSummaryReturn {
  loading: boolean;
  error: string | null;
  mainBalance: number | null;
  investmentBalance: number | null;
  accountType: string | null;
  client: ClientType | null;
  assets: DepositSummary[] | null;
}

export function useAccountSummary(): UseAccountSummaryReturn {
  const { client } = useUser();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [assets, setAssets] = useState<DepositSummary[]>([]);

  const [mainBalance, setMainBalance] = useState<number | null>(null);
  const [investmentBalance, setInvestmentBalance] = useState<number | null>(
    null
  );
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    async function loadSummary() {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get<SummaryData>('/api/user/account-summary', {
          params: { user_id: client!.id ?? 0 },
        });

        setMainBalance(res.data.mainBalance);
        setInvestmentBalance(res.data.investmentBalance);
      } catch {
        setError('Failed to load account summary');
      } finally {
        setLoading(false);
      }
    }

    async function loadPlanName() {
      try {
        const res = await fetch(`/api/admin/plans/${client!.account_type}`);
        const plan: PlanType = await res.json();
        setAccountType(plan.plan_name);
      } catch {
        setAccountType('Unknown');
      }
    }

    async function loadAssets() {
      try {
        const res = await axios.get<DepositSummary[]>(
          `/api/user/deposits?user_id=${client?.id ?? 0}`
        );
        setAssets(res.data);
      } catch {
        setError('Failed to load your assets');
      } finally {
        setLoading(false);
      }
    }

    loadPlanName();
    loadSummary();
    loadAssets();
  }, [client]);

  return {
    assets,
    loading,
    error,
    mainBalance,
    investmentBalance,
    accountType,
    client,
  };
}
