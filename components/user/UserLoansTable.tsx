// components/user/UserLoansTable.tsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoanType } from "@/types";
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

export function UserLoansTable() {
  const [data, setData] = useState<LoanType[]>([]);
  const { client } = useUser();

  useEffect(() => {
    axios.get<LoanType[]>("/api/user/loans").then((r) => {
      setData(r.data);
    });
  }, []);

  if (!client) return null;

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {["Requested", "Amount", "Status", "Updated"].map((h) => (
              <TableHead key={h}>{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((l) => (
            <TableRow key={l.id}>
              <TableCell>
                {format(new Date(l.date_requested), "yyyy-MM-dd")}
              </TableCell>
              <TableCell>
                {client.currency} {l.amount_requested}
              </TableCell>
              <TableCell>{l.status}</TableCell>
              <TableCell>
                {l.date_updated
                  ? format(new Date(l.date_updated), "yyyy-MM-dd")
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
