import AdminSimulationsPageWrapper from "@/components/admin/users/simulations/AdminSimulationsPageWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading Simulations",
};

export default function TradePage() {
  return (
    <>
      <AdminSimulationsPageWrapper />
    </>
  );
}
