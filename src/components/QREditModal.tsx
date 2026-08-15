import React from "react";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save } from 'lucide-react';
import { QRCodeData, qrService } from '../services/qrService';

export function QREditModal({
  isOpen,
  onClose,
  qr,
  token,
  onSuccess
}: {
  isOpen: boolean;
  onClose: () => void;
  qr: QRCodeData | null;
  token: string;
  onSuccess: (updatedQr: QRCodeData) => void;
}) {
  const [url, setUrl] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (qr && isOpen) {
      setUrl(qr.destination_url || qr.business?.google_review_url || '');
      setBusinessName(qr.business_name || qr.client || qr.business?.name || '');
      setNotes(qr.notes || '');
      setError('');
    }
  }, [qr, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qr) return;
    
    setLoading(true);
    setError('');

    try {
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        throw new Error('La URL debe comenzar con http:// o https://');
      }

      const updatedQr = await qrService.update(qr.id, {
        destination_url: url,
        business_name: businessName,
        notes: notes
      }, token);

      onSuccess(updatedQr);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error al actualizar');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !qr) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
        >
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Editar Destino</h2>
              <p className="text-sm text-slate-500 font-mono mt-1">{qr.code}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nuevo Enlace de destino (Google Reviews)</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://g.page/r/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
              <p className="text-xs text-amber-600 mt-2 font-medium">
                Cambiar esto NO afectará al código físico impreso. Solo cambiará hacia dónde redirige.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Nombre del negocio</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Notas internas</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {error && <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">{error}</div>}

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
