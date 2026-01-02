// components/admin/edit-admin-bank-sheet.tsx
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
import { updateAdminBank } from "@/server/actions/admin-bank";
import { AdminBankType } from "@/types";

export default function EditAdminBankSheet({
  bank,
  children,
}: {
  bank: AdminBankType;
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, action, isPending] = useActionState(updateAdminBank, {
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
            <SheetTitle>Edit Bank</SheetTitle>
            <SheetDescription>Update bank details below.</SheetDescription>
          </SheetHeader>

          <div className="px-4">
            <form action={action} className="space-y-4 pt-4">
              <input type="hidden" name="id" value={bank.id} />

              <div>
                <Label>Bank Name</Label>
                <Input
                  name="bank_name"
                  defaultValue={bank.bank_name ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Account Name</Label>
                <Input
                  name="account_name"
                  defaultValue={bank.account_name ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Instructions</Label>
                <Input
                  name="instruction"
                  defaultValue={bank.instruction ?? ""}
                  required
                />
              </div>
              <div>
                <Label>Account Number</Label>
                <Input
                  name="account_number"
                  defaultValue={bank.account_number ?? ""}
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
