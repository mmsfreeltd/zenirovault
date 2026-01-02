// components/common/SelectWallet.tsx
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

type Wallet = {
  id: number;
  wallet_name: string;
  wallet_address: string;
  wallet_icon: string;
  wallet_network: string;
};

export function SelectWallet({
  onChange,
  onSelect,
  defaultValue,
}: {
  onChange: (value: string) => void;
  onSelect?: (wallet: Wallet) => void;
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Wallet | null>(null);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWallets = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<Wallet[]>("/api/user/wallets");
      setWallets(res.data);
    } catch {
      setError("Failed to load wallets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  useEffect(() => {
    if (defaultValue != null && wallets.length > 0) {
      const def = wallets.find((w) => String(w.id) === defaultValue);
      if (def) {
        setSelected(def);
        onChange(defaultValue);
        onSelect?.(def);
      }
    }
  }, [defaultValue, wallets, onChange, onSelect]);

  const handleSelect = (wallet: Wallet) => {
    setSelected(wallet);
    onChange(String(wallet.id));
    onSelect?.(wallet);
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
              Loading crypto...
            </>
          ) : selected ? (
            selected.wallet_name
          ) : (
            "Select Crypto"
          )}
          {!loading && <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        {error ? (
          <div className="p-4 text-center">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" onClick={fetchWallets}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="p-4 flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading crypto...
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search crypto..." />
            <CommandEmpty>No crypto wallets found.</CommandEmpty>
            <CommandGroup>
              {wallets.map((w) => (
                <CommandItem
                  key={w.id}
                  value={w.wallet_name}
                  onSelect={() => handleSelect(w)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === w.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <img
                      src={w.wallet_icon}
                      alt={w.wallet_name}
                      className="h-4 w-4 rounded-sm"
                    />
                    <span>{w.wallet_name}</span>
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
