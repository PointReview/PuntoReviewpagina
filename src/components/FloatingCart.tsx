import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function FloatingCart() {
  const { totalItems, setIsCartOpen, isCartOpen } = useCart();

  if (isCartOpen) return null;

  return (
    <AnimatePresence>
      {totalItems > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-slate-900 text-white rounded-full shadow-2xl p-4 flex items-center justify-center hover:bg-slate-800 transition-colors group border border-slate-700"
          aria-label="Abrir carrito"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            <motion.span 
              key={totalItems}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-slate-900"
            >
              {totalItems}
            </motion.span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
