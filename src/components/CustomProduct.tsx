import { motion } from 'motion/react';
import { Palette, PenTool, ExternalLink } from 'lucide-react';
import { CONFIG } from '../config';

export function CustomProduct() {
  const handleCustomOrder = () => {
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.customOrderMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Querés algo diferente?</h2>
              <p className="text-lg text-gray-600 mb-8">
                También realizamos carteles personalizados para negocios que buscan un diseño único y a medida.
              </p>
              
              <ul className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Tamaño personalizado
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Forma personalizada
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Colores del negocio
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Logo y diseño a medida
                </li>
              </ul>
              
              <button 
                onClick={handleCustomOrder}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                CONSULTAR PERSONALIZADO
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-48 h-48 bg-white rounded-full shadow-xl border-4 border-gray-100 flex items-center justify-center relative">
                <Palette className="w-16 h-16 text-blue-200 absolute -top-4 -left-4 -rotate-12" />
                <PenTool className="w-12 h-12 text-gray-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
