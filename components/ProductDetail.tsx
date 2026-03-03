
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ArrowLeft, Check, FileText, Droplets, Beaker, ClipboardList, Info, ShieldAlert, Package, Thermometer, Download, ShoppingCart } from 'lucide-react';
import { LangContext, CartContext, AuthContext } from '../App';
import { TRANSLATIONS } from '../constants';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onInquiry: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onInquiry }) => {
  const { lang, dir } = useContext(LangContext);
  const { addToCart } = useContext(CartContext);
  const { auth } = useContext(AuthContext);

  const t = TRANSLATIONS[lang].product;
  const catT = TRANSLATIONS[lang].catalog;
  const lKey = lang.toLowerCase() as 'fr';

  const generateTDS = () => {
    // ... existing TDS logic ...
    alert("Downloading Technical Data Sheet for " + product.name);
  };

  const handleAddToCart = () => {
      addToCart(product.id, 1);
      // Visual feedback could be added here
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="py-12 bg-white min-h-screen"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-prodet-600 mb-8 transition-colors text-sm font-bold uppercase tracking-wide gap-2 group"
        >
          <ArrowLeft size={16} className={`group-hover:-translate-x-1 transition-transform ${dir === 'rtl' ? 'rotate-180' : ''}`} /> {t.back}
        </button>

        {/* --- PRODUCT HEADER --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
           {/* Left: Image */}
           <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border-2 border-slate-100 p-8 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-4 left-4 z-10 rtl:right-4 rtl:left-auto">
                       <span className="px-3 py-1 bg-prodet-50 text-prodet-700 text-xs font-bold uppercase tracking-wider rounded border border-prodet-100">
                          {catT.filter[product.category.toLowerCase() as keyof typeof catT.filter]}
                       </span>
                   </div>
                   <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-auto object-contain max-h-[400px] mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
                   />
              </div>
           </div>

           {/* Right: Title & CTA */}
           <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-4">{product.name}</h1>
              <p className="text-xl text-slate-500 font-medium mb-8 leading-relaxed">{product.tagline[lKey]}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                  {product.packaging.map(pkg => (
                      <div key={pkg} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-700">
                          <Package size={16} className="text-slate-400" /> {pkg}
                      </div>
                  ))}
              </div>

              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 mb-8">
                  <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">{t.order}</span>
                      {auth.user?.role === 'CLIENT' && (
                          <span className="text-xl font-black text-prodet-800">{product.price.toFixed(3)} {catT.price}</span>
                      )}
                  </div>
                  <div className="flex gap-4">
                      <button 
                        onClick={auth.user?.role === 'CLIENT' ? handleAddToCart : onInquiry}
                        className="flex-1 px-8 py-4 bg-prodet-700 text-white font-bold rounded-lg hover:bg-prodet-800 transition-all shadow-lg shadow-prodet-700/20 flex items-center justify-center gap-2"
                      >
                         {auth.user?.role === 'CLIENT' ? (
                             <>
                                <ShoppingCart size={20} /> {t.add_list}
                             </>
                         ) : (
                             t.order
                         )}
                      </button>
                      <button 
                        onClick={onInquiry}
                        className="px-6 py-4 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:border-prodet-600 hover:text-prodet-600 transition-colors"
                      >
                          Devis
                      </button>
                  </div>
              </div>
           </div>
        </div>

        {/* --- TECHNICAL INFORMATION BLOCK (2 COLUMNS) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            
            {/* Column 1: Description & Safety */}
            <div className="space-y-8">
                 <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                     <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                         <Info size={20} className="text-prodet-500" /> Description & Usage
                     </h3>
                     <p className="text-slate-600 leading-relaxed mb-6">
                         {product.description[lKey]}
                     </p>
                     
                     <div className="space-y-4">
                         <div className="flex items-start gap-3">
                             <div className="p-2 bg-blue-50 text-blue-600 rounded">
                                 <Check size={16} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-slate-900 text-sm">{t.instructions}</h4>
                                 <p className="text-slate-500 text-sm mt-1">{product.instructions[lKey]}</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-3">
                             <div className="p-2 bg-green-50 text-green-600 rounded">
                                 <Droplets size={16} />
                             </div>
                             <div>
                                 <h4 className="font-bold text-slate-900 text-sm">{t.dilution}</h4>
                                 <p className="text-slate-500 text-sm mt-1">{product.dilution[lKey]}</p>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Column 2: Specs Table */}
            <div className="space-y-8">
                 <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 h-full">
                     <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-4 flex items-center gap-2">
                         <ClipboardList size={20} className="text-prodet-500" /> {t.specs}
                     </h3>
                     
                     <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                         <div>
                             <span className="text-xs font-bold text-slate-400 uppercase block mb-1">{t.ph}</span>
                             <span className="text-slate-900 font-bold">{product.ph}</span>
                         </div>
                         <div>
                             <span className="text-xs font-bold text-slate-400 uppercase block mb-1">{t.density}</span>
                             <span className="text-slate-900 font-bold">{product.density}</span>
                         </div>
                         <div>
                             <span className="text-xs font-bold text-slate-400 uppercase block mb-1">{t.appearance}</span>
                             <span className="text-slate-900 font-bold">{product.appearance[lKey]}</span>
                         </div>
                         <div>
                             <span className="text-xs font-bold text-slate-400 uppercase block mb-1">{t.storage}</span>
                             <span className="text-slate-900 font-bold text-sm">{product.storage[lKey]}</span>
                         </div>
                     </div>

                     <div className="mt-8 pt-6 border-t border-slate-200">
                         <span className="text-xs font-bold text-slate-400 uppercase block mb-3">{t.surfaces}</span>
                         <div className="flex flex-wrap gap-2">
                             {product.surfaces[lKey].map((s, i) => (
                                 <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">
                                     {s}
                                 </span>
                             ))}
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        {/* --- HOW TO USE & SAFETY --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6">{t.instructions}</h3>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Visual Steps Placeholder - In real app, these would be illustrations */}
                    <div className="flex-1 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-black text-slate-300 mb-4 border-2 border-slate-200">1</div>
                        <p className="text-sm font-bold text-slate-700">Diluer</p>
                        <p className="text-xs text-slate-500 mt-1">Respecter le taux de dilution indiqué.</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-black text-slate-300 mb-4 border-2 border-slate-200">2</div>
                        <p className="text-sm font-bold text-slate-700">Appliquer</p>
                        <p className="text-xs text-slate-500 mt-1">Sur la surface à traiter.</p>
                    </div>
                    <div className="flex-1 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-xl font-black text-slate-300 mb-4 border-2 border-slate-200">3</div>
                        <p className="text-sm font-bold text-slate-700">Rincer</p>
                        <p className="text-xs text-slate-500 mt-1">Si nécessaire à l'eau claire.</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-red-50 p-8 rounded-2xl border border-red-100">
                 <h3 className="text-lg font-bold text-red-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                     <ShieldAlert size={20} /> {t.safety}
                 </h3>
                 <div className="flex gap-4 mb-6">
                     {product.safetyIcons.map(icon => (
                         <div key={icon} className="p-3 bg-white rounded-lg shadow-sm text-red-600" title={icon}>
                            {/* Simple mapping for icons */}
                            {icon === 'GLOVES' && <span className="text-2xl">🧤</span>}
                            {icon === 'GLASSES' && <span className="text-2xl">👓</span>}
                            {icon === 'MASK' && <span className="text-2xl">😷</span>}
                         </div>
                     ))}
                 </div>
                 <p className="text-xs text-red-700 leading-relaxed font-medium">
                     Toujours porter les équipements de protection individuelle recommandés. Consulter la FDS avant utilisation.
                 </p>
            </div>
        </div>


        {/* --- DOWNLOADS --- */}
        <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <FileText className="text-prodet-400" /> Documents Techniques
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <button onClick={generateTDS} className="group bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-xl text-left transition-all">
                     <div className="flex justify-between items-start mb-4">
                         <FileText size={24} className="text-prodet-400" />
                         <Download size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                     </div>
                     <div className="font-bold text-sm mb-1">{t.download_tds}</div>
                     <div className="text-xs text-slate-400">PDF • 1.2 MB</div>
                 </button>

                 <button className="group bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-xl text-left transition-all">
                     <div className="flex justify-between items-start mb-4">
                         <ShieldAlert size={24} className="text-red-400" />
                         <Download size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                     </div>
                     <div className="font-bold text-sm mb-1">{t.download_fds}</div>
                     <div className="text-xs text-slate-400">PDF • 0.8 MB</div>
                 </button>

                 <button className="group bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-xl text-left transition-all">
                     <div className="flex justify-between items-start mb-4">
                         <Book size={24} className="text-yellow-400" />
                         <Download size={16} className="text-slate-400 group-hover:text-white transition-colors" />
                     </div>
                     <div className="font-bold text-sm mb-1">{t.download_cat}</div>
                     <div className="text-xs text-slate-400">PDF • 4.5 MB</div>
                 </button>
            </div>
        </div>

      </div>
    </motion.section>
  );
};

// Helper icon
const Book = ({size, className}: {size: number, className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
);
