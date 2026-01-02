import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthCard } from "@/components/auth/auth-card";
import { KeyRound } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col items-center mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground animate-in fade-in-50 duration-500">
          Reset your password
        </h1>
        <p className="text-muted-foreground animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-150">
          Enter your email to receive a password reset link
        </p>
      </div>

      <AuthCard
        title="Forgot password"
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
        <ForgotPasswordForm />
      </AuthCard>
    </>
  );
}
