// components/user/AssetCard.tsx
"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { fetchCoinData, type CoinData } from "@/lib/fetchCoin";
import { fetchFxRate } from "@/lib/fetchFxRate";

interface AssetCardProps {
  /** coinPaprika ID, e.g. "btc-bitcoin" */
  coinId: string;
  /** USD value of the user’s holding in this coin */
  usdValue: number;
  /** User’s preferred fiat currency, e.g. "EUR", "GBP" */
  currency: string;
}

export function AssetCard({ coinId, usdValue, currency }: AssetCardProps) {
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [fxRate, setFxRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(false);

    // normalize code
    const target = currency?.toUpperCase() || "USD";

    Promise.all([
      fetchCoinData(coinId), // { price: number, changePercent: number, ... }
      target === "USD" ? Promise.resolve(1) : fetchFxRate(target), // get USD → target rate
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
    return (
      <Card className="animate-pulse">
        <CardContent className="flex items-center justify-center h-40">
          <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error || !coin) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-40 text-red-600">
          Error loading asset
        </CardContent>
      </Card>
    );
  }

  // convert
  const priceInUser = coin.price * fxRate;
  const holdingInUser = usdValue;
  const quantity = usdValue / priceInUser;

  // format in user currency, narrow symbol ($, €, £, etc.)
  const fmt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 2,
  });

  const change24h = coin.changePercent;
  const changeColor = change24h >= 0 ? "text-green-600" : "text-red-600";

  return (
    <Card>
      <CardHeader className="px-4 pt-4">
        <CardDescription className="text-sm text-muted-foreground">
          {coin.name}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold">
          {fmt.format(priceInUser)}
        </CardTitle>
        <div className="mt-1 text-xs text-muted-foreground">
          Portfolio value:{" "}
          <span className="font-medium">{fmt.format(holdingInUser)}</span>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 space-y-2">
        <div className="text-sm">
          You hold{" "}
          <span className="font-medium">
            {quantity.toFixed(6)} {coin.symbol}
          </span>
        </div>
        <div className={`text-sm ${changeColor}`}>
          24 h: {change24h >= 0 ? "+" : ""}
          {change24h.toFixed(2)}%
        </div>
      </CardContent>
    </Card>
  );
}
