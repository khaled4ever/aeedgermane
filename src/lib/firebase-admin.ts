import admin from 'firebase-admin';

// This file initializes the Firebase Admin SDK.
// It's designed to be a singleton, ensuring that the app is initialized only once.

let firestoreAdmin: admin.firestore.Firestore | null = null;

// Check if the service account key is available.
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  console.warn("[Ad-Tracker-Config] FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Tracking feature is disabled.");
} else if (admin.apps.length === 0) {
  try {
    console.log("[Ad-Tracker-Config] FIREBASE_SERVICE_ACCOUNT_KEY found. Attempting to initialize Firebase Admin SDK...");
    const serviceAccount = JSON.parse(serviceAccountKey);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    firestoreAdmin = admin.firestore();
    console.log("[Ad-Tracker-Config] Firebase Admin SDK initialized successfully. Tracking is ACTIVE.");
  } catch (error: any) {
    console.error("[Ad-Tracker-Config] Firebase Admin SDK initialization FAILED. This is a critical error.");
    console.error("[Ad-Tracker-Config] The most common cause is an incorrectly formatted FIREBASE_SERVICE_ACCOUNT_KEY in Vercel's environment variables.");
    console.error("[Ad-Tracker-Config] The key must be a valid JSON string. Check for extra characters, line breaks, or syntax errors.");
    console.error("[Ad-Tracker-Config] Parsing Error Message:", error.message);
    // Log the first few and last few characters of the key to help debug without exposing it all.
    const keySnippet = serviceAccountKey.length > 60
        ? `${serviceAccountKey.substring(0, 30)}...${serviceAccountKey.substring(serviceAccountKey.length - 30)}`
        : serviceAccountKey;
    console.error(`[Ad-Tracker-Config] Key Snippet (is it valid JSON?): ${keySnippet}`);
  }
} else {
  // If app is already initialized, just get the firestore instance.
  firestoreAdmin = admin.firestore();
  console.log("[Ad-Tracker-Config] Firebase Admin SDK already initialized. Tracking is ACTIVE.");
}

export { admin, firestoreAdmin };
