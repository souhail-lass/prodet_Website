
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { CategoryGrid } from './components/CategoryGrid';
import { FeaturedProducts, AboutSection } from './components/HomeSections';
import { ProductDetail } from './components/ProductDetail';
import { Contact } from './components/Contact';
import { Solutions } from './components/Solutions';
import { Equipment } from './components/Equipment';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { ClientPortal } from './components/ClientPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { Logistics } from './components/Logistics';

import { ViewState, Product, Category, Language, AuthState, CartItem, UserRole } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_USERS } from './constants';

// --- Contexts ---
interface LangContextType {
  lang: Language;
  setLang: (l: Language) => void;
  dir: 'ltr' | 'rtl';
}

interface AuthContextType {
  auth: AuthState;
  login: (role: UserRole) => void;
  logout: () => void;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const LangContext = createContext<LangContextType>({ lang: 'FR', setLang: () => {}, dir: 'ltr' });
export const AuthContext = createContext<AuthContextType>({ auth: { user: null, isAuthenticated: false }, login: () => {}, logout: () => {} });
export const CartContext = createContext<CartContextType>({ cart: [], addToCart: () => {}, removeFromCart: () => {}, clearCart: () => {} });

const App: React.FC = () => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialCategory, setInitialCategory] = useState<Category | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Language State
  const [lang, setLang] = useState<Language>('FR');
  const dir = lang === 'AR' ? 'rtl' : 'ltr';

  // Auth State
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Auth Handlers
  const login = (role: UserRole) => {
    // Simple mock login
    const user = MOCK_USERS.find(u => u.role === role) || MOCK_USERS[0];
    setAuth({ user, isAuthenticated: true });
    // Redirect based on role
    if (role === 'CLIENT') setCurrentView('CLIENT_PORTAL');
    if (role === 'ADMIN') setCurrentView('ADMIN_DASHBOARD');
  };

  const logout = () => {
    setAuth({ user: null, isAuthenticated: false });
    setCurrentView('HOME');
  };

  // Cart Handlers
  const addToCart = (productId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  // Effects
  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang.toLowerCase();
    if (lang === 'AR') {
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
    }
  }, [lang, dir]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedProduct]);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view === 'CATALOG') setInitialCategory('ALL');
    if (view !== 'CATALOG' && view !== 'PRODUCT_DETAIL') setSearchQuery('');
    if (view !== 'PRODUCT_DETAIL') setSelectedProduct(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setInitialCategory('ALL');
    setCurrentView('CATALOG');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('PRODUCT_DETAIL');
  };

  const handleCategorySelect = (category: Category) => {
      setInitialCategory(category);
      setCurrentView('CATALOG');
  };

  return (
    <LangContext.Provider value={{ lang, setLang, dir }}>
      <AuthContext.Provider value={{ auth, login, logout }}>
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
          <div className={`min-h-screen bg-white text-slate-800 flex flex-col ${lang === 'AR' ? 'font-arabic' : 'font-sans'}`} dir={dir}>
            <Navbar 
              currentView={currentView} 
              onNavigate={handleNavigate} 
              onSearch={handleSearch} 
              user={auth.user} 
              cartCount={cart.length}
            />
            
            <main className="flex-grow pt-20">
              <AnimatePresence mode="wait">
                {currentView === 'HOME' && (
                  <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Hero onNavigate={handleNavigate} />
                    <CategoryGrid onCategorySelect={handleCategorySelect} />
                    <FeaturedProducts onProductSelect={handleProductSelect} onViewCatalog={() => handleNavigate('CATALOG')} />
                    <AboutSection onNavigate={handleNavigate} />
                  </motion.div>
                )}

                {currentView === 'SOLUTIONS' && (
                    <motion.div key="solutions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Solutions />
                    </motion.div>
                )}

                {currentView === 'EQUIPMENT' && (
                    <motion.div key="equipment" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Equipment />
                    </motion.div>
                )}

                {currentView === 'SERVICES' && (
                    <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Services />
                    </motion.div>
                )}

                {currentView === 'LOGISTICS' && (
                    <motion.div key="logistics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Logistics />
                    </motion.div>
                )}

                {currentView === 'CLIENT_PORTAL' && (
                    <motion.div key="client" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ClientPortal onNavigate={handleNavigate} />
                    </motion.div>
                )}

                {currentView === 'ADMIN_DASHBOARD' && (
                    <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <AdminDashboard />
                    </motion.div>
                )}

                {currentView === 'CATALOG' && (
                  <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <Catalog 
                      onSelectProduct={handleProductSelect} 
                      initialCategory={initialCategory}
                      searchQuery={searchQuery}
                    />
                  </motion.div>
                )}

                {currentView === 'PRODUCT_DETAIL' && selectedProduct && (
                   <motion.div key="product-detail" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <ProductDetail 
                          product={selectedProduct} 
                          onBack={() => handleNavigate('CATALOG')} 
                          onInquiry={() => handleNavigate('CONTACT')}
                      />
                   </motion.div>
                )}

                {currentView === 'CONTACT' && (
                   <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <Contact />
                   </motion.div>
                )}
              </AnimatePresence>
            </main>
            
            <Chatbot />
            <Footer />
          </div>
        </CartContext.Provider>
      </AuthContext.Provider>
    </LangContext.Provider>
  );
};

export default App;
