import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { EQUIPMENT_LIST, TRANSLATIONS } from '../constants';
import { LangContext } from '../App';
import { Cog, Zap } from 'lucide-react';

export const Equipment: React.FC = () => {
    const { lang } = useContext(LangContext);
    const t = TRANSLATIONS[lang].equipment;
    const lKey = lang.toLowerCase() as 'fr';

    return (
        <section className="min-h-screen pt-12 pb-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-prodet-600 font-bold uppercase tracking-widest text-sm mb-2 block">Hardware</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">{t.title}</h1>
                    <p className="text-slate-500 text-lg">{t.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {EQUIPMENT_LIST.map((item, idx) => (
                        <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-prodet-900/10 transition-shadow duration-500 group"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.name[lKey]} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.name[lKey]}</h3>
                                <p className="text-slate-500 mb-8 leading-relaxed">
                                    {item.description[lKey]}
                                </p>
                                
                                <div className="flex gap-4">
                                    {item.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
                                            {i === 0 ? <Zap size={14} className="text-yellow-500" /> : <Cog size={14} className="text-prodet-500" />}
                                            {feat[lKey]}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Integration Banner */}
                <div className="mt-20 bg-prodet-900 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Comodat & Maintenance</h3>
                            <p className="text-prodet-200 max-w-xl">
                                {lang === 'FR' && "Nous installons et maintenons nos équipements gratuitement contre un contrat d'approvisionnement exclusif."}
                                {lang === 'EN' && "We install and maintain our equipment for free in exchange for an exclusive supply contract."}
                                {lang === 'AR' && "نقوم بتركيب وصيانة معداتنا مجانًا مقابل عقد توريد حصري."}
                            </p>
                        </div>
                        <button className="px-8 py-3 bg-white text-prodet-900 font-bold rounded hover:bg-prodet-50 transition-colors">
                            {lang === 'FR' ? 'Demander Installation' : lang === 'EN' ? 'Request Install' : 'طلب تركيب'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};