// app/api/seed/route.ts
// import { seed } from '@/db/seed';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // await seed();
    return NextResponse.json({ success: true, message: 'Seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { success: false, error: 'Seeding failed' },
      { status: 500 }
    );
  }
}
