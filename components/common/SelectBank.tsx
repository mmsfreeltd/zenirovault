// components/common/SelectBank.tsx
"use client";

import { useState, useEffect } from "react";
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

type Bank = {
  id: number;
  bank_name: string;
  account_name: string;
  instruction: string | null;
  account_number: string;
};

export function SelectBank({
  onChange,
  onSelect,
  defaultValue,
}: {
  onChange: (value: string) => void;
  onSelect?: (bank: Bank) => void;
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Bank | null>(null);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBanks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<Bank[]>("/api/user/banks");
      setBanks(res.data);
    } catch {
      setError("Failed to load banks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // If a defaultValue is passed in, pre-select that bank once loaded
  useEffect(() => {
    if (defaultValue != null && banks.length > 0) {
      const def = banks.find((b) => String(b.id) === defaultValue);
      if (def) {
        setSelected(def);
        onChange(defaultValue);
        onSelect?.(def);
      }
    }
  }, [defaultValue, banks, onChange, onSelect]);

  const handleSelect = (bank: Bank) => {
    setSelected(bank);
    onChange(String(bank.id));
    onSelect?.(bank);
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
              Loading banks...
            </>
          ) : selected ? (
            selected.bank_name
          ) : (
            "Select Bank"
          )}
          {!loading && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        {error ? (
          <div className="p-4 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" onClick={fetchBanks}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="p-4 flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading banks...
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search banks..." />
            <CommandEmpty>No banks found.</CommandEmpty>
            <CommandGroup>
              {banks.map((bank) => (
                <CommandItem
                  key={bank.id}
                  value={bank.bank_name}
                  onSelect={() => handleSelect(bank)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === bank.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div>
                    <div className="font-medium">{bank.bank_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {bank.account_name}
                    </div>
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
