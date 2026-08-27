import type { Category, FilterGroup, Localized } from "@/lib/types";
import { CATEGORY_IMAGES } from "@/lib/images";

/* ==========================================================================
   Categories
   ========================================================================== */

const CATEGORY_SEEDS: Category[] = [
  {
    slug: "chandeliers",
    family: "lighting",
    name: { en: "Chandelier", ar: "ثريا" },
    plural: { en: "Chandeliers", ar: "ثريات" },
    intro: {
      en: "Suspended compositions in cast brass, hand-carved alabaster and mouth-blown glass. Every drop is adjustable at the ceiling rose, and every piece can be re-engineered for double-height rooms on request.",
      ar: "تكوينات معلقة من النحاس المسبوك والألاباستر المنحوت يدوياً والزجاج المنفوخ. كل ارتفاع قابل للتعديل عند قاعدة السقف، وكل قطعة يمكن إعادة هندستها للأسقف المرتفعة عند الطلب.",
    },
    bannerShot: {
      en: "category banner — chandelier gallery wall, 2400x760",
      ar: "بانر الفئة — جدار عرض الثريات، ٢٤٠٠×٧٦٠",
    },
    tileShot: { en: "chandelier, dining room", ar: "ثريا، غرفة الطعام" },
    note: { en: "24 pieces", ar: "٢٤ قطعة" },
  },
  {
    slug: "pendant-lights",
    family: "lighting",
    name: { en: "Pendant", ar: "إضاءة معلقة" },
    plural: { en: "Pendant Lights", ar: "الإضاءة المعلقة" },
    intro: {
      en: "Single points of light for islands, stairwells and reading corners. Cable length is set on site; shades are blown in batches small enough that no two are identical.",
      ar: "نقاط ضوء مفردة للجزر المطبخية والسلالم وأركان القراءة. يُضبط طول الكابل في الموقع، وتُنفخ الأباجورات على دفعات صغيرة فلا يتطابق اثنان.",
    },
    bannerShot: {
      en: "category banner — pendant cluster over island, 2400x760",
      ar: "بانر الفئة — مجموعة معلقات فوق جزيرة المطبخ",
    },
    tileShot: { en: "pendant cluster, kitchen", ar: "معلقات، المطبخ" },
    note: { en: "38 pieces", ar: "٣٨ قطعة" },
  },
  {
    slug: "ceiling-lights",
    family: "lighting",
    name: { en: "Ceiling Light", ar: "إضاءة سقف" },
    plural: { en: "Ceiling Lights", ar: "إضاءة السقف" },
    intro: {
      en: "Flush and semi-flush fittings for rooms that cannot take a drop. Alabaster diffuses at 2700K without a visible source.",
      ar: "وحدات ملاصقة وشبه ملاصقة للغرف التي لا تحتمل التعليق. ينشر الألاباستر الضوء عند ٢٧٠٠ كلفن دون مصدر ظاهر.",
    },
    bannerShot: { en: "category banner — flush ceiling light, plaster", ar: "بانر الفئة — إضاءة سقف ملاصقة" },
    tileShot: { en: "flush ceiling light, low ceiling", ar: "إضاءة سقف، سقف منخفض" },
    note: { en: "16 pieces", ar: "١٦ قطعة" },
  },
  {
    slug: "wall-lights",
    family: "lighting",
    name: { en: "Wall Light", ar: "إضاءة حائط" },
    plural: { en: "Wall Lights", ar: "إضاءة الحائط" },
    intro: {
      en: "Sconces that graze plaster and stone rather than fill a room. Put them on their own circuit — the room should work with the ceiling light off.",
      ar: "وحدات حائط تلامس الجبس والحجر بدل أن تملأ الغرفة. ضعها على دائرة مستقلة — يجب أن تعمل الغرفة وإضاءة السقف مطفأة.",
    },
    bannerShot: { en: "category banner — sconce on plaster wall", ar: "بانر الفئة — وحدة حائط على جدار جبسي" },
    tileShot: { en: "sconce, plaster wall", ar: "وحدة حائط، جدار جبسي" },
    note: { en: "31 pieces", ar: "٣١ قطعة" },
  },
  {
    slug: "floor-lamps",
    family: "lighting",
    name: { en: "Floor Lamp", ar: "أباجورة أرضية" },
    plural: { en: "Floor Lamps", ar: "الأباجورات الأرضية" },
    intro: {
      en: "The layer that stays on after everything else is off. Weighted bases in marble and travertine, arms adjustable by hand.",
      ar: "الطبقة التي تبقى مضاءة بعد إطفاء كل شيء. قواعد ثقيلة من الرخام والترافرتين، وأذرع تُضبط باليد.",
    },
    bannerShot: { en: "category banner — floor lamp, reading corner", ar: "بانر الفئة — أباجورة أرضية، ركن القراءة" },
    tileShot: { en: "floor lamp, reading corner", ar: "أباجورة أرضية، ركن القراءة" },
    note: { en: "17 pieces", ar: "١٧ قطعة" },
  },
  {
    slug: "table-lamps",
    family: "lighting",
    name: { en: "Table Lamp", ar: "أباجورة طاولة" },
    plural: { en: "Table Lamps", ar: "أباجورات الطاولة" },
    intro: {
      en: "Small light with weight to it. Stone bases, linen shades, and a switch you can find in the dark.",
      ar: "ضوء صغير بثقل حقيقي. قواعد حجرية، وأباجورات كتّانية، ومفتاح تجده في العتمة.",
    },
    bannerShot: { en: "category banner — table lamp on console", ar: "بانر الفئة — أباجورة على كونسول" },
    tileShot: { en: "table lamp on console", ar: "أباجورة على كونسول" },
    note: { en: "22 pieces", ar: "٢٢ قطعة" },
  },
  {
    slug: "outdoor-lighting",
    family: "lighting",
    name: { en: "Outdoor Light", ar: "إضاءة خارجية" },
    plural: { en: "Outdoor Lighting", ar: "الإضاءة الخارجية" },
    intro: {
      en: "IP-rated brass for terraces, courtyards and coastal air. Finishes are sealed for salt and humidity and will patina slowly rather than pit.",
      ar: "نحاس بتصنيف IP للتراسات والأفنية والهواء الساحلي. التشطيبات مغلقة ضد الملوحة والرطوبة وتتعتّق ببطء دون تآكل.",
    },
    bannerShot: { en: "category banner — terrace at dusk", ar: "بانر الفئة — التراس عند الغروب" },
    tileShot: { en: "garden path, night", ar: "ممر الحديقة، ليلاً" },
    note: { en: "12 pieces", ar: "١٢ قطعة" },
  },
  {
    slug: "smart-lighting",
    family: "lighting",
    name: { en: "Smart Lighting", ar: "إضاءة ذكية" },
    plural: { en: "Smart Lighting", ar: "الإضاءة الذكية" },
    intro: {
      en: "Fixtures and controls that speak DALI, Casambi and trailing-edge dimming without a visible box on the wall.",
      ar: "وحدات وأنظمة تحكم تدعم DALI وCasambi والتعتيم الخلفي دون صندوق ظاهر على الحائط.",
    },
    bannerShot: { en: "category banner — scene controller, brass plate", ar: "بانر الفئة — لوحة تحكم نحاسية" },
    tileShot: { en: "brass scene controller", ar: "لوحة تحكم نحاسية" },
    note: { en: "9 pieces", ar: "٩ قطع" },
  },
  {
    slug: "accessories",
    family: "lighting",
    name: { en: "Accessory", ar: "إكسسوار" },
    plural: { en: "Bulbs & Accessories", ar: "اللمبات والإكسسوارات" },
    intro: {
      en: "The parts that keep a fixture right: matched bulbs, spare alabaster cups, braided cable and rose plates.",
      ar: "القطع التي تبقي الوحدة كما ينبغي: لمبات مطابقة، وكؤوس ألاباستر بديلة، وكابل مضفور، وقواعد سقف.",
    },
    bannerShot: { en: "category banner — bulbs and spares on linen", ar: "بانر الفئة — لمبات وقطع غيار على كتّان" },
    tileShot: { en: "bulb set, linen tray", ar: "طقم لمبات، صينية كتّان" },
    note: { en: "14 pieces", ar: "١٤ قطعة" },
  },
  {
    slug: "consoles-storage",
    family: "furniture",
    name: { en: "Console", ar: "كونسول" },
    plural: { en: "Consoles & Storage", ar: "الكونسول والتخزين" },
    intro: {
      en: "Long, low and quiet. Walnut frames jointed by hand, stone tops honed rather than polished.",
      ar: "طويلة ومنخفضة وهادئة. هياكل جوز مجمّعة يدوياً، وأسطح حجرية مصنفرة لا ملمّعة.",
    },
    bannerShot: { en: "category banner — travertine console, side light", ar: "بانر الفئة — كونسول ترافرتين" },
    tileShot: { en: "travertine console", ar: "كونسول ترافرتين" },
    note: { en: "New", ar: "جديد" },
  },
  {
    slug: "tables",
    family: "furniture",
    name: { en: "Table", ar: "طاولة" },
    plural: { en: "Tables", ar: "الطاولات" },
    intro: {
      en: "Dining and side tables sized to the fixtures above them. We will cut a top to your room if the standard sizes miss.",
      ar: "طاولات طعام وجانبية بمقاسات تناسب الوحدات المعلقة فوقها. نقصّ السطح على مقاس غرفتك إن لم تناسبك المقاسات القياسية.",
    },
    bannerShot: { en: "category banner — walnut dining table, dusk", ar: "بانر الفئة — طاولة طعام جوز" },
    tileShot: { en: "walnut dining table", ar: "طاولة طعام من الجوز" },
    note: { en: "11 pieces", ar: "١١ قطعة" },
  },
  {
    slug: "seating",
    family: "furniture",
    name: { en: "Seating", ar: "مقاعد" },
    plural: { en: "Chairs & Seating", ar: "الكراسي والمقاعد" },
    intro: {
      en: "Frames in oiled oak and walnut, upholstery in linen and wool. Nothing here is lacquered.",
      ar: "هياكل من البلوط والجوز المزيّت، وتنجيد من الكتّان والصوف. لا شيء هنا ملمّع.",
    },
    bannerShot: { en: "category banner — linen lounge chair, window light", ar: "بانر الفئة — كرسي كتّان" },
    tileShot: { en: "linen lounge chair", ar: "كرسي كتّان" },
    note: { en: "8 pieces", ar: "٨ قطع" },
  },
  {
    slug: "mirrors",
    family: "furniture",
    name: { en: "Mirror", ar: "مرآة" },
    plural: { en: "Mirrors", ar: "المرايا" },
    intro: {
      en: "Brass frames around low-iron glass. Hung above a console they do the work of a second window.",
      ar: "إطارات نحاسية حول زجاج منخفض الحديد. فوق الكونسول تؤدي دور نافذة ثانية.",
    },
    bannerShot: { en: "category banner — brass mirror above console", ar: "بانر الفئة — مرآة نحاسية فوق كونسول" },
    tileShot: { en: "brass mirror, entrance", ar: "مرآة نحاسية، المدخل" },
    note: { en: "6 pieces", ar: "٦ قطع" },
  },
  {
    slug: "rugs-accessories",
    family: "furniture",
    name: { en: "Rug", ar: "سجادة" },
    plural: { en: "Rugs & Accessories", ar: "السجاد والإكسسوارات" },
    intro: {
      en: "Hand-knotted wool in the colours of the palette, woven to order in sizes that suit Cairo apartments.",
      ar: "صوف معقود يدوياً بألوان لوحة العلامة، يُنسج حسب الطلب بمقاسات تناسب شقق القاهرة.",
    },
    bannerShot: { en: "category banner — wool rug, raking light", ar: "بانر الفئة — سجادة صوف" },
    tileShot: { en: "wool rug detail", ar: "تفصيل سجادة صوف" },
    note: { en: "7 pieces", ar: "٧ قطع" },
  },
];

export const CATEGORIES: Category[] = CATEGORY_SEEDS.map((c) => ({
  ...c,
  tileSrc: CATEGORY_IMAGES[c.slug]?.tile,
  bannerSrc: CATEGORY_IMAGES[c.slug]?.banner,
}));

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoriesFor(family: "lighting" | "furniture"): Category[] {
  return CATEGORIES.filter((c) => c.family === family);
}

/* ==========================================================================
   Home page category tiles (the "Begin with light" row)
   ========================================================================== */

export const HOME_CATEGORY_TILES: {
  slug: string;
  family: "lighting" | "furniture";
}[] = [
  { slug: "chandeliers", family: "lighting" },
  { slug: "pendant-lights", family: "lighting" },
  { slug: "wall-lights", family: "lighting" },
  { slug: "floor-lamps", family: "lighting" },
  { slug: "consoles-storage", family: "furniture" },
];

/* ==========================================================================
   Facet vocabularies - the values products are tagged with
   ========================================================================== */

export const MATERIALS: { value: string; label: Localized }[] = [
  { value: "brass", label: { en: "Brass", ar: "نحاس" } },
  { value: "alabaster", label: { en: "Alabaster", ar: "ألاباستر" } },
  { value: "glass", label: { en: "Glass", ar: "زجاج" } },
  { value: "travertine", label: { en: "Travertine", ar: "ترافرتين" } },
  { value: "walnut", label: { en: "Walnut", ar: "جوز" } },
  { value: "linen", label: { en: "Linen", ar: "كتّان" } },
  { value: "marble", label: { en: "Marble", ar: "رخام" } },
  { value: "wool", label: { en: "Wool", ar: "صوف" } },
];

export const FINISHES: { value: string; label: Localized; hex: string }[] = [
  { value: "antique-brass", label: { en: "Antique brass", ar: "نحاس عتيق" }, hex: "#A9844F" },
  { value: "brushed-brass", label: { en: "Brushed brass", ar: "نحاس مصنفر" }, hex: "#BE9C67" },
  { value: "blackened-brass", label: { en: "Blackened brass", ar: "نحاس مسوّد" }, hex: "#33302B" },
  { value: "brushed-nickel", label: { en: "Brushed nickel", ar: "نيكل مصنفر" }, hex: "#B9B7B2" },
  { value: "aged-bronze", label: { en: "Aged bronze", ar: "برونز معتّق" }, hex: "#6B5540" },
  { value: "weathered-brass", label: { en: "Weathered brass", ar: "نحاس متعتّق" }, hex: "#8E7A55" },
];

export const COLOURS: { value: string; label: Localized }[] = [
  { value: "ivory", label: { en: "Ivory", ar: "عاجي" } },
  { value: "amber", label: { en: "Amber", ar: "كهرماني" } },
  { value: "smoke", label: { en: "Smoke", ar: "دخاني" } },
  { value: "clear", label: { en: "Clear", ar: "شفاف" } },
  { value: "onyx", label: { en: "Onyx", ar: "أونيكس" } },
];

export const TECHNICAL: { value: string; label: Localized }[] = [
  { value: "dimmable", label: { en: "Dimmable", ar: "قابل للتعتيم" } },
  { value: "smart", label: { en: "Smart compatible", ar: "متوافق مع الأنظمة الذكية" } },
  { value: "ip44", label: { en: "IP44+ rated", ar: "تصنيف IP44 فأعلى" } },
  { value: "low-ceiling", label: { en: "Low ceiling suitable", ar: "مناسب للأسقف المنخفضة" } },
];

export const ROOM_VALUES: { value: string; label: Localized }[] = [
  { value: "living-room", label: { en: "Living Room", ar: "غرفة المعيشة" } },
  { value: "dining-room", label: { en: "Dining Room", ar: "غرفة الطعام" } },
  { value: "bedroom", label: { en: "Bedroom", ar: "غرفة النوم" } },
  { value: "entrance-hallway", label: { en: "Entrance & Hallway", ar: "المدخل والممر" } },
  { value: "kitchen", label: { en: "Kitchen", ar: "المطبخ" } },
  { value: "bathroom", label: { en: "Bathroom", ar: "الحمام" } },
  { value: "garden-terrace", label: { en: "Garden & Terrace", ar: "الحديقة والتراس" } },
  { value: "hospitality", label: { en: "Hospitality", ar: "مساحات الضيافة" } },
];

export const PRICE_BANDS: { value: string; label: Localized; min: number; max: number }[] = [
  { value: "under-25k", label: { en: "Under EGP 25,000", ar: "أقل من ٢٥٬٠٠٠ ج.م" }, min: 0, max: 25000 },
  { value: "25k-60k", label: { en: "EGP 25,000 – 60,000", ar: "٢٥٬٠٠٠ – ٦٠٬٠٠٠ ج.م" }, min: 25000, max: 60000 },
  { value: "60k-150k", label: { en: "EGP 60,000 – 150,000", ar: "٦٠٬٠٠٠ – ١٥٠٬٠٠٠ ج.م" }, min: 60000, max: 150000 },
  { value: "above-150k", label: { en: "Above EGP 150,000", ar: "أكثر من ١٥٠٬٠٠٠ ج.م" }, min: 150000, max: Infinity },
];

export const DIAMETER_BANDS: { value: string; label: Localized; min: number; max: number }[] = [
  { value: "dia-0-40", label: { en: "Up to 40 cm", ar: "حتى ٤٠ سم" }, min: 0, max: 40 },
  { value: "dia-40-70", label: { en: "40 – 70 cm", ar: "٤٠ – ٧٠ سم" }, min: 40, max: 70 },
  { value: "dia-70-110", label: { en: "70 – 110 cm", ar: "٧٠ – ١١٠ سم" }, min: 70, max: 110 },
  { value: "dia-110-plus", label: { en: "Over 110 cm", ar: "أكثر من ١١٠ سم" }, min: 110, max: Infinity },
];

export const DROP_BANDS: { value: string; label: Localized; min: number; max: number }[] = [
  { value: "drop-0-60", label: { en: "Up to 60 cm", ar: "حتى ٦٠ سم" }, min: 0, max: 60 },
  { value: "drop-60-120", label: { en: "60 – 120 cm", ar: "٦٠ – ١٢٠ سم" }, min: 60, max: 120 },
  { value: "drop-120-250", label: { en: "120 – 250 cm", ar: "١٢٠ – ٢٥٠ سم" }, min: 120, max: 250 },
  { value: "drop-custom", label: { en: "Custom drop", ar: "ارتفاع خاص" }, min: 250, max: Infinity },
];

export const LIGHT_COUNT_BANDS: { value: string; label: Localized; min: number; max: number }[] = [
  { value: "lights-1", label: { en: "1", ar: "١" }, min: 1, max: 1 },
  { value: "lights-2-4", label: { en: "2 – 4", ar: "٢ – ٤" }, min: 2, max: 4 },
  { value: "lights-5-8", label: { en: "5 – 8", ar: "٥ – ٨" }, min: 5, max: 8 },
  { value: "lights-9-plus", label: { en: "9+", ar: "٩ فأكثر" }, min: 9, max: Infinity },
];

export const AVAILABILITY_VALUES: { value: string; label: Localized }[] = [
  { value: "ready-to-ship", label: { en: "Ready to ship", ar: "جاهز للشحن" } },
  { value: "made-to-order", label: { en: "Made to order", ar: "يُصنع حسب الطلب" } },
  { value: "pre-order", label: { en: "Pre-order", ar: "طلب مسبق" } },
  { value: "limited-edition", label: { en: "Limited edition", ar: "إصدار محدود" } },
];

/* ==========================================================================
   Filter sidebar
   ========================================================================== */

export const FILTER_GROUPS: FilterGroup[] = [
  {
    id: "category",
    title: { en: "Category", ar: "الفئة" },
    items: CATEGORIES.map((c) => ({ value: c.slug, label: c.plural })),
  },
  { id: "price", title: { en: "Price", ar: "السعر" }, items: PRICE_BANDS },
  { id: "room", title: { en: "Room", ar: "الغرفة" }, items: ROOM_VALUES },
  { id: "finish", title: { en: "Finish", ar: "التشطيب" }, items: FINISHES },
  { id: "material", title: { en: "Material", ar: "المادة" }, items: MATERIALS },
  { id: "colour", title: { en: "Colour", ar: "اللون" }, items: COLOURS },
  { id: "diameter", title: { en: "Diameter", ar: "القطر" }, items: DIAMETER_BANDS },
  { id: "drop", title: { en: "Height / Drop", ar: "الارتفاع" }, items: DROP_BANDS },
  { id: "lights", title: { en: "Number of lights", ar: "عدد النقاط الضوئية" }, items: LIGHT_COUNT_BANDS },
  { id: "technical", title: { en: "Technical", ar: "المواصفات الفنية" }, items: TECHNICAL },
  { id: "availability", title: { en: "Availability", ar: "التوفر" }, items: AVAILABILITY_VALUES },
];

/** Groups the PLP sidebar opens with, matching the design. */
export const DEFAULT_OPEN_GROUPS = ["category", "finish", "availability"];

/** Look a facet value up for the applied-chip row. */
export function facetLabel(value: string): Localized {
  for (const group of FILTER_GROUPS) {
    const hit = group.items.find((i) => i.value === value);
    if (hit) return hit.label;
  }
  return { en: value, ar: value };
}
