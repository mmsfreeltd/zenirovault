// app/admin/copy-traders/page.tsx
import { db } from '@/db';
import { requireSessionPage } from '@/server/lib/secure/pageSecure';
import dynamic from 'next/dynamic';

// Import your client components
const ExpertTable = dynamic(
  () => import('@/components/admin/experts/expert-table'),
  {}
);
const AddExpertModal = dynamic(
  () => import('@/components/admin/experts/add-expert-modal')
);

export const revalidate = 0; // no caching

export default async function CopyTradersPage() {
  // 1️⃣ Enforce admin session
  await requireSessionPage('admin');

  let expertList;
  try {
    // 2️⃣ Fetch experts from the DB
    expertList = await db.query.experts.findMany();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    // Throw to be caught by error.tsx
    throw new Error('Failed to load experts: ' + err.message);
  }

  // 3️⃣ Render the page
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Copy Traders</h1>

      {/* Add Expert button + modal */}
      <div className="mb-4">
        <AddExpertModal />
      </div>

      {/* Experts table */}
      <ExpertTable data={expertList} />
    </div>
  );
}
