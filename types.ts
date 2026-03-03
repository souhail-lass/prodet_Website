
import { LucideIcon } from 'lucide-react';

export type Category = 'ALL' | 'KITCHEN' | 'LAUNDRY' | 'HOUSEKEEPING' | 'CONSUMABLES';

export type Language = 'FR' | 'EN' | 'AR';

export type UserRole = 'GUEST' | 'CLIENT' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  companyName?: string;
  role: UserRole;
  priceLevel: 'STANDARD' | 'HOTEL' | 'DISTRIBUTOR';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  date: string;
  status: 'PENDING' | 'PREPARING' | 'DELIVERED';
  items: { productName: string; quantity: number }[];
  total?: number;
  pdfUrl?: string; // If uploaded via PDF
  type: 'ONLINE' | 'PDF_UPLOAD';
}

export interface LocalizedString {
  fr: string;
  en: string;
  ar: string;
}

export interface LocalizedStringList {
  fr: string[];
  en: string[];
  ar: string[];
}

export interface Product {
  id: string;
  category: Category;
  price: number; // Standard Price in TND
  image: string;
  
  // Localized Content
  name: string; 
  tagline: LocalizedString;
  description: LocalizedString;
  
  // Technical Data for Product Page
  packaging: string[]; // e.g., ["5kg", "20kg"]
  dilution: LocalizedString; // e.g., "0.5%"
  ph: string;
  appearance: LocalizedString;
  density: string;
  storage: LocalizedString;
  
  // Usage
  instructions: LocalizedString;
  surfaces: LocalizedStringList; // e.g., { fr: ["Inox", "Ceramic"] }
  safetyIcons: ('GLOVES' | 'GLASSES' | 'MASK')[]; 
  
  features: LocalizedString[]; 
  
  specs?: {
    dosage?: LocalizedString;
    composition?: LocalizedString;
  };
}

export type ViewState = 'HOME' | 'CATALOG' | 'PRODUCT_DETAIL' | 'CONTACT' | 'SOLUTIONS' | 'EQUIPMENT' | 'SERVICES' | 'CLIENT_PORTAL' | 'ADMIN_DASHBOARD' | 'LOGISTICS';

export interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onSearch: (query: string) => void;
  user?: User | null;
  cartCount?: number;
}

export interface Industry {
  id: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  icon: any; 
  image: string;
  color: string;
  packages: {
    name: LocalizedString;
    items: LocalizedString[];
  }[];
}

export interface EquipmentItem {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  features: LocalizedString[];
}