import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { CONFIG } from '../config';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();
  const [businessName, setBusinessName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [observations, setObservations] = useState('');

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  const generateWhatsAppMessage = () => {
    let message = `Hola PuntoReview 👋\n\nQuiero realizar un pedido:\n\n`;
    
    items.forEach(item => {
      message += `Producto:\n${item.name}\nCantidad:\n${item.quantity}\n---\n`;
    });
    
    if (businessName) {
      message += `Negocio:\n${businessName}\n`;
    }
    if (instagram) {
      message += `Instagram:\n${instagram}\n`;
    }
    if (observations) {
      message += `Observaciones:\n${observations}\n`;
    }
    
    message += `\nTotal estimado: ${formatCurrency(totalPrice)}`;
    
    return encodeURIComponent(message);
  };

  const handleCheckout = () => {
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Tu Pedido</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-slate-300" />
                  </div>
                  <p>Tu carrito está vacío.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Ver catálogo
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 border-b border-slate-50 pb-6">
                        <div className="w-20 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 leading-tight">{item.name}</h3>
                          <div className="text-blue-600 font-bold mb-3">{formatCurrency(item.price)}</div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium text-sm text-slate-900">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 mb-4">Personalización (Opcional)</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Nombre del negocio</label>
                        <input
                          type="text"
                          value={businessName}
                          onChange={(e) => setBusinessName(e.target.value)}
                          placeholder="Ej: Cafetería XYZ"
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Instagram</label>
                        <input
                          type="text"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          placeholder="Ej: @cafeteriaxyz"
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600 mb-1">Observaciones</label>
                        <textarea
                          value={observations}
                          onChange={(e) => setObservations(e.target.value)}
                          placeholder="Quiero personalizarlo con mi logo, colores, etc."
                          rows={2}
                          className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-slate-600">Total estimado</span>
                  <span className="text-2xl font-black text-slate-900">{formatCurrency(totalPrice)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-lg"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  PEDIR POR WHATSAPP
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
