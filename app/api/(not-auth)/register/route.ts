import { NextResponse } from "next/server";
import { db } from "@/db";
import { clients } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";
import { createEmailVerification } from "@/server/db_operation";
import { generateUUID } from "@/lib/utils";

// Zod schema validation
const registerSchema = z.object({
  f_name: z.string().min(1),
  l_name: z.string().min(1),
  username: z.string().min(1),
  phone: z.string().min(1),
  country: z.string().min(1),
  currency: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

// Upstash Redis + RateLimiter (5 requests per minute)
// const redis = Redis.fromEnv();
// const ratelimit = new Ratelimit({
//   redis,
//   limiter: Ratelimit.slidingWindow(5, "1 m"),
//   analytics: true,
// });

export async function POST(req: Request) {
  // const ip = req.headers.get("x-forwarded-for") || "anonymous";

  // // Check rate limit
  // const { success: allowed } = await ratelimit.limit(ip);
  // if (!allowed) {
  //   return NextResponse.json(
  //     { success: false, message: "Too many requests. Please try again later." },
  //     { status: 429 }
  //   );
  // }

  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);

    // Check for existing email
    const existing = await db.query.clients.findFirst({
      where: eq(clients.email, parsed.email),
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: "Email already in use." },
        { status: 409 }
      );
    }

    // Insert user
    const inserted = await db
      .insert(clients)
      .values({
        f_name: parsed.f_name,
        l_name: parsed.l_name,
        username: parsed.username,
        phone: parsed.phone,
        country: parsed.country,
        currency: parsed.currency,
        email: parsed.email,
        password: parsed.password, // plain text (hash later)
        date_created: new Date(),
        isVerified: 0,
        bonus: 0,
        ref_link: generateUUID(6),
      })
      .returning({ id: clients.id });
    const userId = inserted[0]?.id;

    // Create verification token + send email
    if (userId) {
      await createEmailVerification(userId, parsed.email);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, message: "Registration failed " },
      { status: 400 }
    );
  }
}
