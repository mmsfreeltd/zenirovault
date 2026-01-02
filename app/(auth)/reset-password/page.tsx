import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { KeyRound } from "lucide-react";
import ResetPasswordClient from "@/components/auth/reset-password-client";
import { Metadata } from "next";
import { Suspense } from "react";
import PageLoadingSpinner from "@/components/common/loading-spinner";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <>
      <div className="flex flex-col items-center mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground animate-in fade-in-50 duration-500">
          Reset your password
        </h1>
        <p className="text-muted-foreground animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-150">
          Enter your new password below
        </p>
      </div>

      <AuthCard
        title="New password"
        icon={KeyRound}
        footer={
          <div className="text-center text-sm">
            Remember your password?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Back to login
            </Link>
          </div>
        }
        className="animate-in fade-in-50 slide-in-from-bottom-6 duration-500 delay-200"
      >
        <Suspense
          fallback={
            <div>
              <PageLoadingSpinner />
            </div>
          }
        >
          <ResetPasswordClient />
        </Suspense>
      </AuthCard>
    </>
  );
}
