import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { CONFIG } from '../config';
import { useCart } from '../context/CartContext';

export function FloatingWhatsApp() {
  const { isCartOpen } = useCart();
  
  const handleClick = () => {
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.contactMessage)}`;
    window.open(url, '_blank');
  };

  // Hide when cart is open to avoid overlapping
  if (isCartOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white rounded-full p-4 shadow-xl hover:bg-[#128C7E] transition-colors group flex items-center gap-3"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out font-medium text-sm pr-1">
        ¿Tenés dudas?
      </span>
    </motion.button>
  );
}
