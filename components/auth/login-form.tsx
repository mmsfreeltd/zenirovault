'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean(),
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingLoading, setIsSendingLoading] = useState(false);
  const [showResendLink, setShowResendLink] = useState(false);
  const [emailToResend, setEmailToResend] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setShowResendLink(false);

    try {
      const response = await axios.post('/api/login', {
        email: values.email,
        password: values.password,
      });

      const redirectTo = response.data.redirectTo || '/user';

      toast.success('Login successful!', {
        description: 'Redirecting... ',
      });

      router.replace(redirectTo); //
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);

      if (error.response?.data?.emailNotVerified) {
        setEmailToResend(values.email);
        setShowResendLink(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResendVerification() {
    if (!emailToResend) return;
    setIsSendingLoading(true);
    try {
      await axios.post('/api/resend-verification', { email: emailToResend });
      toast.success('Verification email sent', {
        description: 'Check your inbox for the new link.',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error('Failed to send email', {
        description: error.response.data.message as
          | string
          | 'Please try again later.',
      });
    }
    setIsSendingLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-muted-foreground hover:text-primary"
                  type="button"
                  onClick={() => router.push('/forgot-password')}
                >
                  Forgot password?
                </Button>
              </div>
              <FormControl>
                <Input
                  placeholder="••••••••"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm cursor-pointer">
                  Remember me
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
            </>
          ) : (
            'Sign in'
          )}
        </Button>

        {showResendLink && (
          <Button
            variant="ghost"
            className="w-full text-center text-sm text-muted-foreground hover:text-primary"
            type="button"
            disabled={isSendingLoading}
            onClick={handleResendVerification}
          >
            {isSendingLoading && <Loader2 className="animate-spin" />}
            Resend Verification Email
          </Button>
        )}
      </form>
    </Form>
  );
}
