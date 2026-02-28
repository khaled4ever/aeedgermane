'use client';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50">
      <div className="text-center p-8 bg-background rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">لوحة تحكم جدار الحماية</h1>
        <p className="text-muted-foreground mb-8">يرجى تسجيل الدخول للوصول إلى لوحة التحكم.</p>
        <Button onClick={handleSignIn} size="lg">
          تسجيل الدخول باستخدام جوجل
        </Button>
      </div>
    </div>
  );
}
