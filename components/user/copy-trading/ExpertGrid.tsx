// components/user/copy-trading/ExpertGrid.tsx
"use client";
import { ExpertType } from "@/types";
import ExpertCard from "@/components/user/copy-trading/ExpertCard";
import { useUser } from "@/context/AuthUserContext";
import PageLoadingSpinner from "@/components/common/loading-spinner";

interface Props {
  experts: ExpertType[];
}

export default function ExpertGrid({ experts }: Props) {
  const { client } = useUser();

  if (!client) return <PageLoadingSpinner />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {experts.map((exp) => (
        <ExpertCard key={exp.id} expert={exp} />
      ))}
    </div>
  );
}
