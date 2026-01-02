// components/admin/users/AssignStatusAction.tsx
"use client";

import { useUser } from "@/context/UserContext";
import { AccountStatusSelect } from "@/components/common/AccountStatusSelect";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { assignStatus } from "@/server/actions/clients";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AssignStatusAction() {
  const { client, updateClient } = useUser();
  const [statusId, setStatusId] = useState<string>(client?.status ?? "");

  const [state, formAction, isPending] = useActionState(assignStatus, {
    success: false,
    message: "",
  });

  // Reflect the change in UI and show toast
  useEffect(() => {
    if (state.message) {
      // update local context so child components rerender
      updateClient({ status: statusId });
      toast[state.success ? "success" : "error"](state.message);
    }
  }, [state]);

  if (!client) return null;

  return (
    <form action={formAction} className="space-y-4">
      {/* Keep track of which user we're editing */}
      <input type="hidden" name="userId" value={client.id} />

      {/* Popover+Command select for statuses */}
      <div>
        <AccountStatusSelect
          value={Number(client.status)}
          onChange={(val) => setStatusId(val.toString())}
        />
        <input type="hidden" name="statusId" value={statusId} />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating…" : "Update Status"}
      </Button>
    </form>
  );
}
