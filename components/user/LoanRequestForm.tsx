// components/user/LoanRequestForm.tsx
"use client";
import { useState } from "react";
import { useLoan } from "@/hooks/useLoan";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export function LoanRequestForm() {
  const [amount, setAmount] = useState("");
  const { isSubmitting, request } = useLoan();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return toast.error("Invalid amount");
    await request(amt);
    toast.success("Loan request submitted");
    setAmount("");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-sm">
      <div>
        <Label htmlFor="loan_amount">Amount</Label>
        <Input
          id="loan_amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Requesting…" : "Request Loan"}
      </Button>
    </form>
  );
}
