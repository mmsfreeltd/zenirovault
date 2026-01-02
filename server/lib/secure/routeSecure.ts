// server/lib/secure/route.ts
import { NextResponse } from 'next/server';
import { resolveSession, Role } from './core';

export async function requireSessionRoute(
  role: Role,
  targetUserId?: string | number
) {
  const result = await resolveSession(role, targetUserId);

  if (!result) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return result;
}
