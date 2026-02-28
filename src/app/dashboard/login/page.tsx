'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const USERNAME = 'khaled4ever';
const PASSWORD = 'Kh738211';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // To check auth status initially

  useEffect(() => {
    // On component mount, check if user is already authenticated
    if (localStorage.getItem('dashboard_auth') === 'true') {
      router.replace('/dashboard');
    } else {
      setIsLoading(false); // If not auth'd, stop loading and show form.
    }
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate a brief delay for UX
    await new Promise(resolve => setTimeout(resolve, 300));

    if (username !== USERNAME || password !== PASSWORD) {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
        setIsSubmitting(false);
        return;
    }
    
    localStorage.setItem('dashboard_auth', 'true');
    router.replace('/dashboard');
  };
  
  if (isLoading) {
    // Show a loader while we check the initial auth state.
    // This prevents the login form from flashing if the user is already logged in.
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
