"use client";
import { useEffect, useState, ReactElement } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { updateTransaction } from "@/server/actions/transaction";

export function EditTransactionSheet({
  transaction,
  children,
}: {
  transaction: { id: number; status: string, amount:string };
  children: ReactElement;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(updateTransaction, {
    success: false,
    message: "",
  });

  // Show toast & close on success, then refresh
  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
    if (state.success) {
      setOpen(false);
      router.refresh();
    }
  }, [state, router]);

  return (
    <>
      <div
        onPointerDown={(e) => {
          // prevent the menu from thinking we clicked outside
          e.preventDefault();
          setOpen(true);
        }}
      >
        {children}
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>
              Update the status of this transaction.
            </SheetDescription>
          </SheetHeader>
          <div className="px-6">
            <form action={formAction} className="space-y-4 pt-4">
              <input type="hidden" name="id" value={transaction.id} />
              <div>
                <Label
                  htmlFor="status"
                  className="block text-sm font-medium mb-1"
                >
                  Status
                </Label>
                <Select name="status" defaultValue={transaction.status}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Successful">Successful</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Reversed">Reversed</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Input
                    name="amount" 
                    placeholder="Enter Amount"
                    defaultValue={transaction.amount}
                    className="w-full max-w-sm"
                  />
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
