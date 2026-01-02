// components/admin/add-admin-wallet-modal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
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
import { createAdminWallet } from "@/server/actions/admin-wallet";
import { SelectCrypto } from "@/components/common/select-crypto";

export default function AddAdminWalletModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const coinRef = useRef<HTMLInputElement>(null);
  const [state, action, isPending] = useActionState(createAdminWallet, {
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
        <Button>Add Funding Address</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Funding Address</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div>
            <Label>Wallet Name</Label>
            <Input name="wallet_name" required />
          </div>
          <div>
            <Label>Coin</Label>
            <SelectCrypto
              onChange={(val) => {
                if (coinRef.current) coinRef.current.value = val;
              }}
            />
            <input type="hidden" name="coin_id" ref={coinRef} />
          </div>
          <div>
            <Label>Wallet Address</Label>
            <Input name="wallet_address" required />
          </div>
          <div>
            <Label>Network</Label>
            <Input name="wallet_network" required />
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
