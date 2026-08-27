import type { Locale, Localized } from "@/lib/types";
import { routes } from "@/lib/routes";

export interface NavLink {
  label: Localized;
  href: (l: Locale) => string;
}

export interface MenuColumn {
  title: Localized;
  items: NavLink[];
}

export interface MegaMenu {
  columns: MenuColumn[];
  shot: Localized;
  feature: Localized;
  featureHref: (l: Locale) => string;
}

/* ==========================================================================
   Primary navigation
   ========================================================================== */

export const PRIMARY_NAV: {
  id: string;
  label: Localized;
  href: (l: Locale) => string;
  menu?: string;
}[] = [
  {
    id: "new",
    label: { en: "New Arrivals", ar: "وصل حديثاً" },
    href: (l) => routes.newArrivals(l),
  },
  {
    id: "lighting",
    label: { en: "Lighting", ar: "الإضاءة" },
    href: (l) => routes.lighting(l),
    menu: "lighting",
  },
  {
    id: "furniture",
    label: { en: "Furniture", ar: "الأثاث" },
    href: (l) => routes.furniture(l),
    menu: "furniture",
  },
  {
    id: "collections",
    label: { en: "Collections", ar: "المجموعات" },
    href: (l) => routes.collections(l),
    menu: "collections",
  },
  {
    id: "rooms",
    label: { en: "Rooms", ar: "المساحات" },
    href: (l) => routes.rooms(l),
    menu: "rooms",
  },
  {
    id: "custom",
    label: { en: "Custom & Projects", ar: "التصميم الخاص" },
    href: (l) => routes.custom(l),
  },
  {
    id: "journal",
    label: { en: "Journal", ar: "المجلة" },
    href: (l) => routes.journal(l),
  },
  {
    id: "about",
    label: { en: "About Thurayyā", ar: "عن ثريا" },
    href: (l) => routes.about(l),
  },
];

/* ==========================================================================
   Mega menus
   ========================================================================== */

const lightingCategory = (slug: string, en: string, ar: string): NavLink => ({
  label: { en, ar },
  href: (l) => routes.lighting(l, slug),
});

const furnitureCategory = (slug: string, en: string, ar: string): NavLink => ({
  label: { en, ar },
  href: (l) => routes.furniture(l, slug),
});

export const MEGA_MENUS: Record<string, MegaMenu> = {
  lighting: {
    columns: [
      {
        title: { en: "Category", ar: "الفئة" },
        items: [
          lightingCategory("chandeliers", "Chandeliers", "ثريات"),
          lightingCategory("pendant-lights", "Pendant Lights", "إضاءة معلقة"),
          lightingCategory("ceiling-lights", "Ceiling Lights", "إضاءة سقف"),
          lightingCategory("wall-lights", "Wall Lights", "إضاءة حائط"),
          lightingCategory("floor-lamps", "Floor Lamps", "أباجورات أرضية"),
          lightingCategory("table-lamps", "Table Lamps", "أباجورات طاولة"),
          lightingCategory("outdoor-lighting", "Outdoor Lighting", "إضاءة خارجية"),
          lightingCategory("smart-lighting", "Smart Lighting", "إضاءة ذكية"),
        ],
      },
      {
        title: { en: "Shop by", ar: "تسوق حسب" },
        items: [
          { label: { en: "Material", ar: "المادة" }, href: (l) => `${routes.lighting(l)}?open=material` },
          { label: { en: "Finish", ar: "التشطيب" }, href: (l) => `${routes.lighting(l)}?open=finish` },
          { label: { en: "Room", ar: "الغرفة" }, href: (l) => routes.rooms(l) },
          { label: { en: "Collection", ar: "المجموعة" }, href: (l) => routes.collections(l) },
          { label: { en: "Size", ar: "المقاس" }, href: (l) => `${routes.lighting(l)}?open=diameter` },
          { label: { en: "Price", ar: "السعر" }, href: (l) => `${routes.lighting(l)}?open=price` },
        ],
      },
      {
        title: { en: "Guides", ar: "أدلة" },
        items: [
          { label: { en: "Layering Light", ar: "طبقات الإضاءة" }, href: (l) => routes.post(l, "layering-light") },
          {
            label: { en: "Choosing a Chandelier", ar: "اختيار الثريا" },
            href: (l) => routes.post(l, "choosing-a-chandelier-for-your-dining-room"),
          },
          { label: { en: "Installation Support", ar: "دعم التركيب" }, href: (l) => routes.support(l, "installation") },
          { label: { en: "Bulbs & Accessories", ar: "اللمبات والإكسسوارات" }, href: (l) => routes.lighting(l, "accessories") },
          { label: { en: "Shop All Lighting", ar: "كل الإضاءة" }, href: (l) => routes.lighting(l) },
        ],
      },
    ],
    shot: { en: "chandelier detail — brass + alabaster", ar: "تفصيل ثريا — نحاس وألاباستر" },
    feature: {
      en: "The Celestial Collection — newly released",
      ar: "مجموعة سيليستيال — إصدار جديد",
    },
    featureHref: (l) => routes.collection(l, "celestial"),
  },

  furniture: {
    columns: [
      {
        title: { en: "Room", ar: "الغرفة" },
        items: [
          { label: { en: "Living Room", ar: "غرفة المعيشة" }, href: (l) => routes.room(l, "living-room") },
          { label: { en: "Dining Room", ar: "غرفة الطعام" }, href: (l) => routes.room(l, "dining-room") },
          { label: { en: "Bedroom", ar: "غرفة النوم" }, href: (l) => routes.room(l, "bedroom") },
          { label: { en: "Entrance & Hallway", ar: "المدخل والممر" }, href: (l) => routes.room(l, "entrance-hallway") },
          { label: { en: "Garden & Terrace", ar: "الحديقة والتراس" }, href: (l) => routes.room(l, "garden-terrace") },
        ],
      },
      {
        title: { en: "Category", ar: "الفئة" },
        items: [
          furnitureCategory("consoles-storage", "Consoles & Storage", "كونسول وتخزين"),
          furnitureCategory("seating", "Chairs & Seating", "كراسي ومقاعد"),
          furnitureCategory("tables", "Tables", "طاولات"),
          furnitureCategory("mirrors", "Mirrors", "مرايا"),
          furnitureCategory("rugs-accessories", "Rugs & Accessories", "سجاد وإكسسوارات"),
        ],
      },
      {
        title: { en: "Explore", ar: "استكشف" },
        items: [
          { label: { en: "New in Furniture", ar: "جديد الأثاث" }, href: (l) => routes.newArrivals(l) },
          { label: { en: "Brass Atelier", ar: "أتيليه النحاس" }, href: (l) => routes.collection(l, "brass-atelier") },
          { label: { en: "Shop All Furniture", ar: "كل الأثاث" }, href: (l) => routes.furniture(l) },
        ],
      },
    ],
    shot: { en: "travertine console, side light", ar: "كونسول ترافرتين، إضاءة جانبية" },
    feature: { en: "Brass Atelier — furniture made for the light", ar: "أتيليه النحاس — أثاث صُنع للضوء" },
    featureHref: (l) => routes.collection(l, "brass-atelier"),
  },

  collections: {
    columns: [
      {
        title: { en: "Signature", ar: "المجموعات" },
        items: [
          { label: { en: "Celestial Collection", ar: "مجموعة سيليستيال" }, href: (l) => routes.collection(l, "celestial") },
          { label: { en: "Nocturne Collection", ar: "مجموعة نوكتيرن" }, href: (l) => routes.collection(l, "nocturne") },
          { label: { en: "Alabaster Collection", ar: "مجموعة ألاباستر" }, href: (l) => routes.collection(l, "alabaster") },
        ],
      },
      {
        title: { en: "Atelier", ar: "الأتيليه" },
        items: [
          { label: { en: "Brass Atelier", ar: "أتيليه النحاس" }, href: (l) => routes.collection(l, "brass-atelier") },
          { label: { en: "Modern Heritage", ar: "التراث المعاصر" }, href: (l) => routes.collection(l, "modern-heritage") },
          { label: { en: "Limited Editions", ar: "إصدارات محدودة" }, href: (l) => routes.collection(l, "limited-editions") },
        ],
      },
      {
        title: { en: "Services", ar: "الخدمات" },
        items: [
          { label: { en: "Custom & Projects", ar: "التصميم الخاص والمشاريع" }, href: (l) => routes.custom(l) },
          { label: { en: "Trade Program", ar: "برنامج المحترفين" }, href: (l) => routes.trade(l) },
          { label: { en: "Book a Consultation", ar: "احجز استشارة" }, href: (l) => routes.consultation(l) },
        ],
      },
    ],
    shot: { en: "celestial collection campaign", ar: "حملة مجموعة سيليستيال" },
    feature: { en: "The Celestial Collection — newly released", ar: "مجموعة سيليستيال — إصدار جديد" },
    featureHref: (l) => routes.collection(l, "celestial"),
  },

  rooms: {
    columns: [
      {
        title: { en: "Interiors", ar: "المساحات" },
        items: [
          { label: { en: "Living Room", ar: "غرفة المعيشة" }, href: (l) => routes.room(l, "living-room") },
          { label: { en: "Dining Room", ar: "غرفة الطعام" }, href: (l) => routes.room(l, "dining-room") },
          { label: { en: "Bedroom", ar: "غرفة النوم" }, href: (l) => routes.room(l, "bedroom") },
          { label: { en: "Entrance & Hallway", ar: "المدخل والممر" }, href: (l) => routes.room(l, "entrance-hallway") },
        ],
      },
      {
        title: { en: "More spaces", ar: "مساحات أخرى" },
        items: [
          { label: { en: "Kitchen", ar: "المطبخ" }, href: (l) => routes.room(l, "kitchen") },
          { label: { en: "Bathroom", ar: "الحمام" }, href: (l) => routes.room(l, "bathroom") },
          { label: { en: "Garden & Terrace", ar: "الحديقة والتراس" }, href: (l) => routes.room(l, "garden-terrace") },
          { label: { en: "Hospitality Spaces", ar: "مساحات الضيافة" }, href: (l) => routes.room(l, "hospitality") },
        ],
      },
      {
        title: { en: "Inspiration", ar: "إلهام" },
        items: [
          { label: { en: "Shop the Look", ar: "تسوق الإطلالة" }, href: (l) => routes.rooms(l) },
          { label: { en: "Design Tips", ar: "نصائح التصميم" }, href: (l) => routes.journal(l) },
          { label: { en: "Journal", ar: "المجلة" }, href: (l) => routes.journal(l) },
        ],
      },
    ],
    shot: { en: "dining room, evening light", ar: "غرفة الطعام، ضوء المساء" },
    feature: { en: "Six rooms, photographed at dusk", ar: "ست مساحات، صُوِّرت عند الغروب" },
    featureHref: (l) => routes.rooms(l),
  },
};

/* ==========================================================================
   Footer
   ========================================================================== */

export const FOOTER_COLUMNS: MenuColumn[] = [
  {
    title: { en: "Shop", ar: "تسوق" },
    items: [
      { label: { en: "New Arrivals", ar: "وصل حديثاً" }, href: (l) => routes.newArrivals(l) },
      { label: { en: "Chandeliers", ar: "ثريات" }, href: (l) => routes.lighting(l, "chandeliers") },
      { label: { en: "Pendant Lights", ar: "إضاءة معلقة" }, href: (l) => routes.lighting(l, "pendant-lights") },
      { label: { en: "Wall Lights", ar: "إضاءة حائط" }, href: (l) => routes.lighting(l, "wall-lights") },
      { label: { en: "Floor Lamps", ar: "أباجورات أرضية" }, href: (l) => routes.lighting(l, "floor-lamps") },
      { label: { en: "Furniture", ar: "أثاث" }, href: (l) => routes.furniture(l) },
      { label: { en: "Bulbs & Accessories", ar: "اللمبات والإكسسوارات" }, href: (l) => routes.lighting(l, "accessories") },
    ],
  },
  {
    title: { en: "Services", ar: "الخدمات" },
    items: [
      { label: { en: "Custom & Projects", ar: "التصميم الخاص والمشاريع" }, href: (l) => routes.custom(l) },
      { label: { en: "Trade Program", ar: "برنامج المحترفين" }, href: (l) => routes.trade(l) },
      { label: { en: "Design Consultation", ar: "استشارة تصميم" }, href: (l) => routes.consultation(l) },
      { label: { en: "Installation Support", ar: "دعم التركيب" }, href: (l) => routes.support(l, "installation") },
      { label: { en: "Showrooms", ar: "صالات العرض" }, href: (l) => routes.showrooms(l) },
    ],
  },
  {
    title: { en: "Atelier", ar: "الأتيليه" },
    items: [
      { label: { en: "About Thurayyā", ar: "عن ثريا" }, href: (l) => routes.about(l) },
      { label: { en: "Collections", ar: "المجموعات" }, href: (l) => routes.collections(l) },
      { label: { en: "Rooms", ar: "المساحات" }, href: (l) => routes.rooms(l) },
      { label: { en: "Journal", ar: "المجلة" }, href: (l) => routes.journal(l) },
      { label: { en: "Style Guide", ar: "دليل الهوية" }, href: (l) => routes.styleGuide(l) },
    ],
  },
  {
    title: { en: "Support", ar: "الدعم" },
    items: [
      { label: { en: "Delivery & Shipping", ar: "التوصيل والشحن" }, href: (l) => routes.support(l, "delivery") },
      { label: { en: "Returns & Exchanges", ar: "الإرجاع والاستبدال" }, href: (l) => routes.support(l, "returns") },
      { label: { en: "Warranty", ar: "الضمان" }, href: (l) => routes.support(l, "warranty") },
      { label: { en: "Product Care", ar: "العناية بالمنتج" }, href: (l) => routes.support(l, "care") },
      { label: { en: "FAQs", ar: "الأسئلة الشائعة" }, href: (l) => routes.support(l, "faqs") },
      { label: { en: "Track Order", ar: "تتبع الطلب" }, href: (l) => routes.track(l) },
      { label: { en: "Contact", ar: "اتصل بنا" }, href: (l) => routes.showrooms(l) },
    ],
  },
];
