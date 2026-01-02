// app/admin/profile/error.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface Props {
  error: Error;
  reset: () => void;
}

export default function ProfileError({ error, reset }: Props) {
  const router = useRouter();
  useEffect(() => console.error("Profile load error:", error), [error]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-semibold text-red-600">
        Unable to load profile
      </h2>
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
