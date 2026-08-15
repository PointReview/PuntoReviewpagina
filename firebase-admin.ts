import { initializeApp, getApps, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const PROJECT_ID = "gen-lang-client-0906708540";

const DATABASE_ID =
  "ai-studio-puntoreview-9bbcb65d-e2d2-4887-be0e-69183aaf6f09";

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: applicationDefault(),
        projectId: PROJECT_ID,
      });

export const firestore = getFirestore(app, DATABASE_ID);
