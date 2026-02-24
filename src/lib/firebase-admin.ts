import admin from 'firebase-admin';

// This file initializes the Firebase Admin SDK.
// It's designed to be a singleton, ensuring that the app is initialized only once.

// Check if the service account key is available.
if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  console.warn("FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. IP blocking feature will be disabled.");
}

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error: any) {
    console.error("Firebase Admin SDK initialization error:", error.message);
  }
}

// Export a safely initialized instance of Firestore.
// If initialization failed, this will be null, and the middleware will be bypassed.
const firestoreAdmin = admin.apps.length ? admin.firestore() : null;

export { firestoreAdmin };
