// components/admin/outstanding-bill/edit-outstanding-bill-sheet.tsx
"use client";

import { useState, useEffect, ReactElement, useRef } from "react";
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
import { updateOutstandingBill } from "@/server/actions/outstanding-bill";
import { SelectUser } from "@/components/admin/users/select-user";
import { outstanding_fees } from "@/db/schema";

export type OutstandingBillType = typeof outstanding_fees.$inferSelect;

export default function EditOutstandingBillSheet({
  bill,
  children,
}: {
  bill: OutstandingBillType;
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [state, action, isPending] = useActionState(updateOutstandingBill, {
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
      {/* trigger */}
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
            <SheetTitle>Edit Outstanding Bill</SheetTitle>
            <SheetDescription>Modify bill details below.</SheetDescription>
          </SheetHeader>

          <form action={action} className="space-y-4 pt-4">
            <input type="hidden" name="id" value={bill.id} />

            {/* User selector */}
            <div>
              <Label>User</Label>
              <SelectUser
                defaultValue={String(bill.user_id)}
                onChange={(val) => (userRef.current!.value = val)}
              />
              <input
                type="hidden"
                name="user_id"
                ref={userRef}
                defaultValue={String(bill.user_id)}
              />
            </div>

            {/* Fee name */}
            <div>
              <Label>Fee Name</Label>
              <Input
                name="fee_name"
                defaultValue={bill.fee_name ?? ""}
                required
              />
            </div>

            {/* Fee amount */}
            <div>
              <Label>Fee Amount</Label>
              <Input
                name="fee_amount"
                defaultValue={bill.fee_amount ?? ""}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Input
                name="fee_desc"
                defaultValue={bill.fee_desc ?? ""}
                required
              />
            </div>

            {/* Status select */}
            <div>
              <Label>Status</Label>
              <Select name="fee_status" defaultValue={String(bill.fee_status)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Pending</SelectItem>
                  <SelectItem value="1">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
