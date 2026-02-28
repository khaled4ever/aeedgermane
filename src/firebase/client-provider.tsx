'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { initializeFirebase } from './';
import { FirebaseProvider } from './provider';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<{
    firebaseApp: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
  }>({ firebaseApp: null, auth: null, firestore: null });

  // null: loading/undetermined, true: valid, false: invalid
  const [isConfigValid, setIsConfigValid] = useState<boolean | null>(null);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    // We now check for authDomain as well, as it's critical for Firebase Auth.
    const configIsValid = !!(
      firebaseConfig.apiKey && 
      firebaseConfig.projectId && 
      firebaseConfig.authDomain
    );
    
    if (configIsValid) {
      const instances = initializeFirebase();
      setFirebase({
        firebaseApp: instances.firebaseApp,
        auth: instances.auth,
        firestore: instances.firestore,
      });
    }
    // We set the validity regardless, so we know when to show the error.
    setIsConfigValid(configIsValid);
  }, []);
  
  // During server-side rendering and the initial client render, isConfigValid is null.
  // In this case, we render the children to ensure server and client match.
  // Downstream components should handle the loading state (e.g., useUser hook).
  if (isConfigValid === false) {
    // This part will only run on the client after useEffect has determined the config is invalid.
    // This avoids the hydration error.
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background text-foreground p-4">
            <div className="max-w-3xl text-center rounded-lg border border-destructive bg-destructive/10 p-8">
                <h1 className="text-2xl font-bold text-destructive font-headline">خطأ في إعدادات Firebase</h1>
                <p className="mt-4 text-destructive/90">
                    يبدو أن متغيرات البيئة الخاصة بالواجهة الأمامية لـ Firebase غير موجودة أو غير مكتملة. لا يمكن تشغيل لوحة التحكم بدونها.
                </p>
                <p className="mt-4 text-sm text-destructive/80">
                    لإصلاح هذا، يرجى إنشاء ملف باسم `.env.local` في جذر المشروع وإضافة مفاتيح تهيئة مشروع Firebase الخاصة بك.
                </p>
                <div dir="ltr" className="mt-6 text-left bg-black/20 p-4 rounded-md text-xs font-mono text-destructive/80 overflow-x-auto">
                    NEXT_PUBLIC_FIREBASE_API_KEY=AIza...<br/>
                    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com<br/>
                    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id<br/>
                    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com<br/>
                    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...<br/>
                    NEXT_PUBLIC_FIREBASE_APP_ID=1:...:web:...
                </div>
                 <p className="mt-4 text-xs text-destructive/70">
                    يمكنك العثور على هذه القيم في <span className="font-bold">إعدادات المشروع {'>'} تطبيقاتك {'>'} SDK setup and configuration</span> في لوحة تحكم Firebase.
                </p>
            </div>
        </div>
    );
  }

  // Render children if config is valid or if its validity is not yet determined (isConfigValid === null).
  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
