import { motion } from 'motion/react';
import { X, Check } from 'lucide-react';

export function Comparative() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">¿Por qué QR + NFC?</h2>
          <p className="mt-4 text-lg text-gray-600">
            La diferencia entre perder una reseña y conseguirla.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-5xl mx-auto">
          {/* Traditional Method */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-gray-50 rounded-3xl p-8 border border-gray-200"
          >
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-500 mb-2">Método tradicional</h3>
              <div className="h-1 w-12 bg-gray-300 mx-auto rounded-full" />
            </div>
            
            <ul className="space-y-6">
              {[
                "Buscar el negocio manualmente",
                "Abrir Google Maps o Búsqueda",
                "Encontrar el perfil correcto",
                "Buscar dónde dejar una reseña",
                "Más pasos y fricción"
              ].map((text, i) => (
                <li key={i} className="flex items-center text-gray-500">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-4 shrink-0">
                    <X className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="font-medium text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VS Badge */}
          <div className="hidden lg:flex items-center justify-center -mx-4 z-10">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center font-bold text-gray-400">
              VS
            </div>
          </div>

          {/* PuntoReview Method */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-blue-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3" />
            
            <div className="text-center mb-8 relative z-10">
              <h3 className="text-2xl font-bold text-white mb-2">PuntoReview</h3>
              <div className="h-1 w-12 bg-blue-400 mx-auto rounded-full" />
            </div>
            
            <ul className="space-y-6 relative z-10">
              {[
                "Acercar celular (NFC)",
                "O escanear QR",
                "Acceso rápido y directo",
                "Menos pasos",
                "Experiencia simple"
              ].map((text, i) => (
                <li key={i} className="flex items-center text-blue-50">
                  <div className="w-8 h-8 rounded-full bg-blue-700/50 border border-blue-500 flex items-center justify-center mr-4 shrink-0">
                    <Check className="w-5 h-5 text-blue-300" />
                  </div>
                  <span className="font-medium text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
