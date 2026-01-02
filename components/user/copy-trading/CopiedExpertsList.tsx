// components/user/copy-trading/CopiedExpertsList.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/AuthUserContext";
import PageLoadingSpinner from "@/components/common/loading-spinner";
import { Badge } from "@/components/ui/badge";

type Sub = {
  subscriptionId: number;
  payment_status: number;
  expert: {
    id: number;
    expert_name: string;
    expert_win: string;
    profit_share: string;
  };
};

export default function CopiedExpertsList() {
  const [list, setList] = useState<Sub[]>([]);
  const { client } = useUser();

  const load = async () => {
    const res = await axios.get<Sub[]>("/api/user/copied-experts");
    setList(res.data);
  };
  useEffect(() => {
    load();
  }, []);

  if (!client) return <PageLoadingSpinner />;

  const stopCopy = async (expertId: number) => {
    await axios.delete("/api/user/copy-trader", {
      data: { user_id: client.id, expert_id: expertId },
    });
    load();
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Expert</TableHead>
          <TableHead>Win</TableHead>
          <TableHead>Profit Share</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map(({ subscriptionId, expert, payment_status }) => (
          <TableRow key={subscriptionId}>
            <TableCell>{expert.expert_name}</TableCell>
            <TableCell>{expert.expert_win}</TableCell>
            <TableCell>{expert.profit_share}</TableCell>
            <TableCell>
              <Badge variant={payment_status == 0 ? "secondary" : "default"}>
                {payment_status == 0 ? "Payment is Pending" : "Paid"}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => stopCopy(expert.id)}
              >
                Stop Copying
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
