import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import React from "react";
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, Link as LinkIcon, Download, Power, BarChart3, Search, Store, ExternalLink, Edit2, Plus, Trash2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QRCodeData, qrService } from '../services/qrService';
import { QRGeneratorForm } from '../components/QRGeneratorForm';
import { QREditModal } from '../components/QREditModal';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function QRGeneratorList({
  qrs,
  loading,
  search,
  setSearch,
  handleToggleStatus,
  downloadQRPng,
  downloadQRSvg,
  copyUrl,
  onEdit,
  onDelete
}: {
  qrs: QRCodeData[];
  loading: boolean;
  search: string;
  setSearch: (s: string) => void;
  handleToggleStatus: (id: string, currentStatus: string) => void;
  downloadQRPng: (code: string) => void;
  downloadQRSvg: (code: string) => void;
  copyUrl: (code: string) => void;
  onEdit: (qr: QRCodeData) => void;
  onDelete: (id: string) => void;
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const filteredQrs = qrs.filter(q => 
    q.code.toLowerCase().includes(search.toLowerCase()) || 
    (q.client && q.client.toLowerCase().includes(search.toLowerCase())) ||
    (q.business_name && q.business_name.toLowerCase().includes(search.toLowerCase())) ||
    (q.business?.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-6">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por código, cliente o negocio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-500">
            <tr>
              <th className="px-6 py-4">Código / QR</th>
              <th className="px-6 py-4">Negocio / Destino</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Escaneos</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  Cargando...
                </td>
              </tr>
            ) : filteredQrs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  No hay códigos QR generados.
                </td>
              </tr>
            ) : (
              filteredQrs.map((qr) => (
                <tr key={qr.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-200 p-1 rounded-lg shrink-0 hidden sm:block">
                        <QRCodeSVG 
                          id={`qr-${qr.code}`}
                          value={`${window.location.origin}/r/${qr.code}`}
                          size={40}
                          level="H"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 font-mono">{qr.code}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {new Date(qr.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{qr.business_name || qr.client || qr.business?.name || "Sin nombre"}</div>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1 max-w-[200px] truncate">
                      <LinkIcon className="w-3 h-3 shrink-0" />
                      <span className="truncate">{qr.destination_url || qr.business?.google_review_url || "Sin destino"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-black tracking-wider rounded uppercase",
                      qr.status === "ACTIVE" && "bg-green-100 text-green-700",
                      qr.status === "UNACTIVATED" && "bg-amber-100 text-amber-700",
                      qr.status === "DISABLED" && "bg-red-100 text-red-700"
                    )}>
                      {qr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-medium text-slate-900">
                      <BarChart3 className="w-4 h-4 text-slate-400" />
                      {qr.scanCount || 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => window.open(`/r/${qr.code}`, '_blank')}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Probar QR"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => copyUrl(qr.code)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Copiar URL"
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onEdit(qr)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar Destino"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <div className="flex flex-col gap-1">
                        <button 
                          onClick={() => downloadQRPng(qr.code)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1"
                          title="Descargar QR (PNG)"
                        >
                          <Download className="w-3 h-3" /> PNG
                        </button>
                        <button 
                          onClick={() => downloadQRSvg(qr.code)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1"
                          title="Descargar QR (SVG)"
                        >
                          <Download className="w-3 h-3" /> SVG
                        </button>
                      </div>
                      <button 
                        onClick={() => handleToggleStatus(qr.id, qr.status)}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          qr.status === "ACTIVE" 
                            ? "text-slate-400 hover:text-red-600 hover:bg-red-50" 
                            : "text-slate-400 hover:text-green-600 hover:bg-green-50"
                        )}
                        title={qr.status === "ACTIVE" ? "Desactivar" : "Activar"}
                      >
                        <Power className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setDeletingId(qr.id)}
                        className="p-2 rounded-lg transition-colors text-slate-400 hover:text-red-600 hover:bg-red-50"
                        title="Eliminar QR"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-2">Eliminar código QR</h3>
            <p className="text-slate-600 mb-6">¿Estás seguro de que querés eliminar este código QR? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-lg font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  onDelete(deletingId);
                  setDeletingId(null);
                }}
                className="px-4 py-2 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export function AdminDashboard() {
  const [qrs, setQrs] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<"list" | "generate" | "analytics">("list");
  const [editingQr, setEditingQr] = useState<QRCodeData | null>(null);

  
  
  const fetchQRs = async () => {
    if (!token) return;
    try {
      const data = await qrService.getAll(token);
      setQrs(data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (err) {
      if (err instanceof Error && err.message.includes("401")) {
         fetch("/api/auth/logout", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(console.error); localStorage.removeItem('token');
         window.location.href = '/login';
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchQRs();
    }
  }, [token]);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "DISABLED" : "ACTIVE";
    try {
      const updated = await qrService.toggleStatus(id, newStatus as any, token!);
      setQrs(qrs.map(q => q.id === id ? { ...q, status: updated.status } : q));
    } catch (err) {
      alert("Error al cambiar estado");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await qrService.delete(id, token!);
      setQrs(qrs.filter(q => q.id !== id));
    } catch (err) {
      alert("Error al eliminar el código QR");
    }
  };

    const downloadQRPng = (code: string) => {
    const svg = document.getElementById(`qr-${code}`);
    if (!svg) return;

    // SVG string with larger dimensions for higher quality download
    let svgData = new XMLSerializer().serializeToString(svg);
    // Replace width="40" height="40" with width="1024" height="1024"
    svgData = svgData.replace(/width="40"/, 'width="1024"').replace(/height="40"/, 'height="1024"');
    
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1150; // Extra space for text at the bottom
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background with white
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = new Image();
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      // Draw QR Code
      ctx.drawImage(img, 0, 0, 1024, 1024);
      
      // Draw Text
      ctx.fillStyle = "#000000";
      ctx.font = "bold 80px Arial";
      ctx.textAlign = "center";
      ctx.fillText(code, canvas.width / 2, 1090);

      URL.revokeObjectURL(url);
      
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `PuntoReview-${code}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    img.src = url;
  };

  
  const downloadQRSvg = (code: string) => {
    const svg = document.getElementById(`qr-${code}`);
    if(svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        let downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = `PuntoReview-${code}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
  };

  const copyUrl = (code: string) => {
    const url = `${window.location.origin}/r/${code}`;
    navigator.clipboard.writeText(url);
    alert("URL copiada al portapapeles");
  };

  const stats = {
    total: qrs.length,
    active: qrs.filter(q => q.status === "ACTIVE").length,
    scans: qrs.reduce((acc, q) => acc + (q.scanCount || 0), 0)
  };

  

  return (
    <div className="flex-1 bg-slate-50 p-4 sm:p-8 pt-28 md:pt-32 pb-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Gestión de QR</h1>
            <p className="text-slate-500 mt-1">Administrá los códigos dinámicos de los carteles.</p>
          </div>
          <div className="flex items-center gap-3">
                      </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
              <div className="text-sm text-slate-500 font-medium">QR Generados</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <Power className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stats.active}</div>
              <div className="text-sm text-slate-500 font-medium">Carteles Activos</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{stats.scans}</div>
              <div className="text-sm text-slate-500 font-medium">Escaneos Totales</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab("list")}
            className={cn(
              "px-6 py-4 font-bold text-sm transition-colors border-b-2",
              activeTab === "list" 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            Lista de QR
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={cn(
              "px-6 py-4 font-bold text-sm transition-colors border-b-2 flex items-center gap-2",
              activeTab === "analytics" 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            <BarChart3 className="w-4 h-4" /> Estadísticas
          </button>
          <button
            onClick={() => setActiveTab("generate")}
            className={cn(
              "px-6 py-4 font-bold text-sm transition-colors border-b-2",
              activeTab === "generate" 
                ? "border-blue-600 text-blue-600" 
                : "border-transparent text-slate-500 hover:text-slate-700"
            )}
          >
            <div className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo QR
            </div>
          </button>
        </div>

        {activeTab === "list" ? (
          <QRGeneratorList 
            qrs={qrs}
            loading={loading}
            search={search}
            setSearch={setSearch}
            handleToggleStatus={handleToggleStatus}
            downloadQRPng={downloadQRPng}
            downloadQRSvg={downloadQRSvg}
            copyUrl={copyUrl}
            onEdit={setEditingQr}
            onDelete={handleDelete}
          />
        ) : (
          <QRGeneratorForm 
            token={token} 
            onSuccess={(newQrs) => {
              setQrs([...newQrs, ...qrs]);
            }}
            onCancel={() => setActiveTab("list")}
          />
        )}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-6 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Escaneos por código (Top 10)</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={qrs.sort((a,b) => (b.scanCount||0) - (a.scanCount||0)).slice(0, 10)}>
                  <XAxis dataKey="code" tick={{fontSize: 12}} />
                  <YAxis />
                  <Tooltip cursor={{fill: '#f8fafc'}} />
                  <Bar dataKey="scanCount" name="Escaneos" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}


      </div>
      
      <QREditModal 
        isOpen={!!editingQr}
        onClose={() => setEditingQr(null)}
        qr={editingQr}
        token={token!}
        onSuccess={(updated) => {
          setQrs(qrs.map(q => q.id === updated.id ? updated : q));
        }}
      />
    </div>
  );
}
