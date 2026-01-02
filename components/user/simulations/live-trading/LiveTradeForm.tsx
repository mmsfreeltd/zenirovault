/* eslint-disable @typescript-eslint/no-explicit-any */
// components/user/LiveTradeForm.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SelectDeposit } from "@/components/common/select-deposit";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const STRATEGIES = [
  { value: "rand", label: "Random" },
  { value: "walk", label: "Random Walk" },
  { value: "mc", label: "Monte Carlo" },
  { value: "threshold", label: "Threshold Bounce" },
  { value: "stairMoment", label: "Stair Step Momentum" },
  { value: "scenario", label: "User Scenario" },
] as const;

export function LiveTradeForm({ userId }: { userId: string }) {
  const [depositId, setDepositId] = useState<string>("");
  const [stake, setStake] = useState<string>("");
  const [strategy, setStrategy] =
    useState<(typeof STRATEGIES)[number]["value"]>("rand");
  const [pct, setPct] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRun = async () => {
    if (!depositId || !stake || Number(stake) <= 0) {
      toast.error("Select a deposit and enter a valid stake");
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        deposit_id: Number(depositId),
        stake: Number(stake),
        strategy,
      };
      if (strategy === "scenario") {
        payload.scenario_pct = Number(pct) / 100;
      }
      const res = await axios.post("/api/user/trade", payload);
      if (res.data.success) {
        toast.success("Trade executed!");
        router.push("/user/transactions");
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Live Trade</CardTitle>
        <CardDescription>
          Place a real trade against your chosen deposit.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Select Deposit</Label>
          <SelectDeposit userId={userId} onChange={setDepositId} />
        </div>
        <div>
          <Label htmlFor="stake">Stake Amount</Label>
          <Input
            id="stake"
            type="number"
            step="0.01"
            value={stake}
            onChange={(e) => setStake(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div>
          <Label>Strategy</Label>
          <RadioGroup
            value={strategy}
            onValueChange={(v) => setStrategy(v as any)}
            className="sm:flex space-x-4"
          >
            {STRATEGIES.map((s) => (
              <Label key={s.value} className="flex items-center space-x-1">
                <RadioGroupItem value={s.value} />
                <span>{s.label}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
        {strategy === "scenario" && (
          <div>
            <Label htmlFor="pct">Percent Change</Label>
            <Input
              id="pct"
              type="number"
              step="0.1"
              value={pct}
              onChange={(e) => setPct(e.target.value)}
              placeholder="e.g. 5 for +5%"
            />
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleRun} disabled={loading} className="w-full">
          {loading ? "Processing…" : "Run Trade"}
        </Button>
      </CardFooter>
    </Card>
  );
}
