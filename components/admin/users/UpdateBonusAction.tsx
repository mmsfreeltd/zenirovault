// components/admin/users/UpdateBonusAction.tsx
"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useActionState } from "react";
import { updateBonus } from "@/server/actions/clients";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

export function UpdateBonusAction() {
  const { client, updateClient } = useUser();
  const [open, setOpen] = useState(false);
  const [deltaValue, setDeltaValue] = useState("");

  const [state, formAction, isPending] = useActionState(updateBonus, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (!state.message) return;

    // on success, add delta to existing bonus in context
    if (state.success) {
      const delta = parseFloat(deltaValue);
      updateClient({ bonus: (client?.bonus ?? 0) + delta });
    }
    toast[state.success ? "success" : "error"](state.message);
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="default" className="gap-1">
          <PlusCircle className="h-4 w-4" /> Add Bonus
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User Bonus</DialogTitle>
          <DialogDescription>
            Add a bonus amount to this user.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4 py-4">
          <input type="hidden" name="userId" value={client.id} />
          <div>
            <Label htmlFor="bonus">Bonus Amount</Label>
            <Input
              id="bonus"
              name="bonus"
              type="number"
              step="0.01"
              value={deltaValue}
              onChange={(e) => setDeltaValue(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating…" : "Add Bonus"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
