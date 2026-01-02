"use client";

import { useUser } from "@/context/UserContext";

import { DocumentList } from "@/components/user/documents/DocumentList";

export default function DocumentsTab() {
  const { client } = useUser();

  if (!client) return null;

  return (
    <div className="space-y-6">
      <DocumentList userId={String(client.id)} />
    </div>
  );
}
