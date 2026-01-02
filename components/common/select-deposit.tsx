// @/components/common/select-deposit
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

type Deposit = {
  id: number;
  amount: number;
  coin_symbol: string;
};

export function SelectDeposit({
  userId,
  onChange,
}: {
  userId: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Deposit | null>(null);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchDeposits = async () => {
    if (!userId) {
      setDeposits([]);
      setSelected(null);
      onChange("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<Deposit[]>(`/api/deposits?user_id=${userId}`);
      setDeposits(res.data);
    } catch {
      setError("Failed to load deposits. Please try again.");
      setDeposits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, [userId]);

  const handleSelect = (dep: Deposit) => {
    setSelected(dep);
    onChange(String(dep.id));
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
              Loading deposits...
            </>
          ) : selected ? (
            `#${selected.id} — ${selected.amount} ${selected.coin_symbol}`
          ) : (
            "Select Deposit"
          )}
          {!loading && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        {error ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-2">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" onClick={fetchDeposits}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading deposits...
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search deposits..." />
            <CommandEmpty>No deposits found.</CommandEmpty>
            <CommandGroup>
              {deposits.map((dep) => (
                <CommandItem
                  key={dep.id}
                  value={String(dep.id)}
                  onSelect={() => handleSelect(dep)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === dep.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  #{dep.id} — {dep.amount} {dep.coin_symbol}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
