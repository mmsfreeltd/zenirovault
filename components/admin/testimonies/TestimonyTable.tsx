// components/admin/testimonies/TestimonyTable.tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { AddTestimonyModal } from "./AddTestimonyModal";
import { EditTestimonySheet } from "./EditTestimonySheet";
import { DeleteTestimonyAction } from "./DeleteTestimonyAction";
import Image from "next/image";

// Define the type for a Testimony
export type TestimonyType = {
  id: number;
  tpix: string;
  tname: string;
  toccupation: string;
  tdescription: string;
};

interface Props {
  initialData: TestimonyType[];
}

export default function AdminTestimonyTable({ initialData }: Props) {
  const [data, setData] = useState<TestimonyType[]>(initialData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Whenever initialData changes (unlikely in admin page), reset
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const columns = useMemo<ColumnDef<TestimonyType>[]>(
    () => [
      {
        accessorKey: "tpix",
        header: "Photo",
        cell: ({ row }) => (
          <Image
            width={20}
            height={20}
            src={row.original.tpix}
            alt={row.original.tname}
            className="h-12 w-12 rounded-full object-cover"
          />
        ),
      },
      {
        accessorKey: "tname",
        header: "Name",
        cell: ({ row }) => (
          <span className="font-medium">{row.original.tname}</span>
        ),
      },
      {
        accessorKey: "toccupation",
        header: "Occupation",
        cell: ({ row }) => <span>{row.original.toccupation}</span>,
      },
      {
        accessorKey: "tdescription",
        header: "Description",
        cell: ({ row }) => (
          <span className="line-clamp-2 text-sm text-muted-foreground">
            {row.original.tdescription}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center space-x-2">
            <EditTestimonySheet testimony={row.original}>
              <Button variant="ghost" size="icon" title="Edit">
                ✏️
              </Button>
            </EditTestimonySheet>
            <DeleteTestimonyAction id={row.original.id} />
          </div>
        ),
      },
    ],
    []
  );

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

  // Handler to refetch all after any mutation
  async function refreshData() {
    try {
      const res = await axios.get<TestimonyType[]>("/api/testimonies");
      setData(res.data);
    } catch (err) {
      console.error("Failed to reload testimonies", err);
    }
  }

  return (
    <div className="space-y-4">
      {/* Top bar: Search + Add */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search name..."
          value={(table.getColumn("tname")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("tname")?.setFilterValue(e.target.value)
          }
          className="w-1/3"
        />
        <AddTestimonyModal onSuccess={refreshData} />
      </div>

      {/* The table itself */}
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
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  No testimonies found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <Label>Rows per page</Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"«"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"‹"}
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
            {"›"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {"»"}
          </Button>
        </div>
      </div>
    </div>
  );
}
