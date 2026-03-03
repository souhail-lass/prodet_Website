
import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES, TRANSLATIONS } from '../constants';
import { Product, Category } from '../types';
import { ArrowRight, Tag, Droplets, SearchX, ShoppingCart, FileText } from 'lucide-react';
import { LangContext, AuthContext, CartContext } from '../App';

interface CatalogProps {
  onSelectProduct: (product: Product) => void;
  initialCategory?: Category | 'ALL';
  searchQuery?: string;
}

export const Catalog: React.FC<CatalogProps> = ({ onSelectProduct, initialCategory = 'ALL', searchQuery = '' }) => {
  const [activeCategory, setActiveCategory] = useState<Category | string>(initialCategory);
  const { lang, dir } = useContext(LangContext);
  const { auth } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  
  const t = TRANSLATIONS[lang].catalog;
  const prodT = TRANSLATIONS[lang].product;
  const langKey = lang.toLowerCase() as 'fr' | 'en' | 'ar';

  useEffect(() => { setActiveCategory(initialCategory); }, [initialCategory]);

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
    const term = searchQuery.toLowerCase().trim();
    const matchesSearch = !term || 
        p.name.toLowerCase().includes(term) ||
        p.tagline[langKey].toLowerCase().includes(term) ||
        p.description[langKey].toLowerCase().includes(term) || 
        p.features.some(f => f[langKey].toLowerCase().includes(term));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
      e.stopPropagation();
      addToCart(productId, 1);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
             <div className="text-xs font-bold text-prodet-600 uppercase tracking-wider mb-2">PRODET</div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {searchQuery ? (
                    <span className="flex items-center gap-2">
                        {lang === 'AR' ? `نتائج البحث: "${searchQuery}"` : `Results for "${searchQuery}"`}
                    </span>
                ) : t.title}
            </h2>
            <p className="text-slate-500 max-w-xl">{t.subtitle}</p>
          </div>
        </div>
          
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-6 sticky top-20 md:top-24 bg-slate-50/95 backdrop-blur z-30 py-4 transition-all">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === cat 
                    ? 'bg-prodet-800 text-white shadow-md transform scale-105' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:border-prodet-300'
                }`}
              >
                {t.filter[cat.toLowerCase() as keyof typeof t.filter]}
              </button>
            ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-prodet-300 transition-all duration-300 cursor-pointer flex flex-col h-full relative"
                >
                    {/* B2B Action Overlay (on hover) */}
                    <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                         {auth.user?.role === 'CLIENT' ? (
                             <button onClick={(e) => handleAddToCart(e, product.id)} className="p-2 bg-prodet-600 text-white rounded-lg shadow-lg hover:bg-prodet-700">
                                 <ShoppingCart size={18} />
                             </button>
                         ) : (
                             <div className="p-2 bg-white/90 backdrop-blur rounded-lg shadow text-xs font-bold text-slate-500 border border-slate-200">
                                 <FileText size={16} />
                             </div>
                         )}
                    </div>

                    {/* Image Area */}
                    <div className="h-48 overflow-hidden relative bg-slate-100">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-prodet-800 uppercase tracking-wider shadow-sm rtl:left-auto rtl:right-3">
                            {t.filter[product.category.toLowerCase() as keyof typeof t.filter]}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-3">
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-prodet-600 transition-colors line-clamp-1">{product.name}</h3>
                            <p className="text-xs text-prodet-600 font-semibold uppercase tracking-wide mb-2">{product.tagline[langKey]}</p>
                            
                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 border-y border-slate-50 py-2">
                                <div className="flex items-center gap-1">
                                    <Tag size={12} />
                                    <span>{auth.user?.role === 'CLIENT' ? product.price.toFixed(3) + ' TND' : 'Sur Devis'}</span>
                                </div>
                                {product.specs?.dosage && (
                                    <div className="flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0" title={prodT.dosage}>
                                        <Droplets size={12} className="text-blue-400" />
                                        <span>Conc.</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                            {product.description[langKey]}
                        </p>

                        <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-50">
                            <span className="text-xs font-bold text-slate-400 group-hover:text-prodet-600 transition-colors">{t.view_specs}</span>
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-prodet-600 group-hover:text-white transition-colors">
                                <ArrowRight size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
                            </div>
                        </div>
                    </div>
                </motion.div>
                ))
            ) : (
                <div className="col-span-full py-20 text-center">
                    <div className="inline-block p-4 rounded-full bg-slate-100 text-slate-400 mb-4">
                        <SearchX size={48} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {lang === 'AR' ? 'لا توجد منتجات' : 'No products found'}
                    </h3>
                </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
