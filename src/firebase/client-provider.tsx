'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { initializeFirebase } from './';
import { FirebaseProvider } from './provider';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebase, setFirebase] = useState<{
    firebaseApp: FirebaseApp | null;
    auth: Auth | null;
    firestore: Firestore | null;
  }>({ firebaseApp: null, auth: null, firestore: null });

  useEffect(() => {
    // This check ensures Firebase is only initialized on the client-side.
    if (typeof window !== 'undefined') {
      const instances = initializeFirebase();
      setFirebase({
        firebaseApp: instances.firebaseApp,
        auth: instances.auth,
        firestore: instances.firestore,
      });
    }
  }, []);

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
