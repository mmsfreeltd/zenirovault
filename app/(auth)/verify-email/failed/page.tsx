import { XCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Failed to verify email account",
};

export default function VerifyFailedPage() {
  return (
    <div className="max-w-md mx-auto text-center py-20 px-4">
      <XCircle className="mx-auto text-destructive mb-4" size={48} />
      <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
      <p className="text-muted-foreground mb-6">
        The verification link is invalid or has expired. Please try again or
        request a new one.
      </p>
    </div>
  );
}
