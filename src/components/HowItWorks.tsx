import { motion } from 'motion/react';
import { Smartphone, ScanLine, Star } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Smartphone,
      title: "El cliente acerca su celular",
      description: "Puede utilizar NFC.",
      number: "01"
    },
    {
      icon: ScanLine,
      title: "O escanea el QR",
      description: "No necesita descargar ninguna aplicación.",
      number: "02"
    },
    {
      icon: Star,
      title: "Deja su reseña",
      description: "El cliente llega directamente al destino configurado.",
      number: "03"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">¿Cómo funciona?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Un proceso diseñado para no tener fricciones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 z-0" />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center mb-6 text-blue-600 relative group">
                <div className="absolute -inset-2 bg-blue-100 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity blur-sm -z-10" />
                <step.icon className="w-10 h-10" />
                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-blue-900 text-white font-bold text-sm flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Animated flow path */}
        <div className="mt-16 flex justify-center items-center gap-4 text-sm font-medium text-gray-400 overflow-hidden">
          <span className="text-blue-600">CELULAR</span>
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.div>
          <span>QR/NFC</span>
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
          >
            →
          </motion.div>
          <span>GOOGLE</span>
          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
          >
            →
          </motion.div>
          <span className="text-gray-900 font-bold">RESEÑA</span>
        </div>
      </div>
    </section>
  );
}
