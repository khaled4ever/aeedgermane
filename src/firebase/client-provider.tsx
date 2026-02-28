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

  const [isConfigValid, setIsConfigValid] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const configIsValid = !!(firebaseConfig.apiKey && firebaseConfig.projectId);
      setIsConfigValid(configIsValid);
      if (configIsValid) {
        const instances = initializeFirebase();
        setFirebase({
          firebaseApp: instances.firebaseApp,
          auth: instances.auth,
          firestore: instances.firestore,
        });
      }
    }
  }, []);
  
  // This check avoids rendering the error during server-side rendering or if config is valid.
  if (!isConfigValid && typeof window !== 'undefined') {
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


  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
