// components/admin/upgrade-plan/add-upgrade-plan-modal.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPlan } from "@/server/actions/plan";

export default function AddUpgradePlanModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, action, isPending] = useActionState(createPlan, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
      if (state.success) {
        setOpen(false);
        router.refresh();
      }
    }
  }, [state, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Plan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Upgrade Plan</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div>
            <Label>Plan Name</Label>
            <Input name="plan_name" required />
          </div>
          <div>
            <Label>Minimum Deposit</Label>
            <Input name="plan_min_deposit" required />
          </div>
          <div>
            <Label>Maximum Deposit</Label>
            <Input name="plan_max_deposit" required />
          </div>
          <div>
            <Label>ROI %</Label>
            <Input name="plan_roi" required />
          </div>
          <div>
            <Label>Gift Bonus</Label>
            <Input name="gift_bonus" required />
          </div>
          <div>
            <Label>Plan Interval</Label>
            <Input name="plan_interval" required />
          </div>
          <div>
            <Label>Top-up Amount</Label>
            <Input name="topup_amount" required />
          </div>
          <div>
            <Label>Investment Duration</Label>
            <Input name="investment_duration" required />
          </div>
          <div>
            <Label>Description</Label>
            <Input name="plan_description" required />
          </div>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Adding..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
