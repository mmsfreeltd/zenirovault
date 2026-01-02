import { Metadata } from "next";
import InvestmentForm from "@/components/admin/investment-form";

export const metadata: Metadata = {
  title: "Create Deposit",
};

export default function InvestmentPage() {
  return (
    <>
      <h2>Fill the form below to create a new deposit</h2>
      <InvestmentForm />
    </>
  );
}
