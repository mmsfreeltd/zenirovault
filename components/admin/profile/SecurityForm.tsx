// components/admin/profile/SecurityForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { updateAdminSecurity } from "@/server/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function SecurityForm() {
  const [state, action, isPending] = useActionState(updateAdminSecurity, {
    success: false,
    message: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const lastMsg = useRef<string>("");

  useEffect(() => {
    if (state.message && state.message !== lastMsg.current) {
      toast[state.success ? "success" : "error"](state.message);
      lastMsg.current = state.message;
    }
  }, [state.message, state.success]);

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
        <CardDescription>
          Change your admin password by filling the form below
        </CardDescription>
      </CardHeader>

      <form action={action} className="">
        <CardContent className="space-y-3 ">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative ">
            <Input
              className="w-full"
              id="currentPassword"
              name="currentPassword"
              type={showCurrent ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowCurrent((v) => !v)}
              className="absolute inset-y-0 right-2 flex items-center"
            >
              {showCurrent ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="sr-only">
                {showCurrent
                  ? "Hide current password"
                  : "Show current password"}
              </span>
            </button>
          </div>

          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Input
              id="newPassword"
              name="newPassword"
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowNew((v) => !v)}
              className="absolute inset-y-0 right-2 flex items-center"
            >
              {showNew ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="sr-only">
                {showNew ? "Hide new password" : "Show new password"}
              </span>
            </button>
          </div>
        </CardContent>
        <CardFooter className="mt-5">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating…" : "Update Password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
