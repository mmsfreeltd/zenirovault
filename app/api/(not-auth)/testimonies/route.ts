/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/admin/testimonies/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { desc } from "drizzle-orm";
import { testimonies } from "@/db/schema";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // or restrict to your frontend origin
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  // Reply to preflight request
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function GET(req: Request) {
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

  return new NextResponse(JSON.stringify(all), {
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
    },
  });
}
