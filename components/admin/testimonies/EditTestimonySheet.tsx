/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/admin/testimonies/EditTestimonySheet.tsx
"use client";

import { useState, useEffect, cloneElement, ReactElement } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/common/FileUpload";
import { updateTestimony } from "@/server/actions/testimony";
import { TestimonyType } from "./TestimonyTable";
import Image from "next/image";

interface Props {
  testimony: TestimonyType;
  /** We expect the trigger to be a React element that supports an `onClick` prop. */
  children: ReactElement<any, any>;
}

export function EditTestimonySheet({ testimony, children }: Props) {
  const [open, setOpen] = useState(false);

  // Form state
  const [tpix, setTpix] = useState(testimony.tpix);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [tname, setTname] = useState(testimony.tname);
  const [toccupation, setToccupation] = useState(testimony.toccupation);
  const [tdescription, setTdescription] = useState(testimony.tdescription);

  // Action state for updateTestimony
  const [state, formAction, isPending] = useActionState(updateTestimony, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
    if (state.success) {
      setOpen(false); // close the sheet on success
    }
  }, [state]);

  // Clone the trigger passed as `children`, injecting an onClick handler
  const trigger = cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(true);
    },
  });

  return (
    <>
      {trigger}

      <Sheet open={open} onOpenChange={setOpen}>
        {/* We don't need a separate <SheetTrigger> here because we've already cloned the trigger above. */}
        <SheetContent className="max-w-md overflow-auto">
          <SheetHeader>
            <SheetTitle>Edit Testimony</SheetTitle>
            <SheetDescription>
              Update the fields below and click “Save.”
            </SheetDescription>
          </SheetHeader>

          <form action={formAction} className="space-y-4 pt-4">
            {/* Photo upload */}
            <div className="space-y-2">
              <Label>Photo</Label>
              <FileUpload
                folder="testimonies_photos"
                onUploadComplete={({ secure_url, public_id }) => {
                  setTpix(secure_url);
                  setPublicId(public_id);
                }}
              />
              {tpix && (
                <Image
                  width={50}
                  height={50}
                  src={tpix}
                  alt={tname}
                  className="h-20 w-20 rounded object-cover mt-2"
                />
              )}
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="tname">Name</Label>
              <Input
                id="tname"
                name="tname"
                value={tname}
                onChange={(e) => setTname(e.target.value)}
                required
              />
            </div>

            {/* Occupation */}
            <div>
              <Label htmlFor="toccupation">Occupation</Label>
              <Input
                id="toccupation"
                name="toccupation"
                value={toccupation}
                onChange={(e) => setToccupation(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="tdescription">Description</Label>
              <Textarea
                id="tdescription"
                name="tdescription"
                rows={4}
                value={tdescription}
                onChange={(e) => setTdescription(e.target.value)}
                required
              />
            </div>

            {/* Hidden inputs so updateTestimony can read them */}
            <input type="hidden" name="id" value={testimony.id} />
            <input type="hidden" name="tpix" value={tpix} />
            <input type="hidden" name="tname" value={tname} />
            <input type="hidden" name="toccupation" value={toccupation} />
            <input type="hidden" name="tdescription" value={tdescription} />

            <SheetFooter className="flex justify-between">
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button type="submit" disabled={isPending || !tpix}>
                {isPending ? "Saving…" : "Save Changes"}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
