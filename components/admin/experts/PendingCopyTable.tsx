// components/admin/copy-traders/PendingCopyTable.tsx
"use client";

import { useState, useEffect } from "react";
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
import Image from "next/image";
import { useActionState } from "react";
import { approveCopyPayment } from "@/server/actions/copy-traders";

export type PendingCopy = {
  id: number;
  user_email: string;
  expert_name: string;
  payment_address: string;
  coin_id: string;
  coin_logo: string;
};

export function PendingCopyTable({
  data: initialData,
}: {
  data: PendingCopy[];
}) {
  const [data, setData] = useState(initialData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [state, formAction, isPending] = useActionState(approveCopyPayment, {
    success: false,
    message: "",
    id: undefined as number | undefined,
  });

  // When approval succeeds, remove that row from local state
  useEffect(() => {
    if (state.success && state.id != undefined) {
      setData((ds) => ds.filter((r) => r.id !== state.id!));
    }
  }, [state]);

  const columns: ColumnDef<PendingCopy>[] = [
    {
      accessorKey: "user_email",
      header: "User",
      cell: ({ row }) => <div>{row.original.user_email}</div>,
    },
    {
      accessorKey: "expert_name",
      header: "Expert",
      cell: ({ row }) => <div>{row.original.expert_name}</div>,
    },
    {
      accessorKey: "coin_logo",
      header: "Coin",
      cell: ({ row }) => (
        <Image
          src={row.original.coin_logo}
          alt={row.original.coin_id}
          width={24}
          height={24}
        />
      ),
    },
    {
      accessorKey: "payment_address",
      header: "Pay Address",
      cell: ({ row }) => (
        <div className="truncate max-w-xs">{row.original.payment_address}</div>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <form action={formAction}>
          <input type="hidden" name="id" value={row.original.id} />
          <Button
            type="submit"
            size="sm"
            variant="outline"
            disabled={isPending}
          >
            {isPending ? "..." : "Approve"}
          </Button>
        </form>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { pagination, columnFilters },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4 p-4">
      <Input
        placeholder="Filter by user or expert..."
        value={
          (table.getColumn("user_email")?.getFilterValue() as string) ?? ""
        }
        onChange={(e) =>
          table.getColumn("user_email")?.setFilterValue(e.target.value)
        }
        className="w-full max-w-sm"
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
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
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No pending copy-traders.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination controls omitted for brevity (reuse the pattern from other tables) */}
    </div>
  );
}
