// @server/lib/secure
import { NextResponse } from "next/server";
import { getSession, adminSessionKey, userSessionKey } from "@/server/lib/auth";

type Role = "admin" | "user" | "any" | "current_user";

type AuthResult =
  | { role: "admin" | "user"; session: Awaited<ReturnType<typeof getSession>> }
  | NextResponse;

export async function requireSession(
  role: Role,
  targetUserId?: string | number
): Promise<AuthResult> {
  const [adminSession, userSession] = await Promise.all([
    getSession(adminSessionKey),
    getSession(userSessionKey),
  ]);

  if (role === "admin") {
    if (!adminSession)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return { role: "admin", session: adminSession };
  }

  if (role === "user") {
    if (!userSession)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return { role: "user", session: userSession };
  }

  // ---- Current User only ----
  if (role === "current_user") {
    if (!userSession) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    // must supply the target user id
    if (targetUserId == null) {
      throw new Error("requireSession('current_user') requires a targetUserId");
    }
    // compare as strings
    const sessionUserId = String(userSession.auth_account.id);
    if (sessionUserId !== String(targetUserId)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return { role: "user", session: userSession };
  }

  // role === "any"
  if (adminSession) return { role: "admin", session: adminSession };
  if (userSession) return { role: "user", session: userSession };

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
