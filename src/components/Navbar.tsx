import { ShoppingCart, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full bg-white backdrop-blur-md z-40 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            P
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Punto<span className="text-blue-600">Review</span></span>
        </Link>
        
        <div className="flex items-center gap-3 sm:gap-6">
          {!user ? (
            <>
              <Link to="/login" className="hidden sm:block text-sm font-bold text-slate-600 hover:text-blue-600">
                Iniciar sesión
              </Link>
              <Link 
                to="/activar"
                className="text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                Activar mi cartel
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-blue-600">
                Dashboard
              </Link>

              {user.role === 'ADMIN' && (
                <Link to="/admin/revendedores" className="hidden lg:block text-sm font-medium text-slate-600 hover:text-blue-600">
                  Revendedores
                </Link>
              )}

              {(user.role === 'ADMIN' || user.role === 'RESELLER_PRO') && (
                <Link to="/admin/qr" className="hidden md:block text-sm font-medium text-slate-600 hover:text-blue-600">
                  Gestionar QR
                </Link>
              )}

              <Link 
                to="/activar"
                className="hidden sm:block text-xs sm:text-sm font-bold text-blue-600 bg-blue-50 px-3 sm:px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
              >
                Activar mi cartel
              </Link>

              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <Link to="/mi-cuenta" className="p-2 text-slate-500 hover:text-blue-600 transition-colors hidden sm:block" title="Mi Cuenta">
                <UserIcon className="w-5 h-5" />
              </Link>

              <button onClick={logout} className="p-2 text-slate-500 hover:text-red-600 transition-colors" title="Cerrar sesión">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}

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
      </div>
    </nav>
  );
}
