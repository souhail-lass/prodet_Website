import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, TRANSLATIONS } from '../constants';
import { Product, ViewState } from '../types';
import { ArrowRight, Leaf, Shield, Truck, Beaker } from 'lucide-react';
import { LangContext } from '../App';

// --- Featured Products Section ---
interface FeaturedProductsProps {
  onProductSelect: (product: Product) => void;
  onViewCatalog: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductSelect, onViewCatalog }) => {
    const { lang, dir } = useContext(LangContext);
    const t = TRANSLATIONS[lang].home;
    const catT = TRANSLATIONS[lang].catalog;

    // Select specific best sellers
    const featuredIds = ['k-01', 'h-01', 'k-06', 'h-05']; 
    const featuredList = PRODUCTS.filter(p => featuredIds.includes(p.id));

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl font-black text-slate-900">{t.bestsellers}</h2>
                    <button 
                        onClick={onViewCatalog}
                        className="hidden md:flex items-center gap-2 text-sm font-bold text-prodet-600 hover:text-prodet-800 transition-colors uppercase tracking-wider"
                    >
                        {t.view_catalog} <ArrowRight size={16} className={dir === 'rtl' ? 'rotate-180' : ''} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredList.map((product, idx) => (
                        <motion.div 
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            onClick={() => onProductSelect(product)}
                            className="group cursor-pointer"
                        >
                            <div className="bg-slate-50 rounded-xl overflow-hidden mb-4 relative aspect-[4/5]">
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 bg-white shadow-sm px-2 py-1 rounded text-[10px] font-bold text-slate-900 rtl:right-auto rtl:left-3">
                                    {catT.filter[product.category.toLowerCase() as keyof typeof catT.filter]}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-prodet-600 transition-colors">{product.name}</h3>
                            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">{product.tagline[lang.toLowerCase() as 'fr']}</p>
                            <div className="font-bold text-prodet-800">{product.price.toFixed(3)} {catT.price}</div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-10 md:hidden text-center">
                    <button onClick={onViewCatalog} className="text-prodet-600 font-bold text-sm">{t.view_catalog}</button>
                </div>
            </div>
        </section>
    );
};

// --- About / Trust Section ---
export const AboutSection: React.FC<{ onNavigate: (view: ViewState) => void }> = ({ onNavigate }) => {
    const { lang } = useContext(LangContext);
    const t = TRANSLATIONS[lang].home;

    return (
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" 
                 style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-prodet-400 font-bold text-sm uppercase tracking-widest mb-4 block">PRODET</span>
                        <h2 className="text-4xl font-black mb-6 leading-tight whitespace-pre-line">
                            {t.about_title}
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            {t.about_text}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-prodet-400">
                                    <Beaker size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Lab Tested</h4>
                                    <p className="text-xs text-slate-400">Control qualité rigoureux.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-green-400">
                                    <Leaf size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Eco-Conscious</h4>
                                    <p className="text-xs text-slate-400">Produits biodégradables.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-blue-400">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Conformité</h4>
                                    <p className="text-xs text-slate-400">Normes Tunisiennes & ISO.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800 rounded-lg text-yellow-400">
                                    <Truck size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white mb-1">Livraison Pro</h4>
                                    <p className="text-xs text-slate-400">Logistique optimisée B2B.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-2xl overflow-hidden border border-slate-700 bg-slate-800">
                            <img 
                                src="https://images.unsplash.com/photo-1581093458791-9f302e6d8359?auto=format&fit=crop&q=80&w=1000" 
                                alt="Chemical Engineer" 
                                className="w-full h-full object-cover opacity-80"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
