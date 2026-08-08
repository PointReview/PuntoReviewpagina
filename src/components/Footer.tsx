import { CONFIG } from '../config';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          © {new Date().getFullYear()} {CONFIG.brandName}. TECNOLOGÍA SIMPLE PARA TU NEGOCIO
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <a href="#productos" className="hover:text-slate-600 transition-colors">Productos</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Beneficios</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Preguntas</a>
        </div>
        
        <div className="flex gap-6">
          <a 
            href={`https://wa.me/${CONFIG.whatsapp}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-600 transition-colors"
          >
            WhatsApp
          </a>
          <a 
            href={`https://instagram.com/${CONFIG.instagram.replace('@', '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-600 transition-colors"
          >
            Instagram {CONFIG.instagram}
          </a>
        </div>
      </div>
    </footer>
  );
}
