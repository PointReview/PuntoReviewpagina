import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

const PROJECT_ID = "gen-lang-client-0906708540";

const DATABASE_ID =
  "ai-studio-puntoreview-9bbcb65d-e2d2-4887-be0e-69183aaf6f09";

const serviceAccountPath = path.join(
  process.cwd(),
  "serviceAccountKey.json"
);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    `No se encontró serviceAccountKey.json en: ${serviceAccountPath}`
  );
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

const app =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert(serviceAccount),
        projectId: PROJECT_ID,
      });

export const firestore = getFirestore(app, DATABASE_ID);
