import { Product, Client, FAQItem } from "./types";

export const CONFIG = {
  brandName: "PuntoReview",
  instagram: "@puntoreview.ar",
  whatsapp: "543517874190",
  contactMessage: "Hola PuntoReview! Estuve viendo los carteles y quiero hacer una consulta.",
  customOrderMessage: "Hola PuntoReview! Me interesa consultar por un cartel personalizado.",
  products: [
    {
      id: "10x15",
      name: "PuntoReview 10 × 15 cm",
      image: "/images/producto-10x15.svg", 
      price: 34900,
      features: [
        "Tamaño 10 × 15 cm",
        "QR personalizado",
        "Tecnología NFC",
        "Pie/base impresa en 3D",
        "Diseño personalizado",
        "Listo para colocar",
        "Sticker para vidrio/vidriera de regalo"
      ],
      commercialText: "Ideal para mostradores, cajas, mesas y puntos de atención.",
      isPopular: true
    },
    {
      id: "12x18",
      name: "PuntoReview 12 × 18 cm",
      image: "/images/producto-12x18.svg", 
      price: 44900,
      features: [
        "Tamaño 12 × 18 cm",
        "QR personalizado",
        "Tecnología NFC",
        "Diseño premium",
        "Excelente visibilidad",
        "Listo para colocar",
        "Sticker para vidrio/vidriera de regalo"
      ],
      commercialText: "Más grande y visible. Ideal para comercios con mayor circulación de clientes."
    },
    {
      id: "20x15",
      name: "PuntoReview 15 × 20 cm",
      image: "/images/producto-15x20.svg", 
      price: 59900,
      features: [
        "Tamaño 15 × 20 cm",
        "QR personalizado",
        "Tecnología NFC",
        "Mayor superficie visual",
        "Diseño premium",
        "Ideal para mostradores y espacios amplios",
        "Sticker para vidrio/vidriera de regalo"
      ],
      commercialText: "La opción ideal para quienes buscan mayor presencia y visibilidad."
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
