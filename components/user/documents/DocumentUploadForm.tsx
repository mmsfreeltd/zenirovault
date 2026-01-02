// components/user/DocumentUploadModal.tsx
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { createDocument } from "@/server/actions/document";
import { FileUpload } from "@/components/common/FileUpload";
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
import { Label } from "@/components/ui/label";

const DOC_TYPES = ["ID Card", "Proof of Address", "Selfie", "Other"] as const;

export function DocumentUploadModal({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [docType, setDocType] = useState<(typeof DOC_TYPES)[number]>(
    DOC_TYPES[0]
  );
  const [fileUrl, setFileUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [state, formAction, isPending] = useActionState(createDocument, {
    success: false,
    message: "",
  });

  // show toast & reset on success
  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
      if (state.success) {
        // reset form
        setDocType(DOC_TYPES[0]);
        setFileUrl("");
        setPublicId("");
        setOpen(false);
      }
    }
  }, [state]);

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="ml-4">
        <Button>Upload Document</Button>
      </DialogTrigger>

      <DialogContent
        // allow clicks through to the Cloudinary iframe
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription>
            Select document type and choose a file to upload.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {/* user id */}
          <input type="hidden" name="user_id" value={userId} />

          {/* document type */}
          <div>
            <Label htmlFor="doc_type">Document Type</Label>
            <select
              id="doc_type"
              name="doc_type"
              className="block w-full border rounded px-2 py-1"
              value={docType}
              onChange={(e) =>
                setDocType(e.target.value as (typeof DOC_TYPES)[number])
              }
            >
              {DOC_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* file picker */}
          <div>
            <Label>Choose file</Label>
            <FileUpload
              folder={`user_docs/${userId}`}
              onUploadComplete={({ secure_url, public_id }) => {
                setFileUrl(secure_url);
                setPublicId(public_id);
              }}
            />
          </div>

          {/* pass along in hidden inputs */}
          <input type="hidden" name="file_url" value={fileUrl} />
          <input type="hidden" name="public_id" value={publicId} />

          <DialogFooter className="flex justify-end">
            <Button type="submit" disabled={isPending || !fileUrl}>
              {isPending ? "Uploading…" : "Upload Document"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
