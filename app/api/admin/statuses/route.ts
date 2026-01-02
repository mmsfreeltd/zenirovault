import { db } from "@/db";
import { account_status } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const statuses = await db.select().from(account_status);
    return NextResponse.json(statuses);
  } catch (error) {
    console.error("Failed to fetch statuses", error);
    return new NextResponse("Failed to fetch statuses", { status: 500 });
  }
}
