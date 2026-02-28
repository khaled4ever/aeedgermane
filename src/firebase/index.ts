'use client';

import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

// Providers and Hooks
export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
export * from './firestore/use-collection';

// Initialization
export function initializeFirebase(): {
    firebaseApp: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
} {
    if (getApps().length) {
        const firebaseApp = getApps()[0];
        const auth = getAuth(firebaseApp);
        const firestore = getFirestore(firebaseApp);
        return { firebaseApp, auth, firestore };
    }

    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);

    return { firebaseApp, auth, firestore };
}
