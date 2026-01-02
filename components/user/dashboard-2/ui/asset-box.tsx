import clsx from 'clsx';
import { DotIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchCoinData, type CoinData } from '@/lib/fetchCoin';
import { fetchFxRate } from '@/lib/fetchFxRate';
import Image from 'next/image';

export default function AssetBox({
  amount,
  title,
  subTitle,
  colorClass,
  coinId,
  icon,
  currency,
}: {
  amount: string;
  title: string;
  subTitle: string;
  colorClass: string;
  coinId: string;
  icon: string;
  currency: string;
}) {
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [fxRate, setFxRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(false);

    // normalize code
    const target = currency?.toUpperCase() || 'USD';

    Promise.all([
      fetchCoinData(coinId), // { price: number, changePercent: number, ... }
      target === 'USD' ? Promise.resolve(1) : fetchFxRate(target), // get USD → target rate
    ])
      .then(([coinData, rate]) => {
        if (isCancelled) return;
        setCoin(coinData);
        setFxRate(rate);
      })
      .catch(() => {
        if (isCancelled) return;
        setError(true);
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [coinId, currency]);

  if (loading) {
    return <div className="bg-muted aspect-auto rounded"></div>;
  }

  if (error || !coin) {
    return (
      <div className="bg-muted aspect-auto rounded flex items-center justify-center">
        <p className="text-xs"> Error loading asset</p>
      </div>
    );
  }

  const priceInUser = coin.price * fxRate;
  const holdingInUser = Number(amount);
  // const quantity = Number(amount) / priceInUser;

  // format in user currency, narrow symbol ($, €, £, etc.)
  const fmt = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currency.toUpperCase(),
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 2,
  });

  const change24h = coin.changePercent;
  const changeColor = change24h >= 0 ? 'text-green-600' : 'text-red-600';

  return (
    <div className="balance-box bg-muted-foreground/5 rounded sm:p-5 p-2">
      <div className="flex justify-between">
        <div>
          <p className="sm:text-xl text-xs font-bold">
            {title} <span className="text-xs">@{fmt.format(priceInUser)}</span>
          </p>
          <p className="sm:text-lg text-xs ">{fmt.format(holdingInUser)}</p>
        </div>
        <div>
          <Image width={30} height={30} src={icon} alt="coin logo" />
        </div>
      </div>
      <p className={clsx('flex items-center text-xs', colorClass)}>
        <DotIcon size={15} />
        <span className="mr-1">{subTitle}</span>
        <span className={`text-sm ${changeColor}`}>
          24h: {change24h >= 0 ? '+' : ''} {change24h.toFixed(2)}%
        </span>
      </p>
    </div>
  );
}
