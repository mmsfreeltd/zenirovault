// components/common/FileUpload.tsx
"use client";

import { useState } from "react";
import { CldUploadWidget, type CldUploadWidgetProps } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type UploadWidgetProps = Omit<CldUploadWidgetProps, "onUpload"> & {
  folder: string;
  onUploadComplete: (info: { secure_url: string; public_id: string }) => void;
};

export function FileUpload({
  folder,
  onUploadComplete,
  ...widgetProps
}: UploadWidgetProps) {
  const [publicId, setPublicId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // delete the old file on Cloudinary
  async function deleteOld(public_id: string) {
    try {
      await fetch("/api/cloudinary/destroy", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id }),
      });
    } catch {
      console.error("Failed to delete old file:", public_id);
    }
  }

  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
      options={{
        resourceType: "raw",
        maxFiles: 1,
        sources: ["local", "camera"],
        folder: folder,
      }}
      onSuccess={async (result) => {
        setIsUploading(false);
        const info = Array.isArray(result.info) ? result.info[0] : result.info;
        if (!info || typeof info === "string") {
          toast.error("Upload succeeded but no info returned");
          return;
        }

        // store new public_id and fire callback
        setPublicId(info.public_id);
        onUploadComplete({
          secure_url: info.secure_url,
          public_id: info.public_id,
        });
        toast.success("Upload successful");
      }}
      onError={() => {
        setIsUploading(false);
        toast.error("Upload failed");
      }}
      onClose={() => {
        setIsUploading(false);
      }}
      onAbort={() => {
        setIsUploading(false);
      }}
      {...widgetProps}
    >
      {({ open }) => (
        <Button
          type="button"
          variant="outline"
          disabled={isUploading}
          onClick={async () => {
            setIsUploading(true);
            // if there's an old file, delete it
            if (publicId) {
              await deleteOld(publicId);
              setPublicId(null);
            }
            open?.();
          }}
        >
          {isUploading
            ? "Uploading…"
            : publicId
            ? "Replace File…"
            : "Choose File…"}
        </Button>
      )}
    </CldUploadWidget>
  );
}
