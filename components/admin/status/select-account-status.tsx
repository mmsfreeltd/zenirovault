// components/common/select-account-status.tsx
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

type AccountStatus = {
  id: number;
  status_text: string;
};

export function AccountStatusSelect({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [statuses, setStatuses] = useState<AccountStatus[]>([]);
  const [selected, setSelected] = useState<AccountStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchStatuses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<AccountStatus[]>("/api/admin/statuses");
      setStatuses(res.data);
    } catch {
      setError("Failed to load statuses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatuses();
  }, []);

  // initialize default selection when statuses list loads
  useEffect(() => {
    if (defaultValue != null && statuses.length > 0) {
      const def = statuses.find((s) => String(s.id) === defaultValue);
      if (def) {
        setSelected(def);
        onChange(defaultValue);
      }
    }
  }, [defaultValue, statuses, onChange]);

  function handleSelect(status: AccountStatus) {
    setSelected(status);
    onChange(String(status.id));
    setOpen(false);
  }

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
              Loading statuses...
            </>
          ) : selected ? (
            selected.status_text
          ) : (
            "Select Status"
          )}
          {!loading && (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        {error ? (
          <div className="flex flex-col items-center justify-center p-4 space-y-2">
            <p className="text-sm text-red-600">{error}</p>
            <Button variant="outline" onClick={fetchStatuses}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading statuses...
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandEmpty>No statuses found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((st) => (
                <CommandItem
                  key={st.id}
                  value={st.status_text}
                  onSelect={() => handleSelect(st)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === st.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{st.status_text}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
