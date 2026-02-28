'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/dashboard/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!user) {
    // This is a fallback, useEffect should handle the redirect.
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
