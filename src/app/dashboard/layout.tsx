'use client';

import { useUser } from '@/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading, no user, and NOT on the login page, redirect to login.
    if (!loading && !user && pathname !== '/dashboard/login') {
      router.replace('/dashboard/login');
    }
  }, [user, loading, router, pathname]);

  // If we're on the login page, just render its content without the dashboard shell.
  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  // The rest of this component is the shell for authenticated dashboard pages.

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!user) {
    // This is a fallback state while the redirect is in flight.
    // It prevents a flash of the empty dashboard.
    return null;
  }

  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b bg-background">
          <h1 className="text-xl font-bold">لوحة التحكم</h1>
          { auth && <Button variant="ghost" onClick={() => auth.signOut()}>تسجيل الخروج</Button> }
      </header>
      <main>{children}</main>
    </div>
  );
}
