// components/user/ProveUploadForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createProof } from "@/server/actions/prove";
import { FileUpload } from "@/components/common/FileUpload";

export function ProveUploadForm({ userId }: { userId: string }) {
  const [fileUrl, setFileUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [state, formAction, isPending] = useActionState(createProof, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6 max-w-md mx-auto">
      <div className="mb-6">
        <Label>Upload Proof (image or PDF)</Label>
        <FileUpload
          folder={`user_proofs/${userId}`}
          onUploadComplete={({ secure_url, public_id }) => {
            setFileUrl(secure_url);
            setPublicId(public_id);
          }}
        />
        {fileUrl && (
          <p className="text-sm text-muted-foreground mt-2">
            Uploaded:{" "}
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {fileUrl.split("/").pop()}
            </a>
          </p>
        )}
      </div>

      <input type="hidden" name="user_id" value={userId} />
      <input type="hidden" name="pop" value={fileUrl} />
      <input type="hidden" name="pop_id" value={publicId} />

      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          placeholder="Enter amount"
          required
        />
      </div>

      <div>
        <Label htmlFor="payment_mode">Payment Mode</Label>
        <Input
          id="payment_mode"
          name="payment_mode"
          placeholder="e.g. Bank, Crypto"
          required
        />
      </div>

      <div>
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          name="reason"
          placeholder="Optional note…"
          rows={3}
        />
      </div>

      <Button type="submit" disabled={isPending || !fileUrl} className="w-full">
        {isPending ? "Submitting…" : "Submit Proof"}
      </Button>
    </form>
  );
}
