"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { createDeposit } from "@/server/actions/investment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectUser } from "@/components/admin/users/select-user";
import { SelectCrypto } from "@/components/common/select-crypto";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function InvestmentForm() {
  const [state, formAction, isPending] = useActionState(createDeposit, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  return (
    <Card className="max-w-xl mt-4">
      <CardHeader>
        <CardTitle>Create Investment</CardTitle>
        <CardDescription>
          Manually credit a user’s wallet with an investment deposit.
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select User
            </label>
            <SelectUser
              onChange={(val) =>
                (document.querySelector<HTMLInputElement>("#user_id")!.value =
                  val)
              }
            />
            <input type="hidden" name="user_id" id="user_id" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Select Coin
            </label>
            <SelectCrypto
              onChange={(val) =>
                (document.querySelector<HTMLInputElement>("#coin_id")!.value =
                  val)
              }
            />
            <input type="hidden" name="coin_id" id="coin_id" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <Input type="text" name="amount" required />
          </div>
        </CardContent>
        <CardFooter className="mt-5">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full flex justify-center items-center"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Creating Deposit...
              </>
            ) : (
              "Create Deposit"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
