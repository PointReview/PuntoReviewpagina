import fs from "fs";
import { firestore } from "./firebase-admin.ts";

const local = JSON.parse(
  fs.readFileSync("./db.json", "utf8")
);

async function main() {
  console.log("==========================================");
  console.log(" MIGRACIÓN SEGURA db.json -> FIRESTORE");
  console.log("==========================================");

  // ------------------------------------------
  // 1. USERS
  // ------------------------------------------

  const usersRef = firestore.collection("users");
  const usersSnapshot = await usersRef.get();

  const firestoreUsers = usersSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const userIdMap = new Map<string, string>();

  for (const localUser of local.users ?? []) {
    const existing = firestoreUsers.find(
      (u: any) =>
        String(u.username ?? "").toLowerCase() ===
          String(localUser.username ?? "").toLowerCase()
        ||
        String(u.email ?? "").toLowerCase() ===
          String(localUser.email ?? "").toLowerCase()
    );

    if (existing) {
      // Conservamos el ID que ya existe en Firestore.
      userIdMap.set(localUser.id, existing.id);

      // Actualizamos los datos del usuario local,
      // pero conservamos el ID de Firestore.
      const mergedUser = {
        ...existing,
        ...localUser,
        id: existing.id
      };

      delete mergedUser.__name__;

      await usersRef.doc(existing.id).set(mergedUser);

      console.log(
        `USER MERGE: ${localUser.username} -> ${existing.id}`
      );
    } else {
      userIdMap.set(localUser.id, localUser.id);

      await usersRef
        .doc(localUser.id)
        .set(localUser);

      console.log(
        `USER ADD: ${localUser.username} -> ${localUser.id}`
      );
    }
  }

  // ------------------------------------------
  // 2. QR CODES
  // ------------------------------------------

  const qrRef = firestore.collection("qr_codes");

  for (const localQR of local.qr_codes ?? []) {
    const ref = qrRef.doc(localQR.id);
    const existing = await ref.get();

    if (!existing.exists) {
      const qr = { ...localQR };

      if (qr.reseller_id) {
        qr.reseller_id =
          userIdMap.get(qr.reseller_id) ??
          qr.reseller_id;
      }

      await ref.set(qr);

      console.log(
        `QR ADD: ${localQR.code} -> ${localQR.id}`
      );
    } else {
      console.log(
        `QR EXISTS: ${localQR.code} -> omitido`
      );
    }
  }

  // ------------------------------------------
  // 3. SCANS
  // ------------------------------------------

  const scansRef = firestore.collection("scans");

  for (const localScan of local.scans ?? []) {
    const ref = scansRef.doc(localScan.id);
    const existing = await ref.get();

    if (!existing.exists) {
      await ref.set(localScan);

      console.log(
        `SCAN ADD: ${localScan.id}`
      );
    } else {
      console.log(
        `SCAN EXISTS: ${localScan.id}`
      );
    }
  }

  // ------------------------------------------
  // 4. SESSIONS
  // ------------------------------------------

  const sessionsRef = firestore.collection("sessions");

  for (const localSession of local.sessions ?? []) {
    const documentId = localSession.token;
    const ref = sessionsRef.doc(documentId);
    const existing = await ref.get();

    if (!existing.exists) {
      const session = {
        ...localSession,
        user_id:
          userIdMap.get(localSession.user_id) ??
          localSession.user_id
      };

      await ref.set(session);

      console.log(
        `SESSION ADD: ${documentId}`
      );
    } else {
      console.log(
        `SESSION EXISTS: ${documentId}`
      );
    }
  }

  // ------------------------------------------
  // 5. ADMIN ACTIONS
  // ------------------------------------------

  const actionsRef = firestore.collection("admin_actions");

  for (const localAction of local.admin_actions ?? []) {
    const ref = actionsRef.doc(localAction.id);
    const existing = await ref.get();

    if (!existing.exists) {
      const action = {
        ...localAction,
        admin_id:
          userIdMap.get(localAction.admin_id) ??
          localAction.admin_id,
        target_user_id:
          userIdMap.get(localAction.target_user_id) ??
          localAction.target_user_id
      };

      await ref.set(action);

      console.log(
        `ACTION ADD: ${localAction.action} -> ${localAction.id}`
      );
    } else {
      console.log(
        `ACTION EXISTS: ${localAction.id}`
      );
    }
  }

  // ------------------------------------------
  // 6. RESET TOKENS
  // ------------------------------------------

  const resetRef = firestore.collection("reset_tokens");

  for (const localToken of local.reset_tokens ?? []) {
    const ref = resetRef.doc(localToken.token);
    const existing = await ref.get();

    if (!existing.exists) {
      const token = {
        ...localToken,
        user_id:
          userIdMap.get(localToken.user_id) ??
          localToken.user_id
      };

      await ref.set(token);

      console.log(
        `RESET TOKEN ADD: ${localToken.token}`
      );
    }
  }

  // ------------------------------------------
  // 7. RESUMEN
  // ------------------------------------------

  console.log("");
  console.log("==========================================");
  console.log(" MIGRACIÓN TERMINADA");
  console.log("==========================================");

  console.log("MAPEO DE USUARIOS:");

  for (const [localId, firestoreId] of userIdMap) {
    console.log(
      `${localId} -> ${firestoreId}`
    );
  }

  console.log("");
  console.log("NO SE ELIMINÓ NINGÚN DOCUMENTO DE FIRESTORE.");
}

main().catch(error => {
  console.error("");
  console.error("==========================================");
  console.error(" ERROR EN MIGRACIÓN");
  console.error("==========================================");
  console.error(error);
  process.exit(1);
});
