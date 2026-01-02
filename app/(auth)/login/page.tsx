import { LoginForm } from '@/components/auth/login-form';
import { AuthCard } from '@/components/auth/auth-card';
import { LogIn } from 'lucide-react';
import { FlashAlert } from '@/components/common/FlashAlertServer';

import { Metadata } from 'next';
import { SITE_NAME } from '@/global/constants';

export const metadata: Metadata = {
  title: `${SITE_NAME} | Login `,
};
export default function LoginPage() {
  return (
    <>
      <div className="flex flex-col items-center mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground animate-in fade-in-50 duration-500">
          Welcome back
        </h1>
        <p className="text-muted-foreground animate-in fade-in-50 slide-in-from-bottom-4 duration-500 delay-150">
          Sign in to your account to continue
        </p>
      </div>

      <AuthCard
        title="Sign in"
        icon={LogIn}
        footer={
          <div className="text-center text-sm">
            Dont have an account?
            <a
              href="/register"
              className="underline underline-offset-4 hover:text-primary font-medium"
            >
              Sign up
            </a>
          </div>
        }
        className="animate-in fade-in-50 slide-in-from-bottom-6 duration-500 delay-200"
      >
        <FlashAlert />
        <LoginForm />
      </AuthCard>
    </>
  );
}
