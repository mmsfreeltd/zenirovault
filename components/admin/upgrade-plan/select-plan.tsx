// components/common/select-plan.tsx
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

type Plan = {
  id: number;
  plan_name: string;
};

export function SelectPlan({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selected, setSelected] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<Plan[]>("/api/admin/plans");
      setPlans(res.data);
    } catch {
      setError("Failed to load plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // initialize default selection when plans list loads
  useEffect(() => {
    if (defaultValue != null && plans.length > 0) {
      const defPlan = plans.find((p) => String(p.id) === defaultValue);
      if (defPlan) {
        setSelected(defPlan);
        onChange(defaultValue);
      }
    }
  }, [defaultValue, plans, onChange]);

  function handleSelect(plan: Plan) {
    setSelected(plan);
    onChange(String(plan.id));
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
              Loading plans...
            </>
          ) : selected ? (
            selected.plan_name
          ) : (
            "Select Plan"
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
            <Button variant="outline" onClick={fetchPlans}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading plans...
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search plans..." />
            <CommandEmpty>No plans found.</CommandEmpty>
            <CommandGroup>
              {plans.map((plan) => (
                <CommandItem
                  key={plan.id}
                  value={plan.plan_name}
                  onSelect={() => handleSelect(plan)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === plan.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span>{plan.plan_name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
}
