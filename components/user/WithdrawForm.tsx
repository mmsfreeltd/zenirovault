// components/user/WithdrawForm.tsx
"use client";

import { useWithdraw } from "@/hooks/useWithdraw";
import { SelectDeposit } from "@/components/common/select-deposit";
import { BankWithdrawalFields } from "@/components/user/withdrawal/BankWithdrawalFields";
import { SelectCrypto } from "@/components/common/select-crypto";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function WithdrawForm({ userId }: { userId: string }) {
  const {
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

    // code‐verification
    pendingCode,
    codeInput,
    setCodeInput,
    isVerifying,
    verify,

    // submission
    isSubmitting,
    progress,
    submit,
  } = useWithdraw(userId, /* progressStop= */ 96);

  // step: code verification
  if (pendingCode) {
    return (
      <Dialog open onOpenChange={() => undefined}>
        <DialogContent>
          <form onSubmit={verify} className="space-y-4">
            <DialogHeader>
              <DialogTitle>{pendingCode.code_name}</DialogTitle>
              <DialogDescription>{pendingCode.code_message}</DialogDescription>
            </DialogHeader>
            <div>
              <Label htmlFor="code_input">Enter Code</Label>
              <Input
                id="code_input"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isVerifying}>
                {isVerifying ? "Verifying…" : "Verify"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  // main withdrawal form
  return (
    <form onSubmit={submit}>
      {isSubmitting && <Progress value={progress} className="w-full mb-4" />}

      <Card>
        <CardHeader>
          <CardTitle>Withdraw Funds</CardTitle>
          <CardDescription>
            Choose method, pick a deposit, and enter an amount.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* 1) Method selector */}
          <RadioGroup
            defaultValue="bank"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onValueChange={(v) => setMethod(v as any)}
            className="flex space-x-4"
          >
            {["bank", "cash", "crypto"].map((m) => (
              <Label key={m} className="flex items-center space-x-1">
                <RadioGroupItem value={m} />
                <span className="capitalize">{m}</span>
              </Label>
            ))}
          </RadioGroup>

          {/* 2) Deposit picker */}
          <div>
            <Label>Select Deposit</Label>
            <SelectDeposit userId={userId} onChange={setDepositId} />
          </div>

          {/* 3a) Bank fields */}
          {method === "bank" && (
            <BankWithdrawalFields
              details={bankDetails}
              onChangeField={updateBankField}
            />
          )}

          {/* 3b) Cash pickup */}
          {method === "cash" && (
            <div>
              <Label htmlFor="cash_location">Pickup Location</Label>
              <Input
                id="cash_location"
                value={cashLocation}
                onChange={(e) => setCashLocation(e.target.value)}
                placeholder="e.g. Branch name or address"
                required
              />
            </div>
          )}

          {/* 3c) Crypto withdraw: select coin + enter address */}
          {method === "crypto" && (
            <>
              <div>
                <Label>Select Coin</Label>
                <SelectCrypto
                  defaultValue={
                    cryptoWalletId ? Number(cryptoWalletId) : undefined
                  }
                  onChange={setCryptoWalletId}
                />
              </div>
              <div>
                <Label htmlFor="crypto_address">Destination Address</Label>
                <Input
                  id="crypto_address"
                  value={cryptoAddress}
                  onChange={(e) => setCryptoAddress(e.target.value)}
                  placeholder="Enter your wallet address"
                  required
                />
              </div>
            </>
          )}

          {/* 4) Amount */}
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !depositId ||
              Number(amount) <= 0 ||
              (method === "cash" && !cashLocation) ||
              (method === "crypto" && (!cryptoWalletId || !cryptoAddress))
            }
          >
            {isSubmitting ? "Processing…" : "Withdraw"}
          </Button>
        </CardFooter>
      </Card>

      {/* hidden fields for payload */}
      <input type="hidden" name="deposit_id" value={depositId} />
      <input type="hidden" name="method" value={method} />
      {method === "crypto" && (
        <>
          <input type="hidden" name="wallet_id" value={cryptoWalletId} />
          <input type="hidden" name="crypto_address" value={cryptoAddress} />
        </>
      )}
      {method === "cash" && (
        <input type="hidden" name="cash_location" value={cashLocation} />
      )}
    </form>
  );
}
