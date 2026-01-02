// components/admin/testimonies/DeleteTestimonyAction.tsx
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
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
} from "@/components/ui/alert-dialog";
import { deleteTestimony } from "@/server/actions/testimony";

interface Props {
  id: number;
  onDeleted?: () => void; // optional callback to refresh parent
}

export function DeleteTestimonyAction({ id, onDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(deleteTestimony, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
    if (state.success) {
      setOpen(false);
      onDeleted?.(); // tell parent to reload
    }
  }, [state, onDeleted]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" title="Delete">
          🗑️
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this testimony? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-end space-x-2">
          <AlertDialogAction asChild disabled={isPending}>
            <button type="button">Cancel</button>
          </AlertDialogAction>
          <AlertDialogAction asChild disabled={isPending}>
            <form action={formAction}>
              <input type="hidden" name="id" value={id} />
              <button type="submit">
                {isPending ? "Deleting…" : "Delete"}
              </button>
            </form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
