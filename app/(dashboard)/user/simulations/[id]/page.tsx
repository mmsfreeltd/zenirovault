import ErrorBoundary from "@/components/user/ErrorBoundary";
import SimulationDetailPage from "@/components/user/simulations/SimulationDetailPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Trading",
};
export default function Subscription() {
  return (
    <ErrorBoundary>
      <h2 className="text-xl font-semibold mb-4">Simulation Details</h2>
      <SimulationDetailPage />
    </ErrorBoundary>
  );
}
