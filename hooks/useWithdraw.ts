/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useWithdraw.ts
"use client";
import { useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type CodePayload = {
  id: number;
  code_name: string;
  code_message: string;
};

export type WithdrawResponse =
  | { success: true; message: string }
  | { success: false; needCode: true; code: CodePayload }
  | { success: false; message: string };

export interface BankDetails {
  bankName: string;
  beneName: string;
  accountNumber: string;
  routingNumber: string;
}

export function useWithdraw(userId: string, progressStop: number) {
  const router = useRouter();

  // 1) common form fields
  const [method, setMethod] = useState<"bank" | "cash" | "crypto">("bank");
  const [depositId, setDepositId] = useState("");
  const [amount, setAmount] = useState("");

  // 2) bank
  const [bankDetails, setBankDetails] = useState<BankDetails>({
    bankName: "",
    beneName: "",
    accountNumber: "",
    routingNumber: "",
  });
  const updateBankField = useCallback(
    (field: keyof BankDetails, value: string) =>
      setBankDetails((b) => ({ ...b, [field]: value })),
    []
  );

  // 3) cash
  const [cashLocation, setCashLocation] = useState("");

  // 4) crypto
  const [cryptoWalletId, setCryptoWalletId] = useState("");
  const [cryptoAddress, setCryptoAddress] = useState("");

  // 5) multi‐step code flow
  const [pendingCode, setPendingCode] = useState<CodePayload | null>(null);
  const [codeInput, setCodeInput] = useState("");

  // 6) loading / progress
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [progress, setProgress] = useState(0);

  // submit handler
  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setProgress(0);

      // animate up to progressStop
      await new Promise<void>((resolve) => {
        const iv = setInterval(() => {
          setProgress((p) => {
            if (p >= progressStop) {
              clearInterval(iv);
              resolve();
              return progressStop;
            }
            return p + 1;
          });
        }, 100);
      });

      try {
        const payload: any = {
          user_id: userId,
          method,
          deposit_id: depositId,
          amount: Number(amount),
        };

        if (method === "bank") {
          payload.bank_name = bankDetails.bankName;
          payload.bene_name = bankDetails.beneName;
          payload.account_number = bankDetails.accountNumber;
          payload.routing_number = bankDetails.routingNumber;
        }

        if (method === "cash") {
          payload.cash_location = cashLocation;
        }

        if (method === "crypto") {
          payload.wallet_id = cryptoWalletId;
          payload.crypto_address = cryptoAddress;
        }

        const res = await axios.post<WithdrawResponse>(
          "/api/user/withdraw",
          payload
        );

        if (res.data.success) {
          toast.success(res.data.message);
          router.push("/user/transactions");
        } else if ("needCode" in res.data && res.data.needCode) {
          setPendingCode(res.data.code);
        } else {
          toast.error((res.data as any).message);
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      userId,
      method,
      depositId,
      amount,
      bankDetails,
      cashLocation,
      cryptoWalletId,
      cryptoAddress,
      router,
      progressStop,
    ]
  );

  // code‐verify handler
  const verify = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!pendingCode) return;
      setIsVerifying(true);

      try {
        const payload = {
          user_id: userId,
          method,
          deposit_id: depositId,
          amount: Number(amount),
          code_id: pendingCode.id,
          code_input: codeInput,
        };
        const res = await axios.post<WithdrawResponse>(
          "/api/user/withdraw/verify",
          payload
        );

        if (res.data.success) {
          toast.success(res.data.message);
          setPendingCode(null);
        } else if ("needCode" in res.data && res.data.needCode) {
          setPendingCode(res.data.code);
          setCodeInput("");
        } else {
          toast.error((res.data as any).message);
        }
      } catch (err: any) {
        toast.error(err?.response?.data?.message || err.message);
      } finally {
        setIsVerifying(false);
      }
    },
    [userId, method, depositId, amount, codeInput, pendingCode]
  );

  return {
    // form state
    method,
    setMethod,
    depositId,
    setDepositId,
    amount,
    setAmount,

    // bank
    bankDetails,
    updateBankField,

    // cash
    cashLocation,
    setCashLocation,

    // crypto
    cryptoWalletId,
    setCryptoWalletId,
    cryptoAddress,
    setCryptoAddress,

    // code flow
    pendingCode,
    codeInput,
    setCodeInput,

    // loaders
    isSubmitting,
    isVerifying,
    progress,

    // actions
    submit,
    verify,
  };
}
