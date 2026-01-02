"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectUser } from "@/components/admin/users/select-user";
import { Loader2 } from "lucide-react";

export default function ModifyClientCard() {
  const [userId, setUserId] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleView = () => {
    if (!userId) return;
    startTransition(() => {
      router.push(`/admin/users/${userId}`);
    });
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Select Client</CardTitle>
      </CardHeader>
      <CardContent>
        <SelectUser onChange={setUserId} />
      </CardContent>
      <CardFooter>
        <Button onClick={handleView} disabled={!userId || isPending}>
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading...
            </span>
          ) : (
            "View More"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
