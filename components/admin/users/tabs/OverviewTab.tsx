"use client";

import { useUser } from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  CreditCard,
  User,
  Home,
  Building,
  Calendar,
  Globe,
  Landmark,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
  ShieldAlert,
  DivideIcon as LucideIcon,
  Shield,
  Clock,
  UserCheck,
} from "lucide-react";
import { AccountStatusType, ClientType, PlanType } from "@/types";
import { useEffect, useState } from "react";

// Helper function to format account creation date
const formatDate = (dateInput: string | Date) => {
  try {
    return format(new Date(dateInput), "PPP");
  } catch {
    return dateInput?.toString?.() || "";
  }
};

// Component to display a field with an icon
interface FieldProps {
  label: string;
  value: string | number;
  icon: typeof LucideIcon;
}

export default function OverviewTab() {
  const { client } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [accountType, setAccountType] = useState<string | null>(null);
  const [accountStatus, setAccountStatus] = useState<string | null>(null);

  const Field = ({ label, value, icon: Icon }: FieldProps) => (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-md bg-muted p-2">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <p className="font-medium">{isLoading ? "Loading..." : value}</p>
      </div>
    </div>
  );

  const getAccountTypeName = async (type: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/plans/${type}`);
      const plan: PlanType = await res.json();
      setAccountType(plan.plan_name as string);
    } catch {
      setAccountType("Unknown");
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountStatusName = async (type: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/admin/statuses/${type}`);
      const status: AccountStatusType = await res.json();
      setAccountStatus(status.status_text as string);
    } catch {
      setAccountStatus("Unknown");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccountTypeName(client?.account_type ?? 0);
    getAccountStatusName(Number(client?.status) ?? 0);
  }, [client]);

  if (!client) return null;
  // Format dates
  const createdDate = formatDate(client.date_created || "");

  // Determine verification status text and icon
  const getVerificationStatus = (client: ClientType) => {
    if (client.isVerify === 1) {
      return {
        text: "Fully Verified",
        icon: BadgeCheck,
        className: "text-green-500",
      };
    } else if (client.isVerified === 1) {
      return {
        text: "Pending Verification",
        icon: Shield,
        className: "text-amber-500",
      };
    } else {
      return {
        text: "Unverified",
        icon: ShieldAlert,
        className: "text-red-500",
      };
    }
  };

  const verificationStatus = getVerificationStatus(client);

  // Determine account type name

  const accountTypeName = accountType;
  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Personal Information
          </CardTitle>
          <CardDescription>
            Basic user details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Field
              label="Full Name"
              value={`${client.title} ${client.f_name} ${client.l_name}`}
              icon={User}
            />
            <Field
              label="Username"
              value={client.username as string}
              icon={UserCheck}
            />
            <Field
              label="Email Address"
              value={client.email as string}
              icon={Mail}
            />
            <Field
              label="Phone Number"
              value={client.phone as string}
              icon={Phone}
            />
            <Field
              label="Date of Birth"
              value={client.dob || "Not provided"}
              icon={Calendar}
            />
            <Field label="Member Since" value={createdDate} icon={Clock} />
          </div>
        </CardContent>
      </Card>

      {/* Address & Location */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Address & Location
          </CardTitle>
          <CardDescription>Users geographical information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Field
              label="Country"
              value={client.country as string}
              icon={Globe}
            />
            <Field
              label="City"
              value={client.city || "Not provided"}
              icon={Building}
            />
            <Field
              label="State/Region"
              value={client.state || "Not provided"}
              icon={MapPin}
            />
            <Field
              label="Address"
              value={client.address || "Not provided"}
              icon={Home}
            />
            <Field
              label="ZIP/Postal Code"
              value={client.zip_code || "Not provided"}
              icon={MapPin}
            />
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">
            Account Information
          </CardTitle>
          <CardDescription>
            Details about the users account status and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Field
                label="Account Type"
                value={accountTypeName || "Not assigned"}
                icon={CreditCard}
              />
              <Field
                label="Account Manager"
                value={client.account_manager || "Not assigned"}
                icon={UserCheck}
              />
              <Field
                label="Account Currency"
                value={client.currency as string}
                icon={Landmark}
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 rounded-md bg-muted p-2`}>
                  <verificationStatus.icon
                    className={`h-4 w-4 ${verificationStatus.className}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Verification Status
                  </Label>
                  <p className={`font-medium ${verificationStatus.className}`}>
                    {verificationStatus.text}
                  </p>
                </div>
              </div>

              <Field
                label="Account Status"
                value={accountStatus as string}
                icon={Shield}
              />

              <Field
                label="Account Limit"
                value={`${client.currency} ${client.account_limit}`}
                icon={Landmark}
              />
            </div>
          </div>

          {client.limit_message && (
            <>
              <Separator className="my-4" />
              <div className="bg-muted p-3 rounded-md">
                <Label className="text-xs text-muted-foreground">
                  Account Limit Message
                </Label>
                <p className="text-sm mt-1">{client.limit_message}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
