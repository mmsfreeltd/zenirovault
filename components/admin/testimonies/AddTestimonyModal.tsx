/* eslint-disable @typescript-eslint/no-unused-vars */
// components/admin/testimonies/AddTestimonyModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/common/FileUpload";
import { createTestimony } from "@/server/actions/testimony";
import Image from "next/image";

interface Props {
  onSuccess: () => void;
}

export function AddTestimonyModal({ onSuccess }: Props) {
  const [open, setOpen] = useState(false);
  const [tpix, setTpix] = useState(""); // secure_url from FileUpload
  const [publicId, setPublicId] = useState(""); // for potential replace
  const [tname, setTname] = useState("");
  const [toccupation, setToccupation] = useState("");
  const [tdescription, setTdescription] = useState("");

  const [state, formAction, isPending] = useActionState(createTestimony, {
    success: false,
    message: "",
  });

  // On action result: toast + close + refresh
  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
    if (state.success) {
      setOpen(false);
      // Let parent know to reload table
      onSuccess();
      // Reset fields
      setTpix("");
      setPublicId("");
      setTname("");
      setToccupation("");
      setTdescription("");
    }
  }, [state]);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Testimony</Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-md"
        // allow clicks through to the Cloudinary iframe
        onInteractOutside={(e) => e.preventDefault()}
      >
        <form action={formAction} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Add New Testimony</DialogTitle>
            <DialogDescription>
              Enter details and upload a photo.
            </DialogDescription>
          </DialogHeader>

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
                alt="preview"
                className="h-20 w-20 rounded object-cover mt-2"
              />
            )}
          </div>

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

          {/* Hidden fields for server‐action */}
          <input type="hidden" name="tpix" value={tpix} />
          <input type="hidden" name="tname" value={tname} />
          <input type="hidden" name="toccupation" value={toccupation} />
          <input type="hidden" name="tdescription" value={tdescription} />

          <DialogFooter className="flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !tpix}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
