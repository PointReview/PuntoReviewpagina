import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShoppingCart, X, Star } from 'lucide-react';
import { CONFIG } from '../config';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { Product } from '../types';

export function Products() {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const handleBuyNow = (product: Product) => {
    addToCart(product);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const categories = Array.from(new Set(CONFIG.products.map(p => p.category).filter(Boolean))) as string[];

  return (
    <section id="productos" className="py-24 bg-slate-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Nuestros productos</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Soluciones inteligentes para conectar tu negocio con tus clientes.</p>
        </div>

        {categories.map((category, catIdx) => (
          <div key={category} className="mb-20 last:mb-0">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-200">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {CONFIG.products.filter(p => p.category === category).map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedProduct(product)}
                  className={`flex flex-col bg-white rounded-3xl p-6 shadow-sm border transition-all relative group hover:shadow-xl cursor-pointer ${
                    product.featured ? 'border-indigo-300 ring-2 ring-indigo-100 hover:border-indigo-400' : 
                    product.isPopular ? 'border-blue-200 ring-1 ring-blue-100 hover:border-blue-400' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {product.badge && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg z-10 whitespace-nowrap ${
                      product.featured ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'
                    }`}>
                      {product.badge.toUpperCase()}
                    </div>
                  )}
                  
                  <div className="w-full aspect-[4/3] bg-slate-100 rounded-2xl relative overflow-hidden shrink-0 mb-6 group-hover:scale-[1.02] transition-transform duration-300">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="absolute inset-0 object-cover w-full h-full z-10"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 text-left">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{product.name}</h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                      {product.shortDescription || product.commercialText}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
                      <span className="text-2xl font-black text-slate-900">
                        {formatCurrency(product.price)}
                      </span>
                      <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        Ver detalle
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full md:w-1/2 bg-slate-100 relative min-h-[300px] flex items-center justify-center">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover z-10"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              <div className="w-full md:w-1/2 flex flex-col max-h-[90vh]">
                <div className="p-8 overflow-y-auto flex-1 text-left">
                  {selectedProduct.badge && (
                    <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full mb-4">
                      {selectedProduct.badge.toUpperCase()}
                    </span>
                  )}
                  <h3 className="text-3xl font-black text-slate-900 mb-2">{selectedProduct.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-6">
                    {formatCurrency(selectedProduct.price)}
                  </div>
                  
                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {selectedProduct.description || selectedProduct.commercialText}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Características</h4>
                    <ul className="space-y-3">
                      {selectedProduct.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700">
                          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                    <div className="bg-slate-50 p-6 rounded-2xl mb-4">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500" />
                        Ideal para
                      </h4>
                      <ul className="space-y-2">
                        {selectedProduct.benefits.map((benefit, i) => (
                          <li key={i} className="text-slate-600 text-sm leading-relaxed flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                             {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="p-6 bg-white border-t border-slate-100 flex gap-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Agregar
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyNow(selectedProduct);
                    }}
                    className="flex-[2] px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 text-lg"
                  >
                    Quiero este producto
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
