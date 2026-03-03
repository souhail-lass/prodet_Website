
import React, { useState } from 'react';
import { MOCK_ORDERS } from '../constants';
import { Package, Truck, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const [orders, setOrders] = useState(MOCK_ORDERS);
    const [filter, setFilter] = useState('ALL');

    const filteredOrders = filter === 'ALL' ? orders : orders.filter(o => o.status === filter);

    const updateStatus = (id: string, newStatus: any) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    };

    return (
        <section className="min-h-screen bg-slate-100 pt-8 pb-20">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black text-slate-900">Admin Dashboard</h1>
                    <div className="flex gap-2">
                        <button onClick={() => setFilter('ALL')} className={`px-4 py-2 rounded text-xs font-bold ${filter === 'ALL' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}>Tous</button>
                        <button onClick={() => setFilter('PENDING')} className={`px-4 py-2 rounded text-xs font-bold ${filter === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-white text-slate-600'}`}>En Attente</button>
                        <button onClick={() => setFilter('DELIVERED')} className={`px-4 py-2 rounded text-xs font-bold ${filter === 'DELIVERED' ? 'bg-green-600 text-white' : 'bg-white text-slate-600'}`}>Livrés</button>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="p-4 border-b border-slate-200">ID Commande</th>
                                <th className="p-4 border-b border-slate-200">Client</th>
                                <th className="p-4 border-b border-slate-200">Date</th>
                                <th className="p-4 border-b border-slate-200">Type</th>
                                <th className="p-4 border-b border-slate-200">Statut</th>
                                <th className="p-4 border-b border-slate-200">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {filteredOrders.map(order => (
                                <tr key={order.id} className="hover:bg-slate-50 border-b border-slate-100 last:border-0">
                                    <td className="p-4 font-bold text-slate-900">{order.id}</td>
                                    <td className="p-4 text-slate-600">{order.clientName}</td>
                                    <td className="p-4 text-slate-500">{order.date}</td>
                                    <td className="p-4">
                                        {order.type === 'PDF_UPLOAD' ? (
                                            <span className="flex items-center gap-1 text-blue-600 font-bold text-xs"><FileText size={14}/> PDF ERP</span>
                                        ) : (
                                            <span className="flex items-center gap-1 text-slate-500 font-bold text-xs"><Package size={14}/> Web</span>
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                            order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                                            order.status === 'PREPARING' ? 'bg-blue-100 text-blue-700' : 
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {order.status === 'PENDING' && (
                                                <button onClick={() => updateStatus(order.id, 'PREPARING')} className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="Préparer">
                                                    <Package size={16} />
                                                </button>
                                            )}
                                            {order.status === 'PREPARING' && (
                                                <button onClick={() => updateStatus(order.id, 'DELIVERED')} className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Livrer">
                                                    <Truck size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
