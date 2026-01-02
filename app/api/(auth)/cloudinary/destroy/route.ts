// app/api/cloudinary/destroy/route.ts
import { NextResponse } from "next/server";
import cloudinary from "@/server/lib/cloudinary";
import { requireSession } from "@/server/lib/secure";

export async function DELETE(req: Request) {
  // protect the endpoint however you like
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  const { public_id } = await req.json();

  if (!public_id) {
    return NextResponse.json(
      { success: false, error: "public_id is required" },
      { status: 400 }
    );
  }
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true, result });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
