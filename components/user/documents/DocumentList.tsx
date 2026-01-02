// components/user/DocumentList.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import PageLoadingSpinner from "@/components/common/loading-spinner";
import { DeleteDocumentAction } from "@/components/user/documents/DeleteDocumentAction";

type Doc = {
  id: number;
  doc_type: string;
  file_url: string;
  date_uploaded: string;
};

export function DocumentList({ userId }: { userId: string }) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<Doc[]>(
          `/api/user/documents?user_id=${userId}`
        );
        setDocs(res.data);
      } catch {
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };
    loadDocs();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center p-6">
        <PageLoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-center text-red-600">{error}</div>;
  }

  // apply filter
  const visible = docs.filter((d) =>
    d.doc_type.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4 p-4">
      <Input
        placeholder="Filter by type…"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Uploaded</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Download</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length > 0 ? (
              visible.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    {format(new Date(doc.date_uploaded), "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell>{doc.doc_type}</TableCell>
                  <TableCell>
                    <a
                      href={doc.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </TableCell>
                  <TableCell>
                    <DeleteDocumentAction
                      id={doc.id}
                      onDeleted={(deletedId) =>
                        setDocs((prev) =>
                          prev.filter((d) => d.id !== deletedId)
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  No documents found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
