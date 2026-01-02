// app/user/copy-trading/page.tsx
import { db } from "@/db";
import ExpertGrid from "@/components/user/copy-trading/ExpertGrid";
export default async function CopyTradingPage() {
  const all = await db.query.experts.findMany();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Copy Trading</h1>
      <ExpertGrid experts={all} />
    </div>
  );
}
