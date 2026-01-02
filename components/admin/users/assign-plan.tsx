"use client";

import { useUser } from "@/context/UserContext";
import { SelectPlan } from "@/components/admin/upgrade-plan/select-plan";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { assignPlan } from "@/server/actions/clients";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AssignPlanAction() {
  const { client, updateClient } = useUser();
  const [planId, setPlanId] = useState<string>(
    client?.account_type?.toString() ?? ""
  );

  const [state, formAction, isPending] = useActionState(assignPlan, {
    success: false,
    message: "",
  });

  // Show toast on success/error
  useEffect(() => {
    if (state.message) {
      updateClient({ account_type: Number(planId) });
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  if (!client) return null;

  return (
    <form action={formAction} className="space-y-4">
      {/* Hidden field for user ID */}
      <input type="hidden" name="userId" value={client.id} />

      {/* Plan selector */}
      <div>
        <SelectPlan defaultValue={planId} onChange={(val) => setPlanId(val)} />
        {/* Hidden field for selected plan */}
        <input type="hidden" name="planId" value={planId} />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Assigning …" : "Assign Plan"}
      </Button>
    </form>
  );
}
