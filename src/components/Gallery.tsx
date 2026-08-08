import { motion } from 'motion/react';

export function Gallery() {
  return (
    <section className="py-24 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">
            Diseñado para estar donde ocurre la experiencia.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Adaptable a cualquier estética de negocio.
          </p>
        </div>
      </div>

      {/* Scrolling Gallery */}
      <div className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory hide-scrollbar">
        {[
          "Cafeterías",
          "Restaurantes",
          "Hoteles",
          "Barberías",
          "Locales de ropa"
        ].map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="shrink-0 w-[280px] sm:w-[320px] aspect-[4/5] rounded-2xl bg-gray-100 overflow-hidden snap-center relative group"
          >
            {/* Placeholder for actual context images */}
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-bold">{category}</h3>
            </div>
            
            {/* Mock design to represent the sign in context */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-32 bg-white/90 backdrop-blur-md rounded-lg shadow-2xl border border-white/50 transform -rotate-6 flex flex-col items-center justify-center p-3 transition-transform group-hover:scale-110">
              <div className="w-full h-full border border-gray-200 rounded flex flex-col items-center p-2">
                <div className="w-8 h-8 bg-blue-100 rounded-sm mb-2" />
                <div className="w-12 h-12 border-2 border-dashed border-gray-300 mb-auto" />
                <div className="w-10 h-2 bg-gray-200 rounded-full" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
