import { motion } from 'motion/react';
import { Check, Plus } from 'lucide-react';
import { CONFIG } from '../config';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';

export function Products() {
  const { addToCart } = useCart();

  return (
    <section id="productos" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Elegí tu modelo</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {CONFIG.products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col sm:flex-row bg-white rounded-2xl p-6 shadow-sm border transition-colors relative group items-center gap-6 ${
                product.isPopular ? 'border-slate-200 hover:border-blue-300' : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              {product.isPopular && (
                <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded z-10">
                  MÁS VENDIDO
                </span>
              )}
              
              <div className="w-full sm:w-32 h-48 sm:h-32 bg-slate-100 rounded-xl relative overflow-hidden shrink-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 w-full">
                <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                <p className="text-slate-500 text-xs mb-3">
                  {product.commercialText}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {product.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                      {feature}
                    </span>
                  ))}
                  {product.features.length > 3 && (
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-2 py-0.5 rounded">
                      +{product.features.length - 3} más
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-black text-blue-600">
                    {formatCurrency(product.price)}
                  </span>
                  
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    Agregar al pedido
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
