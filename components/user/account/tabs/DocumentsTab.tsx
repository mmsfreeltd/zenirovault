"use client";
import { useUser } from "@/context/AuthUserContext";
import { DocumentUploadModal } from "@/components/user/documents/DocumentUploadForm";
import { DocumentList } from "@/components/user/documents/DocumentList";

export default function DocumentsTab() {
  const { client } = useUser();

  if (!client) return null;

  return (
    <>
      <DocumentList userId={String(client.id)} />
      <DocumentUploadModal userId={String(client.id)} />
    </>
  );
}
