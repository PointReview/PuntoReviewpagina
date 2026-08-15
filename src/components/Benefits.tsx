import { motion } from 'motion/react';
import { Star, Smartphone, QrCode, Zap, Palette, Gift } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: Star,
      title: "Más reseñas",
      description: "Facilita que tus clientes lleguen rápidamente a Google Reviews."
    },
    {
      icon: Smartphone,
      title: "Acceso con NFC",
      description: "El cliente simplemente acerca su teléfono."
    },
    {
      icon: QrCode,
      title: "También funciona con QR",
      description: "El QR permite utilizar el cartel incluso en teléfonos sin NFC."
    },
    {
      icon: Zap,
      title: "Acceso instantáneo",
      description: "Menos pasos para llegar al destino digital."
    },
    {
      icon: Palette,
      title: "Diseño personalizado",
      description: "El cartel puede adaptarse a la identidad visual del negocio."
    },
    {
      icon: Gift,
      title: "Sticker para vidrio incluido",
      description: "Todos los carteles incluyen un sticker de regalo para colocar en vidrieras o cristales."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
            ¿Por qué tener un cartel QR + NFC?
          </h2>
          <p className="text-lg text-slate-600">
            Mejorá la experiencia de tus clientes con tecnología que simplifica el acceso.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <benefit.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
