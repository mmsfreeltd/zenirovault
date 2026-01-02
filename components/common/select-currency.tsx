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

type Currency = {
  code: string; // e.g. "USD"
  name: string; // e.g. "United States Dollar"
  symbol: string; // e.g. "$"
};

export function SelectCurrency({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [selected, setSelected] = useState<Currency | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchCurrencies = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<Currency[]>("/api/currencies");
      setCurrencies(res.data);
    } catch (err) {
      console.error("Failed to load currencies", err);
      setError("Failed to load currencies. Please try again.");
      setCurrencies([]);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchCurrencies();
  }, []);

  // apply defaultValue after fetch
  useEffect(() => {
    if (defaultValue && currencies.length > 0) {
      const def = currencies.find((c) => c.code === defaultValue);
      if (def) {
        setSelected(def);
        onChange(def.code);
      }
    }
  }, [defaultValue, currencies, onChange]);

  const handleSelect = (currency: Currency) => {
    setSelected(currency);
    onChange(currency.code);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading currencies...
            </>
          ) : selected ? (
            <span>{`${selected.symbol} - ${selected.name} (${selected.code})`}</span>
          ) : (
            "Select Currency"
          )}
          {!loading && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        {error ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-2">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" onClick={fetchCurrencies}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading currencies...
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search by name or code..." />
            <CommandEmpty>No currencies found.</CommandEmpty>
            <CommandGroup>
              {currencies.map((currency) => (
                <CommandItem
                  key={currency.code}
                  defaultValue={currency.code}
                  onSelect={() => handleSelect(currency)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.code === currency.code
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{`${currency.symbol} ${currency.name}`}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {currency.code}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
