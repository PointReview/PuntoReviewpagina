# PuntoReview — sitio web MVP

Landing comercial en React + Vite + Tailwind CSS. Incluye catálogo, carrito, pedido por WhatsApp, FAQ, beneficios, clientes y CTA.

## Requisitos
- Node.js 20 LTS o superior
- Visual Studio Code

## Instalar
```bash
npm install
```

## Ejecutar
```bash
npm run dev
```

Abrí la URL que muestra Vite (normalmente http://localhost:5173).

## Producción
```bash
npm run build
npm run preview
```

## Dónde cambiar datos
- `src/config.ts`: precios, WhatsApp, productos, textos, FAQ y clientes.
- `public/logo-puntoreview.png`: logo.
- `public/images/`: reemplazá las imágenes demo por las fotos reales.

## Importante
Este MVP es un catálogo + carrito que arma un pedido por WhatsApp. No incluye todavía un panel de administración ni QR dinámicos con base de datos. Esa será la segunda etapa del proyecto.
