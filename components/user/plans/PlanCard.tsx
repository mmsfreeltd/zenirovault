// components/user/PlanCard.tsx
"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export type Plan = {
  id: number;
  plan_name: string;
  plan_roi: string;
  plan_min_deposit: string;
  plan_max_deposit: string;
  min_return: string;
  max_return: string;
  gift_bonus: string;
  plan_interval: string;
  topup_type: string;
  topup_amount: string;
  investment_duration: string;
  plan_description: string;
};

interface PlanCardProps {
  plan: Plan;
  onSelect?: (planId: number) => void;
}

export function PlanCard({ plan, onSelect }: PlanCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{plan.plan_name}</CardTitle>
        <CardDescription>ROI: {plan.plan_roi}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-2 text-sm">
        <div>
          <strong>Deposit Range:</strong> {plan.plan_min_deposit} –{" "}
          {plan.plan_max_deposit}
        </div>

        <div>
          <strong>Gift Bonus:</strong> {plan.gift_bonus}
        </div>
        <div>
          <strong>Interval:</strong> {plan.plan_interval}
        </div>
        <div>
          <strong>Top-up:</strong> {plan.topup_type} {plan.topup_amount}
        </div>
        <div>
          <strong>Duration:</strong> {plan.investment_duration}
        </div>
        <div className="mt-2 text-xs text-muted-foreground line-clamp-3">
          {plan.plan_description}
        </div>
      </CardContent>
      {onSelect && (
        <CardFooter>
          <Button className="w-full" onClick={() => onSelect(plan.id)}>
            Choose Plan
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
