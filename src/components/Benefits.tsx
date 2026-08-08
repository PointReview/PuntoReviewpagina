import { motion } from 'motion/react';
import { TrendingUp, Smartphone, QrCode, Zap, Eye, Briefcase } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Más reseñas",
      description: "Facilitá que tus clientes compartan su experiencia."
    },
    {
      icon: Smartphone,
      title: "NFC",
      description: "El cliente simplemente acerca su celular."
    },
    {
      icon: QrCode,
      title: "QR",
      description: "También funciona con cualquier teléfono que pueda escanear códigos QR."
    },
    {
      icon: Zap,
      title: "Sin aplicaciones",
      description: "No hace falta descargar ninguna aplicación."
    },
    {
      icon: Eye,
      title: "Más visibilidad",
      description: "Las reseñas ayudan a fortalecer la presencia digital del negocio."
    },
    {
      icon: Briefcase,
      title: "Imagen profesional",
      description: "Una herramienta moderna que mejora la experiencia del cliente."
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Más fácil para tus clientes. <br className="hidden sm:block" />
            <span className="text-blue-600">Más oportunidades para tu negocio.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
