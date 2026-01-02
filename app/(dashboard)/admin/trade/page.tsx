import TradeForm from "@/components/admin/trade-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Trading",
};

export default function TradePage() {
  return (
    <>
      <TradeForm />
    </>
  );
}
