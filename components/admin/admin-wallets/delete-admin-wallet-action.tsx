// components/admin/delete-admin-wallet-action.tsx
"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteAdminWallet } from "@/server/actions/admin-wallet";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export function DeleteAdminWalletAction({ id }: { id: number }) {
  const router = useRouter();
  const [state, action, isPending] = useActionState(deleteAdminWallet, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message)
      toast[state.success ? "success" : "error"](state.message);
    if (state.success) router.refresh();
  }, [state, router]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this address.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <form action={action}>
            <input type="hidden" name="id" value={id} />
            <AlertDialogAction asChild disabled={isPending}>
              <button type="submit">
                {isPending ? "Deleting…" : "Delete"}
              </button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
