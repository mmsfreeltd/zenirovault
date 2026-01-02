"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchCoinData } from "@/lib/fetchCoin";
import Image from "next/image";

type Crypto = {
  id: number;
  coin_id: string; // slug for live API
  coin_name: string;
  coin_symbol: string;
  coin_logo: string;
};

type CoinLive = {
  price: number;
  changePercent: number;
};

export function SelectCrypto({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue?: number;
}) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Crypto[]>([]);
  const [selected, setSelected] = useState<Crypto | null>(null);

  // Live data state
  const [live, setLive] = useState<CoinLive | null>(null);
  const [loadingLive, setLoadingLive] = useState(false);

  // fetch static list
  useEffect(() => {
    axios.get<Crypto[]>("/api/cryptos").then((res) => setList(res.data));
  }, []);

  // initialize default selection when list is loaded
  useEffect(() => {
    if (defaultValue != null && list.length > 0) {
      const def = list.find((coin) => coin.id === defaultValue);
      if (def) {
        setSelected(def);
        onChange(String(def.id));
      }
    }
  }, [defaultValue, list, onChange]);

  // whenever selection changes, fetch live data
  useEffect(() => {
    if (!selected) {
      setLive(null);
      return;
    }
    setLoadingLive(true);
    fetchCoinData(selected.coin_id)
      .then(({ price, changePercent }) => {
        setLive({ price, changePercent });
      })
      .catch(() => {
        setLive(null);
      })
      .finally(() => setLoadingLive(false));
  }, [selected]);

  function handleSelect(item: Crypto) {
    setSelected(item);
    onChange(String(item.id));
    setOpen(false);
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selected ? (
              <div className="flex items-center space-x-2">
                <Image
                  src={selected.coin_logo}
                  alt={selected.coin_symbol}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span>
                  {selected.coin_name} ({selected.coin_symbol})
                </span>
              </div>
            ) : (
              "Select Coin"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder="Search by name or symbol..." />
            <CommandEmpty>No coins found.</CommandEmpty>
            <CommandGroup>
              {list.map((coin) => (
                <CommandItem
                  key={coin.id}
                  value={coin.coin_symbol}
                  onSelect={() => handleSelect(coin)}
                >
                  <div className="flex items-center w-full">
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected?.id === coin.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <Image
                      width={20}
                      height={20}
                      src={coin.coin_logo}
                      alt={coin.coin_symbol}
                      className="h-5 w-5 rounded-full mr-2"
                    />
                    <div className="flex flex-col">
                      <span>{coin.coin_name}</span>
                      <span className="text-xs text-muted-foreground">
                        {coin.coin_symbol}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {/* live price display */}
      {selected && (
        <div className="mt-2 text-sm">
          {loadingLive ? (
            <div className="flex items-center text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fetching price…
            </div>
          ) : live ? (
            <div className="flex items-baseline space-x-2">
              <span className="font-medium">
                {live.price.toLocaleString(undefined, {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={cn(
                  "text-xs font-medium",
                  live.changePercent >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {live.changePercent >= 0 ? "+" : ""}
                {live.changePercent.toFixed(2)}%
              </span>
            </div>
          ) : (
            <span className="text-destructive">Failed to fetch price</span>
          )}
        </div>
      )}
    </>
  );
}
