"use client";
// app/admin/simulations/page.tsx
import { SimulationCard } from "@/components/user/simulations/SimulationCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { SimulationCreateForUserForm } from "@/components/admin/users/simulations/SimulationCreateForUserForm";
import { Simulation } from "@/types";

export default function AdminSimulationsPageWrapper() {
  const [sims, setSims] = useState<Simulation[]>([]);
  const load = async () => {
    const { data } = await axios.get<Simulation[]>("/api/admin/simulations");
    setSims(data);
  };
  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-8 p-4">
      <SimulationCreateForUserForm onCreated={load} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sims.map((sim) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SimulationCard key={sim.id} sim={sim as any} />
        ))}
      </div>
    </div>
  );
}
