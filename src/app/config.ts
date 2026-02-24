export const SITE_CONFIG = {
  site: {
    name: "مركز الرشود",
    specialty: "صيانة السيارات الألمانية والأوروبية",
    location: {
      city: "الرياض",
      area: "صناعية أم الحمام",
      shop_number: "ورشة رقم 9",
      fullAddress: "الرياض – صناعية أم الحمام – ورشة رقم 9",
      coordinates: { lat: 24.672025, lng: 46.643355 } // Approximate coordinates
    },
    phone: "0506535392",
    whatsapp: "0506535392"
  },
  nav: [
    { "label": "الرئيسية", "path": "/" },
    { "label": "من نحن", "path": "/من-نحن" },
    { "label": "الخدمات", "path": "/الخدمات" },
    {
      "label": "السيارات الألمانية",
      "path": "/german-cars",
      "children": [
        { "label": "بي-ام-دبليو", "path": "/german-cars/bmw" },
        { "label": "مرسيدس", "path": "/german-cars/mercedes-benz" },
        { "label": "أودي", "path": "/german-cars/audi" },
        { "label": "بورش", "path": "/german-cars/porsche" },
        { "label": "فولكسفاجن", "path": "/german-cars/volkswagen" },
        { "label": "ميني", "path": "/german-cars/mini" },
        { "label": "أوبل", "path": "/german-cars/opel" },
        { "label": "سمارت", "path": "/german-cars/smart" },
        { "label": "مايباخ", "path": "/german-cars/maybach" }
      ]
    },
    {
      "label": "السيارات الأوروبية",
      "path": "/european-cars",
      "children": [
        { "label": "فولفو", "path": "/european-cars/volvo" },
        { "label": "بولستار", "path": "/european-cars/polestar" },
        { "label": "لاندروفر", "path": "/european-cars/land-rover" },
        { "label": "رنج-روفر", "path": "/european-cars/range-rover" },
        { "label": "جاكوار", "path": "/european-cars/jaguar" },
        { "label": "بنتلي", "path": "/european-cars/bentley" },
        { "label": "رولز-رويس", "path": "/european-cars/rolls-royce" },
        { "label": "أستون-مارتن", "path": "/european-cars/aston-martin" },
        { "label": "لوتس", "path": "/european-cars/lotus" },
        { "label": "مكلارين", "path": "/european-cars/mclaren" },
        { "label": "فيراري", "path": "/european-cars/ferrari" },
        { "label": "لامبورغيني", "path": "/european-cars/lamborghini" },
        { "label": "مازيراتي", "path": "/european-cars/maserati" },
        { "label": "ألفا-روميو", "path": "/european-cars/alfa-romeo" },
        { "label": "فيات", "path": "/european-cars/fiat" },
        { "label": "بيجو", "path": "/european-cars/peugeot" },
        { "label": "ستروين", "path": "/european-cars/citroen" },
        { "label": "رينو", "path": "/european-cars/renault" },
        { "label": "دي-اس", "path": "/european-cars/ds" },
        { "label": "سيات", "path": "/european-cars/seat" },
        { "label": "سكودا", "path": "/european-cars/skoda" },
        { "label": "كوبرا", "path": "/european-cars/cupra" }
      ]
    },
    { "label": "احجز موعد", "path": "/احجز-موعد" },
    { "label": "الأسئلة الشائعة", "path": "/الأسئلة-الشائعة" },
    { "label": "تواصل معنا", "path": "/تواصل-معنا" }
  ],
  routes: {
    core_pages: [
      { "key": "home", "path": "/" },
      { "key": "about", "path": "/من-نحن" },
      { "key": "services", "path": "/الخدمات" },
      { "key": "booking", "path": "/احجز-موعد" },
      { "key": "faq", "path": "/الأسئلة-الشائعة" },
      { "key": "contact", "path": "/تواصل-معنا" },
      { "key": "privacy", "path": "/privacy-policy" }
    ],
    brand_indexes: [
      { "key": "german_index", "path": "/german-cars" },
      { "key": "european_index", "path": "/european-cars" }
    ],
    german_brands: [
      { "brand": "BMW", "label": "بي-ام-دبليو", "path": "/german-cars/bmw", "slug": "bmw" },
      { "brand": "Mercedes-Benz", "label": "مرسيدس", "path": "/german-cars/mercedes-benz", "slug": "mercedes-benz" },
      { "brand": "Audi", "label": "أودي", "path": "/german-cars/audi", "slug": "audi" },
      { "brand": "Porsche", "label": "بورش", "path": "/german-cars/porsche", "slug": "porsche" },
      { "brand": "Volkswagen", "label": "فولكسفاجن", "path": "/german-cars/volkswagen", "slug": "volkswagen" },
      { "brand": "MINI", "label": "ميني", "path": "/german-cars/mini", "slug": "mini" },
      { "brand": "Opel", "label": "أوبل", "path": "/german-cars/opel", "slug": "opel" },
      { "brand": "Smart", "label": "سمارت", "path": "/german-cars/smart", "slug": "smart" },
      { "brand": "Maybach", "label": "مايباخ", "path": "/german-cars/maybach", "slug": "maybach" }
    ],
    european_brands: [
      { "brand": "Volvo", "label": "فولفو", "path": "/european-cars/volvo", "slug": "volvo" },
      { "brand": "Polestar", "label": "بولستار", "path": "/european-cars/polestar", "slug": "polestar" },
      { "brand": "Land Rover", "label": "لاندروفر", "path": "/european-cars/land-rover", "slug": "land-rover" },
      { "brand": "Range Rover", "label": "رنج-روفر", "path": "/european-cars/range-rover", "slug": "range-rover" },
      { "brand": "Jaguar", "label": "جاكوار", "path": "/european-cars/jaguar", "slug": "jaguar" },
      { "brand": "Bentley", "label": "بنتلي", "path": "/european-cars/bentley", "slug": "bentley" },
      { "brand": "Rolls-Royce", "label": "رولز-رويس", "path": "/european-cars/rolls-royce", "slug": "rolls-royce" },
      { "brand": "Aston Martin", "label": "أستون-مارتن", "path": "/european-cars/aston-martin", "slug": "aston-martin" },
      { "brand": "Lotus", "label": "لوتس", "path": "/european-cars/lotus", "slug": "lotus" },
      { "brand": "McLaren", "label": "مكلارين", "path": "/european-cars/mclaren", "slug": "mclaren" },
      { "brand": "Ferrari", "label": "فيراري", "path": "/european-cars/ferrari", "slug": "ferrari" },
      { "brand": "Lamborghini", "label": "لامبورغيني", "path": "/european-cars/lamborghini", "slug": "lamborghini" },
      { "brand": "Maserati", "label": "مازيراتي", "path": "/european-cars/maserati", "slug": "maserati" },
      { "brand": "Alfa Romeo", "label": "ألفا-روميو", "path": "/european-cars/alfa-romeo", "slug": "alfa-romeo" },
      { "brand": "Fiat", "label": "فيات", "path": "/european-cars/fiat", "slug": "fiat" },
      { "brand": "Peugeot", "label": "بيجو", "path": "/european-cars/peugeot", "slug": "peugeot" },
      { "brand": "Citroën", "label": "ستروين", "path": "/european-cars/citroen", "slug": "citroen" },
      { "brand": "Renault", "label": "رينو", "path": "/european-cars/renault", "slug": "renault" },
      { "brand": "DS", "label": "دي-اس", "path": "/european-cars/ds", "slug": "ds" },
      { "brand": "SEAT", "label": "سيات", "path": "/european-cars/seat", "slug": "seat" },
      { "brand": "Škoda", "label": "سكودا", "path": "/european-cars/skoda", "slug": "skoda" },
      { "brand": "CUPRA", "label": "كوبرا", "path": "/european-cars/cupra", "slug": "cupra" }
    ]
  },
  footer: {
    title: "مركز الرشود لصيانة السيارات الألمانية والأوروبية",
    line1: "الرياض – صناعية أم الحمام – ورشة رقم 9",
    line2: "اتصال/واتساب: 0506535392",
    quick_links: [
      "/",
      "/الخدمات",
      "/german-cars",
      "/european-cars",
      "/احجز-موعد",
      "/تواصل-معنا"
    ],
    legal_links: [
        { "label": "سياسة الخصوصية", "path": "/privacy-policy" }
    ]
  }
};

export const ALL_BRANDS = [...SITE_CONFIG.routes.german_brands, ...SITE_CONFIG.routes.european_brands];
