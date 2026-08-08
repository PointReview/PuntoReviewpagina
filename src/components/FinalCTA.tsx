import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';

export function FinalCTA() {
  const scrollToProducts = () => {
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-32 bg-blue-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Tu próximo cliente puede estar a <span className="text-blue-300">una reseña de distancia.</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Elegí tu modelo y recibí tu pedido directamente por WhatsApp.
          </p>
          
          <button 
            onClick={scrollToProducts}
            className="px-10 py-5 rounded-full bg-white text-blue-900 font-bold text-lg hover:bg-gray-50 transition-colors shadow-2xl flex items-center gap-3 mx-auto"
          >
            <ShoppingBag className="w-5 h-5" />
            QUIERO MI PUNTOREVIEW
          </button>
          
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-blue-300/80">
            <span>QR + NFC</span>
            <span className="hidden sm:inline">•</span>
            <span>Diseño personalizado</span>
            <span className="hidden sm:inline">•</span>
            <span>Sticker para vidrio de regalo</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
