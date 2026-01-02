// components/user/ChangePasswordCard.tsx
"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { updateUserPassword } from "@/server/actions/clients";
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
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthUserContext";

export function ChangePasswordCard() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, action, isPending] = useActionState(updateUserPassword, {
    success: false,
    message: "",
  });
  const { client } = useUser();

  useEffect(() => {
    if (state.message) {
      toast[state.success ? "success" : "error"](state.message);
      if (state.success) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    }
  }, [state]);

  if (!client) return null;

  const passwordsMatch = newPassword && newPassword === confirmPassword;

  return (
    <Card className="max-w-md">
      <form action={action} className="space-y-0">
        <input type="hidden" name="user_id" value={Number(client?.id)} />
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {!passwordsMatch && confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                Passwords do not match.
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-5">
          <Button
            type="submit"
            disabled={
              isPending ||
              !currentPassword ||
              !newPassword ||
              !confirmPassword ||
              !passwordsMatch
            }
          >
            {isPending ? "Updating…" : "Update Password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
