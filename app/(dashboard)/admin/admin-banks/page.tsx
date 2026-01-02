// app/admin/admin-banks/page.tsx
import { db } from '@/db';
import dynamic from 'next/dynamic';
import { requireSessionPage } from '@/server/lib/secure/pageSecure';

const AddAdminBankModal = dynamic(
  () => import('@/components/admin/admin-banks/add-admin-bank-modal')
);
const AdminBankTable = dynamic(
  () => import('@/components/admin/admin-banks/admin-bank-table')
);

export const revalidate = 0;

export default async function AdminBanksPage() {
  await requireSessionPage('admin');

  let list;
  try {
    list = await db.query.admin_banks.findMany();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new Error('Failed to load banks: ' + err.message);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Banks</h1>
      <div className="mb-4">
        <AddAdminBankModal />
      </div>
      <AdminBankTable data={list} />
    </div>
  );
}
