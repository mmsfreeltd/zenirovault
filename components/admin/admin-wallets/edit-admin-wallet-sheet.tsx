// components/admin/edit-admin-wallet-sheet.tsx
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
import { SelectCrypto } from "@/components/common/select-crypto";
import { updateAdminWallet } from "@/server/actions/admin-wallet";
import { AdminWalletType } from "@/types";

export function EditAdminWalletSheet({
  wallet,
  children,
}: {
  wallet: AdminWalletType;
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const coinRef = useRef<HTMLInputElement>(null);
  const [state, action, isPending] = useActionState(updateAdminWallet, {
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
            <SheetTitle>Edit Funding Address</SheetTitle>
            <SheetDescription>Modify wallet details.</SheetDescription>
          </SheetHeader>

          <div className="px-4">
            <form action={action} className="space-y-4 pt-4">
              <input type="hidden" name="id" value={wallet.id} />

              <div>
                <Label>Wallet Name</Label>
                <Input
                  name="wallet_name"
                  defaultValue={wallet.wallet_name}
                  required
                />
              </div>
              <div>
                <Label>Coin</Label>
                <SelectCrypto
                  defaultValue={Number(wallet.coin_id)}
                  onChange={(val) => {
                    if (coinRef.current) coinRef.current.value = val;
                  }}
                />
                <input
                  type="hidden"
                  name="coin_id"
                  ref={coinRef}
                  defaultValue={wallet.coin_id ?? ""}
                />
              </div>
              <div>
                <Label>Wallet Address</Label>
                <Input
                  name="wallet_address"
                  defaultValue={wallet.wallet_address}
                  required
                />
              </div>
              <div>
                <Label>Network</Label>
                <Input
                  name="wallet_network"
                  defaultValue={wallet.wallet_network as string}
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
