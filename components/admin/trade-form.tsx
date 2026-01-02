// app/admin/trade/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { createTrade } from "@/server/actions/trade";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectUser } from "@/components/admin/users/select-user";
import { SelectDeposit } from "@/components/common/select-deposit";
import { Loader2 } from "lucide-react";

export default function TradeForm() {
  const [userId, setUserId] = useState("");
  const [depositId, setDepositId] = useState("");

  const [state, formAction, isPending] = useActionState(createTrade, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  return (
    <Card className="max-w-lg mt-5">
      <CardHeader>
        <CardTitle>Record Trade</CardTitle>
        <CardDescription>
          Apply a profit or loss to a user’s deposit.
        </CardDescription>
      </CardHeader>

      <form action={formAction}>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select User
            </label>
            <SelectUser onChange={setUserId} />
            <input type="hidden" name="user_id" value={userId} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Deposit
            </label>
            <SelectDeposit userId={userId} onChange={setDepositId} />
            <input type="hidden" name="deposit_id" value={depositId} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trade Pair</label>
            <Input
              name="trade_pair"
              placeholder="e.g. BTC/USDT"
              className="w-full"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="trade_type"
                className="w-full rounded border px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                className="w-full rounded border px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option value="Profit">Profit</option>
                <option value="Loss">Loss</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payout</label>
            <Input
              name="payout"
              type="number"
              step="0.01"
              placeholder="Amount to credit/debit"
              className="w-full"
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center items-center"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Recording…
              </>
            ) : (
              "Record Trade"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
