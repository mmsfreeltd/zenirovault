import ProveComponent from "@/components/user/prove/ProveComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Your proof of Payment",
};
export default function ProvePage() {
  return (
    <>
      <ProveComponent />
    </>
  );
}
