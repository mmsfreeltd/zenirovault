/* eslint-disable @typescript-eslint/no-explicit-any */
// components/user/DepositForm.tsx
"use client";

import { useEffect, useState } from "react";
import { useActionState } from "react";
import { createUserDeposit } from "@/server/actions/deposit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectBank } from "@/components/common/SelectBank";
import { SelectWallet } from "@/components/common/SelectWallet";
import { toast } from "sonner";
import Image from "next/image";
import QRCode from "react-qr-code";
import { Copy } from "lucide-react";
import Link from "next/link";

export function DepositForm() {
  const [method, setMethod] = useState<"bank" | "crypto">("bank");
  const [bankId, setBankId] = useState<string>("");
  const [bankObj, setBankObj] = useState<any>(null);
  const [walletId, setWalletId] = useState<string>("");
  const [walletObj, setWalletObj] = useState<any>(null);
  const [amount, setAmount] = useState<string>("");

  const [state, formAction, isPending] = useActionState(createUserDeposit, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <>
      <form action={formAction}>
        <Card>
          <CardHeader>
            <CardTitle>Make a Deposit</CardTitle>
            <CardDescription>Select method and enter amount</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Method</Label>
              <RadioGroup
                defaultValue="bank"
                onValueChange={(v: any) => {
                  setMethod(v as any);
                  setBankId("");
                  setBankObj(null);
                  setWalletId("");
                  setWalletObj(null);
                }}
                className="flex gap-4"
              >
                <Label className="flex items-center space-x-1">
                  <RadioGroupItem value="bank" />
                  <span>Bank</span>
                </Label>
                <Label className="flex items-center space-x-1">
                  <RadioGroupItem value="crypto" />
                  <span>Crypto</span>
                </Label>
              </RadioGroup>
            </div>

            {method === "bank" ? (
              <>
                <SelectBank
                  defaultValue={bankId}
                  onChange={setBankId}
                  onSelect={setBankObj}
                />
                {bankObj && (
                  <div className="p-4 border rounded space-y-2">
                    <div>
                      <strong>Account Name:</strong> {bankObj.account_name}
                    </div>
                    <div className="flex items-center space-x-2">
                      <strong>Account Number:</strong> {bankObj.account_number}
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => copyToClipboard(bankObj.account_number)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    {bankObj.instruction && (
                      <div>
                        <strong>Instructions:</strong> {bankObj.instruction}
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <SelectWallet
                  defaultValue={walletId}
                  onChange={setWalletId}
                  onSelect={setWalletObj}
                />
                {walletObj && (
                  <div className="p-4 border rounded space-y-4">
                    <div className="flex items-center space-x-2">
                      <strong>Network:</strong> {walletObj.wallet_network}
                    </div>
                    <div className="flex items-center space-x-2">
                      <strong>Address:</strong> {walletObj.wallet_address}
                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() =>
                          copyToClipboard(walletObj.wallet_address)
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <Image
                      width={40}
                      height={40}
                      src={walletObj.wallet_icon}
                      alt="wallet"
                      className="h-6 w-6 rounded"
                    />

                    <div className="mt-4">
                      <QRCode
                        value={walletObj.wallet_address}
                        size={128}
                        className="mx-auto"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <input type="hidden" name="method" value={method} />
            {method === "bank" && (
              <input type="hidden" name="bank_id" value={bankId} />
            )}
            {method === "crypto" && (
              <input type="hidden" name="wallet_id" value={walletId} />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" disabled={isPending || !amount}>
              {isPending ? "Submitting..." : "Deposit"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/user/prove">Upload Proof of Deposits</Link>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
