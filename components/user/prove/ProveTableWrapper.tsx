"use client";
import { useUser } from "@/context/AuthUserContext";
import { ProveTable } from "./ProveTable";
import PageLoadingSpinner from "@/components/common/loading-spinner";

export default function ProveTableWrapper() {
  const { client } = useUser();
  return (
    <>
      {!client ? (
        <PageLoadingSpinner />
      ) : (
        <ProveTable clientId={String(client?.id)} />
      )}
    </>
  );
}
