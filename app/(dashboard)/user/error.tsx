/* eslint-disable @next/next/no-html-link-for-pages */

// app/user/error.tsx
"use client";
import { useEffect } from "react";
interface ErrorProps {
  error: Error;
  reset: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GeneralUserError({ error, reset }: ErrorProps) {
  useEffect(() => {}, [error]);
  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-semibold text-red-600">
        Something went wrong
      </h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <a
        href="/user"
        className="mt-4 rounded bg-primary px-4 py-2 cursor-pointer text-white hover:bg-primary/90"
      >
        Try again
      </a>
    </div>
  );
}
