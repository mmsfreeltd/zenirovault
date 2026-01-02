import ProveTableWrapper from "@/components/user/prove/ProveTableWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "List of Proof",
};
export default function ProvePage() {
  return (
    <>
      <ProveTableWrapper />
    </>
  );
}
