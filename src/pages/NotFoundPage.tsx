import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex-1 bg-slate-50 flex flex-col items-center justify-center p-4 min-h-[60vh]">
      <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
      <p className="text-xl text-slate-600 font-medium mb-8">La página que buscás no existe.</p>
      <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">
        Volver al inicio
      </Link>
    </div>
  );
}
