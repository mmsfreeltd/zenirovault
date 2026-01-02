"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { LoaderIcon } from "lucide-react";

type StatusOption = {
  id: number;
  status_text: string;
};

export function AccountStatusSelect({
  value,
  onChange,
  disabled = false,
  label = "Account Status",
  placeholder = "Select status",
  name = "status",
}: {
  value?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  name?: string;
}) {
  const [options, setOptions] = useState<StatusOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatuses = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/admin/statuses");
        setOptions(res.data);
      } catch (error) {
        console.error("Failed to fetch account statuses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, []);

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        defaultValue={value?.toString()}
        onValueChange={(val) => onChange?.(parseInt(val))}
        disabled={disabled || loading}
      >
        <SelectTrigger id={name} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {loading ? (
            <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
              <LoaderIcon className="h-4 w-4 animate-spin" />
              Loading statuses...
            </div>
          ) : (
            options.map((status) => (
              <SelectItem key={status.id} value={status.id.toString()}>
                {status.status_text}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
