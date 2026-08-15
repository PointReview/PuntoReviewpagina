import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export function MyAccount() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex-1 bg-slate-50 pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-2xl mx-auto">
        
        <h1 className="text-3xl font-black text-slate-900 mb-8">Mi Cuenta</h1>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          
          <div className="flex items-center gap-6 mb-8 border-b border-slate-100 pb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-sm shrink-0">
              {user.name.charAt(0)}{user.lastname.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{user.name} {user.lastname}</h2>
              <p className="text-slate-500 font-medium">@{user.username}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Nombre Completo</label>
              <div className="text-slate-900 font-medium text-lg">{user.name} {user.lastname}</div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Correo Electrónico</label>
              <div className="text-slate-900 font-medium text-lg">{user.email}</div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Tipo de Cuenta</label>
              <div className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-bold text-sm">
                {user.role === 'ADMIN' ? 'Administrador' : 
                 user.role === 'RESELLER_PRO' ? 'Revendedor Pro' : 
                 'Revendedor Activador'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Estado</label>
              <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full font-bold text-sm">
                Activo
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
