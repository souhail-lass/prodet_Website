
import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, Send, Building2, MapPin, CheckCircle, ExternalLink, PenTool, ShoppingBag } from 'lucide-react';
import { COMPANY_INFO, TRANSLATIONS } from '../constants';
import { LangContext } from '../App';

export const Contact: React.FC = () => {
    const { lang, dir } = useContext(LangContext);
    const t = TRANSLATIONS[lang].contact;
    const formSectionRef = useRef<HTMLDivElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState<'SALES' | 'TECH'>('SALES');
    
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        message: '',
        productIssue: '' // for tech support
    });

    // Auto-scroll to form on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            if (formSectionRef.current) {
                formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 600); 
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        const type = activeTab === 'SALES' ? 'SALES INQUIRY' : 'TECH SUPPORT';
        const subject = `${type}: ${formData.company} - ${formData.name}`;
        let body = `Name: ${formData.name}%0D%0ACompany: ${formData.company}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        if (activeTab === 'TECH') body += `%0D%0AProduct Issue: ${formData.productIssue}`;
        
        setTimeout(() => {
             window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
        }, 1000);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', company: '', email: '', message: '', productIssue: '' });
        }, 8000);
    };

    return (
        <section className="min-h-screen bg-slate-50 pb-20 pt-8">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20 relative overflow-hidden mb-12">
                 <div className="absolute inset-0 bg-prodet-900/50"></div>
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-4xl md:text-5xl font-black mb-6">{t.title}</h1>
                        <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">{t.subtitle}</p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6" ref={formSectionRef}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
                    
                    {/* Info Cards */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 text-prodet-600 rounded-xl flex items-center justify-center mb-6">
                                <Building2 size={24} />
                            </div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">{t.headquarters}</h4>
                            <p className="text-slate-500 leading-relaxed">{COMPANY_INFO.address}</p>
                            <a href={COMPANY_INFO.mapsLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-prodet-600 font-bold text-sm mt-4 hover:underline">
                                <MapPin size={16} /> Google Maps
                            </a>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-50 text-prodet-600 rounded-xl flex items-center justify-center mb-6">
                                <Phone size={24} />
                            </div>
                            <h4 className="font-bold text-slate-900 text-lg mb-2">{t.call}</h4>
                            <p className="text-slate-900 font-bold text-xl tracking-tight" dir="ltr">{COMPANY_INFO.phone}</p>
                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide font-bold">{t.hours}</p>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: dir === 'rtl' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-8 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden min-h-[500px]"
                    >
                        {/* Tabs */}
                        <div className="flex border-b border-slate-100">
                            <button 
                                onClick={() => setActiveTab('SALES')}
                                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 ${activeTab === 'SALES' ? 'text-prodet-600 border-b-2 border-prodet-600 bg-prodet-50/50' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <ShoppingBag size={16} /> {t.tab_sales}
                            </button>
                            <button 
                                onClick={() => setActiveTab('TECH')}
                                className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide flex items-center justify-center gap-2 ${activeTab === 'TECH' ? 'text-prodet-600 border-b-2 border-prodet-600 bg-prodet-50/50' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <PenTool size={16} /> {t.tab_tech}
                            </button>
                        </div>

                        <div className="p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center py-10">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h4 className="text-2xl font-black text-slate-900 mb-2">Message Prêt !</h4>
                                        <p className="text-slate-500 mb-6">Votre client email a été ouvert.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t.form_name}</label>
                                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-900 focus:border-prodet-500 focus:outline-none" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t.form_company}</label>
                                                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-900 focus:border-prodet-500 focus:outline-none" />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t.form_email}</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-900 focus:border-prodet-500 focus:outline-none" required />
                                        </div>

                                        {activeTab === 'TECH' && (
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Produit Concerné / Problème</label>
                                                <input type="text" name="productIssue" value={formData.productIssue} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-900 focus:border-prodet-500 focus:outline-none" placeholder="Ex: Pompe doseuse en panne" />
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">{t.form_msg}</label>
                                            <textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-900 focus:border-prodet-500 focus:outline-none resize-none" required></textarea>
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button type="submit" className="px-10 py-4 bg-prodet-800 text-white font-bold rounded-lg hover:bg-prodet-900 transition-all flex items-center gap-3 shadow-xl">
                                                {t.form_btn} <Send size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
