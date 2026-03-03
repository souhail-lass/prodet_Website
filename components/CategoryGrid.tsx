import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_DETAILS, TRANSLATIONS } from '../constants';
import { Category } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { LangContext } from '../App';

interface CategoryGridProps {
  onCategorySelect: (category: Category) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  const { lang } = useContext(LangContext);
  const t = TRANSLATIONS[lang].home;
  const categories = Object.keys(CATEGORY_DETAILS) as Category[];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <span className="text-prodet-600 font-bold text-sm uppercase tracking-widest mb-2 block">{t.expertise}</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900">{t.universes}</h2>
            </div>
            <p className="hidden md:block text-slate-500 max-w-md text-right rtl:text-left">
                {t.universe_desc}
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((catKey, index) => {
            const details = CATEGORY_DETAILS[catKey as keyof typeof CATEGORY_DETAILS];
            return (
              <motion.div
                key={catKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => onCategorySelect(catKey)}
                className="group relative h-72 md:h-96 rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-2xl hover:shadow-prodet-900/10 transition-all duration-500 border border-slate-100"
              >
                {/* Image Background with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={details.image} 
                        alt={details.title[lang === 'AR' ? 'en' : lang.toLowerCase() as 'en']} // Fallback for alt
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-70" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                        <div className="flex justify-between items-end mb-2">
                             <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded border border-white/20">
                                {details.label[lang.toLowerCase() as 'fr']}
                            </span>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-prodet-500 hover:text-white">
                                <ArrowUpRight size={20} className="rtl:rotate-270" />
                            </div>
                        </div>
                       
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                            {details.title[lang.toLowerCase() as 'fr']}
                        </h3>
                        
                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                             <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pt-2 border-t border-white/20">
                                {details.description[lang.toLowerCase() as 'fr']}
                             </p>
                        </div>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
