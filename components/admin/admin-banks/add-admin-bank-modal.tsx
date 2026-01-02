// components/admin/add-admin-bank-modal.tsx
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
import { createAdminBank } from "@/server/actions/admin-bank";

export default function AddAdminBankModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, action, isPending] = useActionState(createAdminBank, {
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
        <Button>Add Bank</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Bank Details</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div>
            <Label>Bank Name</Label>
            <Input name="bank_name" required />
          </div>
          <div>
            <Label>Account Name</Label>
            <Input name="account_name" required />
          </div>
          <div>
            <Label>Instructions</Label>
            <Input name="instruction" required />
          </div>
          <div>
            <Label>Account Number</Label>
            <Input name="account_number" required />
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
