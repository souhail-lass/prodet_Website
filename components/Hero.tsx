import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';
import { LangContext } from '../App';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { lang, dir } = useContext(LangContext);
  const t = TRANSLATIONS[lang].hero;

  return (
    <section className="relative w-full bg-white overflow-hidden">
      
      {/* Background Elements */}
      <div className={`absolute top-0 w-[40%] h-full bg-slate-50 z-0 hidden lg:block ${dir === 'rtl' ? 'left-0 skew-x-[-12deg] -translate-x-32' : 'right-0 skew-x-12 translate-x-32'}`}></div>
      
      <div className="container mx-auto px-6 relative z-10 pt-16 pb-20 md:pt-28 md:pb-28">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-prodet-700 text-xs font-bold uppercase tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-prodet-600 animate-pulse"></span>
                {t.badge}
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight whitespace-pre-line">
                {t.title}
              </h1>
              
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 max-w-lg font-medium">
                {t.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('CATALOG')}
                  className="px-8 py-4 bg-prodet-800 text-white font-bold rounded-lg hover:bg-prodet-900 transition-all shadow-xl shadow-prodet-800/20 flex items-center justify-center gap-3 group"
                >
                  {t.cta_products}
                  <ArrowRight size={18} className={`transition-transform ${dir === 'rtl' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                </button>
                <button 
                  onClick={() => onNavigate('CONTACT')}
                  className="px-8 py-4 bg-white text-slate-700 font-bold border-2 border-slate-100 rounded-lg hover:border-prodet-200 hover:text-prodet-700 transition-all shadow-sm hover:shadow-md"
                >
                  {t.cta_quote}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-slate-100 grid grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">15+</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.exp}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">500+</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.clients}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-slate-900">100%</span>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.origin}</span>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Visual Content */}
          <motion.div 
            initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/50 border-4 border-white">
                <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200" 
                    alt="Prodet Industrial Laboratory" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 max-w-xs ltr:left-8 rtl:right-8">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-50 rounded-lg text-green-600">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 text-sm">HACCP</h4>
                            <p className="text-xs text-slate-500 mt-1">Conforme sécurité alimentaire.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Grid Dot Pattern */}
            <div className={`absolute -bottom-10 w-64 h-64 opacity-20 ${dir === 'rtl' ? '-left-10' : '-right-10'}`} 
                 style={{ backgroundImage: 'radial-gradient(#1e3a8a 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
