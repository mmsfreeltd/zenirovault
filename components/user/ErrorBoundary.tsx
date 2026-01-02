"use client";

import { useUser } from "@/context/AuthUserContext";
import { ReactNode } from "react";
import PageLoadingSpinner from "@/components/common/loading-spinner";
export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const { client, loading } = useUser();
  if (loading) {
    return <PageLoadingSpinner />;
  }

  // if (error) {
  //   throw new Error(error);
  // }
  return <>{client && children}</>;
}
