import { firestore } from "./firebase-admin.ts";

export interface QRCode {
  id: string;
  code: string;
  status: "UNACTIVATED" | "ACTIVE" | "DISABLED";
  created_at: string;
  activated_at: string | null;
  client?: string;
  destination_url?: string;
  business_name?: string;
  notes?: string;
  reseller_id?: string;
  business?: {
    name: string;
    address: string;
    city: string;
    google_place_id: string;
    google_review_url: string;
  };
}

export interface Scan {
  id: string;
  qr_code_id: string;
  scanned_at: string;
  user_agent: string;
  referer: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password?: string;
  role: "ADMIN" | "RESELLER_ACTIVATOR" | "RESELLER_PRO";
  account_status: "ACTIVE" | "SUSPENDED" | "DISABLED";
  subscription_status: "ACTIVE" | "EXPIRED" | "NONE";
  created_at: string;
}

export interface Session {
  token: string;
  user_id: string;
  created_at: string;
}

export interface AdminAction {
  id: string;
  admin_id: string;
  target_user_id: string;
  action: string;
  previous_status: string;
  new_status: string;
  created_at: string;
}

export interface ResetToken {
  token: string;
  user_id: string;
  expires_at: string;
}

export interface Database {
  reset_tokens: ResetToken[];
  qr_codes: QRCode[];
  scans: Scan[];
  users: User[];
  sessions: Session[];
  admin_actions: AdminAction[];
}

let dbCache: Database | null = null;
let saveQueue = Promise.resolve();

async function loadCollection<T>(
  collection: string,
  mapDocument?: (data: FirebaseFirestore.DocumentData, id: string) => T
): Promise<T[]> {
  const snapshot = await firestore.collection(collection).get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    if (mapDocument) {
      return mapDocument(data, doc.id);
    }

    return data as T;
  });
}

export async function initializeDB(): Promise<Database> {
  if (dbCache) {
    return dbCache;
  }

  const [
    qr_codes,
    scans,
    users,
    sessions,
    admin_actions,
    reset_tokens,
  ] = await Promise.all([
    loadCollection<QRCode>("qr_codes"),
    loadCollection<Scan>("scans"),
    loadCollection<User>("users"),
    loadCollection<Session>("sessions", (data, id) => ({
      ...(data as Session),
      token: data.token || id,
    })),
    loadCollection<AdminAction>("admin_actions"),
    loadCollection<ResetToken>("reset_tokens"),
  ]);

  dbCache = {
    qr_codes,
    scans,
    users,
    sessions,
    admin_actions,
    reset_tokens,
  };

  return dbCache;
}

export function getDB(): Database {
  if (!dbCache) {
    throw new Error(
      "Firestore DB no inicializada. Ejecutá initializeDB() antes de iniciar el servidor."
    );
  }

  return dbCache;
}

async function saveCollection<T extends Record<string, any>>(
  collection: string,
  items: T[],
  documentId: (item: T) => string
) {
  const snapshot = await firestore.collection(collection).get();

  const existingIds = new Set(snapshot.docs.map((doc) => doc.id));
  const currentIds = new Set(items.map(documentId));

  const batch = firestore.batch();

  for (const doc of snapshot.docs) {
    if (!currentIds.has(doc.id)) {
      batch.delete(doc.ref);
    }
  }

  for (const item of items) {
    const id = documentId(item);
    const ref = firestore.collection(collection).doc(id);

    batch.set(ref, item);
    existingIds.delete(id);
  }

  await batch.commit();
}

export function saveDB(db: Database) {
  dbCache = db;

  const snapshot: Database = {
    qr_codes: [...db.qr_codes],
    scans: [...db.scans],
    users: [...db.users],
    sessions: [...db.sessions],
    admin_actions: [...db.admin_actions],
    reset_tokens: [...db.reset_tokens],
  };

  saveQueue = saveQueue
    .then(async () => {
      await Promise.all([
        saveCollection("qr_codes", snapshot.qr_codes, (x) => x.id),
        saveCollection("scans", snapshot.scans, (x) => x.id),
        saveCollection("users", snapshot.users, (x) => x.id),
        saveCollection("sessions", snapshot.sessions, (x) => x.token),
        saveCollection("admin_actions", snapshot.admin_actions, (x) => x.id),
        saveCollection("reset_tokens", snapshot.reset_tokens, (x) => x.token),
      ]);

      console.log("Firestore: DB guardada correctamente");
    })
    .catch((error) => {
      console.error("Firestore: error guardando DB:", error);
    });
}