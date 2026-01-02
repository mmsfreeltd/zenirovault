import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { SITE_NAME } from '@/global/constants';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="absolute top-4 flex items-center gap-4 w-full">
        <div className="flex justify-between items-center  w-full sm:px-10 px-2">
          <Button asChild size="sm" variant="outline">
            <Link href="/">
              <ArrowLeft />
              <span>Home</span>
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      <div className="flex w-full max-w-100 flex-col items-center sm:mt-0 mt-15">
        {children}
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        <p>© 2025 {SITE_NAME}.</p>
      </footer>
    </div>
  );
}
