// components/admin/withdraw-bill/add-withdraw-bill-modal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
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
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createWithdrawBill } from "@/server/actions/withdraw-bill";
import { SelectUser } from "@/components/admin/users/select-user";

export default function AddWithdrawBillModal() {
  const [open, setOpen] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [state, action, isPending] = useActionState(createWithdrawBill, {
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
        <Button>Add Withdraw Bill</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Withdraw Bill</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <form action={action} className="space-y-4">
          <div>
            <Label>User</Label>
            <SelectUser onChange={(val) => (userRef.current!.value = val)} />
            <input type="hidden" name="user_id" ref={userRef} />
          </div>
          <div>
            <Label>Code</Label>
            <Input name="code" required />
          </div>
          <div>
            <Label>Code Name</Label>
            <Input name="code_name" required />
          </div>
          <div>
            <Label>Message</Label>
            <Input name="code_message" required />
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
