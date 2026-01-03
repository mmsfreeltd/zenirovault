import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import { LIVE_CHAT, SITE_NAME } from '@/global/constants';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | Home`,
  description: `Experience the future of digital trading with ${SITE_NAME} — a secure, intuitive platform built for performance, accessibility, and community-driven growth`,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          {children}
          <Toaster />
        </ThemeProvider>
        <Script
          id="custom-inline-script"
          dangerouslySetInnerHTML={{ __html: LIVE_CHAT }}
        />
      </body>
    </html>
  );
}
