// app/prove/page.tsx
"use client";
import PageLoadingSpinner from "@/components/common/loading-spinner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ProveUploadForm } from "@/components/user/ProveUploadForm";
import { useUser } from "@/context/AuthUserContext";

export default function ProveComponent() {
  const { client } = useUser();
  return (
    <>
      {!client ? (
        <PageLoadingSpinner />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Upload Proof of deposit</CardTitle>
            <CardDescription>
              For deposit validation do well to upload your proof of deposit
              below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ProveUploadForm userId={String(client?.id)} />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      )}
    </>
  );
}
