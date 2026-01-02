import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthCard } from "@/components/auth/auth-card";
import { UserPlus } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register Page",
};

export default function RegisterPage() {
  return (
    <>
      <div className="flex flex-col items-center mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground animate-in fade-in-50 duration-500">
          Create an account
        </h1>
        <p className="text-muted-foreground animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-150">
          Sign up to get started with Modern Auth
        </p>
      </div>

      <AuthCard
        title="Sign up"
        icon={UserPlus}
        footer={
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Sign in
            </Link>
          </div>
        }
        className="animate-in fade-in-50 slide-in-from-bottom-6 duration-500 delay-200"
      >
        <RegisterForm />
      </AuthCard>
    </>
  );
}
