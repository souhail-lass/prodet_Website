
import React, { useContext } from 'react';
import { LangContext } from '../App';
import { Truck, MapPin, Clock, FileText, Package, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

export const Logistics: React.FC = () => {
    const { lang } = useContext(LangContext);

    const steps = [
        { icon: FileText, title: "Commande ERP / Web", desc: "Envoyez votre PDF ou commandez en ligne." },
        { icon: Package, title: "Préparation Usine", desc: "Traitement immédiat à notre usine d'Utique." },
        { icon: Truck, title: "Expédition Flotte Prodet", desc: "Camions dédiés conformes ADR." },
        { icon: CheckCircle, title: "Livraison & Récupération", desc: "Livraison et reprise des bidons vides." },
    ];

    return (
        <section className="min-h-screen bg-white pt-12 pb-24">
            {/* Header */}
            <div className="bg-slate-900 text-white py-20 mb-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-black mb-4">Logistique & Distribution</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Une chaîne d'approvisionnement intégrée, de notre usine à vos locaux.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl">
                
                {/* Workflow */}
                <div className="mb-20">
                    <h2 className="text-2xl font-black text-slate-900 mb-12 text-center">Votre Parcours de Commande</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-slate-100 -z-10"></div>
                        
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center bg-white">
                                <div className="w-16 h-16 rounded-full bg-prodet-700 text-white flex items-center justify-center mb-6 shadow-lg shadow-prodet-700/20 border-4 border-white">
                                    <step.icon size={28} />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                                <p className="text-sm text-slate-500">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Truck className="text-prodet-600" /> Zones de Livraison
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">A</div>
                                <div>
                                    <div className="font-bold text-slate-800">Grand Tunis</div>
                                    <div className="text-xs text-slate-500">Livraison 24h - Quotidienne</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">B</div>
                                <div>
                                    <div className="font-bold text-slate-800">Bizerte / Nabeul / Sousse</div>
                                    <div className="text-xs text-slate-500">Livraison 48h - Mar/Jeu/Sam</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0 text-xs font-bold">C</div>
                                <div>
                                    <div className="font-bold text-slate-800">Reste de la Tunisie</div>
                                    <div className="text-xs text-slate-500">Via Transporteur Partenaire (72h)</div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                         <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <MapPin className="text-prodet-600" /> Point de Retrait Usine
                        </h3>
                        <div className="mb-6">
                            <p className="font-bold text-slate-800 mb-1">{COMPANY_INFO.factoryNote}</p>
                            <p className="text-sm text-slate-500">Ouvert aux professionnels pour enlèvement direct.</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-200">
                            <Clock size={20} className="text-slate-400" />
                            <span>Lun - Ven : 07h00 - 16h00</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};
