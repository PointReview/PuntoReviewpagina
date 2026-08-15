# PuntoReviewPage

Proyecto web de PuntoReview preparado para GitHub + Firebase.

## Seguridad

No subas nunca:
- `serviceAccountKey.json`
- `.env.local`
- cualquier archivo con credenciales privadas
- `node_modules/`
- `dist/`

El backend utiliza Firebase Admin SDK, por lo que las credenciales del servidor deben configurarse como secretos/variables de entorno en el entorno de despliegue.

## Desarrollo local

1. Instalar Node.js 20 o superior.
2. Copiar `.env.example` a `.env.local`.
3. Completar las variables necesarias.
4. Ejecutar:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Firebase Hosting

Este repositorio contiene `firebase.json` para servir el frontend compilado desde `dist/`.

El rewrite `/api/**` apunta al servicio Cloud Run `puntoreview-api` en `us-central1`. Si el servicio se despliega con otro nombre o región, hay que actualizar `firebase.json`.

Antes del primer deploy:

```bash
firebase login
firebase use --add
npm run build
firebase deploy --only hosting,firestore
```

Firebase Hosting puede servir el frontend y reenviar rutas dinámicas a un servicio backend. El backend debe estar desplegado por separado.

## GitHub

```bash
git init
git add .
git commit -m "Prepare PuntoReview for GitHub and Firebase"
git branch -M main
git remote add origin <TU_REPOSITORIO>
git push -u origin main
```

## Importante sobre Firestore

Las reglas incluidas deniegan el acceso directo desde el navegador porque el proyecto usa el backend para acceder a Firestore. El backend debe autenticarse mediante Firebase Admin SDK en el entorno de producción.

Antes de producción también hay que revisar los usuarios/demo y cualquier contraseña de ejemplo que exista en el código.
