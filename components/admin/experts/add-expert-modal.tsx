// components/admin/add-expert-modal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useActionState } from "react";
import { toast } from "sonner";
import { createExpert } from "@/server/actions/expert";
import { useRouter } from "next/navigation";
import { SelectCrypto } from "@/components/common/select-crypto";

export default function AddExpertModal() {
  const [open, setOpen] = useState(false);
  const [needPayment, setNeedPayment] = useState(false);
  const router = useRouter();
  const [state, action, isPending] = useActionState(createExpert, {
    success: false,
    message: "",
  });

  // handle toast + close + refresh
  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
    if (state.success) {
      setOpen(false);
      router.refresh();
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Expert</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogDescription></DialogDescription>
        <DialogHeader>
          <DialogTitle>Add New Expert</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div>
            <Label>Expert Name</Label>
            <Input name="expert_name" required />
          </div>
          <div>
            <Label>Won Trades</Label>
            <Input name="expert_win" type="number" min="0" required />
          </div>
          <div>
            <Label>Profit Share</Label>
            <Input name="profit_share" placeholder="% or value" required />
          </div>
          <div>
            <Label>Country</Label>
            <Input name="country" required />
          </div>
          <div>
            <Label>Needs Payment?</Label>
            <Select
              name="needPayment"
              onValueChange={(v) => setNeedPayment(v === "yes")}
              defaultValue="no"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {needPayment && (
            <>
              <div>
                <Label>Payment Coin</Label>
                <SelectCrypto
                  onChange={(val) => {
                    const input =
                      document.querySelector<HTMLInputElement>("#coin_id");
                    if (input) input.value = val;
                  }}
                />
                <input type="hidden" name="coin_id" id="coin_id" />
              </div>
              <div>
                <Label>Payment Address</Label>
                <Input name="payment_address" required />
              </div>
              <div>
                <Label>Payment Description</Label>
                <Input name="payment_desc" required />
              </div>
            </>
          )}

          <DialogFooter className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add Expert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
