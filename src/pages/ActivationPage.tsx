import React from "react";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle, Link as LinkIcon, ChevronRight, Check, QrCode, ArrowRight } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export function ActivationPage() {
  const { codigo: urlCodigo } = useParams<{ codigo: string }>();
  const navigate = useNavigate();
  
  const [code, setCode] = useState(urlCodigo || '');
  const [step, setStep] = useState<"ENTER_CODE" | "VERIFYING" | "PREVIEW" | "INPUT" | "SUCCESS">(urlCodigo ? "VERIFYING" : "ENTER_CODE");
  const [qrData, setQrData] = useState<any>(null);
  
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState('');

  useEffect(() => {
    if (step === "VERIFYING" && code) {
      verifyCode();
    }
  }, [step]);

  const verifyCode = async () => {
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/qr/${code}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error("QR no encontrado");
      }
      const data = await res.json();
      
      if (data.status === "ACTIVE") {
        throw new Error("Este PuntoReview ya se encuentra activado.");
      }
      
      if (data.status === "DISABLED") {
        throw new Error("Este PuntoReview está temporalmente desactivado.");
      }

      setQrData(data);
      setStep("PREVIEW");
    } catch (err: any) {
      setError(err.message || "Error al verificar el código.");
      setStep("ENTER_CODE");
    }
  };

  const handleSearchCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    setStep("VERIFYING");
  };

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError("El enlace ingresado no parece ser válido.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/qr/${code}/activate`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ destination_url: url })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Error al activar el cartel.");
      }

      setDestinationUrl(url);
      setStep("SUCCESS");
    } catch (err: any) {
      setError(err.message || "Error al activar el cartel.");
    } finally {
      setLoading(false);
    }
  };

  const handleTest = () => {
    window.open(`/r/${code}`, '_blank');
  };

  const publicUrl = `${window.location.origin}/r/${code}`;

  return (
    <div className="flex-1 bg-slate-50 flex flex-col pt-24 pb-12 px-4">
      <div className="max-w-xl mx-auto w-full flex flex-col h-full">
        
        <div className="text-center mb-8 shrink-0">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-6 shadow-lg shadow-blue-200">
            <span className="leading-none">PR</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
            {step === "SUCCESS" ? "¡Tu PuntoReview está activo!" : "Activá tu PuntoReview"}
          </h1>
          <p className="text-slate-600">
            {step === "SUCCESS" 
              ? "Tu cartel ya está listo para recibir reseñas." 
              : "Configurá tu cartel en pocos segundos."}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden relative flex-1 flex flex-col p-8">
          
          {step === "VERIFYING" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-slate-500 font-medium">Verificando código...</p>
            </div>
          )}

          {step === "ENTER_CODE" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full justify-center"
            >
              <form onSubmit={handleSearchCode}>
                <div className="mb-8">
                  <label className="block text-sm font-bold text-slate-700 mb-3 text-center">Código de tu cartel</label>
                  <input
                    type="text"
                    required
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="PR-XXXXXX"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-center text-2xl font-mono"
                  />
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 rounded-xl text-red-600 text-sm text-center">
                      <p className="font-bold mb-1">{error}</p>
                      {error === "QR no encontrado" && <p>Verificá que hayas ingresado correctamente el código de tu cartel.</p>}
                    </div>
                  )}
                </div>
                
                <button 
                  type="submit"
                  disabled={!code}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Buscar mi cartel
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          )}

          {step === "PREVIEW" && qrData && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full"
            >
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 mb-8 text-center max-w-sm mx-auto w-full shadow-sm">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 inline-block mb-6">
                  <QRCodeSVG 
                    value={`${window.location.origin}/r/${qrData.code}`}
                    size={160}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-left border-t border-slate-200 pt-4 mt-4">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Código</div>
                    <div className="font-mono text-base font-bold text-blue-600">{qrData.code}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estado</div>
                    <div className="text-sm font-bold text-amber-600">SIN ACTIVAR</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Destino</div>
                    <div className="text-sm font-medium text-slate-500">Todavía no configurado</div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-slate-600 font-medium">Este es el cartel que estás configurando.</p>
              </div>

              <div className="mt-auto">
                <button 
                  onClick={() => setStep("INPUT")}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  Continuar con la activación
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === "INPUT" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col h-full justify-center"
            >
              <form onSubmit={handleActivate} className="flex flex-col h-full justify-center">
                <div className="mb-8">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Configurá tu destino</h2>
                    <p className="text-slate-600">Pegá el enlace de reseñas de Google de tu negocio.</p>
                  </div>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://g.page/r/XXXXXXXX/review"
                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all text-center text-lg"
                  />
                  {error && <p className="text-red-600 text-sm font-medium text-center mt-3">{error}</p>}
                </div>
                
                <button 
                  type="submit"
                  disabled={loading || !url}
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md shadow-blue-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Check className="w-5 h-5" />
                  {loading ? 'Activando...' : 'Activar mi cartel'}
                </button>
              </form>
            </motion.div>
          )}

          {step === "SUCCESS" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center justify-center h-full"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-8 mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full mb-8 text-left">
                 <div className="grid grid-cols-2 gap-4 mb-4">
                   <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Código</div>
                     <div className="font-mono text-base font-bold text-blue-600">{code}</div>
                   </div>
                   <div>
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estado</div>
                     <div className="text-sm font-bold text-green-600">ACTIVO</div>
                   </div>
                 </div>
                 <div className="border-t border-slate-200 pt-4">
                   <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Destino (Google Reviews)</div>
                   <div className="text-sm font-medium text-slate-700 break-all">{destinationUrl}</div>
                 </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button 
                  onClick={handleTest}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Probar mi cartel
                </button>
                <button 
                  onClick={() => { navigator.clipboard.writeText(publicUrl); alert("Enlace copiado"); }}
                  className="w-full py-3 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <LinkIcon className="w-4 h-4" />
                  Copiar enlace
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
