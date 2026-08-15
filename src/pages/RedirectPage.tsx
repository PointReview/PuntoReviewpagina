import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function RedirectPage() {
  const { codigo } = useParams<{ codigo: string }>();
  const [errorType, setErrorType] = useState<"NOT_FOUND" | "DISABLED" | "UNACTIVATED" | null>(null);

  useEffect(() => {
    fetch(`/api/scan/${codigo}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(err => { throw new Error(err.error) });
        }
        return res.json();
      })
      .then(data => {
        if (data.url) {
          window.location.href = data.url;
        }
      })
      .catch(err => {
        if (err.message === "QR_DISABLED" || err.message === "QR_NOT_ACTIVE") {
          setErrorType("DISABLED");
        } else if (err.message === "QR_UNACTIVATED") {
          setErrorType("UNACTIVATED");
        } else {
          setErrorType("NOT_FOUND");
        }
      });
  }, [codigo]);

  if (errorType) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md w-full">
          {errorType === "DISABLED" && (
            <>
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                !
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Aviso</h1>
              <p className="text-slate-600 mb-6">Este PuntoReview está temporalmente desactivado.</p>
            </>
          )}
          {errorType === "NOT_FOUND" && (
            <>
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                X
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Error</h1>
              <p className="text-slate-600 mb-6">QR no encontrado.</p>
            </>
          )}
          {errorType === "UNACTIVATED" && (
            <>
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                i
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">PuntoReview todavía no está activado.</h1>
              <p className="text-slate-600 mb-8">No hay un negocio asociado a este cartel.</p>
              
              <div className="pt-6 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-4">¿Sos el cliente que recibió el cartel?</p>
                <a 
                  href={`/activar/${codigo}`}
                  className="block w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                  Activar mi cartel
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 animate-pulse">
        P
      </div>
      <p className="text-slate-600 font-medium">Redirigiendo a Google Reviews...</p>
    </div>
  );
}
