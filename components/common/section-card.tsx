"use client";
import { useEffect, useState } from "react";
import { TrendingUpIcon, TrendingDownIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCoinData } from "@/lib/fetchCoin";

type CoinData = {
  name: string;
  symbol: string;
  price: number;
  changePercent: number;
  marketCap: number;
};

export function CardComponent({ coinId }: { coinId: string }) {
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCoin() {
      try {
        const data = await fetchCoinData(coinId);
        setCoin(data);
      } catch {
        setError(true);
      }
    }

    getCoin();
  }, [coinId]);

  if (error)
    return (
      <Card className="p-4 text-destructive font-semibold">
        Failed to load {coinId}
      </Card>
    );

  if (!coin) {
    return (
      <Card className="@container/card p-6 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-24" />
        <div className="pt-4 space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-32" />
        </div>
      </Card>
    );
  }

  const isUp = coin.changePercent >= 0;
  const ChangeIcon = isUp ? TrendingUpIcon : TrendingDownIcon;

  const formattedPrice = coin.price.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const formattedMarketCap = coin.marketCap.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    notation: "compact",
  });

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>
            {coin.name} ({coin.symbol})
          </CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {formattedPrice}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge
              variant="outline"
              className={`flex gap-1 rounded-lg text-xs ${
                isUp ? "text-green-600" : "text-red-600"
              }`}
            >
              <ChangeIcon className="size-3" />
              {coin.changePercent.toFixed(2)}%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Market Cap: {formattedMarketCap}
          </div>
          <div className="text-muted-foreground">
            24h Price {isUp ? "Increase" : "Drop"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
