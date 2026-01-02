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

type User = {
  id: number;
  email: string;
  f_name: string;
  l_name: string;
};

export function SelectUser({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get<User[]>("/api/admin/clients");
      setUsers(res.data);
    } catch {
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // initialize default selection when users list loads
  useEffect(() => {
    if (defaultValue != null && users.length > 0) {
      const defUser = users.find((u) => String(u.id) === defaultValue);
      if (defUser) {
        setSelected(defUser);
        onChange(defaultValue);
      }
    }
  }, [defaultValue, users, onChange]);

  function handleSelect(user: User) {
    setSelected(user);
    onChange(String(user.id));
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
              Loading users...
            </>
          ) : selected ? (
            `${selected.f_name} ${selected.l_name}`
          ) : (
            "Select User"
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
            <Button variant="outline" onClick={fetchUsers}>
              Retry
            </Button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading users...
          </div>
        ) : (
          <Command>
            <CommandInput placeholder="Search by name or email..." />
            <CommandEmpty>No users found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.email}
                  onSelect={() => handleSelect(user)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected?.id === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <span>{`${user.f_name} ${user.l_name}`}</span>
                    <span className="text-xs text-muted-foreground truncate">
                      {user.email}
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
