"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { formatDistance } from "date-fns";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Mail,
  Globe,
  Phone,
  UserCog,
} from "lucide-react";
import { AccountStatusType } from "@/types";
import { useEffect, useState } from "react";
import { useUser } from "@/context/AuthUserContext";

export default function UserProfileHeader() {
  const { client, loading } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [accountStatus, setAccountStatus] = useState<string | null>(null);

  const getAccountStatusName = async () => {
    try {
      setIsLoading(true);
      if (client) {
        const res = await fetch(`/api/admin/statuses/${client?.status}`);
        const status: AccountStatusType = await res.json();
        setAccountStatus(status.status_text as string);
      } else {
        setAccountStatus("Unknown");
      }
    } catch {
      setAccountStatus("Unknown");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccountStatusName();
  }, [client]);

  if (loading) {
    return <UserProfileHeaderSkeleton />;
  }

  if (!client) {
    return <UserProfileHeaderSkeleton />;
  }

  // Format the client's creation date in a relative format (e.g., "2 months ago")
  const memberSince = formatDistance(
    new Date(client.date_created as Date),
    new Date(),
    { addSuffix: true }
  );

  // Determine verification status icon
  const StatusIcon =
    client.isVerified === 1
      ? ShieldCheck
      : client.isVerify === 1
      ? Shield
      : ShieldAlert;

  // Determine status badge color
  const getStatusBadge = () => {
    if (Number(client.status) === 7) {
      return <Badge variant="destructive">Suspended</Badge>;
    }

    switch (Number(client.status)) {
      case 1:
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case 7:
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            isSuspended
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            {isLoading ? "checking..." : accountStatus}
          </Badge>
        );
    }
  };

  return (
    <Card className="bg-card shadow-md transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24 border-4 border-primary/10">
              <AvatarImage
                src={client.profile_pix as string}
                alt={`${client.f_name} ${client.l_name}`}
              />
              <AvatarFallback className="text-2xl bg-primary/5">
                {client.f_name?.charAt(0)}
                {client.l_name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2">
              <StatusIcon
                className={`h-8 w-8 p-1.5 rounded-full ${
                  client.isVerified === 1
                    ? "text-green-500 bg-green-100"
                    : client.isVerify === 1
                    ? "text-amber-500 bg-amber-100"
                    : "text-red-500 bg-red-100"
                }`}
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  {client.title} {client.f_name} {client.l_name}
                  {getStatusBadge()}
                </h1>
                <p className="text-muted-foreground">@{client.username}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="gap-1">
                  <Mail className="h-4 w-4" /> Email
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{client.country}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCog className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Member {memberSince}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Skeleton component for loading state
function UserProfileHeaderSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex-1 space-y-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
