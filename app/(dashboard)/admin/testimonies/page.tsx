/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/testimonies/page.tsx
import { requireSession } from "@/server/lib/secure";
import { db } from "@/db";

import AdminTestimonyTable from "@/components/admin/testimonies/TestimonyTable";
import { desc } from "drizzle-orm";
import { testimonies } from "@/db/schema";

export const revalidate = 0;

export default async function TestimoniesPage() {
  // 1) Ensure admin is logged in
  const auth = await requireSession("admin");
  if (auth instanceof Response) return auth;

  // 2) Fetch all testimonies
  const all = await db.query.testimonies.findMany({
    columns: {
      id: true,
      tpix: true,
      tname: true,
      toccupation: true,
      tdescription: true,
    },
    orderBy: desc(testimonies.id),
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Testimonials</h1>
      {/* Pass the server‐fetched data to a client component */}
      <AdminTestimonyTable initialData={all as any} />
    </div>
  );
}
