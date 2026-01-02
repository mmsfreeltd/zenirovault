"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { AccountStatusSelect } from "../../common/AccountStatusSelect";
import { ClientType } from "@/types";
import { useState } from "react";

export function UserSheet({
  user,
  open,
  onOpenChange,
}: {
  user: ClientType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    Number(user.status)
  );
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="p-4">
        <SheetHeader>
          <SheetTitle>Edit User</SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>
        <form className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue={user.username as string} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" defaultValue={user.email as string} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue={user.phone as string} />
          </div>
          <div className="space-y-2">
            <AccountStatusSelect
              value={selectedStatus}
              onChange={(id) => setSelectedStatus(id)}
            />
          </div>
        </form>
        <SheetFooter className="mt-6">
          <Button type="submit" className="w-full">
            Save
          </Button>
          <SheetClose asChild>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
