// app/admin/copy-traders/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function CopyTradersError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Error in /admin/copy-traders:", error);
  }, [error]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button
        className="mt-4 rounded bg-primary px-4 py-2 cursor-pointer text-white hover:bg-primary/90"
        onClick={() => {
          reset(); // retry rendering the page
          router.refresh(); // re-run the server code
        }}
      >
        Try again
      </button>
    </div>
  );
}
