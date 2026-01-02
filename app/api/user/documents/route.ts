// app/api/user/documents/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import { user_documents } from "@/db/schema";
import { requireSession } from "@/server/lib/secure";
import { eq } from "drizzle-orm";
import cloudinary from "@/server/lib/cloudinary";

export async function GET(req: Request) {
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("user_id");
  if (!userId) {
    return NextResponse.json({ error: "user_id required" }, { status: 400 });
  }

  const docs = await db
    .select({
      id: user_documents.id,
      doc_type: user_documents.doc_type,
      file_url: user_documents.file_url,
      date_uploaded: user_documents.date_uploaded,
    })
    .from(user_documents)
    .where(eq(user_documents.user_id, parseInt(userId, 10)))
    .execute();

  return NextResponse.json(docs);
}

export async function DELETE(req: Request) {
  const auth = await requireSession("any");
  if (auth instanceof NextResponse) return auth;

  // pull `id` out of the JSON body
  let body: { id?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const id = body.id;
  if (typeof id !== "number") {
    return NextResponse.json(
      { error: "Missing or invalid `id`" },
      { status: 400 }
    );
  }

  // Optionally verify ownership:
  const doc = await db.query.user_documents.findFirst({
    where: eq(user_documents.id, id),
    columns: { user_id: true, public_id: true },
  });
  // if (!doc || doc.user_id !== auth.session.user.id) {
  //   return NextResponse.json({ error: "Not found" }, { status: 404 });
  // }
  const public_id = String(doc?.public_id);

  await cloudinary.uploader.destroy(public_id);

  await db.delete(user_documents).where(eq(user_documents.id, id));

  return NextResponse.json({ success: true });
}
