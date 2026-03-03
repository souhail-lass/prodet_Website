
import { Product, Language, Industry, EquipmentItem, User, Order } from './types';
import { ChefHat, Building, Factory, HeartPulse } from 'lucide-react';

// --- COMPANY INFORMATION ---
export const COMPANY_INFO = {
  name: "PRODET",
  tagline: "Hygiène Industrielle & Professionnelle",
  phone: "71 758 468",
  email: "prodet.tunisie@gmail.com",
  address: "20 Rue de Somalie, Tunis 2045, Tunisie",
  factoryNote: "Usine: Zone Industrielle Utique",
  mapsLink: "https://maps.app.goo.gl/pJTvy3HKydgCrL2h6",
  social: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
  }
};

export const CATEGORIES = ['ALL', 'KITCHEN', 'LAUNDRY', 'HOUSEKEEPING', 'CONSUMABLES'];

// --- MOCK DATA FOR B2B SYSTEM ---

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Mourad Hotelier', companyName: 'Hotel Africa Tunis', role: 'CLIENT', priceLevel: 'HOTEL' },
  { id: '2', name: 'Sami Factory', companyName: 'Carthage Cement', role: 'CLIENT', priceLevel: 'DISTRIBUTOR' },
  { id: '99', name: 'Admin Prodet', role: 'ADMIN', priceLevel: 'STANDARD' }
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-2024-001', clientId: '1', clientName: 'Hotel Africa', date: '2024-02-20', status: 'DELIVERED', items: [{ productName: 'PROLAV', quantity: 10 }, { productName: 'PRORINSE', quantity: 5 }], total: 950.000, type: 'ONLINE' },
  { id: 'ORD-2024-002', clientId: '1', clientName: 'Hotel Africa', date: '2024-02-25', status: 'PREPARING', items: [{ productName: 'PROKILL', quantity: 20 }], total: 590.000, type: 'ONLINE' },
  { id: 'ORD-2024-003', clientId: '2', clientName: 'Carthage Cement', date: '2024-02-26', status: 'PENDING', items: [], pdfUrl: 'order_ref_99.pdf', type: 'PDF_UPLOAD' },
];

// --- TRANSLATIONS ---
export const TRANSLATIONS = {
  FR: {
    nav: { home: "Accueil", catalog: "Produits", solutions: "Secteurs", equipment: "Équipements", services: "Services", contact: "Contact", quote: "Devis Gratuit", client_portal: "Espace Client", admin: "Admin", logistics: "Logistique" },
    hero: {
      badge: "La Norme d'Hygiène Professionnelle",
      title: "Précision & \nPropreté.",
      subtitle: "Solutions HACCP intégrées pour l'hôtellerie et l'industrie. Équipements de dosage, formation et produits certifiés.",
      cta_products: "Nos Solutions",
      cta_quote: "Demander Audit",
      exp: "Années d'Exp.",
      clients: "Partenaires B2B",
      origin: "Tunisien"
    },
    home: {
      expertise: "Notre Expertise",
      universes: "Univers d'Hygiène",
      universe_desc: "Protocoles de nettoyage spécialisés pour les besoins industriels.",
      bestsellers: "Meilleures Ventes",
      view_catalog: "Voir Tout Le Catalogue",
      about_title: "Ingénierie de l'Excellence",
      about_text: "PRODET est un leader de l'industrie chimique tunisienne. Au-delà des produits, nous offrons un écosystème complet : installation de pompes, formation du personnel et optimisation des coûts."
    },
    catalog: {
      title: "Catalogue Produits",
      subtitle: "Détergents haute performance et éco-responsables.",
      filter: { all: "Tous", kitchen: "Cuisine", laundry: "Buanderie", housekeeping: "Étage", consumables: "Conso." },
      view_specs: "Voir Produit",
      price: "TND",
      unit: "Unité",
      add_quote: "Ajouter au Devis"
    },
    product: {
      back: "Retour au Catalogue",
      dosage: "Dosage Recommandé",
      ph: "pH",
      appearance: "Aspect",
      density: "Densité",
      storage: "Stockage",
      surfaces: "Surfaces Compatibles",
      packaging: "Conditionnement",
      safety: "Sécurité & EPI",
      dilution: "Taux de Dilution",
      
      order: "Demander un Devis",
      add_list: "Ajouter à la liste d'achat",
      download_tds: "Fiche Technique",
      download_fds: "Fiche de Sécurité (FDS)",
      download_cat: "Catalogue Complet",
      
      advantages: "Avantages Clés",
      instructions: "Mode d'Emploi",
      composition: "Composition",
      specs: "Spécifications Techniques",
    },
    contact: {
      title: "Contact & Support",
      subtitle: "Commercial ou Technique, nous sommes là pour vous.",
      headquarters: "Siège Social",
      call: "Appelez-nous",
      hours: "Lun-Ven, 8h - 17h",
      email: "Email",
      form_title: "Envoyer une demande",
      form_name: "Nom Complet",
      form_company: "Société",
      form_email: "Adresse Email",
      form_msg: "Message",
      form_btn: "Envoyer",
      tab_sales: "Service Commercial",
      tab_tech: "Support Technique"
    },
    solutions: { title: "Solutions Par Secteur", subtitle: "Des packs sur-mesure pour chaque industrie.", learn_more: "Voir le Pack" },
    equipment: { title: "Écosystème Prodet", subtitle: "Systèmes de dosage et matériel professionnel en Comodat." },
    services: { title: "Pro-Academy & Services", subtitle: "Formation, Audit et Maintenance Préventive.", calc_title: "Calculateur d'Économies", calc_desc: "Estimez vos économies annuelles.", calc_spend: "Dépense Mensuelle (TND)", calc_result: "Économie Estimée / An", training_title: "Formation Certifiante", training_desc: "Formez vos équipes aux normes HACCP." }
  },
  EN: {
    nav: { home: "Home", catalog: "Products", solutions: "Sectors", equipment: "Equipment", services: "Services", contact: "Contact", quote: "Get Quote", client_portal: "Client Portal", admin: "Admin", logistics: "Logistics" },
    hero: { badge: "The Standard for Professional Hygiene", title: "Precision \nCleaning.", subtitle: "Integrated HACCP solutions for hotels and industry.", cta_products: "Our Solutions", cta_quote: "Request Audit", exp: "Years Exp.", clients: "B2B Partners", origin: "Tunisian" },
    home: { expertise: "Our Expertise", universes: "Hygiene Universes", universe_desc: "Specialized cleaning protocols.", bestsellers: "Best Sellers", view_catalog: "View Full Catalog", about_title: "Engineered for Excellence", about_text: "PRODET is a leader in the Tunisian chemical industry." },
    catalog: { title: "Product Catalog", subtitle: "High-performance detergents.", filter: { all: "All", kitchen: "Kitchen", laundry: "Laundry", housekeeping: "Housekeeping", consumables: "Consumables" }, view_specs: "View Product", price: "TND", unit: "Unit", add_quote: "Add to Quote" },
    product: { back: "Back to Products", dosage: "Recommended Dosage", ph: "pH", appearance: "Appearance", density: "Density", storage: "Storage", surfaces: "Compatible Surfaces", packaging: "Packaging", safety: "Safety & PPE", dilution: "Dilution Ratio", order: "Request Quote", add_list: "Add to Shopping List", download_tds: "Technical Data Sheet", download_fds: "Safety Data Sheet (SDS)", download_cat: "Full Catalog", advantages: "Key Advantages", instructions: "Instructions for Use", composition: "Composition", specs: "Technical Specifications" },
    contact: { title: "Contact & Support", subtitle: "Sales or Technical, we are here.", headquarters: "Headquarters", call: "Call Us", hours: "Mon-Fri, 8am - 5pm", email: "Email Support", form_title: "Send Inquiry", form_name: "Full Name", form_company: "Company", form_email: "Email", form_msg: "Message", form_btn: "Send", tab_sales: "Sales Department", tab_tech: "Technical Support" },
    solutions: { title: "Solutions by Sector", subtitle: "Tailored packages for every industry.", learn_more: "View Package" },
    equipment: { title: "Prodet Ecosystem", subtitle: "Dosing systems available on loan." },
    services: { title: "Pro-Academy & Services", subtitle: "Training, Auditing, and Maintenance.", calc_title: "Savings Calculator", calc_desc: "Estimate annual savings.", calc_spend: "Monthly Spend (TND)", calc_result: "Est. Savings / Year", training_title: "Certified Training", training_desc: "HACCP training." }
  },
  AR: {
    nav: { home: "الرئيسية", catalog: "المنتجات", solutions: "القطاعات", equipment: "المعدات", services: "الخدمات", contact: "اتصل بنا", quote: "طلب عرض سعر", client_portal: "فضاء الحرفاء", admin: "إدارة", logistics: "لوجستيك" },
    hero: { badge: "المعيار للنظافة المهنية", title: "دقة \nونظافة.", subtitle: "حلول HACCP متكاملة للفنادق والصناعة.", cta_products: "حلولنا", cta_quote: "طلب تدقيق", exp: "سنوات خبرة", clients: "شريك مهني", origin: "تونسي" },
    home: { expertise: "خبرتنا", universes: "عالم النظافة", universe_desc: "بروتوكولات تنظيف متخصصة.", bestsellers: "الأكثر مبيعاً", view_catalog: "عرض الكتالوج الكامل", about_title: "هندسة التميز", about_text: "PRODET هي شركة رائدة في الصناعة الكيميائية التونسية." },
    catalog: { title: "كتالوج المنتجات", subtitle: "منظفات عالية الأداء.", filter: { all: "الكل", kitchen: "مطبخ", laundry: "مصبنة", housekeeping: "غرف", consumables: "مستهلكات" }, view_specs: "عرض المنتج", price: "د.ت", unit: "الوحدة", add_quote: "إضافة للعرض" },
    product: { back: "عودة للمنتجات", dosage: "الجرعة الموصى بها", ph: "الرقم الهيدروجيني", appearance: "المظهر", density: "الكثافة", storage: "التخزين", surfaces: "الأسطح المتوافقة", packaging: "التعبئة", safety: "السلامة", dilution: "نسبة التخفيف", order: "طلب عرض سعر", add_list: "إضافة لقائمة الشراء", download_tds: "ورقة تقنية", download_fds: "ورقة بيانات السلامة", download_cat: "الكتالوج الكامل", advantages: "المزايا الرئيسية", instructions: "طريقة الاستعمال", composition: "التركيبة", specs: "المواصفات التقنية" },
    contact: { title: "اتصال ودعم", subtitle: "تجاري أو تقني، نحن هنا.", headquarters: "المقر الرئيسي", call: "اتصل بنا", hours: "الاثنين - الجمعة، 8 ص - 5 م", email: "البريد الإلكتروني", form_title: "إرسال استفسار", form_name: "الاسم الكامل", form_company: "الشركة", form_email: "البريد الإلكتروني", form_msg: "الرسالة", form_btn: "إرسال", tab_sales: "القسم التجاري", tab_tech: "الدعم التقني" },
    solutions: { title: "حلول حسب القطاع", subtitle: "باقات مخصصة.", learn_more: "عرض الباقة" },
    equipment: { title: "نظام بروديت", subtitle: "أنظمة الجرعات للإعارة." },
    services: { title: "أكاديمية بروديت", subtitle: "التدريب والتدقيق.", calc_title: "حاسبة التوفير", calc_desc: "قدر مدخراتك.", calc_spend: "الإنفاق الشهري (د.ت)", calc_result: "التوفير المقدر / السنة", training_title: "تدريب معتمد", training_desc: "معايير HACCP." }
  }
};

export const CATEGORY_DETAILS = {
  KITCHEN: {
    label: { fr: 'Cuisine & Plonge', en: 'Kitchen & Dishwashing', ar: 'المطبخ وغسيل الأواني' },
    title: { fr: 'Hygiène Cuisine Pro', en: 'Professional Kitchen', ar: 'نظافة المطبخ المهني' },
    description: { fr: 'Solutions HACCP pour le dégraissage et la désinfection.', en: 'HACCP solutions for degreasing and disinfection.', ar: 'حلول HACCP لإزالة الدهون والتعقيم.' },
    image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1600'
  },
  LAUNDRY: {
    label: { fr: 'Buanderie & Linge', en: 'Laundry & Linen', ar: 'المصبنة والمنسوجات' },
    title: { fr: 'Entretien du Linge', en: 'Laundry Care', ar: 'العناية بالغسيل' },
    description: { fr: 'Détergents et adoucissants avancés pour hôtels.', en: 'Advanced detergents and softeners for hotels.', ar: 'منظفات ومنعمات متطورة للفنادق.' },
    image: 'https://images.unsplash.com/photo-1517677208171-0bc5e2591868?auto=format&fit=crop&q=80&w=1600'
  },
  HOUSEKEEPING: {
    label: { fr: 'Service Étage', en: 'Housekeeping', ar: 'خدمة الغرف' },
    title: { fr: 'Surfaces & Sols', en: 'Surfaces & Floors', ar: 'الأسطح والأرضيات' },
    description: { fr: 'Nettoyage complet des chambres et espaces communs.', en: 'Complete cleaning for rooms and common areas.', ar: 'تنظيف كامل للغرف والمساحات المشتركة.' },
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1600'
  },
  CONSUMABLES: {
    label: { fr: 'Consommables', en: 'Consumables', ar: 'المستهلكات' },
    title: { fr: 'Équipements & Accessoires', en: 'Equipment & Accessories', ar: 'المعدات والاكسسوارات' },
    description: { fr: 'Outils essentiels : sacs, gants, papier.', en: 'Essential tools: bags, gloves, paper.', ar: 'أدوات أساسية: أكياس، قفازات، ورق.' },
    image: 'https://images.unsplash.com/photo-1624823183488-29472392dfb6?auto=format&fit=crop&q=80&w=1600'
  }
};

export const PRODUCTS: Product[] = [
  // --- PLONGE / CUISINE (KITCHEN) ---
  {
    id: 'k-01',
    name: 'PROLAV',
    category: 'KITCHEN',
    price: 65.500,
    image: 'https://images.unsplash.com/photo-1585832770485-e68a5dbfad52?auto=format&fit=crop&q=80&w=800',
    tagline: { fr: 'Détergent Lave-Vaisselle', en: 'Dishwashing Liquid', ar: 'سائل غسيل الأواني' },
    description: { 
      fr: 'Détergent liquide pour le lavage automatique de la vaisselle en machine industrielle. Ne mousse pas et permet une propreté bactériologique.',
      en: 'Liquid detergent for automatic dishwashing in industrial machines. Non-foaming and ensures bacteriological cleanliness.',
      ar: 'منظف سائل للغسيل الأوتوماتيكي للأطباق في الآلات الصناعية. لا يسبب رغوة ويضمن نظافة بكتريولوجية.'
    },
    packaging: ['20kg', '200kg'],
    ph: '12.5',
    density: '1.2',
    appearance: { fr: 'Liquide Ambré', en: 'Amber Liquid', ar: 'سائل عنبري' },
    storage: { fr: 'Endroit frais et sec (5-30°C)', en: 'Cool dry place (5-30°C)', ar: 'مكان بارد وجاف (5-30 درجة)' },
    surfaces: { fr: ['Vaisselle', 'Porcelaine', 'Verre'], en: ['Dishes', 'Porcelain', 'Glass'], ar: ['أواني', 'خزف', 'زجاج'] },
    safetyIcons: ['GLOVES', 'GLASSES'],
    dilution: { fr: '0.1% - 0.3%', en: '0.1% - 0.3%', ar: '0.1% - 0.3%' },
    instructions: { 
      fr: 'Injection automatique via pompe doseuse Prodet. Réglage : 1 à 3g par litre.',
      en: 'Automatic injection via Prodet dosing pump. Setting: 1 to 3g per liter.',
      ar: 'حقن تلقائي عبر مضخة بروديت. الإعداد: 1 إلى 3 غرام لكل لتر.'
    },
    features: [
      { fr: 'Non Moussant', en: 'Non Foaming', ar: 'غير رغوي' },
      { fr: 'Propreté Bactériologique', en: 'Bacteriological Cleanliness', ar: 'نظافة بكتريولوجية' },
      { fr: 'Protection Machine', en: 'Machine Protection', ar: 'حماية الآلة' }
    ],
    specs: {
      dosage: { fr: '1 à 3 ml / Litre d\'eau', en: '1 to 3 ml / Liter of water', ar: '1 إلى 3 مل / لتر من الماء' },
      composition: { fr: 'Agents alcalins, séquestrants', en: 'Alkaline agents, sequestrants', ar: 'عوامل قلوية، مواد احتجاز' }
    }
  },
  {
    id: 'k-03',
    name: 'PROKILL',
    category: 'KITCHEN',
    price: 29.500,
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=800',
    tagline: { fr: 'Détergent Désinfectant Concentré', en: 'Concentrated Disinfectant', ar: 'منظف مطهر مركز' },
    description: {
      fr: 'Excellente action détergente. Bactéricide fongicide de surfaces, appareils et matériaux. Nettoie, désinfecte et désodorise.',
      en: 'Excellent detergent action. Bactericidal and fungicidal for surfaces and equipment. Cleans, disinfects, and deodorizes.',
      ar: 'عمل تنظيف ممتاز. مبيد للبكتيريا والفطريات للأسطح والمعدات. ينظف ويطهر ويزيل الروائح.'
    },
    packaging: ['5kg', '10kg', '20kg'],
    ph: '11.5',
    density: '1.01',
    appearance: { fr: 'Liquide Rougeâtre', en: 'Reddish Liquid', ar: 'سائل محمر' },
    storage: { fr: 'Endroit frais et sec', en: 'Cool dry place', ar: 'مكان بارد وجاف' },
    surfaces: { fr: ['Inox', 'Carrelage', 'Plans de travail'], en: ['Steel', 'Tiles', 'Worktops'], ar: ['فولاذ', 'بلاط', 'أسطح عمل'] },
    safetyIcons: ['GLOVES'],
    dilution: { fr: '3% - 5%', en: '3% - 5%', ar: '3% - 5%' },
    instructions: {
      fr: 'Vaporiser la solution diluée à 3-5% sur la surface. Laisser agir 5 min puis rincer à l\'eau claire.',
      en: 'Spray 3-5% diluted solution on surface. Leave for 5 min then rinse with clear water.',
      ar: 'رش المحلول المخفف بنسبة 3-5% على السطح. اتركه لمدة 5 دقائق ثم اشطف بالماء الصافي.'
    },
    features: [
      { fr: 'Bactéricide', en: 'Bactericidal', ar: 'مبيد للبكتيريا' },
      { fr: 'Fongicide', en: 'Fungicidal', ar: 'مبيد للفطريات' },
      { fr: 'Alimentaire', en: 'Food Safe', ar: 'آمن غذائياً' }
    ],
    specs: {
       dosage: { fr: '3 à 5 % (300 à 500 ml / 10L)', en: '3 to 5 %', ar: '3 إلى 5 %' },
    }
  },
  {
    id: 'k-04',
    name: 'PROFOUR',
    category: 'KITCHEN',
    price: 28.500,
    image: 'https://images.unsplash.com/photo-1585670149967-b4f4da66dd53?auto=format&fit=crop&q=80&w=800',
    tagline: { fr: 'Dégraissant Fours & Grills', en: 'Oven & Grill Degreaser', ar: 'مزيل دهون الأفران والشوايات' },
    description: {
      fr: 'Alcalin très puissant. Pénètre, décolle et disperse les souillures grasses et carbonisées des fours, grills, friteuses.',
      en: 'Very powerful alkaline. Penetrates and removes carbonized grease from ovens, grills, fryers.',
      ar: 'قلوي قوي جداً. يخترق ويزيل الأوساخ الدهنية والمتفحمة من الأفران والشوايات والمقالي.'
    },
    packaging: ['5kg', '4x5kg'],
    ph: '13.6',
    density: '1.04',
    appearance: { fr: 'Liquide Jaunâtre', en: 'Yellowish Liquid', ar: 'سائل مصفر' },
    storage: { fr: 'Tenir fermé', en: 'Keep closed', ar: 'يحفظ مغلقاً' },
    surfaces: { fr: ['Fours', 'Grills', 'Friteuses'], en: ['Ovens', 'Grills', 'Fryers'], ar: ['أفران', 'شوايات', 'مقالي'] },
    safetyIcons: ['GLOVES', 'GLASSES', 'MASK'],
    dilution: { fr: 'Pur ou 50%', en: 'Pure or 50%', ar: 'نقي أو 50%' },
    instructions: {
      fr: 'Chauffer le four à 50-60°C. Vaporiser pur. Laisser agir 10-15 min. Rincer abondamment.',
      en: 'Heat oven to 50-60°C. Spray pure. Leave 10-15 min. Rinse thoroughly.',
      ar: 'سخن الفرن إلى 50-60 درجة. رش نقياً. اترك 10-15 دقيقة. اشطف جيداً.'
    },
    features: [
      { fr: 'Hyper Puissant', en: 'Heavy Duty', ar: 'فائق القوة' },
      { fr: 'Action Immédiate', en: 'Immediate Action', ar: 'مفعول فوري' }
    ],
    specs: {
        dosage: { fr: 'Pur ou dilué à 50%', en: 'Pure or 50% diluted', ar: 'نقي أو مخفف بنسبة 50%' }
    }
  },
   {
    id: 'h-01',
    name: 'PROGERME',
    category: 'HOUSEKEEPING',
    price: 59.500,
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=800',
    tagline: { fr: 'Nettoyant Désinfectant', en: 'Disinfectant Cleaner', ar: 'منظف مطهر' },
    description: {
      fr: 'Nettoyant désinfectant toutes surfaces (sols, vitres, bureaux). Assure une propreté hygiénique avec une odeur agréable.',
      en: 'Disinfectant cleaner for all surfaces (floors, glass, desks). Ensures hygienic cleanliness with a pleasant scent.',
      ar: 'منظف مطهر لجميع الأسطح (أرضيات، زجاج، مكاتب). يضمن نظافة صحية برائحة طيبة.'
    },
    packaging: ['5kg', '20kg'],
    ph: '7.5',
    density: '1.005',
    appearance: { fr: 'Liquide Vert', en: 'Green Liquid', ar: 'سائل أخضر' },
    storage: { fr: 'Endroit frais', en: 'Cool place', ar: 'مكان بارد' },
    surfaces: { fr: ['Carrelage', 'Marbre', 'Vitre'], en: ['Tiles', 'Marble', 'Glass'], ar: ['بلاط', 'رخام', 'زجاج'] },
    safetyIcons: ['GLOVES'],
    dilution: { fr: '1% - 2%', en: '1% - 2%', ar: '1% - 2%' },
    instructions: {
      fr: 'Diluer 100-200ml pour 10L d\'eau. Appliquer avec une serpillière ou autolaveuse.',
      en: 'Dilute 100-200ml per 10L water. Apply with mop or scrubber.',
      ar: 'خفف 100-200 مل لكل 10 لتر ماء. ضع باستخدام ممسحة أو غسالة أوتوماتيكية.'
    },
    features: [
      { fr: 'Parfumé', en: 'Scented', ar: 'معطر' },
      { fr: 'Toutes Surfaces', en: 'All Surfaces', ar: 'جميع الأسطح' }
    ],
    specs: {
        dosage: { fr: '2% (200 ml / 10L)', en: '2%', ar: '2%' }
    }
  },
  {
    id: 'h-02',
    name: 'PROSTAR',
    category: 'HOUSEKEEPING',
    price: 26.500,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800',
    tagline: { fr: 'Nettoyant Sanitaire & Alu', en: 'Sanitary & Alu Cleaner', ar: 'منظف صحي وألمنيوم' },
    description: {
      fr: 'Nettoie, détartre et désinfecte les sanitaires et l\'aluminium. Enlève les dépôts minéraux et redonne de l\'éclat.',
      en: 'Cleans, descales, and disinfects sanitary ware and aluminum. Removes mineral deposits and restores shine.',
      ar: 'ينظف ويزيل الترسبات ويطهر الأدوات الصحية والألمنيوم. يزيل الرواسب المعدنية ويعيد اللمعان.'
    },
    packaging: ['750ml', '5kg'],
    ph: '3.2',
    density: '1.13',
    appearance: { fr: 'Liquide Jaune', en: 'Yellow Liquid', ar: 'سائل أصفر' },
    storage: { fr: 'Endroit sec', en: 'Dry place', ar: 'مكان جاف' },
    surfaces: { fr: ['Céramique', 'Alu', 'Robinetterie'], en: ['Ceramic', 'Alu', 'Taps'], ar: ['سيراميك', 'ألمنيوم', 'صنابير'] },
    safetyIcons: ['GLOVES', 'GLASSES'],
    dilution: { fr: '30% - 50%', en: '30% - 50%', ar: '30% - 50%' },
    instructions: {
      fr: 'Appliquer sur la surface. Laisser agir quelques minutes. Frotter et rincer.',
      en: 'Apply to surface. Wait a few minutes. Scrub and rinse.',
      ar: 'ضع على السطح. انتظر بضع دقائق. افرك واشطف.'
    },
    features: [
      { fr: 'Détartrant', en: 'Descaling', ar: 'مزيل للترسبات' },
      { fr: 'Non Corrosif', en: 'Non-Corrosive', ar: 'غير مسبب للتآكل' }
    ],
    specs: {
      composition: { fr: 'Acide citrique, tensio-actifs', en: 'Citric acid, surfactants', ar: 'حامض الستريك، مواد خافضة للتوتر السطحي' },
      dosage: { fr: '30 à 50%', en: '30 to 50%', ar: '30 إلى 50%' }
    }
  }
];

export const NAV_LINKS = [
  { label: 'nav.home', value: 'HOME' },
  { label: 'nav.catalog', value: 'CATALOG' },
  { label: 'nav.solutions', value: 'SOLUTIONS' },
  { label: 'nav.logistics', value: 'LOGISTICS' }, 
  { label: 'nav.contact', value: 'CONTACT' },
];

export const INDUSTRIES: Industry[] = [
    {
      id: 'hotel',
      title: { fr: 'Hôtellerie', en: 'Hospitality', ar: 'الفندقة' },
      subtitle: { fr: 'Expérience 5 Étoiles', en: '5-Star Experience', ar: 'تجربة 5 نجوم' },
      description: { fr: 'De l\'accueil à la chambre, garantissez une propreté irréprochable.', en: 'From lobby to room, ensure impeccable cleanliness.', ar: 'من الاستقبال إلى الغرفة، اضمن نظافة لا تشوبها شائبة.' },
      icon: Building,
      color: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      packages: [
        { name: { fr: 'Pack Lobby Scent', en: 'Lobby Scent Pack', ar: 'باقة رائحة اللوبي' }, items: [{ fr: 'Diffuseurs d\'ambiance', en: 'Diffusers', ar: 'ناشرات العطر' }, { fr: 'Nettoyant vitres antistatique', en: 'Anti-static glass cleaner', ar: 'منظف زجاج مضاد للكهرباء الساكنة' }] },
        { name: { fr: 'Pack Linge Doux', en: 'Soft Linen Pack', ar: 'باقة الغسيل الناعم' }, items: [{ fr: 'Adoucissant Premium', en: 'Premium Softener', ar: 'منعم ممتاز' }, { fr: 'Blanchissant Basse Temp.', en: 'Low Temp Whitener', ar: 'مبيض حرارة منخفضة' }] }
      ]
    },
    {
      id: 'restaurant',
      title: { fr: 'Restauration', en: 'Food Service', ar: 'المطاعم' },
      subtitle: { fr: 'The Grease Killer', en: 'The Grease Killer', ar: 'قاهر الدهون' },
      description: { fr: 'Solutions HACCP pour cuisines industrielles et salles de restaurant.', en: 'HACCP solutions for industrial kitchens and dining areas.', ar: 'حلول HACCP للمطابخ الصناعية وقاعات الطعام.' },
      icon: ChefHat,
      color: 'bg-orange-600',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=1600',
      packages: [
        { name: { fr: 'Pack Dégraissage Extrême', en: 'Extreme Degreasing', ar: 'إزالة الدهون القصوى' }, items: [{ fr: 'Pastilles Friteuse', en: 'Fryer Tablets', ar: 'أقراص المقلاة' }, { fr: 'Décapant Fours', en: 'Oven Stripper', ar: 'مزيل دهون الأفران' }] },
        { name: { fr: 'Pack Hygiène Sols', en: 'Floor Hygiene', ar: 'نظافة الأرضيات' }, items: [{ fr: 'Dégraissant Enzymatique', en: 'Enzymatic Degreaser', ar: 'مزيل دهون إنزيمي' }, { fr: 'Antidérapant', en: 'Anti-slip', ar: 'مانع للانزلاق' }] }
      ]
    },
    {
      id: 'industry',
      title: { fr: 'Industrie', en: 'Industry', ar: 'الصناعة' },
      subtitle: { fr: 'Heavy Duty', en: 'Heavy Duty', ar: 'المهام الشاقة' },
      description: { fr: 'Produits robustes pour usines, ateliers et grands espaces.', en: 'Robust products for factories, workshops, and large spaces.', ar: 'منتجات قوية للمصانع والورش والمساحات الكبيرة.' },
      icon: Factory,
      color: 'bg-slate-700',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      packages: [
        { name: { fr: 'Pack Atelier', en: 'Workshop Pack', ar: 'باقة الورشة' }, items: [{ fr: 'Savon Micro-billes', en: 'Grit Soap', ar: 'صابون حبيبات' }, { fr: 'Dégraissant Mécanique', en: 'Mechanical Degreaser', ar: 'مزيل دهون ميكانيكي' }] }
      ]
    },
     {
      id: 'health',
      title: { fr: 'Santé', en: 'Healthcare', ar: 'الصحة' },
      subtitle: { fr: 'Sécurité Clinique', en: 'Clinical Safety', ar: 'السلامة السريرية' },
      description: { fr: 'Désinfection hospitalière de haut niveau.', en: 'High-level hospital disinfection.', ar: 'تطهير المستشفيات عالي المستوى.' },
      icon: HeartPulse,
      color: 'bg-teal-600',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      packages: [
        { name: { fr: 'Pack Bloc Opératoire', en: 'OR Pack', ar: 'باقة غرفة العمليات' }, items: [{ fr: 'Désinfectant Surface Haute', en: 'High Surface Disinfectant', ar: 'مطهر أسطح عالي' }] }
      ]
    }
];

export const EQUIPMENT_LIST: EquipmentItem[] = [
    {
        id: 'eq-01',
        name: { fr: 'Pompes Doseuses Lave-Vaisselle', en: 'Dishwasher Dosing Pumps', ar: 'مضخات جرعات غسالة الصحون' },
        description: { fr: 'Système automatique péristaltique. Garantit le dosage exact de détergent et produit de rinçage.', en: 'Automatic peristaltic system. Ensures exact dosage of detergent and rinse aid.', ar: 'نظام تمعجي تلقائي. يضمن الجرعة الدقيقة من المنظف وسائل الشطف.' },
        image: 'https://images.unsplash.com/photo-1585435465945-bef5a93f30a6?auto=format&fit=crop&q=80&w=800', 
        features: [{ fr: 'Économie 30%', en: '30% Savings', ar: 'توفير 30%' }, { fr: 'Maintenance Incluse', en: 'Maintenance Included', ar: 'صيانة مشمولة' }]
    },
    {
        id: 'eq-02',
        name: { fr: 'Centrales de Dilution', en: 'Dilution Stations', ar: 'محطات التخفيف' },
        description: { fr: 'Fini le dosage manuel. Remplissez vos vaporisateurs avec la concentration parfaite automatiquement.', en: 'No more manual dosing. Fill your spray bottles with perfect concentration automatically.', ar: 'لا مزيد من الجرعات اليدوية. املأ بخاخاتك بالتركيز المثالي تلقائيًا.' },
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800',
        features: [{ fr: 'Sécurité Staff', en: 'Staff Safety', ar: 'سلامة الموظفين' }, { fr: 'Zéro Gaspillage', en: 'Zero Waste', ar: 'صفر نفايات' }]
    }
];
