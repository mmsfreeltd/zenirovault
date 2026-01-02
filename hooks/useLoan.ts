// hooks/useLoan.ts
import { useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export function useLoan() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const request = useCallback(
    async (amount: number) => {
      setIsSubmitting(true);
      try {
        const res = await axios.post("/api/user/loans", {
          amount_requested: amount,
        });
        router.refresh(); // reload the list
        return res.data.loan;
      } finally {
        setIsSubmitting(false);
      }
    },
    [router]
  );

  return { isSubmitting, request };
}
