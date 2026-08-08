import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { CONFIG } from '../config';

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <nav className="fixed top-0 w-full bg-white backdrop-blur-md z-40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Punto<span className="text-blue-600">Review</span></span>
        </div>
        
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-slate-700 hover:text-blue-600 transition-colors"
          aria-label="Ver carrito"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-xs font-bold flex items-center justify-center rounded-full"
            >
              {totalItems}
            </motion.span>
          )}
        </button>
      </div>
    </nav>
  );
}
