// app/admin/modify/page.tsx
import ModifyClientCard from "@/components/admin/modify/ModifyClientCard";

export const revalidate = 0;
export default async function ModifyPage() {
  return (
    <div className="p-6">
      <ModifyClientCard />
    </div>
  );
}
