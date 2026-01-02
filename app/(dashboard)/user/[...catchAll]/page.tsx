// app/user/not-found.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center space-y-6 bg-background px-4">
      <AlertCircle className="h-16 w-16 text-destructive opacity-80 animate-pulse" />
      <h1 className="text-5xl font-extrabold">404</h1>
      <p className="text-lg text-muted-foreground max-w-md text-center">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link href="/user" passHref>
        <Button size="lg" variant="outline" className="px-8">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
