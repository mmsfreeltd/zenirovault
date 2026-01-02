// components/admin/edit-expert-sheet.tsx
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateExpert } from "@/server/actions/expert";
import { SelectCrypto } from "@/components/common/select-crypto";
import { ExpertType } from "@/types";

export function EditExpertSheet({
  expert,
  children,
}: {
  expert: ExpertType;
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const [needPayment, setNeedPayment] = useState(expert.needPayment === 1);
  const router = useRouter();
  const [state, action, isPending] = useActionState(updateExpert, {
    success: false,
    message: "",
  });

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
            <SheetTitle>Edit Expert</SheetTitle>
            <SheetDescription>Update expert details</SheetDescription>
          </SheetHeader>

          <div className="px-5">
            <form action={action} className="space-y-4 pt-4">
              <input type="hidden" name="id" value={expert.id} />

              <div>
                <Label>Expert Name</Label>
                <Input
                  name="expert_name"
                  defaultValue={expert.expert_name as string}
                  required
                />
              </div>
              <div>
                <Label>Won Trades</Label>
                <Input
                  name="expert_win"
                  type="number"
                  defaultValue={expert.expert_win as string}
                  required
                />
              </div>
              <div>
                <Label>Profit Share</Label>
                <Input
                  name="profit_share"
                  defaultValue={expert.profit_share as string}
                  required
                />
              </div>
              <div>
                <Label>Country</Label>
                <Input
                  name="country"
                  defaultValue={expert.country as string}
                  required
                />
              </div>
              <div>
                <Label>Needs Payment?</Label>
                <Select
                  name="needPayment"
                  defaultValue={expert.needPayment === 1 ? "yes" : "no"}
                  onValueChange={(v) => setNeedPayment(v === "yes")}
                >
                  <SelectTrigger>
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
                    <input
                      type="hidden"
                      name="coin_id"
                      id={`coin_id_${expert.id}`}
                      defaultValue={expert.coin_id ?? ""}
                    />
                  </div>
                  <div>
                    <Label>Payment Address</Label>
                    <Input
                      name="payment_address"
                      defaultValue={expert.payment_address ?? ""}
                      required
                    />
                  </div>
                  <div>
                    <Label>Payment Description</Label>
                    <Input
                      name="payment_desc"
                      defaultValue={expert.payment_desc ?? ""}
                      required
                    />
                  </div>
                </>
              )}

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
