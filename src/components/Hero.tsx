import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

export function Hero() {
  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 lg:py-32 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest">
              Tecnología NFC + QR
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6"
            >
              Convertí cada visita en una <span className="text-blue-600">oportunidad de conseguir una reseña.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-slate-600 mb-8 leading-relaxed max-w-2xl"
            >
              Carteles físicos con QR + NFC para que tus clientes puedan dejar una reseña en Google en segundos. Sin fricción, sin esperas.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 items-center"
            >
              <button 
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200/50"
              >
                <ShoppingBag className="w-5 h-5" />
                QUIERO EL MÍO
              </button>
              <button 
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
              >
                VER MODELOS
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Floating visual representation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1 w-full"
          >
            <div className="aspect-[4/3] rounded-3xl bg-slate-50 border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center relative">
              {/* Minimalist abstract representation of the product */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-48 h-64 bg-white rounded-2xl shadow-sm flex flex-col items-center p-6 border border-slate-200"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-xl mb-4 flex items-center justify-center">
                   <div className="w-8 h-8 bg-blue-600 rounded-lg" />
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full mb-2" />
                <div className="w-3/4 h-3 bg-slate-100 rounded-full mb-8" />
                <div className="w-24 h-24 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 mt-auto" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
