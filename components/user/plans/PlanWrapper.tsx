"use client";
// app/user/plans/page.tsx
import { PlansGrid } from "@/components/user/plans/PlansGrid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PlansWrapper({ plans }: { plans: any }) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Our Investment Plans</h1>
      <PlansGrid plans={plans} />
    </>
  );
}
