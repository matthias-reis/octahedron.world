"use server";
import { initializeApp, cert, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export let db: ReturnType<typeof getFirestore>;

try {
  const app =
    getApps().length === 0
      ? initializeApp({
          credential: cert({
            projectId: "pcsc-app",
            privateKey: (process.env.FB_PRIVATE_KEY ?? "").replace(
              /\\n/g,
              "\n"
            ),
            clientEmail: process.env.FB_CLIENT_EMAIL,
          }),
        })
      : getApp();

  console.log("[FIREBASE] ✅ initialized successfully");
  db = getFirestore(app);
} catch (error) {
  console.error("[FIREBASE] ❌ initialization failed:", error);
  throw error;
}

export const toSerialisedDate = (timestamp: any): string => {
  if (timestamp && timestamp.toDate) {
    return timestamp.toDate().toISOString();
  }
  return new Date(timestamp).toISOString();
};
