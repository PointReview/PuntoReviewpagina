import { Product, Client, FAQItem } from "./types";

export const CONFIG = {
  brandName: "PuntoReview",
  instagram: "@puntoreview.ar",
  whatsapp: "543517874190",
  contactMessage: "Hola PuntoReview! Estuve viendo los carteles y quiero hacer una consulta.",
  customOrderMessage: "Hola PuntoReview! Me interesa consultar por un cartel personalizado.",
  products: [
    {
      id: "cartel-10x15",
      slug: "cartel-10x15",
      category: "Carteles QR + NFC",
      name: "Cartel QR + NFC — 10×15 cm",
      image: "/images/products/cartel-10x15.png",
      images: ["/images/products/cartel-10x15.png"],
      price: 34900,
      description: "El modelo más compacto. Ideal para mostradores, cajas, mesas y puntos de atención. Incluye sticker de regalo.",
      shortDescription: "El modelo más compacto.",
      features: [
        "Tamaño 10×15 cm",
        "Acrílico",
        "QR integrado",
        "NFC integrado",
        "Pie/base impresa en 3D",
        "Sticker para vidrio de regalo",
        "Personalización",
        "Configuración del destino digital",
        "Diseño pensado para mostradores y puntos de atención"
      ],
      benefits: [
        "Ideal para cafeterías, peluquerías, restaurantes, comercios, mostradores, cajas, recepciones"
      ],
      commercialText: "El modelo más compacto.",
      isPopular: false,
      available: true
    },
    {
      id: "cartel-12x18",
      slug: "cartel-12x18",
      category: "Carteles QR + NFC",
      name: "Cartel QR + NFC — 12×18 cm",
      image: "/images/products/cartel-12x18.png",
      images: ["/images/products/cartel-12x18.png"],
      price: 44900,
      description: "Más espacio. Mayor presencia. Ideal para comercios con mayor circulación de clientes. Incluye sticker de regalo.",
      shortDescription: "Más espacio. Mayor presencia.",
      features: [
        "Tamaño 12×18 cm",
        "Acrílico",
        "QR integrado",
        "NFC integrado",
        "Diseño premium",
        "Sticker para vidrio de regalo",
        "Personalización",
        "Configuración del destino digital"
      ],
      commercialText: "Más espacio. Mayor presencia.",
      isPopular: true,
      badge: "Más vendido",
      available: true
    },
    {
      id: "cartel-15x20",
      slug: "cartel-15x20",
      category: "Carteles QR + NFC",
      name: "Cartel QR + NFC — 15×20 cm",
      image: "/images/products/cartel-15x20.png",
      images: ["/images/products/cartel-15x20.png"],
      price: 59900,
      description: "Máxima presencia para tu negocio. La opción ideal para quienes buscan mayor presencia y visibilidad. Incluye sticker de regalo.",
      shortDescription: "Máxima presencia para tu negocio.",
      features: [
        "Tamaño 15×20 cm",
        "Acrílico",
        "QR integrado",
        "NFC integrado",
        "Mayor superficie visual",
        "Diseño premium",
        "Sticker para vidrio de regalo",
        "Personalización",
        "Configuración del destino digital"
      ],
      commercialText: "Máxima presencia para tu negocio.",
      available: true
    },
    {
      id: "nfc-instagram",
      slug: "nfc-instagram-premium",
      category: "Llaveros personalizados",
      name: "NFC Instagram Premium",
      image: "/images/products/nfc-instagram.png",
      images: ["/images/products/nfc-instagram.png"],
      price: 12900,
      description: "Tag NFC premium fabricado mediante impresión 3D, diseñado para que los clientes puedan acceder rápidamente al Instagram del negocio. El cliente simplemente acerca su teléfono al tag y accede al perfil configurado.",
      shortDescription: "Convertí tu mostrador en un acceso directo a tu Instagram.",
      features: [
        "Fabricación mediante impresión 3D",
        "Diseño premium",
        "Logo de Instagram",
        "Tecnología NFC integrada",
        "Sticker NFC incorporado",
        "Configuración del enlace de Instagram",
        "Activación mediante acercamiento del teléfono",
        "No requiere escribir manualmente el usuario",
        "Diseño compacto",
        "Producto pensado para uso comercial"
      ],
      benefits: [
        "Ideal para peluquerías, cafeterías, restaurantes, tiendas, locales comerciales, mostradores, cajas, recepciones"
      ],
      commercialText: "Convertí tu mostrador en un acceso directo a tu Instagram.",
      available: true
    },
    {
      id: "nfc-business",
      slug: "nfc-business-premium",
      category: "Tarjetas NFC",
      name: "NFC Business Premium",
      image: "/images/products/nfc-business.png",
      images: ["/images/products/nfc-business.png"],
      price: 17900,
      description: "Tarjeta NFC premium personalizada para negocios que quieren centralizar diferentes canales digitales en un único punto de contacto.",
      shortDescription: "Una sola tarjeta. Múltiples accesos para tu negocio.",
      features: [
        "Tarjeta NFC premium",
        "Diseño personalizado",
        "Impresión personalizada a doble faz",
        "Posibilidad de utilizar diseños diferentes en cada cara",
        "NFC integrado",
        "Código QR integrado",
        "Configuración personalizada",
        "Compatible con smartphones con NFC",
        "QR como alternativa",
        "Diseño adaptado a la identidad del negocio"
      ],
      benefits: [
        "Puede utilizarse para conectar con: Instagram, Google Reviews, WhatsApp, menú digital, página web, promociones, Linktree, otros enlaces"
      ],
      commercialText: "Una sola tarjeta. Múltiples accesos para tu negocio.",
      featured: true,
      badge: "Más completo",
      available: true
    }
  ] as Product[],
  clients: [
    { 
      name: "Estado Play",
      testimonial: "Aumentamos nuestras reseñas en un 200% el primer mes. Excelente herramienta."
    },
    { 
      name: "La Barra Boliche",
      testimonial: "Muy práctico, los clientes lo usan sin preguntar. Queda muy elegante."
    },
    { 
      name: "Grupo Axioma",
      testimonial: "Modernizamos nuestra atención y la respuesta de los clientes fue fantástica."
    }
  ] as Client[],
  faq: [
    {
      question: "¿Cómo funciona el QR?",
      answer: "El cliente escanea el código y accede al enlace configurado para el negocio."
    },
    {
      question: "¿Qué es NFC?",
      answer: "Es una tecnología que permite interactuar acercando un celular compatible al cartel."
    },
    {
      question: "¿Necesito descargar una aplicación?",
      answer: "No."
    },
    {
      question: "¿El cartel viene personalizado?",
      answer: "Sí, el diseño puede adaptarse al negocio según el producto contratado."
    },
    {
      question: "¿Puedo colocarlo en una vidriera?",
      answer: "Sí. Todos los carteles incluyen un sticker para colocar en vidrio/vidriera de regalo."
    },
    {
      question: "¿Puedo tener QR y NFC?",
      answer: "Sí. Los modelos están pensados para ofrecer ambas opciones."
    },
    {
      question: "¿Puedo pedir varios?",
      answer: "Sí. El carrito permite seleccionar diferentes modelos y cantidades."
    }
  ] as FAQItem[]
};
