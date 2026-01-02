// app/api/currencies/route.ts
import { getCurrencies } from "@/server/db_operation/util";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getCurrencies();
  return NextResponse.json(data);
}
