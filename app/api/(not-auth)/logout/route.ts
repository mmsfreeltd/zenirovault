import { NextResponse } from "next/server";
import { logout, setFlash } from "@/server/lib/auth";

export async function POST() {
  await logout();
  setFlash({
    message: "Logged out successfully.",
    type: "info",
  });
  return NextResponse.json({ success: true });
}
