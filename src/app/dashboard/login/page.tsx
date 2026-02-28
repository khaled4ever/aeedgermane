'use client';
import { useUser } from '@/firebase';
import { signInAnonymously, getAuth } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';


const USERNAME = 'khaled4ever';
const PASSWORD = 'Kh738211';

export default function LoginPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username !== USERNAME || password !== PASSWORD) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
        return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      // Workaround: Initialize a fresh auth instance here to bypass potential context issues.
      let app;
      if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
      } else {
        app = getApps()[0];
      }
      const auth = getAuth(app);

      await signInAnonymously(auth);
      // The useUser hook will now redirect to /dashboard once its onAuthStateChanged listener fires.
    } catch (error) {
      console.error('Error signing in anonymously', error);
      setError('حدث خطأ أثناء تسجيل الدخول.');
      setIsSubmitting(false);
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
      <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">لوحة تحكم جدار الحماية</CardTitle>
              <CardDescription>يرجى تسجيل الدخول للوصول إلى لوحة التحكم.</CardDescription>
          </CardHeader>
          <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                      <Label htmlFor="username">اسم المستخدم</Label>
                      <Input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsernameState(e.target.value)}
                          required
                          dir="ltr"
                      />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="password">كلمة المرور</Label>
                      <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPasswordState(e.target.value)}
                          required
                          dir="ltr"
                      />
                  </div>
                  {error && <p className="text-sm font-medium text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      تسجيل الدخول
                  </Button>
              </form>
          </CardContent>
      </Card>
    </div>
  );
}
