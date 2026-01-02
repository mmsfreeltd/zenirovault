// components/admin/withdraw-bill/edit-withdraw-bill-sheet.tsx
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
import { updateWithdrawBill } from "@/server/actions/withdraw-bill";
import { SelectUser } from "@/components/admin/users/select-user";
import { WithdrawBillType } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditWithdrawBillSheet({
  bill,
  children,
}: {
  bill: WithdrawBillType;
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [state, action, isPending] = useActionState(updateWithdrawBill, {
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
            <SheetTitle>Edit Withdraw Bill</SheetTitle>
            <SheetDescription>Update details below.</SheetDescription>
          </SheetHeader>
          <div className="px-4">
            <form action={action} className="space-y-4 pt-4">
              <input type="hidden" name="id" value={bill.id} />
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
              <div>
                <Label>Code</Label>
                <Input name="code" defaultValue={bill.code ?? ""} required />
              </div>
              <div>
                <Label>Code Name</Label>
                <Input
                  name="code_name"
                  defaultValue={bill.code_name ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Message</Label>
                <Input
                  name="code_message"
                  defaultValue={bill.code_message ?? ""}
                  required
                />
              </div>
              <div>
                <Select name="status" defaultValue={String(bill.status)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="1">Used</SelectItem>
                      <SelectItem value="0">Not Used</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
