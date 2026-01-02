// components/user/PlansGrid.tsx
"use client";

import React from "react";
import { PlanCard, Plan } from "@/components/user/plans/PlanCard";

interface PlansGridProps {
  plans: Plan[];
  onSelect?: (planId: number) => void;
}

export function PlansGrid({ plans, onSelect }: PlansGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} onSelect={onSelect} />
      ))}
    </div>
  );
}
