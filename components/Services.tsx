import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { TRANSLATIONS } from '../constants';
import { LangContext } from '../App';
import { GraduationCap, Calculator, ShieldCheck, ClipboardCheck } from 'lucide-react';

export const Services: React.FC = () => {
    const { lang, dir } = useContext(LangContext);
    const t = TRANSLATIONS[lang].services;
    
    // Calculator State
    const [spend, setSpend] = useState<number>(1000);
    const savings = Math.round(spend * 0.30 * 12); // 30% savings annualized

    return (
        <section className="min-h-screen pt-12 pb-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-prodet-600 font-bold uppercase tracking-widest text-sm mb-2 block">Support 360°</span>
                    <h1 className="text-4xl font-black text-slate-900 mb-4">{t.title}</h1>
                    <p className="text-slate-500 text-lg">{t.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    
                    {/* Calculator Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-xl shadow-prodet-900/5 p-8 border border-slate-100"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                                <Calculator size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{t.calc_title}</h3>
                        </div>
                        <p className="text-slate-500 mb-8 text-sm">{t.calc_desc}</p>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-2">{t.calc_spend}</label>
                                <input 
                                    type="range" 
                                    min="100" 
                                    max="5000" 
                                    step="100"
                                    value={spend}
                                    onChange={(e) => setSpend(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-prodet-600"
                                />
                                <div className="text-right font-bold text-slate-900 mt-2 text-lg">{spend} TND</div>
                            </div>
                            
                            <div className="bg-prodet-900 text-white p-6 rounded-xl text-center">
                                <div className="text-xs font-bold uppercase text-prodet-300 mb-1">{t.calc_result}</div>
                                <div className="text-4xl font-black text-green-400">{savings} TND</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4"
                        >
                            <div className="p-3 bg-blue-50 text-prodet-600 rounded-lg h-fit">
                                <GraduationCap size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">{t.training_title}</h4>
                                <p className="text-slate-500 text-sm">{t.training_desc}</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4"
                        >
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg h-fit">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">HACCP & Audit</h4>
                                <p className="text-slate-500 text-sm">
                                    {lang === 'FR' && 'Accompagnement complet pour vos certifications sanitaires.'}
                                    {lang === 'EN' && 'Complete support for your sanitary certifications.'}
                                    {lang === 'AR' && 'دعم كامل لشهاداتك الصحية.'}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                             initial={{ opacity: 0, y: 20 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ delay: 0.2 }}
                             className="bg-white p-6 rounded-xl border border-slate-200 flex gap-4"
                        >
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg h-fit">
                                <ClipboardCheck size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Maintenance 24/7</h4>
                                <p className="text-slate-500 text-sm">
                                    {lang === 'FR' && 'Intervention rapide sur vos équipements de dosage.'}
                                    {lang === 'EN' && 'Rapid intervention on your dosing equipment.'}
                                    {lang === 'AR' && 'تدخل سريع في معدات الجرعات الخاصة بك.'}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};