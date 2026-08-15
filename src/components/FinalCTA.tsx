import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../config';

export function FinalCTA() {
  const handleWhatsApp = () => {
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hola PuntoReview! Quisiera llevar las soluciones QR y NFC a mi negocio.')}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            ¿Querés llevar PuntoReview a tu negocio?
          </h2>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Contactanos directamente para encontrar la solución ideal.
          </p>
          
          <button 
            onClick={handleWhatsApp}
            className="px-10 py-5 rounded-xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#128C7E] transition-colors shadow-2xl flex items-center gap-3 mx-auto"
          >
            <MessageCircle className="w-6 h-6 fill-current" />
            CONSULTAR POR WHATSAPP
          </button>
          
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-400">
            <span>QR + NFC</span>
            <span className="hidden sm:inline">•</span>
            <span>Diseño personalizado</span>
            <span className="hidden sm:inline">•</span>
            <span>Tecnología premium</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
