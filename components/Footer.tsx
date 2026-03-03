import React, { useContext } from 'react';
import { COMPANY_INFO } from '../constants';
import { LangContext } from '../App';

export const Footer: React.FC = () => {
  const { lang, setLang } = useContext(LangContext);

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-black text-white mb-6">PRODET<span className="text-prodet-500">.</span></h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {lang === 'FR' && 'Votre partenaire de confiance en hygiène industrielle. Des solutions chimiques avancées pour la performance et la sécurité.'}
              {lang === 'EN' && 'Your trusted partner in industrial hygiene. Delivering advanced chemical solutions tailored for performance and safety.'}
              {lang === 'AR' && 'شريكك الموثوق في النظافة الصناعية. تقديم حلول كيميائية متطورة مصممة للأداء والسلامة.'}
            </p>
            <div className="flex gap-4">
                <a href={COMPANY_INFO.social.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-prodet-600 transition-colors cursor-pointer">
                    <span className="font-bold text-xs">in</span>
                </a>
                <a href={COMPANY_INFO.social.facebook} target="_blank" rel="noreferrer" className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-prodet-600 transition-colors cursor-pointer">
                    <span className="font-bold text-xs">fb</span>
                </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-xs">Langue / Language</h3>
            <ul className="space-y-3 text-sm">
              <li onClick={() => setLang('FR')} className={`cursor-pointer transition-colors ${lang === 'FR' ? 'text-prodet-400 font-bold' : 'hover:text-white'}`}>Français</li>
              <li onClick={() => setLang('EN')} className={`cursor-pointer transition-colors ${lang === 'EN' ? 'text-prodet-400 font-bold' : 'hover:text-white'}`}>English</li>
              <li onClick={() => setLang('AR')} className={`cursor-pointer transition-colors ${lang === 'AR' ? 'text-prodet-400 font-bold' : 'hover:text-white'}`}>العربية</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-xs">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>{COMPANY_INFO.address}</li>
              <li dir="ltr">{COMPANY_INFO.phone}</li>
              <li>{COMPANY_INFO.email}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-xs">Certifications</h3>
            <div className="flex gap-3 mb-4">
                 <div className="bg-white/10 px-3 py-1 rounded text-xs font-bold border border-white/20">ISO 9001</div>
                 <div className="bg-white/10 px-3 py-1 rounded text-xs font-bold border border-white/20">ISO 14001</div>
            </div>
            <p className="text-xs text-slate-500">
                {lang === 'FR' && 'Conforme aux normes de sécurité internationales.'}
                {lang === 'EN' && 'Compliant with international safety standards.'}
                {lang === 'AR' && 'متوافق مع معايير السلامة الدولية.'}
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
