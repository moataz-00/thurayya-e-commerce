import type { Address, Appointment, Localized, Order } from "@/lib/types";

export const CUSTOMER = {
  name: "Layla Hassan",
  nameAr: "ليلى حسن",
  email: "layla@studio.eg",
  phone: "+20 100 000 0000",
  memberSince: { en: "2024 · Cairo", ar: "٢٠٢٤ · القاهرة" } as Localized,
  tradeStatus: "under-review" as const,
};

export const ORDERS: Order[] = [
  {
    id: "o-1",
    reference: "TH-20418",
    placedOn: { en: "12 Aug 2026", ar: "١٢ أغسطس ٢٠٢٦" },
    status: "in-production",
    statusLabel: { en: "In production", ar: "قيد الإنتاج" },
    total: 184000,
    lines: [
      {
        title: { en: "Thurayyā Seven Chandelier", ar: "ثريا سيفن" },
        variant: { en: "Antique brass · Ø 96 cm · 2700K", ar: "نحاس عتيق · قطر ٩٦ سم · ٢٧٠٠ كلفن" },
        qty: 1,
        price: 184000,
      },
    ],
    timeline: [
      { label: { en: "Order confirmed", ar: "تأكيد الطلب" }, date: { en: "12 Aug", ar: "١٢ أغسطس" }, done: true },
      { label: { en: "Brass cast", ar: "سبك النحاس" }, date: { en: "21 Aug", ar: "٢١ أغسطس" }, done: true },
      { label: { en: "Alabaster carved", ar: "نحت الألاباستر" }, date: { en: "3 Sep", ar: "٣ سبتمبر" }, done: true },
      { label: { en: "Assembly & levelling", ar: "التجميع والتسوية" }, date: { en: "28 Sep", ar: "٢٨ سبتمبر" }, done: false },
      { label: { en: "Crated & dispatched", ar: "التغليف والشحن" }, date: { en: "14 Oct", ar: "١٤ أكتوبر" }, done: false },
      { label: { en: "Delivery & installation", ar: "التسليم والتركيب" }, date: { en: "21–28 Oct", ar: "٢١–٢٨ أكتوبر" }, done: false },
    ],
    action: { en: "Track", ar: "تتبّع" },
  },
  {
    id: "o-2",
    reference: "TH-19882",
    placedOn: { en: "4 Jun 2026", ar: "٤ يونيو ٢٠٢٦" },
    status: "delivered",
    statusLabel: { en: "Delivered", ar: "تم التسليم" },
    total: 57800,
    lines: [
      {
        title: { en: "Alabaster Wall Light, pair", ar: "إضاءة الألاباستر الحائطية، زوج" },
        variant: { en: "Hand-carved alabaster", ar: "ألاباستر منحوت يدوياً" },
        qty: 2,
        price: 28900,
      },
    ],
    timeline: [
      { label: { en: "Order confirmed", ar: "تأكيد الطلب" }, date: { en: "4 Jun", ar: "٤ يونيو" }, done: true },
      { label: { en: "Dispatched", ar: "تم الشحن" }, date: { en: "6 Jun", ar: "٦ يونيو" }, done: true },
      { label: { en: "Delivered", ar: "تم التسليم" }, date: { en: "9 Jun", ar: "٩ يونيو" }, done: true },
    ],
    action: { en: "Reorder", ar: "إعادة الطلب" },
  },
  {
    id: "o-3",
    reference: "TH-19104",
    placedOn: { en: "17 Feb 2026", ar: "١٧ فبراير ٢٠٢٦" },
    status: "delivered",
    statusLabel: { en: "Delivered", ar: "تم التسليم" },
    total: 21500,
    lines: [
      {
        title: { en: "Nour Ceiling Flush", ar: "نور الملاصقة" },
        variant: { en: "Alabaster · brushed brass ring", ar: "ألاباستر · حلقة نحاس مصنفر" },
        qty: 1,
        price: 21500,
      },
    ],
    timeline: [
      { label: { en: "Order confirmed", ar: "تأكيد الطلب" }, date: { en: "17 Feb", ar: "١٧ فبراير" }, done: true },
      { label: { en: "Dispatched", ar: "تم الشحن" }, date: { en: "18 Feb", ar: "١٨ فبراير" }, done: true },
      { label: { en: "Delivered", ar: "تم التسليم" }, date: { en: "21 Feb", ar: "٢١ فبراير" }, done: true },
    ],
    action: { en: "Reorder", ar: "إعادة الطلب" },
  },
];

export function getOrder(reference: string): Order | undefined {
  return ORDERS.find((o) => o.reference.toLowerCase() === reference.trim().toLowerCase());
}

export const ADDRESSES: Address[] = [
  {
    id: "a-1",
    label: { en: "Default · delivery & billing", ar: "افتراضي · التوصيل والفوترة" },
    name: "Layla Hassan",
    lines: ["14 Shagaret El Dorr, Zamalek", "Cairo 11211, Egypt"],
    phone: "+20 100 000 0000",
    isDefault: true,
  },
  {
    id: "a-2",
    label: { en: "Studio", ar: "الاستوديو" },
    name: "Hassan Interiors",
    lines: ["Unit 5, 22 Road 9, Maadi", "Cairo 11431, Egypt"],
    phone: "+20 2 0000 1111",
    isDefault: false,
  },
];

export const APPOINTMENTS: Appointment[] = [
  {
    id: "ap-1",
    service: { en: "Lighting Consultation", ar: "استشارة إضاءة" },
    format: { en: "Virtual", ar: "افتراضي" },
    date: { en: "Wed 16 Sep 2026", ar: "الأربعاء ١٦ سبتمبر ٢٠٢٦" },
    time: { en: "11:30 (GMT+2)", ar: "١١:٣٠ (توقيت القاهرة)" },
    designer: { en: "Salma Farid", ar: "سلمى فريد" },
    status: "confirmed",
  },
  {
    id: "ap-2",
    service: { en: "Interior Styling", ar: "تنسيق داخلي" },
    format: { en: "Showroom — Zamalek", ar: "صالة العرض — الزمالك" },
    date: { en: "Sat 4 Jul 2026", ar: "السبت ٤ يوليو ٢٠٢٦" },
    time: { en: "17:00 (GMT+2)", ar: "١٧:٠٠ (توقيت القاهرة)" },
    designer: { en: "Yasmin Adel", ar: "ياسمين عادل" },
    status: "completed",
  },
];

export const BOARDS: { id: string; name: Localized; count: number; productSlugs: string[] }[] = [
  {
    id: "b-1",
    name: { en: "Living Room", ar: "غرفة المعيشة" },
    count: 6,
    productSlugs: [
      "najm-halo-chandelier",
      "alabaster-wall-light",
      "meridian-floor-lamp",
      "thurayya-cluster-rug",
    ],
  },
  {
    id: "b-2",
    name: { en: "Villa Project", ar: "مشروع الفيلا" },
    count: 14,
    productSlugs: [
      "orion-cascade-chandelier",
      "maha-tiered-chandelier",
      "layl-travertine-console",
      "qamar-brass-mirror",
    ],
  },
  {
    id: "b-3",
    name: { en: "Bedroom", ar: "غرفة النوم" },
    count: 3,
    productSlugs: ["rida-linear-sconce", "dune-alabaster-lamp", "nour-ceiling-flush"],
  },
];

export const SAVED_ROOMS: { slug: string; savedOn: Localized }[] = [
  { slug: "living-room", savedOn: { en: "Saved 3 Aug 2026", ar: "حُفظت ٣ أغسطس ٢٠٢٦" } },
  { slug: "dining-room", savedOn: { en: "Saved 22 Jul 2026", ar: "حُفظت ٢٢ يوليو ٢٠٢٦" } },
];

/** The bag the prototype starts with, so the cart page is never empty on a cold load. */
export const STARTING_CART: { slug: string; qty: number; variant: Localized }[] = [
  {
    slug: "thurayya-seven-chandelier",
    qty: 1,
    variant: { en: "Antique brass · Ø 96 cm · 2700K", ar: "نحاس عتيق · قطر ٩٦ سم · ٢٧٠٠ كلفن" },
  },
  {
    slug: "alabaster-wall-light",
    qty: 2,
    variant: { en: "Hand-carved alabaster · pair", ar: "ألاباستر منحوت يدوياً · زوج" },
  },
  {
    slug: "warm-led-bulbs",
    qty: 1,
    variant: { en: "2700K · dimmable · set of 7", ar: "٢٧٠٠ كلفن · قابلة للتعتيم · طقم ٧" },
  },
];

/** Promo codes the prototype recognises. */
export const PROMO_CODES: Record<string, number> = {
  ATELIER10: 0.1,
  TRADE15: 0.15,
};

export const RECENT_SEARCHES: string[] = [
  "alabaster pendant",
  "dining chandelier 96cm",
  "outdoor brass",
];

export const TRENDING_SEARCHES: Localized[] = [
  { en: "Celestial Collection", ar: "مجموعة سيليستيال" },
  { en: "Ready to ship chandeliers", ar: "ثريات جاهزة للشحن" },
  { en: "Travertine console", ar: "كونسول ترافرتين" },
  { en: "Smart dimming", ar: "تعتيم ذكي" },
];
