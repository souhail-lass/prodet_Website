import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES, TRANSLATIONS } from '../constants';
import { LangContext } from '../App';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const Solutions: React.FC = () => {
    const { lang, dir } = useContext(LangContext);
    const t = TRANSLATIONS[lang].solutions;
    const lKey = lang.toLowerCase() as 'fr';
    const [activeIndustry, setActiveIndustry] = useState(INDUSTRIES[0]);

    return (
        <section className="min-h-screen pt-12 pb-24 bg-slate-50">
            <div className="bg-slate-900 text-white py-16 mb-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4">{t.title}</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar / Tabs */}
                    <div className="lg:col-span-4 space-y-4">
                        {INDUSTRIES.map((ind) => (
                            <button
                                key={ind.id}
                                onClick={() => setActiveIndustry(ind)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                                    activeIndustry.id === ind.id 
                                    ? 'bg-white border-prodet-500 shadow-xl shadow-prodet-900/5 ring-1 ring-prodet-100' 
                                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-500'
                                }`}
                            >
                                <div className={`p-3 rounded-lg ${activeIndustry.id === ind.id ? ind.color + ' text-white' : 'bg-slate-100'}`}>
                                    <ind.icon size={24} />
                                </div>
                                <div className="text-left rtl:text-right">
                                    <h3 className={`font-bold ${activeIndustry.id === ind.id ? 'text-slate-900' : 'text-slate-600'}`}>{ind.title[lKey]}</h3>
                                    <p className="text-xs text-slate-400">{ind.subtitle[lKey]}</p>
                                </div>
                                {activeIndustry.id === ind.id && (
                                    <ArrowRight className={`ml-auto rtl:mr-auto rtl:ml-0 text-prodet-500 ${dir === 'rtl' ? 'rotate-180' : ''}`} size={20} />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-8">
                         <motion.div
                            key={activeIndustry.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg"
                         >
                            <div className="h-64 relative">
                                <img 
                                    src={activeIndustry.image} 
                                    alt="Industry" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
                                    <div>
                                        <h2 className="text-3xl font-black text-white mb-2">{activeIndustry.title[lKey]}</h2>
                                        <p className="text-slate-200">{activeIndustry.description[lKey]}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8">
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-4">
                                    Pack Solutions
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {activeIndustry.packages.map((pkg, idx) => (
                                        <div key={idx} className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-prodet-200 transition-colors">
                                            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-prodet-500"></div>
                                                {pkg.name[lKey]}
                                            </h4>
                                            <ul className="space-y-3">
                                                {pkg.items.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                        {item[lKey]}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button className="mt-6 w-full py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase rounded hover:bg-prodet-50 transition-colors">
                                                {t.learn_more}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                         </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};