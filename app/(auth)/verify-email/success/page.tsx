import { CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email has been verified",
};

export default function VerifySuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4">
      <CheckCircle2 className="mx-auto text-green-500 mb-4" size={48} />
      <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
      <p className="text-muted-foreground mb-6">
        Your email has been successfully verified. You can now log in to your
        account.
      </p>
      <a
        href="/login"
        className="bg-primary text-white p-2 rounded hover:bg-purple-500"
      >
        Login Now
      </a>
    </div>
  );
}
