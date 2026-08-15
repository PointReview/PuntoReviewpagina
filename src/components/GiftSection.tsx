import { motion } from 'motion/react';
import { Gift } from 'lucide-react';

export function GiftSection() {
  return (
    <section className="py-20 bg-blue-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-800 to-blue-950 rounded-3xl p-8 md:p-12 border border-blue-700/50 shadow-2xl flex flex-col md:flex-row items-center gap-10"
        >
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/50 text-blue-200 text-sm font-semibold mb-6 border border-blue-600/50">
              <Gift className="w-4 h-4" />
              TODOS LOS CARTELES INCLUYEN UN REGALO
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sticker adhesivo para vidrio de regalo
            </h2>
            
            <p className="text-blue-200 text-lg mb-6">
              Ideal para colocar en zonas de alta visibilidad antes de que el cliente llegue al mostrador.
            </p>
            
            <ul className="grid grid-cols-2 gap-3 text-sm text-blue-100">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> En vidrieras
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> En puertas
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> En mostradores
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Cerca de la caja
              </li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-square bg-blue-800 rounded-2xl border border-blue-600 flex items-center justify-center p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              {/* Abstract sticker representation */}
              <div className="w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm border-2 border-dashed border-blue-400/50 flex flex-col items-center justify-center transform -rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="w-12 h-12 bg-white/20 rounded-lg mb-2" />
                <div className="w-16 h-2 bg-white/20 rounded-full" />
              </div>
              
              <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform rotate-12">
                INCLUIDO SIN CARGO
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
