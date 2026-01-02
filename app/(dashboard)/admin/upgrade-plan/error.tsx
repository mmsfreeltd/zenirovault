// app/admin/upgrade-plan/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function UpgradePlanError({ error, reset }: ErrorProps) {
  const router = useRouter();
  useEffect(() => console.error("Upgrade plan error:", error), [error]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-semibold text-red-600">
        Failed to load plans
      </h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button
        className="mt-4 rounded bg-primary px-4 py-2 text-white hover:bg-primary/90"
        onClick={() => {
          reset();
          router.refresh();
        }}
      >
        Retry
      </button>
    </div>
  );
}
