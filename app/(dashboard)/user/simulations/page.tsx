import ErrorBoundary from "@/components/user/ErrorBoundary";
import SimulationsPageWrapper from "@/components/user/simulations/SimulationPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo Trading",
};
export default function Subscription() {
  return (
    <ErrorBoundary>
      <SimulationsPageWrapper />
    </ErrorBoundary>
  );
}
