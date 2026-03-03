
import React, { useState, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { AuthContext, LangContext, CartContext } from '../App';
import { MOCK_ORDERS, PRODUCTS, TRANSLATIONS } from '../constants';
import { User, Lock, Upload, FileText, CheckCircle, Clock, ShoppingCart, LogOut, Package } from 'lucide-react';
import { ViewState } from '../types';

interface ClientPortalProps {
    onNavigate: (view: ViewState) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ onNavigate }) => {
    const { auth, login, logout } = useContext(AuthContext);
    const { lang } = useContext(LangContext);
    const { cart } = useContext(CartContext);
    
    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Dashboard State
    const [activeTab, setActiveTab] = useState<'ORDERS' | 'QUICK_ORDER' | 'UPLOAD'>('ORDERS');
    const [isDragging, setIsDragging] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Auth Logic
        if (email.includes('admin')) {
            login('ADMIN');
        } else if (email.includes('client')) {
            login('CLIENT');
        } else {
            setLoginError('Identifiants invalides. Essayez "client" ou "admin"');
        }
    };

    // Drag & Drop Handlers
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        // Simulate upload
        setTimeout(() => setUploadSuccess(true), 1500);
    };

    if (!auth.isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-slate-200"
                >
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Espace Client Pro</h2>
                        <p className="text-slate-500 text-sm">Accédez à vos tarifs et commandes.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Identifiant Client / Email</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="text" 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-prodet-500 focus:outline-none"
                                    placeholder="ex: client"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-prodet-500 focus:outline-none"
                                    placeholder="••••••"
                                />
                            </div>
                        </div>
                        {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
                        <button type="submit" className="w-full py-3 bg-prodet-800 text-white font-bold rounded-lg hover:bg-prodet-900 transition-colors shadow-lg shadow-prodet-800/20">
                            Connexion
                        </button>
                    </form>
                    <div className="mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
                        Pas encore de compte ? <button onClick={() => onNavigate('CONTACT')} className="text-prodet-600 font-bold hover:underline">Contactez le service commercial</button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const userOrders = MOCK_ORDERS.filter(o => o.clientId === auth.user?.id);

    return (
        <section className="min-h-screen bg-slate-50 pt-8 pb-20">
            <div className="container mx-auto px-6 max-w-6xl">
                
                {/* Dashboard Header */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-black text-slate-900">Bonjour, {auth.user?.name}</h1>
                            <span className="px-2 py-0.5 bg-prodet-100 text-prodet-700 text-[10px] font-bold uppercase rounded border border-prodet-200">
                                {auth.user?.priceLevel}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm">{auth.user?.companyName}</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 text-center">
                            <div className="text-xs text-slate-400 font-bold uppercase">Panier</div>
                            <div className="font-black text-prodet-700 text-lg">{cart.length} articles</div>
                        </div>
                        <button onClick={logout} className="p-3 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg border border-slate-100 hover:bg-red-50 hover:border-red-100 transition-colors">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Nav */}
                    <div className="lg:col-span-1 space-y-2">
                        <button 
                            onClick={() => setActiveTab('ORDERS')}
                            className={`w-full text-left p-4 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${activeTab === 'ORDERS' ? 'bg-prodet-800 text-white shadow-lg shadow-prodet-900/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Package size={18} /> Mes Commandes
                        </button>
                        <button 
                            onClick={() => setActiveTab('QUICK_ORDER')}
                            className={`w-full text-left p-4 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${activeTab === 'QUICK_ORDER' ? 'bg-prodet-800 text-white shadow-lg shadow-prodet-900/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            <ShoppingCart size={18} /> Commande Rapide
                        </button>
                        <button 
                            onClick={() => setActiveTab('UPLOAD')}
                            className={`w-full text-left p-4 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${activeTab === 'UPLOAD' ? 'bg-prodet-800 text-white shadow-lg shadow-prodet-900/20' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                        >
                            <Upload size={18} /> Importer PDF (ERP)
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'ORDERS' && (
                            <div className="space-y-4">
                                {userOrders.map(order => (
                                    <div key={order.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                {order.status === 'DELIVERED' ? <CheckCircle size={20} /> : <Clock size={20} />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{order.id}</div>
                                                <div className="text-xs text-slate-500">{order.date} • {order.items.length || 'PDF'} articles</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {order.total && <div className="font-black text-slate-900">{order.total.toFixed(3)} TND</div>}
                                            <span className="px-3 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600 uppercase">{order.status}</span>
                                            <button className="text-prodet-600 hover:underline text-xs font-bold">Facture PDF</button>
                                        </div>
                                    </div>
                                ))}
                                {userOrders.length === 0 && <div className="text-center p-12 text-slate-400">Aucune commande trouvée.</div>}
                            </div>
                        )}

                        {activeTab === 'UPLOAD' && (
                            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4">Importer une commande depuis votre ERP</h3>
                                <p className="text-slate-500 mb-8 text-sm">Glissez votre bon de commande (PDF) ici. Notre système le traitera automatiquement.</p>
                                
                                <div 
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${isDragging ? 'border-prodet-500 bg-prodet-50' : 'border-slate-300 bg-slate-50'} ${uploadSuccess ? 'border-green-500 bg-green-50' : ''}`}
                                >
                                    {uploadSuccess ? (
                                        <div className="flex flex-col items-center animate-bounce">
                                            <CheckCircle size={48} className="text-green-500 mb-4" />
                                            <h4 className="font-bold text-green-700">Fichier reçu avec succès !</h4>
                                            <p className="text-xs text-green-600 mt-2">Votre commande est en cours de traitement.</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center pointer-events-none">
                                            <FileText size={48} className="text-slate-300 mb-4" />
                                            <h4 className="font-bold text-slate-700">Glisser-déposer votre PDF ici</h4>
                                            <p className="text-xs text-slate-400 mt-2">ou cliquez pour parcourir</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'QUICK_ORDER' && (
                            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                                 <h3 className="text-lg font-bold text-slate-900 mb-6">Commande Rapide</h3>
                                 <div className="space-y-4">
                                     {PRODUCTS.slice(0, 5).map(prod => (
                                         <div key={prod.id} className="flex items-center justify-between border-b border-slate-50 pb-4">
                                             <div className="flex items-center gap-4">
                                                 <img src={prod.image} className="w-12 h-12 object-cover rounded bg-slate-100" />
                                                 <div>
                                                     <div className="font-bold text-slate-900 text-sm">{prod.name}</div>
                                                     <div className="text-xs text-slate-400">{prod.packaging[0]}</div>
                                                 </div>
                                             </div>
                                             <div className="flex items-center gap-4">
                                                 <div className="font-bold text-slate-700 text-sm">{prod.price.toFixed(3)} TND</div>
                                                 <button className="px-3 py-1 bg-prodet-100 text-prodet-700 text-xs font-bold rounded hover:bg-prodet-200">Ajouter</button>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};
