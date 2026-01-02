import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

// Constants
const secretKey = "crypto_broker";
export const userSessionKey = "userSession";
export const adminSessionKey = "adminSession";
export const flashMessageKey = "flashMessage";

const key = new TextEncoder().encode(secretKey);

// Types
interface AuthAccount {
  email: string;
  name: string;
  id: string;
}

interface CookieType {
  httpOnly: boolean;
  expires: Date;
}

interface SessionPayload extends JWTPayload {
  auth_account: AuthAccount;
  expires: number; // timestamp
}

export type FlashMessage = {
  message: string;
  type: "error" | "success" | "info" | "warning";
};

const expires = Date.now() + 24 * 60 * 60 * 1000;
const cookieOptions = {
  httpOnly: true,
  expires: new Date(expires),
  path: "/", // important
  sameSite: "lax", // recommended default
  secure: process.env.NODE_ENV === "production",
};

// Encrypt a session payload to a JWT
export async function encrypt(payload: SessionPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day") // Set using string format
    .sign(key);
}

// Decrypt a JWT and return the session payload
export async function decrypt(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, key, {
    algorithms: ["HS256"],
  });
  return payload as SessionPayload;
}

// Login handler (assumes you call this in a route/action)
export async function login(formData: FormData, role: string) {
  const isAdmin = role; // Replace with real check

  const auth_account: AuthAccount = {
    email: formData.get("email") as string,
    name: formData.get("name") as string,
    id: formData.get("id") as string,
  };

  const session = await encrypt({ auth_account, expires });

  if (isAdmin == "admin") {
    (await cookies()).set(
      adminSessionKey,
      session,
      cookieOptions as CookieType
    );
    return "/admin";
  } else {
    (await cookies()).set(userSessionKey, session, cookieOptions as CookieType);
    return "/user";
  }
}

// Logout handler
export async function logout() {
  (await cookies()).set(adminSessionKey, "", { expires: new Date(0) });
  (await cookies()).set(userSessionKey, "", { expires: new Date(0) });
}

// Get session from a cookie
export async function getSession(
  sessionKey: string
): Promise<SessionPayload | null> {
  const session = (await cookies()).get(sessionKey)?.value;
  if (!session) return null;

  try {
    return await decrypt(session);
  } catch {
    return null;
  }
}

// Update session by refreshing its expiration time
export async function updateSession(
  req: NextRequest,
  sessionKey: string
): Promise<NextResponse | undefined> {
  const session = req.cookies.get(sessionKey)?.value;
  if (!session) return;

  try {
    const parsed = await decrypt(session);
    parsed.expires = expires;

    const newSession = await encrypt(parsed);
    const res = NextResponse.next();
    res.cookies.set(sessionKey, newSession, cookieOptions as CookieType);
    return res;
  } catch {
    return;
  }
}

export async function setFlash(data: FlashMessage) {
  const res = await cookies();
  const value = JSON.stringify(data);

  res.set(flashMessageKey, value, {
    httpOnly: false,
    path: "/",
    maxAge: 5, // expires in 5 seconds
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getFlash(): Promise<FlashMessage | null> {
  const res = await cookies();
  const value = res.get(flashMessageKey)?.value;

  if (!value) return null;
  // Immediately clear the flash

  try {
    res.set(flashMessageKey, "", {
      path: "/",
      expires: new Date(0),
    });
    // return JSON.parse(value) as FlashMessage;
  } catch {
    return null;
  } finally {
    return JSON.parse(value) as FlashMessage;
  }
}
