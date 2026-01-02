// components/admin/SimulationCreateForUserForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SelectUser } from "@/components/admin/users/select-user"; // your existing user-picker

export function SimulationCreateForUserForm({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [userId, setUserId] = useState<number | "">("");
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/admin/simulations", {
        user_id: Number(userId),
        name,
        starting_balance: parseFloat(start),
      });
      toast.success("Simulation created!");
      setName("");
      setStart("");
      setUserId("");
      onCreated();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mb-6">
      <CardHeader>
        <CardTitle>New Simulation for User</CardTitle>
      </CardHeader>
      <form onSubmit={handle}>
        <CardContent className="space-y-4">
          <div>
            <SelectUser
              defaultValue={userId === "" ? undefined : String(userId)}
              onChange={(val) => setUserId(Number(val))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Starting Balance
            </label>
            <Input
              type="number"
              step="0.01"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={loading || !userId || !name || !start}
          >
            {loading ? "Creating…" : "Create"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
