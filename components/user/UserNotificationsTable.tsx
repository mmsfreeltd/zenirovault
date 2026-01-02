// components/user/UserNotificationsTable.tsx
"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EyeIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { format } from "date-fns";

type Notification = {
  id: number;
  subject: string;
  message: string;
  status: number; // 0 = unread, 1 = read
  date: string;
};

export function UserNotificationsTable() {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeNotif, setActiveNotif] = useState<Notification | null>(null);

  // fetch notifications
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await axios.get<Notification[]>("/api/user/notifications");
        setData(res.data);
      } catch {
        setError("Unable to load notifications");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // mark as read
  const markAsRead = async (id: number) => {
    try {
      await axios.post("/api/user/notifications/read", { id });
      setData((d) => d.map((n) => (n.id === id ? { ...n, status: 1 } : n)));
    } catch {
      console.error("Cannot mark read");
    }
  };

  const columns: ColumnDef<Notification>[] = [
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => (
        <div className="font-medium">{row.original.subject}</div>
      ),
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="text-sm text-muted-foreground">
          {format(new Date(row.original.date), "yyyy-MM-dd")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Read?",
      cell: ({ row }) =>
        row.original.status === 1 ? (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            Read
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Unread
          </Badge>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const notif = row.original;
        return (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setActiveNotif(notif);
              setSheetOpen(true);
            }}
          >
            <EyeIcon className="w-4 h-4" />
          </Button>
        );
      },
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

  if (loading) return <div>Loading notifications…</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <div className="space-y-4 p-4">
        <Input
          placeholder="Search subject…"
          value={(table.getColumn("subject")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("subject")?.setFilterValue(e.target.value)
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
                    No notifications found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center space-x-2">
              <Label>Rows per page:</Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[10, 20, 30, 40, 50].map((size) => (
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
                <ChevronsLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon className="h-4 w-4" />
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
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronsRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Sheet */}
      {activeNotif && (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>{activeNotif.subject}</SheetTitle>
              <SheetDescription>
                {format(new Date(activeNotif.date), "PPPpp")}
              </SheetDescription>
            </SheetHeader>
            <div className="p-4">{activeNotif.message}</div>
            <div className="flex justify-end p-4 space-x-2">
              {activeNotif.status === 0 && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    markAsRead(activeNotif.id);
                    setSheetOpen(false);
                  }}
                >
                  Mark read
                </Button>
              )}
              <Button onClick={() => setSheetOpen(false)}>Close</Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
