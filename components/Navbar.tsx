
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Menu, X, Phone, Mail, Globe, Search, User, LogOut, ShoppingCart, Truck } from 'lucide-react';
import { NavigationProps } from '../types';
import { NAV_LINKS, COMPANY_INFO, TRANSLATIONS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { LangContext, AuthContext } from '../App';

export const Navbar: React.FC<NavigationProps> = ({ currentView, onNavigate, onSearch, user, cartCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { lang, setLang } = useContext(LangContext);
  const { logout } = useContext(AuthContext);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleLang = () => {
      const next = lang === 'FR' ? 'EN' : lang === 'EN' ? 'AR' : 'FR';
      setLang(next);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setIsSearchOpen(false);
      setSearchTerm('');
      setIsMobileMenuOpen(false);
    }
  };

  const handleAuthClick = () => {
      if (user) {
          if (user.role === 'ADMIN') onNavigate('ADMIN_DASHBOARD');
          else onNavigate('CLIENT_PORTAL');
      } else {
          onNavigate('CLIENT_PORTAL'); // Go to login
      }
  };

  return (
    <>
      {/* Top Bar - B2B Standard */}
      <div className={`hidden lg:flex bg-prodet-900 text-white py-2 text-xs font-medium px-6 justify-between items-center z-[60] relative transition-all duration-300 ${isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden' : 'h-8 opacity-100'}`}>
        <div className="container mx-auto flex justify-between">
           <div className="flex space-x-6">
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 hover:text-prodet-400 cursor-pointer transition-colors rtl:flex-row-reverse"><Phone size={12} className="text-prodet-400" /> {COMPANY_INFO.phone}</a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 hover:text-prodet-400 cursor-pointer transition-colors rtl:flex-row-reverse"><Mail size={12} className="text-prodet-400" /> {COMPANY_INFO.email}</a>
           </div>
           <div className="flex space-x-4 items-center">
              <span className="opacity-70 flex items-center gap-1"><Truck size={12}/> {t.nav.logistics} : Grand Tunis 24h</span>
              <span className="opacity-70">ISO 9001:2015</span>
           </div>
        </div>
      </div>

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 border-b border-slate-100 ${
          isScrolled ? 'top-0 py-3 bg-white/95 backdrop-blur-md shadow-sm' : 'top-0 lg:top-8 py-4 bg-white'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Brand */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('HOME')}
          >
            <div className="flex flex-col leading-none">
              <span className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-prodet-700 transition-colors">PRODET<span className="text-prodet-500">.</span></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{COMPANY_INFO.tagline}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            {NAV_LINKS.map((link) => (
              <button
                key={link.value}
                onClick={() => onNavigate(link.value as any)}
                className={`text-xs font-bold transition-all relative py-2 uppercase tracking-wide ${
                  currentView === link.value 
                    ? 'text-prodet-700' 
                    : 'text-slate-500 hover:text-prodet-700'
                }`}
              >
                {t.nav[link.value.toLowerCase() as keyof typeof t.nav]}
                {currentView === link.value && (
                    <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-prodet-600" />
                )}
              </button>
            ))}
            
            <div className="w-px h-4 bg-slate-300 mx-2"></div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <button 
                    onClick={toggleLang}
                    className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-prodet-700 px-2 py-1 rounded"
                >
                    <Globe size={14} /> {lang}
                </button>

                <div className="relative">
                    <button 
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        className="text-slate-500 hover:text-prodet-700 transition-colors p-1"
                    >
                        <Search size={18} />
                    </button>
                    <AnimatePresence>
                         {isSearchOpen && (
                             <motion.form
                                 initial={{ width: 0, opacity: 0 }}
                                 animate={{ width: 200, opacity: 1 }}
                                 exit={{ width: 0, opacity: 0 }}
                                 onSubmit={handleSearchSubmit}
                                 className="absolute right-0 top-full mt-2 overflow-hidden bg-white shadow-lg rounded border border-slate-100 p-1"
                             >
                                 <input
                                     ref={searchInputRef}
                                     type="text"
                                     value={searchTerm}
                                     onChange={(e) => setSearchTerm(e.target.value)}
                                     placeholder={lang === 'AR' ? 'بحث...' : 'Search...'}
                                     className="w-full h-8 bg-slate-50 rounded px-3 text-sm focus:outline-none"
                                 />
                             </motion.form>
                         )}
                     </AnimatePresence>
                </div>

                {/* Auth & Cart */}
                {user ? (
                    <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                         <div 
                            onClick={handleAuthClick}
                            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                        >
                            <div className="w-8 h-8 rounded-full bg-prodet-100 text-prodet-700 flex items-center justify-center font-bold text-xs border border-prodet-200">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase leading-none">{user.role}</span>
                                <span className="text-xs font-bold text-slate-900 leading-none">{user.name.split(' ')[0]}</span>
                            </div>
                        </div>
                        {user.role === 'CLIENT' && (
                             <div className="relative cursor-pointer text-slate-600 hover:text-prodet-600">
                                <ShoppingCart size={20} />
                                {cartCount ? (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                ) : null}
                            </div>
                        )}
                        <button onClick={logout} className="text-slate-400 hover:text-red-500 ml-2">
                            <LogOut size={16} />
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => onNavigate('CLIENT_PORTAL')}
                        className="flex items-center gap-2 px-4 py-2 bg-prodet-50 text-prodet-700 text-xs font-bold rounded hover:bg-prodet-100 transition-colors uppercase tracking-wide border border-prodet-100"
                    >
                        <User size={14} /> {t.nav.client_portal}
                    </button>
                )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4">
             {user && (
                 <div onClick={() => onNavigate(user.role === 'ADMIN' ? 'ADMIN_DASHBOARD' : 'CLIENT_PORTAL')} className="w-8 h-8 bg-prodet-100 rounded-full flex items-center justify-center text-prodet-700 font-bold text-xs">
                     {user.name.charAt(0)}
                 </div>
             )}
            <button 
                className="text-slate-900"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-16 z-40 bg-white flex flex-col pt-10 px-6 space-y-6 lg:hidden overflow-y-auto pb-20"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  onNavigate(link.value as any);
                  setIsMobileMenuOpen(false);
                }}
                className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4 text-left rtl:text-right"
              >
                 {t.nav[link.value.toLowerCase() as keyof typeof t.nav]}
              </button>
            ))}
            
            <button 
                onClick={() => {
                    onNavigate('CLIENT_PORTAL');
                    setIsMobileMenuOpen(false);
                }}
                className="w-full py-4 bg-prodet-700 text-white font-bold rounded flex items-center justify-center gap-2"
            >
                <User size={18} /> {user ? (user.role === 'ADMIN' ? t.nav.admin : t.nav.client_portal) : t.nav.client_portal}
            </button>
             {user && (
                <button 
                    onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                    }}
                    className="w-full py-4 text-red-500 font-bold border border-red-100 rounded flex items-center justify-center gap-2"
                >
                    <LogOut size={18} /> Logout
                </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
