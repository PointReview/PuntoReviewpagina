import React from "react";
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Link as LinkIcon, ExternalLink, RefreshCw, CheckCircle, ArrowLeft } from 'lucide-react';
import { QRCodeData, qrService } from '../services/qrService';

export function QRGeneratorForm({ 
  token, 
  onSuccess, 
  onCancel 
}: { 
  token: string; 
  onSuccess: (qrs: QRCodeData[]) => void;
  onCancel: () => void;
}) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedQR, setGeneratedQR] = useState<QRCodeData | null>(null);
  const [generatedQRs, setGeneratedQRs] = useState<QRCodeData[]>([]);
  const [mode, setMode] = useState<'single'|'bulk'>('single');
  const [bulkQuantity, setBulkQuantity] = useState(10);

  const generateRandomCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude 0,1,I,O for readability
    let result = 'PR-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCode(result);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'bulk') {
        const newQrs = await qrService.generateBulk(bulkQuantity, token);
        setGeneratedQRs(newQrs);
        onSuccess(newQrs);
      } else {
        const newQr = await qrService.generate({
          code: code || undefined
        }, token);
        setGeneratedQR(newQr);
        onSuccess([newQr]);
      }
    } catch (err: any) {
      setError(err.message || 'Error al generar el QR');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPNG = () => {
    if (!generatedQR) return;
    const canvas = document.getElementById(`qr-gen-${generatedQR.code}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `PuntoReview-${generatedQR.code}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else {
        // Fallback for SVG
        const svg = document.getElementById(`qr-svg-gen-${generatedQR.code}`);
        if(svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            let downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = `PuntoReview-${generatedQR.code}.svg`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
  };

  const handleTest = () => {
    if (generatedQRs.length > 0) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">{generatedQRs.length} QRs Generados Correctamente</h2>
        <p className="text-slate-500 mb-8">Los códigos han sido creados exitosamente.</p>
        <button onClick={() => { setGeneratedQRs([]); setGeneratedQR(null); }} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Volver</button>
      </div>
    );
  }

  if (generatedQR) {
      window.open(`/r/${generatedQR.code}`, '_blank');
    }
  };

  const publicUrl = generatedQR ? `${window.location.origin}/r/${generatedQR.code}` : '';

  if (generatedQR) {
    return (
      <div className="bg-white p-8 rounded-3xl border border-green-100 shadow-sm max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">QR Generado Correctamente</h2>
        <p className="text-slate-500 mb-8">El código único ha sido creado y está listo para usarse.</p>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <QRCodeSVG 
              id={`qr-svg-gen-${generatedQR.code}`}
              value={publicUrl}
              size={180}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="text-left space-y-4 flex-1 w-full">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Código</div>
              <div className="font-mono text-lg font-bold text-blue-600">{generatedQR.code}</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Estado</div>
              <div className="text-sm font-bold text-amber-600">SIN ACTIVAR</div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Destino</div>
              <div className="text-sm font-medium text-slate-500">Sin configurar</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={handleDownloadPNG} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" />
            Descargar
          </button>
          <button onClick={() => { navigator.clipboard.writeText(publicUrl); alert("URL copiada"); }} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm">
            <LinkIcon className="w-4 h-4" />
            Copiar URL
          </button>
          <button onClick={handleTest} className="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm">
            <ExternalLink className="w-4 h-4" />
            Probar QR
          </button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-100">
          <button onClick={() => setGeneratedQR(null)} className="text-slate-500 hover:text-blue-600 font-medium transition-colors text-sm">
            Generar otro código
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-slate-900">Generar Nuevo QR Dinámico</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex bg-slate-100 p-1 rounded-xl w-max mb-6">
          <button type="button" onClick={() => setMode('single')} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'single' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Generación Simple</button>
          <button type="button" onClick={() => setMode('bulk')} className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${mode === 'bulk' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Generación Masiva</button>
        </div>
        {mode === 'single' ? (
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Código alfanumérico (Opcional)</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Ej. PR-A8K29X"
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all font-mono"
            />
            <button
              type="button"
              onClick={generateRandomCode}
              className="px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2 whitespace-nowrap text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Generar Automático
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">Si lo dejás vacío, el sistema generará uno único automáticamente.</p>
        </div>
        ) : (
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Cantidad a generar</label>
          <input type="number" min="1" max="100" value={bulkQuantity} onChange={(e) => setBulkQuantity(parseInt(e.target.value) || 1)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all" />
          <p className="text-xs text-slate-500 mt-2">Podés generar hasta 100 códigos a la vez.</p>
        </div>
        )}

        {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200/50 disabled:opacity-50 text-lg"
        >
          {loading ? 'Generando...' : 'GENERAR QR DINÁMICO'}
        </button>
      </form>
    </div>
  );
}
