// server/lib/secure/page.ts
import { redirect } from 'next/navigation';
import { resolveSession, Role } from './core';

export async function requireSessionPage(
  role: Role,
  targetUserId?: string | number
) {
  const result = await resolveSession(role, targetUserId);
  if (!result) {
    redirect('/login'); // or /unauthorized
  }
  return result;
}
