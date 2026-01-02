"use client";

import React, { useEffect, useState, useMemo } from "react";
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
import { format } from "date-fns";

type Proof = {
  id: number;
  amount: string;
  pop: string;
  date_uploaded: string;
  payment_mode: string;
  status: string;
  reason: string;
};

export function ProveTable({ clientId }: { clientId: string }) {
  const [data, setData] = useState<Proof[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // fetch once on mount / clientId change
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get<Proof[]>(
          `/api/user/prove?user_id=${clientId}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Failed to load proofs:", err);
      }
    }
    load();
  }, [clientId]);

  // memoize so columns aren’t re-created every render
  const columns = useMemo<ColumnDef<Proof>[]>(
    () => [
      {
        accessorKey: "date_uploaded",
        header: "Date",
        cell: ({ row }) =>
          row.original.date_uploaded
            ? format(new Date(row.original.date_uploaded), "yyyy-MM-dd")
            : "—",
      },
      { accessorKey: "amount", header: "Amount" },
      { accessorKey: "payment_mode", header: "Mode" },
      { accessorKey: "status", header: "Status" },
      {
        accessorKey: "reason",
        header: "Reason",
        // enable filtering on this column
        enableColumnFilter: true,
      },
      {
        accessorKey: "pop",
        header: "Proof",
        cell: ({ row }) => (
          <a
            href={row.original.pop}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary"
          >
            View
          </a>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnFilters,
    },
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // grab the "reason" column so we can drive its filter from an <Input>
  const reasonColumn = table.getColumn("reason");

  return (
    <div className="space-y-4 p-4">
      {/* only show the “Reason” filter input */}
      <Input
        placeholder="Filter by reason…"
        value={(reasonColumn?.getFilterValue() as string) ?? ""}
        onChange={(e) => reasonColumn?.setFilterValue(e.target.value)}
        className="max-w-sm"
      />

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
            {table.getRowModel().rows.length > 0 ? (
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
                  No proofs uploaded.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Simple pagination controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          «
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          ‹
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          ›
        </button>
        <button
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          »
        </button>
      </div>
    </div>
  );
}
