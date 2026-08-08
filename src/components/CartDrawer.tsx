import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/format';
import { CONFIG } from '../config';
import { useEffect } from 'react';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, totalPrice } = useCart();

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
    let message = `Hola ${CONFIG.brandName}! Quiero hacer un pedido:\n\n`;
    
    items.forEach(item => {
      message += `• ${item.quantity} × ${item.name}\n`;
    });
    
    message += `\nTotal estimado: ${formatCurrency(totalPrice)}\n\n`;
    message += `Quisiera consultar disponibilidad y personalización.`;
    
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
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Tu Pedido</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-gray-300" />
                  </div>
                  <p>Tu carrito está vacío.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Ver modelos
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6">
                      <div className="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <div className="text-blue-600 font-bold mb-3">{formatCurrency(item.price)}</div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium text-sm text-gray-900">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-gray-600">Total estimado</span>
                  <span className="text-2xl font-bold text-gray-900">{formatCurrency(totalPrice)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl bg-[#25D366] text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors shadow-lg"
                >
                  <MessageCircle className="w-6 h-6 fill-current" />
                  PEDIR POR WHATSAPP
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  El pedido se enviará por WhatsApp para coordinar el diseño y el pago.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Needed local import for empty state
import { ShoppingBag } from 'lucide-react';
