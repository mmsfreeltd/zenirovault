// components/user/UserAssets.tsx
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { AssetCard } from '@/components/user/common/AssetCard';
import { useUser } from '@/context/AuthUserContext';

type DepositSummary = {
  id: number;
  amount: number;
  coin_api_id: string;
  coin_name: string;
  coin_symbol: string;
};

export function UserAssets({
  userId,
  currency,
}: {
  userId: number;
  currency: string;
}) {
  const [assets, setAssets] = useState<DepositSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get<DepositSummary[]>(
          `/api/user/deposits?user_id=${userId}`
        );
        setAssets(res.data);
      } catch {
        setError('Failed to load your assets');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [userId]);

  if (loading) {
    return <div className="text-center py-8">Loading assets…</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }
  if (assets.length === 0) {
    return <div className="text-center py-8">No assets to display</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {assets.map((asset) => (
        <AssetCard
          key={asset.id}
          coinId={asset.coin_api_id}
          usdValue={asset.amount}
          currency={currency}
        />
      ))}
    </div>
  );
}

export default function AssetList() {
  const { client } = useUser();
  return (
    <>
      {client && (
        <UserAssets
          userId={Number(client?.id)}
          currency={client.currency as string}
        />
      )}
    </>
  );
}
