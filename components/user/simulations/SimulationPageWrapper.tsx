// app/user/simulations/page.tsx
"use client";
import { useEffect } from "react";
import { useSimulation } from "@/hooks/useSimulation";
// import { Button } from "@/components/ui/button";
import { SimulationCard } from "@/components/user/simulations/SimulationCard";

export default function SimulationsPageWrapper() {
  const { sims, loadSims } = useSimulation(""); //with user ID
  // const [name, set Name] = useState("");

  useEffect(() => {
    loadSims();
  }, [loadSims]);

  return (
    <div className="p-6 space-y-4">
      {/* <div className="flex gap-2"> */}
      {/* <input
          className="border px-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Simulation name"
        /> */}
      {/* <Button onCslick={() => loadSims()}>Refresh</Button> */}
      {/* </div> */}
      <div className="grid md:grid-cols-3 gap-4">
        {sims.map((s) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <SimulationCard key={s.id} sim={s as any} />
        ))}
      </div>
    </div>
  );
}
