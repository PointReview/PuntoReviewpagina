import React, { useState, useEffect } from 'react';
import { Shield, XCircle, AlertTriangle, Play, Pause, Activity, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../contexts/AuthContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ResellerManager() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'users' | 'activity'>('users');
  
  // Create User Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'RESELLER_ACTIVATOR',
    account_status: 'ACTIVE'
  });
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState<any>(null);
  
  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    userId: string | null;
    userName: string;
    newStatus: string;
  }>({
    isOpen: false,
    userId: null,
    userName: '',
    newStatus: ''
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      if (activeTab === 'users') {
        const res = await fetch('/api/admin/users', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setUsers(await res.json());
      } else {
        const res = await fetch('/api/admin/actions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setActions(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const requestStatusChange = (userId: string, userName: string, newStatus: string) => {
    setConfirmModal({
      isOpen: true,
      userId,
      userName,
      newStatus
    });
  };

  const handleStatusChange = async () => {
    const { userId, newStatus } = confirmModal;
    if (!userId) return;
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, account_status: newStatus } : u));
      }
    } catch (err) {
      alert("Error al cambiar el estado.");
    } finally {
      setConfirmModal({ isOpen: false, userId: null, userName: '', newStatus: '' });
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError('');
    setCreateSuccess(null);

    if (newUser.password !== newUser.confirmPassword) {
      setCreateError("Las contraseñas no coinciden");
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newUser)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al crear usuario');
      }

      setCreateSuccess(data);
      setUsers([...users, data]);
    } catch (err: any) {
      setCreateError(err.message);
    }
  };

  const closeCreateSuccess = () => {
    setCreateSuccess(null);
    setCreateModalOpen(false);
    setNewUser({
      name: '', lastname: '', username: '', email: '', phone: '',
      password: '', confirmPassword: '', role: 'RESELLER_ACTIVATOR', account_status: 'ACTIVE'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> ACTIVO</span>;
      case 'SUSPENDED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> SUSPENDIDO</span>;
      case 'DISABLED': return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> DESACTIVADO</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div className="flex-1 bg-slate-50 p-4 md:p-8 pt-32 pb-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">Revendedores</h1>
              <p className="text-slate-500 font-medium">Panel de administración de usuarios</p>
            </div>
          </div>
          <button 
            onClick={() => setCreateModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Crear nuevo usuario
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center border-b border-slate-200 p-2">
            <button
              onClick={() => setActiveTab('users')}
              className={cn(
                "flex-1 sm:flex-none px-6 py-3 font-bold rounded-2xl transition-all",
                activeTab === 'users' ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              Usuarios Registrados
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={cn(
                "flex-1 sm:flex-none px-6 py-3 font-bold rounded-2xl transition-all flex items-center justify-center gap-2",
                activeTab === 'activity' ? "bg-slate-100 text-slate-900" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              )}
            >
              <Activity className="w-4 h-4" /> Registro de Actividad
            </button>
          </div>
          
          <div className="p-0 overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-slate-500">Cargando datos...</div>
            ) : activeTab === 'users' ? (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Usuario</th>
                    <th className="px-6 py-4">Tipo</th>
                    <th className="px-6 py-4">Estado</th>
                    <th className="px-6 py-4">Último acceso</th>
                    <th className="px-6 py-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900">{u.name} {u.lastname}</div>
                        <div className="text-slate-500 text-xs">{u.email} - @{u.username}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-full text-xs">
                          {u.role === 'RESELLER_PRO' ? 'Revendedor Pro' : 
                           u.role === 'ADMIN' ? 'Administrador' : 'Revendedor Activador'}
                        </span>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(u.account_status)}</td>
                      <td className="px-6 py-4 text-slate-500">-</td>
                      <td className="px-6 py-4 text-right">
                        {u.role !== 'ADMIN' && (
                          <div className="flex items-center justify-end gap-2">
                            {u.account_status !== 'ACTIVE' && (
                              <button onClick={() => requestStatusChange(u.id, u.name, 'ACTIVE')} className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 font-bold text-xs rounded-lg transition-colors border border-green-200">
                                Activar
                              </button>
                            )}
                            {u.account_status === 'ACTIVE' && (
                              <button onClick={() => requestStatusChange(u.id, u.name, 'SUSPENDED')} className="px-3 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold text-xs rounded-lg transition-colors border border-amber-200">
                                Suspender
                              </button>
                            )}
                            {u.account_status !== 'DISABLED' && (
                              <button onClick={() => requestStatusChange(u.id, u.name, 'DISABLED')} className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs rounded-lg transition-colors border border-red-200">
                                Desactivar
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Fecha</th>
                    <th className="px-6 py-4">Admin</th>
                    <th className="px-6 py-4">Usuario afectado</th>
                    <th className="px-6 py-4">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {actions.map((action) => (
                    <tr key={action.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {new Date(action.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-700">{action.admin_id}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{action.target_user_name}</td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-mono font-bold">
                          {action.previous_status} → {action.new_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">¿Confirmar cambio?</h3>
            <p className="text-slate-600 mb-6">Estás a punto de cambiar el estado de la cuenta de <b>{confirmModal.userName}</b> a <b>{confirmModal.newStatus}</b>.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmModal({ isOpen: false, userId: null, userName: '', newStatus: '' })} className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">Cancelar</button>
              <button onClick={handleStatusChange} className="flex-1 py-3 font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {createModalOpen && !createSuccess && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4 py-12">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl relative">
              <h3 className="text-2xl font-black text-slate-900 mb-6">Crear nuevo usuario</h3>
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nombre</label>
                  <input required value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Apellido</label>
                  <input required value={newUser.lastname} onChange={(e) => setNewUser({...newUser, lastname: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Usuario</label>
                  <input required value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                  <input required type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
                  <input required type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Confirmar contraseña</label>
                  <input required type="password" value={newUser.confirmPassword} onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tipo de cuenta</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-slate-700">
                    <option value="RESELLER_ACTIVATOR">Revendedor Activador</option>
                    <option value="RESELLER_PRO">Revendedor Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Estado</label>
                  <select value={newUser.account_status} onChange={(e) => setNewUser({...newUser, account_status: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium text-slate-700">
                    <option value="ACTIVE">Activo</option>
                    <option value="SUSPENDED">Suspendido</option>
                    <option value="DISABLED">Desactivado</option>
                  </select>
                </div>
              </div>

              {createError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-100">
                  {createError}
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={() => setCreateModalOpen(false)} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 py-4 font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700">Crear usuario</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      )}

      {/* Success Modal */}
      {createSuccess && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-center text-slate-900 mb-6">Usuario creado correctamente</h3>
            
            <div className="bg-slate-50 p-4 rounded-2xl mb-8 space-y-3">
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Usuario</span>
                <span className="font-medium text-slate-900">{createSuccess.username}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Email</span>
                <span className="font-medium text-slate-900">{createSuccess.email}</span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Tipo</span>
                <span className="font-medium text-slate-900">
                  {createSuccess.role === 'RESELLER_PRO' ? 'Revendedor Pro' : 'Revendedor Activador'}
                </span>
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase">Estado</span>
                <span className="font-medium text-slate-900">Activo</span>
              </div>
            </div>

            <button onClick={closeCreateSuccess} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
