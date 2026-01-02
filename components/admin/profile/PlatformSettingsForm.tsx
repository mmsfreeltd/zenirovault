// components/admin/profile/PlatformSettingsForm.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { updatePlatformSettings } from "@/server/actions/profile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SettingsTypes } from "@/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function PlatformSettingsForm({
  settings,
}: {
  settings: SettingsTypes;
}) {
  const [state, action, isPending] = useActionState(updatePlatformSettings, {
    success: false,
    message: "",
  });
  const [form, setForm] = useState({
    site_phone: settings.site_phone,
    signup_bonus: settings.signup_bonus.toString(),
    allow_signup_bonus: settings.allow_signup_bonus === 1,
    site_location: settings.site_location,
    other: settings.other,
    allow_ref_bonus: settings.allow_ref_bonus === 1,
    ref_bonus_percentage: settings.ref_bonus_percentage.toString(),
    currency: settings.currency,
    facebook: settings.facebook || "",
    twitter: settings.twitter || "",
    instagram: settings.instagram || "",
    telegram: settings.telegram || "",
    needVerification: settings.needVerification,
    verificationType: settings.verificationType,
    allowRegistration: settings.allowRegistration,
  });
  const lastMsg = useRef<string>("");

  useEffect(() => {
    if (state.message && state.message !== lastMsg.current) {
      toast[state.success ? "success" : "error"](state.message);
      lastMsg.current = state.message;
    }
  }, [state.message, state.success]);

  return (
    <form action={action} className="space-y-4 max-w-lg">
      <div>
        <Label htmlFor="site_phone">Site Phone</Label>
        <Input
          id="site_phone"
          name="site_phone"
          value={form.site_phone}
          onChange={(e) => setForm({ ...form, site_phone: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="signup_bonus">Signup Bonus</Label>
        <Input
          id="signup_bonus"
          name="signup_bonus"
          type="number"
          step="0.01"
          value={form.signup_bonus}
          onChange={(e) => setForm({ ...form, signup_bonus: e.target.value })}
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="allow_signup_bonus"
          name="allow_signup_bonus"
          checked={form.allow_signup_bonus}
          onCheckedChange={(val) =>
            setForm({ ...form, allow_signup_bonus: val })
          }
        />
        <Label htmlFor="allow_signup_bonus">Allow Signup Bonus</Label>
      </div>

      <div>
        <Label htmlFor="site_location">Site Location</Label>
        <Input
          id="site_location"
          name="site_location"
          value={form.site_location}
          onChange={(e) => setForm({ ...form, site_location: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="other">Other Info</Label>
        <Input
          id="other"
          name="other"
          value={form.other}
          onChange={(e) => setForm({ ...form, other: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="ref_bonus_percentage">Referral Bonus %</Label>
        <Input
          id="ref_bonus_percentage"
          name="ref_bonus_percentage"
          type="number"
          step="0.01"
          value={form.ref_bonus_percentage}
          onChange={(e) =>
            setForm({ ...form, ref_bonus_percentage: e.target.value })
          }
        />
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="allow_ref_bonus"
          name="allow_ref_bonus"
          checked={form.allow_ref_bonus}
          onCheckedChange={(val) => setForm({ ...form, allow_ref_bonus: val })}
        />
        <Label htmlFor="allow_ref_bonus">Allow Referral Bonus</Label>
      </div>

      <div>
        <Label htmlFor="currency">Currency</Label>
        <Input
          id="currency"
          name="currency"
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        />
      </div>

      <div>
        <Label htmlFor="facebook">Facebook URL</Label>
        <Input
          id="facebook"
          name="facebook"
          value={form.facebook}
          onChange={(e) => setForm({ ...form, facebook: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="twitter">Twitter URL</Label>
        <Input
          id="twitter"
          name="twitter"
          value={form.twitter}
          onChange={(e) => setForm({ ...form, twitter: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="instagram">Instagram URL</Label>
        <Input
          id="instagram"
          name="instagram"
          value={form.instagram}
          onChange={(e) => setForm({ ...form, instagram: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="telegram">Telegram URL</Label>
        <Input
          id="telegram"
          name="telegram"
          value={form.telegram}
          onChange={(e) => setForm({ ...form, telegram: e.target.value })}
        />
      </div>

      {/* As strings */}
      {/* Need Verification */}
      <div>
        <Label htmlFor="needVerification">Need Verification</Label>
        <Select
          name="needVerification"
          defaultValue={form.needVerification as string}
          onValueChange={(val) =>
            setForm((f) => ({ ...f, needVerification: val }))
          }
        >
          <SelectTrigger id="needVerification" className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Yes</SelectItem>
            <SelectItem value="0">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Verification Type */}
      <div>
        <Label htmlFor="verificationType">Verification Type</Label>
        <Select
          name="verificationType"
          defaultValue={form.verificationType as string}
          onValueChange={(val) =>
            setForm((f) => ({ ...f, verificationType: val }))
          }
        >
          <SelectTrigger id="verificationType" className="w-full">
            <SelectValue placeholder="Select type..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Type 1</SelectItem>
            <SelectItem value="2">Type 2</SelectItem>
            {/* add more options as needed */}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="allowRegistration">Allow Registration</Label>
        <Select
          name="allowRegistration"
          defaultValue={form.allowRegistration as string}
          onValueChange={(val) =>
            setForm((f) => ({ ...f, allowRegistration: val }))
          }
        >
          <SelectTrigger id="allowRegistration" className="w-full">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Yes</SelectItem>
            <SelectItem value="0">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : "Save Settings"}
      </Button>
    </form>
  );
}
