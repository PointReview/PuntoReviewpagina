import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { QrCode, Power, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex-1 bg-slate-50 pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-blue-200 shrink-0">
            {user.name.charAt(0)}{user.lastname.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Hola, {user.name}
            </h1>
            <p className="text-slate-600 font-medium">
              ¿Qué querés hacer hoy?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {(user.role === 'ADMIN' || user.role === 'RESELLER_PRO') && (
            <button
              onClick={() => navigate('/admin/qr')}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <QrCode className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">GESTIONAR QR</h3>
                <p className="text-slate-500 font-medium text-sm">Creá, editá y administrá todos tus códigos QR.</p>
              </div>
            </button>
          )}

          <button
            onClick={() => navigate('/activar')}
            className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center gap-4"
          >
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Power className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">ACTIVAR MI CARTEL</h3>
              <p className="text-slate-500 font-medium text-sm">Configurá rápidamente un cartel físico escaneando su código.</p>
            </div>
          </button>

          {user.role === 'ADMIN' && (
            <button
              onClick={() => navigate('/admin/revendedores')}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">REVENDEDORES</h3>
                <p className="text-slate-500 font-medium text-sm">Administrá las cuentas de tus clientes y revendedores.</p>
              </div>
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
