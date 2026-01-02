// components/admin/upgrade-plan/edit-upgrade-plan-sheet.tsx
"use client";

import { useState, useEffect, ReactElement } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updatePlan } from "@/server/actions/plan";
import { PlanType } from "@/types";

export default function EditUpgradePlanSheet({
  plan,
  children,
}: {
  plan: PlanType;
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, action, isPending] = useActionState(updatePlan, {
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
    <>
      <div
        onPointerDown={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Edit Plan</SheetTitle>
            <SheetDescription>Update plan details below.</SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <form action={action} className="space-y-4 pt-4">
              <input type="hidden" name="id" value={plan.id} />
              <div>
                <Label>Plan Name</Label>
                <Input
                  name="plan_name"
                  defaultValue={plan.plan_name ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Minimum Deposit</Label>
                <Input
                  name="plan_min_deposit"
                  defaultValue={plan.plan_min_deposit ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Maximum Deposit</Label>
                <Input
                  name="plan_max_deposit"
                  defaultValue={plan.plan_max_deposit ?? ""}
                  required
                />
              </div>
              <div>
                <Label>ROI %</Label>
                <Input
                  name="plan_roi"
                  defaultValue={plan.plan_roi ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Gift Bonus</Label>
                <Input
                  name="gift_bonus"
                  defaultValue={plan.gift_bonus ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Plan Interval</Label>
                <Input
                  name="plan_interval"
                  required
                  defaultValue={plan.plan_interval ?? ""}
                />
              </div>
              <div>
                <Label>Top-up Amount</Label>
                <Input
                  name="topup_amount"
                  required
                  defaultValue={plan.topup_amount ?? ""}
                />
              </div>
              <div>
                <Label>Investment Duration</Label>
                <Input
                  name="investment_duration"
                  required
                  defaultValue={plan.investment_duration ?? ""}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  name="plan_description"
                  defaultValue={plan.plan_description ?? ""}
                  required
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
