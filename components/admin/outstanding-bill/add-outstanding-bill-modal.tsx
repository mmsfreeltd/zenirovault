// components/admin/outstanding-bill/add-outstanding-bill-modal.tsx
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
import { createOutstandingBill } from "@/server/actions/outstanding-bill";
import { SelectUser } from "@/components/admin/users/select-user";

export default function AddOutstandingBillModal() {
  const [open, setOpen] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [state, action, isPending] = useActionState(createOutstandingBill, {
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
        <Button>Add Outstanding Bill</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Outstanding Bill</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <form action={action} className="space-y-4">
          <div>
            <Label>User</Label>
            <SelectUser onChange={(val) => (userRef.current!.value = val)} />
            <input type="hidden" name="user_id" ref={userRef} />
          </div>
          <div>
            <Label>Fee Name</Label>
            <Input name="fee_name" required />
          </div>
          <div>
            <Label>Fee Amount</Label>
            <Input name="fee_amount" required />
          </div>
          <div>
            <Label>Description</Label>
            <Input name="fee_desc" required />
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
