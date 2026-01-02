'use client';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  ShieldCheck,
  LockKeyhole,
  BadgeCheck,
  AlertTriangle,
  Shield,
} from 'lucide-react';
import AssignPlanAction from '@/components/admin/users/assign-plan';
import { AssignStatusAction } from '@/components/admin/users/AssignStatusAction';
import { AccountLimitEditor } from '@/components/admin/users/AccountLimitAction';
import { AccountManagerEditor } from '@/components/admin/users/AccountManagerEditor';
import { AssignCurrencyAction } from '@/components/admin/users/AssignCurrencyAction';
import { TradeProgressAction } from '@/components/admin/users/TradeProgressAction';

export default function UserQuickActions() {
  const { client, updateClient } = useUser();

  // Handle reset password
  const handleResetPassword = () => {
    toast.success('Password reset email has been sent to the user');
  };

  // Handle reset 2FA
  const handleReset2FA = () => {
    updateClient({ twofa: client?.twofa === 1 ? 0 : 1 });
    toast.success('Two-factor authentication has been reset');
  };

  if (!client) return null;

  return (
    <div className="space-y-6">
      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Account Status */}
          <AssignStatusAction />
          <Separator />

          <AssignCurrencyAction />

          <Separator />

          <AccountManagerEditor client={client} />
          <Separator />
          {/* Activation Status */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Activate</Label>
              <div>
                {client.isVerified === 1 ? (
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-600 mt-1"
                  >
                    Activated
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-amber-500 text-amber-600 mt-1"
                  >
                    Deactivated
                  </Badge>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateClient({ isVerified: client.isVerified === 1 ? 0 : 1 });
                toast.success(
                  client.isVerified === 1
                    ? 'User Deactivated'
                    : 'User Activated'
                );
              }}
              className="gap-1"
            >
              {client.isVerified === 1 ? (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  Deactivate
                </>
              ) : (
                <>
                  <BadgeCheck className="h-4 w-4" />
                  Activate
                </>
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm">Verification</Label>
              <div>
                {client.isVerify === 1 ? (
                  <Badge
                    variant="outline"
                    className="border-green-500 text-green-600 mt-1"
                  >
                    Verified
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="border-amber-500 text-amber-600 mt-1"
                  >
                    Unverified
                  </Badge>
                )}
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                updateClient({ isVerify: client.isVerify === 1 ? 0 : 1 });
                toast.success(
                  client.isVerified === 1
                    ? 'User marked as unverified'
                    : 'User marked as verified'
                );
              }}
              className="gap-1"
            >
              {client.isVerify === 1 ? (
                <>
                  <AlertTriangle className="h-4 w-4" />
                  UnVerify
                </>
              ) : (
                <>
                  <BadgeCheck className="h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>
          <Separator />

          {/* Security Options */}
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <Label className="text-sm">Security Options</Label>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={handleResetPassword}
              >
                <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                Reset Password
              </Button>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Two-Factor Auth</span>
                </div>
                <Switch
                  checked={client.twofa === 1}
                  onCheckedChange={() => handleReset2FA()}
                />
              </div>
            </div>
          </div>
          <Separator />
          <AccountLimitEditor client={client} />
          <Separator />
          <TradeProgressAction client={client} />
          <Separator />
          {/* Account Type */}
          <AssignPlanAction />
        </CardContent>
      </Card>
    </div>
  );
}
