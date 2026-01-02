// server/lib/secure/core.ts
import { getSession, adminSessionKey, userSessionKey } from '@/server/lib/auth';

export type Role = 'admin' | 'user' | 'any' | 'current_user';

export type SessionResult = {
  role: 'admin' | 'user';
  session: Awaited<ReturnType<typeof getSession>>;
} | null;

export async function resolveSession(
  role: Role,
  targetUserId?: string | number
): Promise<SessionResult> {
  const [adminSession, userSession] = await Promise.all([
    getSession(adminSessionKey),
    getSession(userSessionKey),
  ]);

  if (role === 'admin') {
    return adminSession ? { role: 'admin', session: adminSession } : null;
  }

  if (role === 'user') {
    return userSession ? { role: 'user', session: userSession } : null;
  }

  if (role === 'current_user') {
    if (!userSession || targetUserId == null) return null;

    if (String(userSession.auth_account.id) !== String(targetUserId)) {
      return null;
    }

    return { role: 'user', session: userSession };
  }

  // role === "any"
  if (adminSession) return { role: 'admin', session: adminSession };
  if (userSession) return { role: 'user', session: userSession };

  return null;
}
