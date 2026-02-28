'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // Using null as initial state to mean "loading" or "undetermined"
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // This effect runs only on the client-side.
    try {
      const authStatus = localStorage.getItem('dashboard_auth') === 'true';
      setIsAuthenticated(authStatus);

      if (!authStatus && pathname !== '/dashboard/login') {
        router.replace('/dashboard/login');
      }
    } catch (e) {
      // If localStorage is not available for some reason
      setIsAuthenticated(false);
      if (pathname !== '/dashboard/login') {
        router.replace('/dashboard/login');
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('dashboard_auth');
    router.replace('/dashboard/login');
  };

  // If on the login page, just render it. The login page itself can handle
  // redirecting already-logged-in users.
  if (pathname === '/dashboard/login') {
    return <>{children}</>;
  }

  // For all other /dashboard/* routes, we need to check auth.
  if (isAuthenticated === null) {
    // We're still checking auth on the client. Show a loader.
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // The redirect in useEffect has been triggered. Return null to prevent
    // flashing the protected content.
    return null;
  }

  // If authenticated, render the dashboard shell.
  return (
    <div>
      <header className="flex items-center justify-between p-4 border-b bg-background">
          <h1 className="text-xl font-bold">لوحة التحكم</h1>
          <Button variant="ghost" onClick={handleLogout}>تسجيل الخروج</Button>
      </header>
      <main>{children}</main>
    </div>
  );
}
