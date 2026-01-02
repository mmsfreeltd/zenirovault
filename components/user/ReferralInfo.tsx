// components/user/ReferralInfo.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClipboardCopyIcon } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useUser } from "@/context/AuthUserContext";
import { SITE_URL_WITH_HTTPS } from "@/global/constants";

type Referral = {
  id: number;
  f_name: string;
  l_name: string;
  email: string;
  date_created: string;
};

export function ReferralInfo() {
  const { client } = useUser();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Parse code & link
  const referralLink =
    `${SITE_URL_WITH_HTTPS}/register?code=` + (client?.ref_link && "");
  const referralCode = client?.ref_link ?? "";

  // Fetch downline
  useEffect(() => {
    if (!client?.id) return;
    setLoading(true);
    setError(null);
    axios
      .get<Referral[]>(`/api/user/referrals?user_id=${client.id}`)
      .then((res) => setReferrals(res.data))
      .catch(() => setError("Failed to load referrals."))
      .finally(() => setLoading(false));
  }, [client?.id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => toast.success("Copied to clipboard"),
      () => toast.error("Copy failed")
    );
  };

  if (!client) return null;

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Your Referral</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Code & Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Code</label>
            <div className="flex border-1">
              <Input readOnly value={referralCode} className="pr-10" />
              <Button
                variant="ghost"
                size="icon"
                className=""
                onClick={() => copyToClipboard(referralCode)}
              >
                <ClipboardCopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="">
            <label className="block text-sm font-medium mb-1">Link</label>
            <div className="flex border-1">
              <Input readOnly value={referralLink} className="pr-10" />
              <Button
                variant="ghost"
                size="icon"
                className=""
                onClick={() => copyToClipboard(referralLink)}
              >
                <ClipboardCopyIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Downline */}
        <div>
          <h3 className="text-sm font-medium mb-2">Your Referrals</h3>
          {loading ? (
            <p>Loading…</p>
          ) : error ? (
            <p className="text-sm text-red-600">{error}</p>
          ) : referrals.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You haven’t referred anyone yet.
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date Referred</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referrals.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        {r.f_name} {r.l_name}
                      </TableCell>
                      <TableCell>{r.email}</TableCell>
                      <TableCell>
                        {format(new Date(r.date_created), "yyyy-MM-dd")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
