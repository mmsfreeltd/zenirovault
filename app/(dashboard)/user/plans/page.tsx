// app/user/plans/page.tsx
import PlansWrapper from "@/components/user/plans/PlanWrapper";
import { db } from "@/db";
import { Metadata } from "next";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Available plans",
};

export default async function PlansPage() {
  const plans = await db.query.plans.findMany();
  return (
    <main className="container mx-auto p-6">
      <PlansWrapper plans={plans} />
    </main>
  );
}
