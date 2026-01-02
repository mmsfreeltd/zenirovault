"use client";

import { useUser } from "@/context/UserContext";
import { SelectCurrency } from "@/components/common/select-currency";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { updateClientAction } from "@/server/actions/clients";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AssignCurrencyAction() {
  const { client, updateClient } = useUser();
  const [currencyCode, setCurrencyCode] = useState<string>(
    client?.currency ?? ""
  );

  const [state, formAction, isPending] = useActionState(updateClientAction, {
    success: false,
    message: "",
  });

  // Reflect change and show toast
  useEffect(() => {
    console.log(state);

    if (state.message) {
      updateClient({ currency: currencyCode }, false);
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  if (!client) return null;

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={client.id} />
      <div>
        <SelectCurrency
          defaultValue={client.currency as string}
          onChange={setCurrencyCode}
        />
        <input type="hidden" name="currency" value={currencyCode} />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating…" : "Update Currency"}
      </Button>
    </form>
  );
}
