import { initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  type Auth,
} from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

export const FIREBASE_AUTH_ENABLED = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

export const FIREBASE_DB_ENABLED = Boolean(
  FIREBASE_AUTH_ENABLED && firebaseConfig.databaseURL
);

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Database | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

if (FIREBASE_AUTH_ENABLED) {
  app = initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  googleProviderInstance = new GoogleAuthProvider();
  googleProviderInstance.setCustomParameters({ prompt: "select_account" });

  if (FIREBASE_DB_ENABLED) {
    dbInstance = getDatabase(app);
  }
}

export { app };
export const auth = authInstance as Auth;
export const db = dbInstance as Database;
export const googleProvider = googleProviderInstance as GoogleAuthProvider;
