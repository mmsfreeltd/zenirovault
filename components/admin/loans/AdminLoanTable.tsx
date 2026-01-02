/* eslint-disable @typescript-eslint/no-explicit-any */
// components/admin/loans/AdminLoanTable.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface AdminLoan {
  id: number;
  user_id: number;
  user_email: string;
  amount_requested: number;
  amount_approved: number | null;
  status: "pending" | "approved" | "rejected";
  date_requested: string;
  date_updated: string | null;
}

interface Props {
  data: AdminLoan[];
}

export function AdminLoanTable({ data: initialData }: Props) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<AdminLoan[]>(initialData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [loadingIds, setLoadingIds] = useState<number[]>([]);

  async function handleApprove(id: number, amount: number) {
    setLoadingIds((ids) => [...ids, id]);
    try {
      await axios.post("/api/admin/loans/approve", {
        loan_id: id,
        amount_approved: amount,
      });
      toast.success("Loan approved");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to approve");
    } finally {
      setLoadingIds((ids) => ids.filter((x) => x !== id));
    }
  }

  async function handleReject(id: number) {
    setLoadingIds((ids) => [...ids, id]);
    try {
      await axios.post("/api/admin/loans/reject", { loan_id: id });
      toast.success("Loan rejected");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to reject");
    } finally {
      setLoadingIds((ids) => ids.filter((x) => x !== id));
    }
  }

  const columns: ColumnDef<AdminLoan>[] = [
    {
      accessorKey: "user_email",
      header: "User Email",
      cell: ({ row }) => (
        <div className="text-sm">{row.original.user_email}</div>
      ),
    },
    {
      accessorKey: "amount_requested",
      header: "Requested",
      cell: ({ row }) => (
        <div className="text-right">
          {row.original.amount_requested.toFixed(2)}
        </div>
      ),
    },
    {
      accessorKey: "amount_approved",
      header: "Approved",
      cell: ({ row }) =>
        row.original.amount_approved != null
          ? row.original.amount_approved.toFixed(2)
          : "—",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.original.status;
        const color =
          s === "approved"
            ? "bg-green-100 text-green-800"
            : s === "rejected"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800";
        return (
          <span className={`px-2 py-1 rounded ${color} text-xs font-medium`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "date_requested",
      header: "Requested On",
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground">
          {format(new Date(row.original.date_requested), "yyyy-MM-dd")}
        </div>
      ),
    },
    {
      accessorKey: "date_updated",
      header: "Updated On",
      cell: ({ row }) =>
        row.original.date_updated ? (
          <div className="text-xs text-muted-foreground">
            {format(new Date(row.original.date_updated), "yyyy-MM-dd")}
          </div>
        ) : (
          "—"
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const loan = row.original;
        const isLoading = loadingIds.includes(loan.id);
        return loan.status === "pending" ? (
          <div className="flex space-x-2">
            <Button
              size="sm"
              disabled={isLoading}
              onClick={() => handleApprove(loan.id, loan.amount_requested)}
            >
              {isLoading ? "…" : "Approve"}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              disabled={isLoading}
              onClick={() => handleReject(loan.id)}
            >
              {isLoading ? "…" : "Reject"}
            </Button>
          </div>
        ) : (
          <span className="text-muted-foreground">—</span>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, pagination },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-2">
        <Label>User Email:</Label>
        <Input
          placeholder="Filter by email..."
          value={
            (table.getColumn("user_email")?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table.getColumn("user_email")?.setFilterValue(e.target.value)
          }
          className="w-full max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No loans found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <Label>Rows per page:</Label>
          <Input
            type="number"
            min={1}
            max={100}
            value={pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="w-20"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            ‹
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            ›
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            »
          </Button>
        </div>
      </div>
    </div>
  );
}
