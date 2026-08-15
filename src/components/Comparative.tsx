import { motion } from 'motion/react';
import { Check, Star } from 'lucide-react';
import { formatCurrency } from '../utils/format';

export function Comparative() {
  return (
    <section className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">¿Cuál elegir?</h2>
          <p className="mt-4 text-lg text-slate-600">
            Descubrí la solución ideal para conectar tu negocio con tus clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Carteles */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col bg-slate-50 rounded-3xl p-8 border border-slate-200"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Cartel QR + NFC</h3>
              <p className="text-slate-500 text-sm font-medium h-10">Máxima presencia en tu local.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-slate-500 text-sm font-bold mr-2">Desde</span>
                <span className="text-3xl font-black text-slate-900">{formatCurrency(34900)}</span>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Ideal para colocar físicamente en:</span>
              <ul className="space-y-4">
                {["Mostradores", "Mesas", "Cajas", "Recepciones"].map((text, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <Check className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* NFC Instagram */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col bg-slate-50 rounded-3xl p-8 border border-slate-200"
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-2">NFC Instagram</h3>
              <p className="text-slate-500 text-sm font-medium h-10">Acceso directo a tu Instagram.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-3xl font-black text-slate-900">{formatCurrency(12900)}</span>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-2xl p-6 border border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 block">Ideal para:</span>
              <ul className="space-y-4">
                {["Instagram"].map((text, i) => (
                  <li key={i} className="flex items-center text-slate-700 font-medium">
                    <Check className="w-5 h-5 text-blue-500 mr-3 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* NFC Business Premium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col bg-gradient-to-b from-blue-50 to-white rounded-3xl p-8 border-2 border-blue-400 shadow-xl relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-black px-6 py-2 rounded-full shadow-lg z-10 whitespace-nowrap flex items-center gap-2">
              <Star className="w-3.5 h-3.5" />
              MÁS COMPLETO
            </div>

            <div className="mb-8 mt-2">
              <h3 className="text-xl font-bold text-blue-900 mb-2">NFC Business Premium</h3>
              <p className="text-blue-700/80 text-sm font-medium h-10">Varios canales digitales en un solo producto.</p>
              <div className="mt-6 flex items-baseline">
                <span className="text-3xl font-black text-blue-600">{formatCurrency(17900)}</span>
              </div>
            </div>
            
            <div className="flex-1 bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4 block">Ideal para conectar:</span>
              <ul className="space-y-3">
                {[
                  "Instagram",
                  "Google Reviews",
                  "WhatsApp",
                  "Menú digital",
                  "Página web",
                  "Promociones"
                ].map((text, i) => (
                  <li key={i} className="flex items-center text-slate-800 font-bold">
                    <Check className="w-5 h-5 text-blue-600 mr-3 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
