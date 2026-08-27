import type {
  Availability,
  FinishOption,
  Localized,
  Product,
  ProductFamily,
  Question,
  Review,
  Section,
  Shot,
  SizeOption,
  SpecRow,
} from "@/lib/types";
import { FINISHES } from "./taxonomy";

/* ==========================================================================
   Seeds
   --------------------------------------------------------------------------
   Only what is genuinely unique per piece lives here. Specification tables,
   accordions, gallery slots, reviews and Q&A are derived below from these
   numbers so the catalogue stays internally consistent - a 7-light fixture
   always reports 7 x 5W, and a 96 cm fixture always offers a 96 cm size.
   ========================================================================== */

interface Seed {
  slug: string;
  title: Localized;
  shortTitle: Localized;
  family: ProductFamily;
  category: string;
  collection?: string;
  price: number;
  finishLabel: Localized;
  availability: Availability;
  rating: number;
  reviewCount: number;
  rooms: string[];
  materials: string[];
  finishes: string[];
  colours: string[];
  technical: string[];
  diameterCm?: number;
  dropCm?: number;
  widthCm?: number;
  depthCm?: number;
  heightCm?: number;
  lights?: number;
  weightKg?: number;
  bulb?: string;
  ip?: string;
  leadWeeks?: [number, number];
  shot: Localized;
  shotAlt: Localized;
  summary: Localized;
  isNew?: boolean;
  isBestSeller?: boolean;
  releasedAt: string;
  relatedSlugs?: string[];
}

const SEEDS: Seed[] = [
  /* ---------------------------------------------------------------- chandeliers */
  {
    slug: "thurayya-seven-chandelier",
    title: { en: "Thurayyā Seven Chandelier", ar: "ثريا سيفن" },
    shortTitle: { en: "Thurayyā Seven", ar: "ثريا سيفن" },
    family: "lighting",
    category: "chandeliers",
    collection: "celestial",
    price: 184000,
    finishLabel: { en: "Antique brass · Alabaster", ar: "نحاس عتيق · ألاباستر" },
    availability: "made-to-order",
    rating: 4.9,
    reviewCount: 38,
    rooms: ["dining-room", "living-room", "entrance-hallway", "hospitality"],
    materials: ["brass", "alabaster"],
    finishes: ["antique-brass", "blackened-brass", "brushed-nickel", "aged-bronze"],
    colours: ["ivory", "amber"],
    technical: ["dimmable"],
    diameterCm: 96,
    dropCm: 160,
    lights: 7,
    weightKg: 14.6,
    leadWeeks: [6, 8],
    shot: { en: "chandelier, front elevation", ar: "ثريا، واجهة أمامية" },
    shotAlt: { en: "chandelier over dining table", ar: "ثريا فوق طاولة الطعام" },
    summary: {
      en: "Seven alabaster cups on hand-patinated brass arms, radiating from a single machined hub — the Pleiades cluster the studio is named for.",
      ar: "سبعة كؤوس ألاباستر على أذرع نحاسية معتّقة يدوياً، تنطلق من محور واحد مخروط — مجموعة الثريا التي حمل الاستوديو اسمها.",
    },
    isBestSeller: true,
    releasedAt: "2025-11-03",
    relatedSlugs: ["alabaster-wall-light", "warm-led-bulbs", "sahra-dining-table", "qamar-dome-pendant"],
  },
  {
    slug: "orion-cascade-chandelier",
    title: { en: "Orion Cascade Chandelier", ar: "ثريا أوريون المتدرجة" },
    shortTitle: { en: "Orion Cascade", ar: "أوريون" },
    family: "lighting",
    category: "chandeliers",
    collection: "limited-editions",
    price: 412000,
    finishLabel: { en: "Antique brass · Crystal", ar: "نحاس عتيق · كريستال" },
    availability: "limited-edition",
    rating: 5,
    reviewCount: 11,
    rooms: ["entrance-hallway", "hospitality"],
    materials: ["brass", "glass"],
    finishes: ["antique-brass", "blackened-brass"],
    colours: ["clear", "amber"],
    technical: ["dimmable", "smart"],
    diameterCm: 120,
    dropCm: 400,
    lights: 21,
    weightKg: 46,
    leadWeeks: [10, 14],
    shot: { en: "stairwell cascade, 4m drop", ar: "تدرّج في بئر السلم، ارتفاع ٤ م" },
    shotAlt: { en: "villa entrance, double height", ar: "مدخل فيلا مزدوج الارتفاع" },
    summary: {
      en: "A four-metre cascade for double-height entrances: twenty-one points of light staggered on three concentric rings.",
      ar: "تدرّج بطول أربعة أمتار للمداخل مزدوجة الارتفاع: إحدى وعشرون نقطة ضوء موزعة على ثلاث حلقات متحدة المركز.",
    },
    releasedAt: "2026-02-14",
    relatedSlugs: ["thurayya-seven-chandelier", "maha-tiered-chandelier", "qamar-brass-mirror"],
  },
  {
    slug: "sidra-linear-suspension",
    title: { en: "Sidra Linear Suspension", ar: "سدرة الخطية المعلقة" },
    shortTitle: { en: "Sidra Linear", ar: "سدرة" },
    family: "lighting",
    category: "chandeliers",
    price: 128000,
    finishLabel: { en: "Blackened brass · Ribbed glass", ar: "نحاس مسوّد · زجاج مضلّع" },
    availability: "made-to-order",
    rating: 4.8,
    reviewCount: 24,
    rooms: ["dining-room", "kitchen", "hospitality"],
    materials: ["brass", "glass"],
    finishes: ["blackened-brass", "antique-brass", "aged-bronze"],
    colours: ["smoke", "clear"],
    technical: ["dimmable", "smart"],
    diameterCm: 18,
    dropCm: 140,
    lights: 6,
    weightKg: 11.2,
    leadWeeks: [6, 9],
    shot: { en: "linear suspension, 1.8m", ar: "وحدة خطية معلقة، ١٫٨ م" },
    shotAlt: { en: "long dining table, dusk", ar: "طاولة طعام طويلة عند الغروب" },
    summary: {
      en: "A 1.8-metre blackened brass spine carrying six ribbed glass cylinders — sized for a table that seats eight or more.",
      ar: "عمود نحاسي مسوّد بطول ١٫٨ متر يحمل ستة أسطوانات زجاجية مضلّعة — بمقاس طاولة تتسع لثمانية أشخاص فأكثر.",
    },
    isBestSeller: true,
    releasedAt: "2025-09-20",
    relatedSlugs: ["sahra-dining-table", "qamar-dome-pendant", "warm-led-bulbs"],
  },
  {
    slug: "najm-halo-chandelier",
    title: { en: "Najm Halo Chandelier", ar: "ثريا نجم الحلقية" },
    shortTitle: { en: "Najm Halo", ar: "نجم" },
    family: "lighting",
    category: "chandeliers",
    collection: "celestial",
    price: 96000,
    finishLabel: { en: "Brushed brass · Opal glass", ar: "نحاس مصنفر · زجاج أوبال" },
    availability: "made-to-order",
    rating: 4.7,
    reviewCount: 19,
    rooms: ["living-room", "bedroom", "dining-room"],
    materials: ["brass", "glass"],
    finishes: ["brushed-brass", "antique-brass", "brushed-nickel"],
    colours: ["ivory", "clear"],
    technical: ["dimmable", "low-ceiling"],
    diameterCm: 84,
    dropCm: 90,
    lights: 5,
    weightKg: 9.4,
    leadWeeks: [5, 7],
    shot: { en: "halo chandelier, front elevation", ar: "ثريا حلقية، واجهة أمامية" },
    shotAlt: { en: "living room, late afternoon", ar: "غرفة معيشة، بعد الظهيرة" },
    summary: {
      en: "A single brass ring holding five opal spheres just below it — the smallest Thurayyā cluster, made for 2.7 m ceilings.",
      ar: "حلقة نحاسية واحدة تحمل خمس كرات أوبال أسفلها مباشرة — أصغر تكوينات ثريا، مصممة لأسقف ٢٫٧ متر.",
    },
    isNew: true,
    releasedAt: "2026-06-10",
    relatedSlugs: ["nour-ceiling-flush", "thurayya-seven-chandelier", "nadi-lounge-chair"],
  },
  {
    slug: "maha-tiered-chandelier",
    title: { en: "Maha Tiered Chandelier", ar: "ثريا مها المتدرجة" },
    shortTitle: { en: "Maha Tiered", ar: "مها" },
    family: "lighting",
    category: "chandeliers",
    price: 268000,
    finishLabel: { en: "Aged bronze · Alabaster", ar: "برونز معتّق · ألاباستر" },
    availability: "made-to-order",
    rating: 4.9,
    reviewCount: 14,
    rooms: ["dining-room", "entrance-hallway", "hospitality"],
    materials: ["brass", "alabaster"],
    finishes: ["aged-bronze", "antique-brass", "blackened-brass"],
    colours: ["ivory", "amber"],
    technical: ["dimmable", "smart"],
    diameterCm: 130,
    dropCm: 220,
    lights: 12,
    weightKg: 28.5,
    leadWeeks: [8, 11],
    shot: { en: "tiered chandelier, three-quarter", ar: "ثريا متدرجة، زاوية ثلاثة أرباع" },
    shotAlt: { en: "dining room, chandelier lit", ar: "غرفة طعام، الثريا مضاءة" },
    summary: {
      en: "Two tiers of carved alabaster on an aged bronze frame, engineered so the lower ring can be lit alone.",
      ar: "طبقتان من الألاباستر المنحوت على هيكل برونزي معتّق، مصممتان بحيث يمكن إضاءة الحلقة السفلية وحدها.",
    },
    releasedAt: "2025-05-18",
    relatedSlugs: ["thurayya-seven-chandelier", "orion-cascade-chandelier", "sahra-dining-table"],
  },

  /* ------------------------------------------------------------------ pendants */
  {
    slug: "nocturne-pendant",
    title: { en: "Nocturne Pendant", ar: "نوكتيرن المعلقة" },
    shortTitle: { en: "Nocturne", ar: "نوكتيرن" },
    family: "lighting",
    category: "pendant-lights",
    collection: "nocturne",
    price: 46500,
    finishLabel: { en: "Smoked glass · Brass", ar: "زجاج دخاني · نحاس" },
    availability: "ready-to-ship",
    rating: 4.8,
    reviewCount: 62,
    rooms: ["kitchen", "dining-room", "living-room"],
    materials: ["brass", "glass"],
    finishes: ["antique-brass", "blackened-brass", "brushed-brass"],
    colours: ["smoke", "amber"],
    technical: ["dimmable"],
    diameterCm: 34,
    dropCm: 120,
    lights: 1,
    weightKg: 3.8,
    leadWeeks: [1, 1],
    shot: { en: "pendant, three-quarter", ar: "معلقة، زاوية ثلاثة أرباع" },
    shotAlt: { en: "pendant above island", ar: "معلقة فوق جزيرة المطبخ" },
    summary: {
      en: "Smoked glass over a brass collar. Hung in threes over an island; hung alone over a reading chair.",
      ar: "زجاج دخاني فوق طوق نحاسي. تُعلَّق ثلاثاً فوق جزيرة المطبخ، وواحدة فوق كرسي القراءة.",
    },
    isBestSeller: true,
    releasedAt: "2025-03-08",
    relatedSlugs: ["qamar-dome-pendant", "warm-led-bulbs", "hilal-crescent-pendant"],
  },
  {
    slug: "qamar-dome-pendant",
    title: { en: "Qamar Dome Pendant", ar: "قمر القبّية المعلقة" },
    shortTitle: { en: "Qamar Dome", ar: "قمر" },
    family: "lighting",
    category: "pendant-lights",
    collection: "celestial",
    price: 38400,
    finishLabel: { en: "Brushed brass · Opal glass", ar: "نحاس مصنفر · زجاج أوبال" },
    availability: "ready-to-ship",
    rating: 4.7,
    reviewCount: 47,
    rooms: ["kitchen", "dining-room", "bedroom"],
    materials: ["brass", "glass"],
    finishes: ["brushed-brass", "antique-brass", "brushed-nickel"],
    colours: ["ivory", "clear"],
    technical: ["dimmable", "smart"],
    diameterCm: 40,
    dropCm: 110,
    lights: 1,
    weightKg: 4.2,
    leadWeeks: [1, 1],
    shot: { en: "dome pendant, underside", ar: "معلقة قبّية، من الأسفل" },
    shotAlt: { en: "kitchen island, morning", ar: "جزيرة المطبخ، صباحاً" },
    summary: {
      en: "A brushed brass dome with an opal disc set flush in the mouth, so the source never shows from a standing height.",
      ar: "قبّة نحاسية مصنفرة بقرص أوبال مثبّت في فوهتها، فلا يظهر مصدر الضوء من ارتفاع الوقوف.",
    },
    releasedAt: "2025-07-22",
    relatedSlugs: ["nocturne-pendant", "sidra-linear-suspension", "warm-led-bulbs"],
  },
  {
    slug: "hilal-crescent-pendant",
    title: { en: "Hilal Crescent Pendant", ar: "هلال المعلقة" },
    shortTitle: { en: "Hilal Crescent", ar: "هلال" },
    family: "lighting",
    category: "pendant-lights",
    price: 52800,
    finishLabel: { en: "Antique brass · Alabaster", ar: "نحاس عتيق · ألاباستر" },
    availability: "made-to-order",
    rating: 4.8,
    reviewCount: 21,
    rooms: ["entrance-hallway", "living-room", "hospitality"],
    materials: ["brass", "alabaster"],
    finishes: ["antique-brass", "aged-bronze"],
    colours: ["ivory"],
    technical: ["dimmable"],
    diameterCm: 56,
    dropCm: 150,
    lights: 2,
    weightKg: 6.1,
    leadWeeks: [4, 6],
    shot: { en: "crescent pendant, lit edge", ar: "معلقة هلالية، حافة مضاءة" },
    shotAlt: { en: "entrance hall, double height", ar: "بهو المدخل، ارتفاع مزدوج" },
    summary: {
      en: "A carved alabaster crescent lit from within its thicker edge, so the stone reads warm even at low output.",
      ar: "هلال ألاباستر منحوت يُضاء من حافته السميكة، فيبدو الحجر دافئاً حتى عند الإضاءة الخافتة.",
    },
    isNew: true,
    releasedAt: "2026-05-30",
    relatedSlugs: ["alabaster-wall-light", "nocturne-pendant", "dune-alabaster-lamp"],
  },
  {
    slug: "anbar-cluster-pendant",
    title: { en: "Anbar Cluster Pendant", ar: "عنبر العنقودية المعلقة" },
    shortTitle: { en: "Anbar Cluster", ar: "عنبر" },
    family: "lighting",
    category: "pendant-lights",
    collection: "nocturne",
    price: 74500,
    finishLabel: { en: "Blackened brass · Amber glass", ar: "نحاس مسوّد · زجاج كهرماني" },
    availability: "made-to-order",
    rating: 4.6,
    reviewCount: 17,
    rooms: ["dining-room", "living-room", "hospitality"],
    materials: ["brass", "glass"],
    finishes: ["blackened-brass", "antique-brass"],
    colours: ["amber", "smoke"],
    technical: ["dimmable"],
    diameterCm: 62,
    dropCm: 130,
    lights: 9,
    weightKg: 8.7,
    leadWeeks: [5, 7],
    shot: { en: "cluster pendant, nine globes", ar: "عنقود معلق، تسع كرات" },
    shotAlt: { en: "restaurant table, evening", ar: "طاولة مطعم، مساءً" },
    summary: {
      en: "Nine hand-blown amber globes hung at staggered heights from one blackened plate.",
      ar: "تسع كرات كهرمانية منفوخة يدوياً معلقة على ارتفاعات متفاوتة من لوح مسوّد واحد.",
    },
    releasedAt: "2025-12-02",
    relatedSlugs: ["nocturne-pendant", "samt-column-lamp", "sidra-linear-suspension"],
  },

  /* ------------------------------------------------------------ ceiling lights */
  {
    slug: "nour-ceiling-flush",
    title: { en: "Nour Ceiling Flush", ar: "نور الملاصقة" },
    shortTitle: { en: "Nour Flush", ar: "نور" },
    family: "lighting",
    category: "ceiling-lights",
    collection: "alabaster",
    price: 21500,
    finishLabel: { en: "Alabaster · Brass ring", ar: "ألاباستر · حلقة نحاسية" },
    availability: "ready-to-ship",
    rating: 4.7,
    reviewCount: 54,
    rooms: ["bedroom", "entrance-hallway", "bathroom"],
    materials: ["alabaster", "brass"],
    finishes: ["antique-brass", "brushed-brass", "brushed-nickel"],
    colours: ["ivory"],
    technical: ["dimmable", "low-ceiling"],
    diameterCm: 38,
    dropCm: 11,
    lights: 2,
    weightKg: 4.6,
    leadWeeks: [1, 1],
    shot: { en: "flush ceiling light", ar: "إضاءة سقف ملاصقة" },
    shotAlt: { en: "low-ceiling bedroom", ar: "غرفة نوم بسقف منخفض" },
    summary: {
      en: "Eleven centimetres deep, so it works under a 2.4 m ceiling without cutting the room in half.",
      ar: "بعمق أحد عشر سنتيمتراً فقط، فتعمل تحت سقف ٢٫٤ متر دون أن تقسم الغرفة.",
    },
    releasedAt: "2025-02-11",
    relatedSlugs: ["sahn-ceiling-plate", "alabaster-wall-light", "warm-led-bulbs"],
  },
  {
    slug: "sahn-ceiling-plate",
    title: { en: "Sahn Ceiling Plate", ar: "صحن السقفية" },
    shortTitle: { en: "Sahn Plate", ar: "صحن" },
    family: "lighting",
    category: "ceiling-lights",
    collection: "modern-heritage",
    price: 27800,
    finishLabel: { en: "Perforated brass · Opal", ar: "نحاس مخرّم · أوبال" },
    availability: "ready-to-ship",
    rating: 4.6,
    reviewCount: 28,
    rooms: ["entrance-hallway", "kitchen", "bathroom"],
    materials: ["brass", "glass"],
    finishes: ["antique-brass", "blackened-brass"],
    colours: ["ivory", "amber"],
    technical: ["dimmable", "low-ceiling", "ip44"],
    diameterCm: 46,
    dropCm: 13,
    lights: 3,
    weightKg: 5.3,
    leadWeeks: [1, 2],
    shot: { en: "perforated ceiling plate, pattern cast", ar: "صحن سقفي مخرّم، ظل نقشي" },
    shotAlt: { en: "corridor, patterned shadow", ar: "ممر، ظل منقوش" },
    summary: {
      en: "A perforated brass plate that throws a mashrabiya shadow onto the ceiling around it.",
      ar: "لوح نحاسي مخرّم يرسم ظل مشربية على السقف من حوله.",
    },
    releasedAt: "2025-10-06",
    relatedSlugs: ["mashrabiya-wall-sconce", "nour-ceiling-flush", "qandil-table-lamp"],
  },

  /* --------------------------------------------------------------- wall lights */
  {
    slug: "alabaster-wall-light",
    title: { en: "Alabaster Wall Light", ar: "إضاءة الألاباستر الحائطية" },
    shortTitle: { en: "Alabaster Wall Light", ar: "ألاباستر الحائطية" },
    family: "lighting",
    category: "wall-lights",
    collection: "alabaster",
    price: 28900,
    finishLabel: { en: "Hand-carved alabaster", ar: "ألاباستر منحوت يدوياً" },
    availability: "ready-to-ship",
    rating: 4.9,
    reviewCount: 73,
    rooms: ["living-room", "bedroom", "entrance-hallway", "hospitality"],
    materials: ["alabaster", "brass"],
    finishes: ["antique-brass", "brushed-brass"],
    colours: ["ivory"],
    technical: ["dimmable"],
    widthCm: 14,
    depthCm: 9,
    heightCm: 32,
    lights: 1,
    weightKg: 3.1,
    leadWeeks: [1, 1],
    shot: { en: "wall light, lit", ar: "إضاءة حائط، مضاءة" },
    shotAlt: { en: "hallway, evening", ar: "ممر، مساءً" },
    summary: {
      en: "A single carved block that grazes the wall above and below it. Sold singly; specified in pairs more often than not.",
      ar: "كتلة منحوتة واحدة تلامس الجدار أعلاها وأسفلها. تُباع منفردة، وتُطلب غالباً في أزواج.",
    },
    isBestSeller: true,
    releasedAt: "2024-11-14",
    relatedSlugs: ["thurayya-seven-chandelier", "rida-linear-sconce", "dune-alabaster-lamp"],
  },
  {
    slug: "mashrabiya-wall-sconce",
    title: { en: "Mashrabiya Wall Sconce", ar: "مشربية الحائطية" },
    shortTitle: { en: "Mashrabiya Sconce", ar: "مشربية" },
    family: "lighting",
    category: "wall-lights",
    collection: "modern-heritage",
    price: 24700,
    finishLabel: { en: "Perforated brass", ar: "نحاس مخرّم" },
    availability: "ready-to-ship",
    rating: 4.8,
    reviewCount: 41,
    rooms: ["entrance-hallway", "living-room", "hospitality"],
    materials: ["brass"],
    finishes: ["antique-brass", "blackened-brass", "aged-bronze"],
    colours: ["amber", "onyx"],
    technical: ["dimmable"],
    widthCm: 12,
    depthCm: 10,
    heightCm: 36,
    lights: 1,
    weightKg: 2.4,
    leadWeeks: [1, 2],
    shot: { en: "sconce, wall grazing light", ar: "وحدة حائط، ضوء ملامس" },
    shotAlt: { en: "corridor, patterned shadow", ar: "ممر، ظل منقوش" },
    summary: {
      en: "A brass lantern pierced with a contemporary reading of a mashrabiya screen. The pattern is the light.",
      ar: "فانوس نحاسي مخرّم بقراءة معاصرة لنقش المشربية. النقش هنا هو الضوء نفسه.",
    },
    releasedAt: "2025-01-30",
    relatedSlugs: ["sahn-ceiling-plate", "qandil-table-lamp", "alabaster-wall-light"],
  },
  {
    slug: "rida-linear-sconce",
    title: { en: "Rida Linear Sconce", ar: "رِدا الخطية الحائطية" },
    shortTitle: { en: "Rida Sconce", ar: "رِدا" },
    family: "lighting",
    category: "wall-lights",
    price: 19800,
    finishLabel: { en: "Brushed brass · Linen", ar: "نحاس مصنفر · كتّان" },
    availability: "ready-to-ship",
    rating: 4.5,
    reviewCount: 33,
    rooms: ["bedroom", "living-room", "bathroom"],
    materials: ["brass", "linen"],
    finishes: ["brushed-brass", "brushed-nickel", "blackened-brass"],
    colours: ["ivory"],
    technical: ["dimmable", "ip44"],
    widthCm: 8,
    depthCm: 11,
    heightCm: 44,
    lights: 1,
    weightKg: 1.9,
    leadWeeks: [1, 1],
    shot: { en: "linear sconce beside a bed", ar: "وحدة حائط خطية بجانب السرير" },
    shotAlt: { en: "bedside, warm glow", ar: "جانب السرير، توهج دافئ" },
    summary: {
      en: "A reading light narrow enough for a bedside wall, with the switch on the underside where your hand lands.",
      ar: "ضوء قراءة نحيف يناسب جدار السرير، ومفتاحه أسفله حيث تصل يدك.",
    },
    releasedAt: "2025-04-25",
    relatedSlugs: ["alabaster-wall-light", "qandil-table-lamp", "nour-ceiling-flush"],
  },

  /* --------------------------------------------------------------- floor lamps */
  {
    slug: "meridian-floor-lamp",
    title: { en: "Meridian Floor Lamp", ar: "أباجورة ميريديان الأرضية" },
    shortTitle: { en: "Meridian", ar: "ميريديان" },
    family: "lighting",
    category: "floor-lamps",
    price: 62000,
    finishLabel: { en: "Patinated brass · Linen", ar: "نحاس معتّق · كتّان" },
    availability: "pre-order",
    rating: 4.7,
    reviewCount: 26,
    rooms: ["living-room", "bedroom"],
    materials: ["brass", "linen", "marble"],
    finishes: ["antique-brass", "aged-bronze", "blackened-brass"],
    colours: ["ivory"],
    technical: ["dimmable"],
    widthCm: 42,
    depthCm: 42,
    heightCm: 168,
    lights: 1,
    weightKg: 12.4,
    leadWeeks: [7, 9],
    shot: { en: "floor lamp, full height", ar: "أباجورة أرضية، ارتفاع كامل" },
    shotAlt: { en: "reading corner", ar: "ركن القراءة" },
    summary: {
      en: "A straight brass stem on a marble puck, with a linen shade that can be angled by hand and stays where you leave it.",
      ar: "ساق نحاسية مستقيمة على قاعدة رخامية، بأباجورة كتّانية تُمال باليد وتبقى حيث تتركها.",
    },
    isNew: true,
    releasedAt: "2026-07-01",
    relatedSlugs: ["atlas-arc-floor-lamp", "nadi-lounge-chair", "travertine-table-lamp"],
  },
  {
    slug: "atlas-arc-floor-lamp",
    title: { en: "Atlas Arc Floor Lamp", ar: "أباجورة أطلس المقوّسة" },
    shortTitle: { en: "Atlas Arc", ar: "أطلس" },
    family: "lighting",
    category: "floor-lamps",
    price: 74000,
    finishLabel: { en: "Patinated brass · Marble base", ar: "نحاس معتّق · قاعدة رخام" },
    availability: "made-to-order",
    rating: 4.8,
    reviewCount: 18,
    rooms: ["living-room", "hospitality"],
    materials: ["brass", "marble"],
    finishes: ["antique-brass", "blackened-brass"],
    colours: ["ivory", "onyx"],
    technical: ["dimmable"],
    widthCm: 152,
    depthCm: 38,
    heightCm: 196,
    lights: 1,
    weightKg: 24,
    leadWeeks: [6, 8],
    shot: { en: "arc floor lamp", ar: "أباجورة أرضية مقوّسة" },
    shotAlt: { en: "seating group, evening", ar: "مجموعة جلوس، مساءً" },
    summary: {
      en: "A 1.5-metre arc that reaches over a sofa without a ceiling fixing — for rented rooms and concrete slabs alike.",
      ar: "قوس بطول متر ونصف يمتد فوق الكنبة دون تثبيت في السقف — للغرف المستأجرة والأسقف الخرسانية معاً.",
    },
    releasedAt: "2025-08-19",
    relatedSlugs: ["meridian-floor-lamp", "nadi-lounge-chair", "thurayya-cluster-rug"],
  },
  {
    slug: "samt-column-lamp",
    title: { en: "Samt Column Floor Lamp", ar: "أباجورة صمت العمودية" },
    shortTitle: { en: "Samt Column", ar: "صمت" },
    family: "lighting",
    category: "floor-lamps",
    collection: "nocturne",
    price: 43500,
    finishLabel: { en: "Blackened brass · Ribbed glass", ar: "نحاس مسوّد · زجاج مضلّع" },
    availability: "ready-to-ship",
    rating: 4.6,
    reviewCount: 22,
    rooms: ["living-room", "entrance-hallway", "bedroom"],
    materials: ["brass", "glass"],
    finishes: ["blackened-brass", "aged-bronze"],
    colours: ["smoke", "amber"],
    technical: ["dimmable"],
    widthCm: 22,
    depthCm: 22,
    heightCm: 142,
    lights: 1,
    weightKg: 9.8,
    leadWeeks: [1, 2],
    shot: { en: "column floor lamp, lit", ar: "أباجورة عمودية، مضاءة" },
    shotAlt: { en: "hallway corner, night", ar: "ركن الممر، ليلاً" },
    summary: {
      en: "A lit column rather than a lamp: ribbed glass over a full-height source, dimmed to almost nothing after midnight.",
      ar: "عمود مضاء أكثر منه أباجورة: زجاج مضلّع فوق مصدر بكامل الارتفاع، يُخفَّت إلى حدّ الغياب بعد منتصف الليل.",
    },
    releasedAt: "2025-06-12",
    relatedSlugs: ["anbar-cluster-pendant", "atlas-arc-floor-lamp", "nujum-side-table"],
  },

  /* --------------------------------------------------------------- table lamps */
  {
    slug: "travertine-table-lamp",
    title: { en: "Travertine Table Lamp", ar: "أباجورة الترافرتين" },
    shortTitle: { en: "Travertine Lamp", ar: "ترافرتين" },
    family: "lighting",
    category: "table-lamps",
    price: 19600,
    finishLabel: { en: "Travertine · Linen shade", ar: "ترافرتين · أباجورة كتّان" },
    availability: "made-to-order",
    rating: 4.7,
    reviewCount: 36,
    rooms: ["bedroom", "living-room", "entrance-hallway"],
    materials: ["travertine", "linen"],
    finishes: ["antique-brass", "brushed-brass"],
    colours: ["ivory"],
    technical: ["dimmable"],
    widthCm: 34,
    depthCm: 34,
    heightCm: 52,
    lights: 1,
    weightKg: 6.9,
    leadWeeks: [4, 5],
    shot: { en: "table lamp on console", ar: "أباجورة على كونسول" },
    shotAlt: { en: "bedside, warm glow", ar: "جانب السرير، توهج دافئ" },
    summary: {
      en: "A honed travertine block with a linen drum. Heavy enough that it never needs straightening.",
      ar: "كتلة ترافرتين مصنفرة بأباجورة كتّانية أسطوانية. ثقيلة بما يكفي فلا تحتاج تعديلاً أبداً.",
    },
    releasedAt: "2025-05-02",
    relatedSlugs: ["layl-travertine-console", "dune-alabaster-lamp", "rida-linear-sconce"],
  },
  {
    slug: "qandil-table-lamp",
    title: { en: "Qandil Table Lamp", ar: "أباجورة قنديل" },
    shortTitle: { en: "Qandil", ar: "قنديل" },
    family: "lighting",
    category: "table-lamps",
    collection: "modern-heritage",
    price: 16400,
    finishLabel: { en: "Antique brass · Amber glass", ar: "نحاس عتيق · زجاج كهرماني" },
    availability: "ready-to-ship",
    rating: 4.5,
    reviewCount: 44,
    rooms: ["bedroom", "living-room"],
    materials: ["brass", "glass"],
    finishes: ["antique-brass", "aged-bronze"],
    colours: ["amber"],
    technical: ["dimmable"],
    widthCm: 20,
    depthCm: 20,
    heightCm: 41,
    lights: 1,
    weightKg: 2.7,
    leadWeeks: [1, 1],
    shot: { en: "small brass lamp, amber glass", ar: "أباجورة نحاسية صغيرة، زجاج كهرماني" },
    shotAlt: { en: "bedside table, night", ar: "طاولة السرير، ليلاً" },
    summary: {
      en: "The smallest thing we make, and the one most often bought in pairs.",
      ar: "أصغر ما نصنع، وأكثر ما يُشترى في أزواج.",
    },
    releasedAt: "2024-12-09",
    relatedSlugs: ["mashrabiya-wall-sconce", "travertine-table-lamp", "warm-led-bulbs"],
  },
  {
    slug: "dune-alabaster-lamp",
    title: { en: "Dune Alabaster Table Lamp", ar: "أباجورة ديون من الألاباستر" },
    shortTitle: { en: "Dune Lamp", ar: "ديون" },
    family: "lighting",
    category: "table-lamps",
    collection: "alabaster",
    price: 23900,
    finishLabel: { en: "Hand-carved alabaster", ar: "ألاباستر منحوت يدوياً" },
    availability: "ready-to-ship",
    rating: 4.8,
    reviewCount: 31,
    rooms: ["bedroom", "living-room", "entrance-hallway"],
    materials: ["alabaster", "brass"],
    finishes: ["brushed-brass", "antique-brass"],
    colours: ["ivory"],
    technical: ["dimmable", "low-ceiling"],
    widthCm: 26,
    depthCm: 26,
    heightCm: 38,
    lights: 1,
    weightKg: 5.4,
    leadWeeks: [1, 2],
    shot: { en: "alabaster lamp, lit from within", ar: "أباجورة ألاباستر مضاءة من الداخل" },
    shotAlt: { en: "console vignette, dusk", ar: "زاوية كونسول، عند الغروب" },
    summary: {
      en: "A solid block hollowed until the veining shows. Every piece is different and none of them are wrong.",
      ar: "كتلة صلبة مُفرّغة حتى يظهر تعرّق الحجر. كل قطعة مختلفة، ولا واحدة منها خطأ.",
    },
    isNew: true,
    releasedAt: "2026-04-16",
    relatedSlugs: ["alabaster-wall-light", "nour-ceiling-flush", "travertine-table-lamp"],
  },

  /* ------------------------------------------------------------------ outdoor */
  {
    slug: "layl-outdoor-column",
    title: { en: "Layl Outdoor Column", ar: "عمود ليل الخارجي" },
    shortTitle: { en: "Layl Column", ar: "ليل" },
    family: "lighting",
    category: "outdoor-lighting",
    price: 34200,
    finishLabel: { en: "Weathered brass · IP65", ar: "نحاس متعتّق · IP65" },
    availability: "ready-to-ship",
    rating: 4.6,
    reviewCount: 29,
    rooms: ["garden-terrace", "hospitality"],
    materials: ["brass", "glass"],
    finishes: ["weathered-brass", "aged-bronze"],
    colours: ["amber", "clear"],
    technical: ["ip44", "dimmable"],
    widthCm: 16,
    depthCm: 16,
    heightCm: 96,
    lights: 1,
    weightKg: 11.6,
    leadWeeks: [1, 2],
    shot: { en: "outdoor column, terrace", ar: "عمود خارجي، التراس" },
    shotAlt: { en: "garden path, night", ar: "ممر الحديقة، ليلاً" },
    summary: {
      en: "Rated IP65 and left unlacquered on purpose — it will go green at the base within two seasons on the North Coast.",
      ar: "بتصنيف IP65 ومتروك بلا طلاء عن قصد — سيخضرّ عند قاعدته خلال موسمين على الساحل الشمالي.",
    },
    releasedAt: "2025-03-27",
    relatedSlugs: ["bahr-wall-lantern", "mashrabiya-wall-sconce", "sahn-ceiling-plate"],
  },
  {
    slug: "bahr-wall-lantern",
    title: { en: "Bahr Outdoor Wall Lantern", ar: "فانوس بحر الحائطي الخارجي" },
    shortTitle: { en: "Bahr Lantern", ar: "بحر" },
    family: "lighting",
    category: "outdoor-lighting",
    price: 18700,
    finishLabel: { en: "Weathered brass · Clear glass", ar: "نحاس متعتّق · زجاج شفاف" },
    availability: "ready-to-ship",
    rating: 4.5,
    reviewCount: 24,
    rooms: ["garden-terrace", "entrance-hallway"],
    materials: ["brass", "glass"],
    finishes: ["weathered-brass", "blackened-brass"],
    colours: ["clear", "amber"],
    technical: ["ip44"],
    widthCm: 15,
    depthCm: 18,
    heightCm: 34,
    lights: 1,
    weightKg: 3.4,
    leadWeeks: [1, 1],
    shot: { en: "wall lantern beside a door", ar: "فانوس حائطي بجانب الباب" },
    shotAlt: { en: "courtyard wall, dusk", ar: "جدار فناء، عند الغروب" },
    summary: {
      en: "A plain lantern for a front door, gasketed and drained so it survives a Cairo winter and a coastal summer.",
      ar: "فانوس بسيط لباب المنزل، بحشوات وتصريف يجعلانه يصمد أمام شتاء القاهرة وصيف الساحل.",
    },
    releasedAt: "2025-02-20",
    relatedSlugs: ["layl-outdoor-column", "sahn-ceiling-plate", "mashrabiya-wall-sconce"],
  },

  /* -------------------------------------------------------------------- smart */
  {
    slug: "safir-smart-pendant",
    title: { en: "Safir Smart Pendant", ar: "سفير المعلقة الذكية" },
    shortTitle: { en: "Safir Smart", ar: "سفير" },
    family: "lighting",
    category: "smart-lighting",
    price: 58000,
    finishLabel: { en: "Brushed brass · Tunable white", ar: "نحاس مصنفر · أبيض متغيّر" },
    availability: "ready-to-ship",
    rating: 4.4,
    reviewCount: 15,
    rooms: ["kitchen", "living-room", "hospitality"],
    materials: ["brass", "glass"],
    finishes: ["brushed-brass", "blackened-brass"],
    colours: ["ivory", "clear"],
    technical: ["smart", "dimmable"],
    diameterCm: 36,
    dropCm: 120,
    lights: 1,
    weightKg: 4.9,
    leadWeeks: [1, 2],
    shot: { en: "smart pendant, tunable white", ar: "معلقة ذكية، أبيض متغيّر" },
    shotAlt: { en: "kitchen island, evening scene", ar: "جزيرة المطبخ، مشهد مسائي" },
    summary: {
      en: "2200–4000K on a Casambi driver, so the same fixture can read candlelit at dinner and workable at breakfast.",
      ar: "من ٢٢٠٠ إلى ٤٠٠٠ كلفن على مشغّل Casambi، فتبدو الوحدة كضوء شمعة على العشاء وضوء عمل على الإفطار.",
    },
    isNew: true,
    releasedAt: "2026-08-04",
    relatedSlugs: ["manzil-scene-controller", "qamar-dome-pendant", "warm-led-bulbs"],
  },
  {
    slug: "manzil-scene-controller",
    title: { en: "Manzil Scene Controller", ar: "وحدة منزل للمشاهد الضوئية" },
    shortTitle: { en: "Manzil Controller", ar: "منزل" },
    family: "lighting",
    category: "smart-lighting",
    price: 9800,
    finishLabel: { en: "Solid brass plate", ar: "لوح نحاس صلب" },
    availability: "ready-to-ship",
    rating: 4.3,
    reviewCount: 12,
    rooms: ["living-room", "bedroom", "hospitality"],
    materials: ["brass"],
    finishes: ["antique-brass", "brushed-brass", "blackened-brass", "brushed-nickel"],
    colours: ["onyx"],
    technical: ["smart"],
    widthCm: 8.6,
    depthCm: 1.2,
    heightCm: 8.6,
    lights: 0,
    weightKg: 0.3,
    leadWeeks: [1, 1],
    shot: { en: "brass scene plate, four scenes", ar: "لوحة نحاسية، أربعة مشاهد" },
    shotAlt: { en: "plaster wall, raking light", ar: "جدار جبسي، ضوء مائل" },
    summary: {
      en: "Four scenes on a solid brass plate, no screens and no app required to turn a light on.",
      ar: "أربعة مشاهد على لوح نحاس صلب، دون شاشات ودون تطبيق لتشغيل الضوء.",
    },
    releasedAt: "2026-01-22",
    relatedSlugs: ["safir-smart-pendant", "warm-led-bulbs", "sidra-linear-suspension"],
  },

  /* -------------------------------------------------------------- accessories */
  {
    slug: "warm-led-bulbs",
    title: { en: "E14 Warm LED Bulbs, set of 7", ar: "لمبات E14 دافئة، طقم ٧" },
    shortTitle: { en: "E14 Warm LED Bulbs", ar: "لمبات E14 دافئة" },
    family: "lighting",
    category: "accessories",
    price: 2450,
    finishLabel: { en: "2700K · dimmable · set of 7", ar: "٢٧٠٠ كلفن · قابلة للتعتيم · طقم ٧" },
    availability: "ready-to-ship",
    rating: 4.9,
    reviewCount: 96,
    rooms: ["living-room", "dining-room", "bedroom", "kitchen"],
    materials: ["glass"],
    finishes: [],
    colours: ["clear", "amber"],
    technical: ["dimmable"],
    lights: 7,
    weightKg: 0.4,
    leadWeeks: [1, 1],
    shot: { en: "bulb set, linen tray", ar: "طقم لمبات، صينية كتّان" },
    shotAlt: { en: "bulb detail, filament", ar: "تفصيل اللمبة، الفتيل" },
    summary: {
      en: "The bulbs we photograph every fixture with. Buy them with a chandelier and the room will look like the catalogue.",
      ar: "اللمبات التي نصوّر بها كل وحدة. اشترِها مع الثريا لتبدو الغرفة كما في الكتالوج.",
    },
    releasedAt: "2024-10-01",
    relatedSlugs: ["thurayya-seven-chandelier", "nocturne-pendant", "manzil-scene-controller"],
  },

  /* ---------------------------------------------------------------- furniture */
  {
    slug: "layl-travertine-console",
    title: { en: "Layl Travertine Console", ar: "كونسول ليل من الترافرتين" },
    shortTitle: { en: "Layl Console", ar: "كونسول ليل" },
    family: "furniture",
    category: "consoles-storage",
    collection: "brass-atelier",
    price: 96000,
    finishLabel: { en: "Walnut · Honed travertine", ar: "جوز · ترافرتين مصنفر" },
    availability: "made-to-order",
    rating: 4.8,
    reviewCount: 16,
    rooms: ["entrance-hallway", "living-room"],
    materials: ["travertine", "walnut", "brass"],
    finishes: ["antique-brass"],
    colours: ["ivory"],
    technical: [],
    widthCm: 180,
    depthCm: 42,
    heightCm: 78,
    weightKg: 62,
    leadWeeks: [8, 10],
    shot: { en: "travertine console, side light", ar: "كونسول ترافرتين، إضاءة جانبية" },
    shotAlt: { en: "entrance hall, mirror above", ar: "بهو المدخل، مرآة أعلاه" },
    summary: {
      en: "A 20 mm travertine slab on a mortise-and-tenon walnut frame, with a brass shadow line where the two meet.",
      ar: "لوح ترافرتين بسماكة ٢٠ مم على هيكل جوز بوصلات نقر ولسان، بخط ظل نحاسي عند التقائهما.",
    },
    isBestSeller: true,
    releasedAt: "2025-09-05",
    relatedSlugs: ["qamar-brass-mirror", "travertine-table-lamp", "nujum-side-table"],
  },
  {
    slug: "sahra-dining-table",
    title: { en: "Sahra Walnut Dining Table", ar: "طاولة صحراء من الجوز" },
    shortTitle: { en: "Sahra Table", ar: "صحراء" },
    family: "furniture",
    category: "tables",
    collection: "brass-atelier",
    price: 168000,
    finishLabel: { en: "Solid walnut · Oiled", ar: "جوز صلب · مزيّت" },
    availability: "made-to-order",
    rating: 4.9,
    reviewCount: 9,
    rooms: ["dining-room", "hospitality"],
    materials: ["walnut", "brass"],
    finishes: ["antique-brass"],
    colours: ["ivory"],
    technical: [],
    widthCm: 260,
    depthCm: 100,
    heightCm: 75,
    weightKg: 94,
    leadWeeks: [9, 12],
    shot: { en: "walnut dining table, raking light", ar: "طاولة طعام جوز، ضوء مائل" },
    shotAlt: { en: "dining room, chandelier above", ar: "غرفة الطعام، ثريا أعلاها" },
    summary: {
      en: "Kiln-dried walnut, oiled rather than lacquered, sized so a 96 cm chandelier sits correctly above it.",
      ar: "جوز مجفف بالفرن، مزيّت لا ملمّع، بمقاس يجعل ثريا ٩٦ سم تجلس فوقه كما ينبغي.",
    },
    releasedAt: "2025-11-28",
    relatedSlugs: ["thurayya-seven-chandelier", "nadi-lounge-chair", "sidra-linear-suspension"],
  },
  {
    slug: "qamar-brass-mirror",
    title: { en: "Qamar Brass Frame Mirror", ar: "مرآة قمر بإطار نحاسي" },
    shortTitle: { en: "Qamar Mirror", ar: "مرآة قمر" },
    family: "furniture",
    category: "mirrors",
    price: 42000,
    finishLabel: { en: "Antique brass · Low-iron glass", ar: "نحاس عتيق · زجاج منخفض الحديد" },
    availability: "ready-to-ship",
    rating: 4.7,
    reviewCount: 21,
    rooms: ["entrance-hallway", "bedroom", "bathroom"],
    materials: ["brass", "glass"],
    finishes: ["antique-brass", "brushed-brass", "blackened-brass"],
    colours: ["clear"],
    technical: [],
    widthCm: 92,
    depthCm: 4,
    heightCm: 92,
    weightKg: 17,
    leadWeeks: [1, 2],
    shot: { en: "round brass mirror on plaster", ar: "مرآة نحاسية دائرية على جبس" },
    shotAlt: { en: "entrance, mirror above console", ar: "المدخل، مرآة فوق الكونسول" },
    summary: {
      en: "A 92 cm circle of low-iron glass in a hand-turned brass frame — hung above a console it works like a second window.",
      ar: "دائرة زجاج منخفض الحديد بقطر ٩٢ سم في إطار نحاسي مخروط يدوياً — فوق الكونسول تعمل كنافذة ثانية.",
    },
    releasedAt: "2025-06-30",
    relatedSlugs: ["layl-travertine-console", "alabaster-wall-light", "travertine-table-lamp"],
  },
  {
    slug: "nadi-lounge-chair",
    title: { en: "Nadi Linen Lounge Chair", ar: "كرسي نادي الكتّاني" },
    shortTitle: { en: "Nadi Chair", ar: "نادي" },
    family: "furniture",
    category: "seating",
    price: 58500,
    finishLabel: { en: "Oiled oak · Belgian linen", ar: "بلوط مزيّت · كتّان بلجيكي" },
    availability: "made-to-order",
    rating: 4.6,
    reviewCount: 13,
    rooms: ["living-room", "bedroom", "hospitality"],
    materials: ["walnut", "linen"],
    finishes: [],
    colours: ["ivory"],
    technical: [],
    widthCm: 72,
    depthCm: 80,
    heightCm: 74,
    weightKg: 18,
    leadWeeks: [7, 9],
    shot: { en: "lounge chair, window light", ar: "كرسي استرخاء، ضوء النافذة" },
    shotAlt: { en: "reading corner with floor lamp", ar: "ركن قراءة مع أباجورة أرضية" },
    summary: {
      en: "Low, wide, and angled for reading rather than conversation. Covers are removable and washable.",
      ar: "منخفض وعريض ومائل للقراءة أكثر منه للحديث. أغطيته قابلة للنزع والغسل.",
    },
    releasedAt: "2025-10-22",
    relatedSlugs: ["meridian-floor-lamp", "thurayya-cluster-rug", "nujum-side-table"],
  },
  {
    slug: "nujum-side-table",
    title: { en: "Nujum Onyx Side Table", ar: "طاولة نجوم الجانبية من الأونيكس" },
    shortTitle: { en: "Nujum Side Table", ar: "نجوم" },
    family: "furniture",
    category: "tables",
    price: 31500,
    finishLabel: { en: "Onyx marble · Blackened brass", ar: "رخام أونيكس · نحاس مسوّد" },
    availability: "ready-to-ship",
    rating: 4.5,
    reviewCount: 18,
    rooms: ["living-room", "bedroom"],
    materials: ["marble", "brass"],
    finishes: ["blackened-brass", "antique-brass"],
    colours: ["onyx"],
    technical: [],
    widthCm: 42,
    depthCm: 42,
    heightCm: 52,
    weightKg: 14,
    leadWeeks: [1, 2],
    shot: { en: "side table, onyx top", ar: "طاولة جانبية، سطح أونيكس" },
    shotAlt: { en: "beside a linen chair", ar: "بجانب كرسي كتّاني" },
    summary: {
      en: "A small dark table that takes a lamp, a glass and nothing else.",
      ar: "طاولة صغيرة داكنة تتسع لأباجورة وكوب ولا شيء آخر.",
    },
    releasedAt: "2025-07-15",
    relatedSlugs: ["nadi-lounge-chair", "samt-column-lamp", "layl-travertine-console"],
  },
  {
    slug: "thurayya-cluster-rug",
    title: { en: "Thurayyā Cluster Rug", ar: "سجادة ثريا العنقودية" },
    shortTitle: { en: "Cluster Rug", ar: "سجادة ثريا" },
    family: "furniture",
    category: "rugs-accessories",
    collection: "celestial",
    price: 46800,
    finishLabel: { en: "Hand-knotted wool · 200 × 300 cm", ar: "صوف معقود يدوياً · ٢٠٠ × ٣٠٠ سم" },
    availability: "made-to-order",
    rating: 4.7,
    reviewCount: 10,
    rooms: ["living-room", "bedroom"],
    materials: ["wool"],
    finishes: [],
    colours: ["ivory", "onyx"],
    technical: [],
    widthCm: 200,
    depthCm: 300,
    heightCm: 1.4,
    weightKg: 21,
    leadWeeks: [10, 14],
    shot: { en: "wool rug, raking light", ar: "سجادة صوف، ضوء مائل" },
    shotAlt: { en: "living room floor, morning", ar: "أرضية غرفة المعيشة، صباحاً" },
    summary: {
      en: "The seven-star cluster drawn once, at floor scale, in undyed and charcoal wool.",
      ar: "مجموعة النجوم السبعة مرسومة مرة واحدة بمقياس الأرضية، بصوف طبيعي وفحمي.",
    },
    releasedAt: "2026-03-11",
    relatedSlugs: ["nadi-lounge-chair", "atlas-arc-floor-lamp", "layl-travertine-console"],
  },
];

/* ==========================================================================
   Derivation
   ========================================================================== */

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const arNum = (n: number | string) =>
  String(n).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);

function shotsFor(seed: Seed): Shot[] {
  const isFurniture = seed.family === "furniture";
  return [
    {
      id: "hero",
      kind: "hero",
      tone: 1,
      label: {
        en: `hero — ${seed.shot.en} on ivory, 1600x2000`,
        ar: `الصورة الرئيسية — ${seed.shot.ar} على خلفية عاجية، ١٦٠٠×٢٠٠٠`,
      },
    },
    {
      id: "detail",
      kind: "detail",
      tone: 2,
      label: {
        en: isFurniture
          ? "detail — joint and edge profile, macro"
          : "detail — brass arm and cup junction, macro",
        ar: isFurniture ? "تفصيل — الوصلة وحافة السطح، لقطة قريبة" : "تفصيل — الذراع النحاسية ونقطة الالتقاء",
      },
    },
    {
      id: "lit",
      kind: "lit",
      tone: 3,
      label: {
        en: isFurniture ? "surface — raking light across the top" : "lit — at night, warm 2700K",
        ar: isFurniture ? "السطح — ضوء مائل عبر الوجه" : "مضاءة — ليلاً، ٢٧٠٠ كلفن دافئ",
      },
    },
    {
      id: "video",
      kind: "video",
      tone: 2,
      label: {
        en: "video — 12s rotation, muted loop",
        ar: "فيديو — دوران ١٢ ثانية، تكرار صامت",
      },
    },
    {
      id: "lifestyle",
      kind: "lifestyle",
      tone: 3,
      label: { en: `lifestyle — ${seed.shotAlt.en}`, ar: `أجواء — ${seed.shotAlt.ar}` },
    },
    {
      id: "scale",
      kind: "scale",
      tone: 1,
      label: {
        en: "scale — dimension overlay drawing",
        ar: "المقياس — رسم بالأبعاد",
      },
    },
  ];
}

function finishOptionsFor(seed: Seed): FinishOption[] {
  return seed.finishes
    .map((value) => FINISHES.find((f) => f.value === value))
    .filter((f): f is (typeof FINISHES)[number] => Boolean(f))
    .map((f) => ({ id: f.value, name: f.label, hex: f.hex }));
}

function sizeOptionsFor(seed: Seed): SizeOption[] {
  /* Lighting with a diameter gets three stocked sizes plus a custom slot. */
  if (seed.diameterCm && seed.family === "lighting") {
    const d = seed.diameterCm;
    const l = seed.lights ?? 1;
    const drop = seed.dropCm ?? 120;
    const steps: { d: number; l: number; drop: number; factor: number }[] = [
      { d: Math.round(d * 0.73), l: Math.max(1, Math.round(l * 0.7)), drop: Math.round(drop * 0.75), factor: 0.72 },
      { d, l, drop, factor: 1 },
      { d: Math.round(d * 1.35), l: Math.round(l * 1.3), drop: Math.round(drop * 1.38), factor: 1.35 },
    ];
    const sized = steps.map((s, i) => ({
      id: `size-${i + 1}`,
      label: { en: `Ø ${s.d} cm`, ar: `قطر ${arNum(s.d)} سم` },
      sub: {
        en: `${s.l} ${s.l === 1 ? "light" : "lights"} · ${(s.drop / 100).toFixed(1)}m drop`,
        ar: `${arNum(s.l)} ${s.l === 1 ? "نقطة ضوء" : "نقاط ضوء"} · ارتفاع ${arNum((s.drop / 100).toFixed(1))} م`,
      },
      price: Math.round((seed.price * s.factor) / 100) * 100,
    }));
    return [
      ...sized,
      {
        id: "size-custom",
        label: { en: "Custom", ar: "خاص" },
        sub: { en: "Made to your ceiling", ar: "يُصنع على مقاس سقفك" },
        price: null,
      },
    ];
  }

  /* Everything else ships in one size, with a bespoke option where it makes sense. */
  const dims =
    seed.widthCm && seed.heightCm
      ? {
          en: `W ${seed.widthCm} · D ${seed.depthCm ?? "—"} · H ${seed.heightCm} cm`,
          ar: `عرض ${arNum(seed.widthCm)} · عمق ${arNum(seed.depthCm ?? 0)} · ارتفاع ${arNum(seed.heightCm)} سم`,
        }
      : { en: "One size", ar: "مقاس واحد" };

  const base: SizeOption = {
    id: "size-standard",
    label: { en: "Standard", ar: "قياسي" },
    sub: dims,
    price: seed.price,
  };

  if (seed.category === "accessories" || seed.category === "smart-lighting") return [base];

  return [
    base,
    {
      id: "size-custom",
      label: { en: "Custom", ar: "خاص" },
      sub: { en: "Made to your dimensions", ar: "يُصنع بمقاساتك" },
      price: null,
    },
  ];
}

function specsFor(seed: Seed): SpecRow[] {
  const rows: SpecRow[] = [];
  const push = (en: string, enV: string, ar: string, arV: string) =>
    rows.push({ k: { en, ar }, v: { en: enV, ar: arV } });

  if (seed.family === "lighting" && (seed.lights ?? 0) > 0) {
    const w = seed.category === "accessories" ? 5 : 5;
    const total = (seed.lights ?? 1) * w;
    push("Wattage", `${seed.lights} × ${w}W max (${total}W total)`, "القدرة", `${arNum(seed.lights ?? 1)} × ${arNum(w)} واط (الإجمالي ${arNum(total)} واط)`);
    push("Bulb type", "E14 candle, LED", "نوع اللمبة", "E14 شمعة، LED");
    push("Light source", "Replaceable bulb", "مصدر الضوء", "لمبة قابلة للاستبدال");
    push("Colour temperature", "2700K recommended", "درجة حرارة اللون", "٢٧٠٠ كلفن موصى بها");
  }

  if (seed.technical.includes("dimmable")) {
    push("Dimmable", "Yes — trailing edge", "قابل للتعتيم", "نعم — تعتيم خلفي");
  }
  if (seed.technical.includes("smart")) {
    push("Control", "Casambi / DALI-2 compatible", "التحكم", "متوافق مع Casambi / DALI-2");
  }
  push(
    "IP rating",
    seed.technical.includes("ip44") ? "IP65 (outdoor rated)" : "IP20 (indoor)",
    "تصنيف الحماية",
    seed.technical.includes("ip44") ? "IP65 (للخارج)" : "IP20 (للداخل)",
  );

  if (seed.family === "lighting") {
    push("Voltage", "220–240V · 50Hz", "الجهد", "٢٢٠–٢٤٠ فولت · ٥٠ هرتز");
  }

  if (seed.diameterCm) {
    push("Diameter", `Ø ${seed.diameterCm} cm`, "القطر", `${arNum(seed.diameterCm)} سم`);
  }
  if (seed.dropCm) {
    push(
      "Drop",
      `${seed.dropCm} cm standard, adjustable 60–260 cm`,
      "الارتفاع",
      `${arNum(seed.dropCm)} سم قياسي، قابل للضبط ٦٠–٢٦٠ سم`,
    );
  }
  if (seed.widthCm && seed.heightCm) {
    push(
      "Dimensions",
      `W ${seed.widthCm} · D ${seed.depthCm ?? "—"} · H ${seed.heightCm} cm`,
      "الأبعاد",
      `عرض ${arNum(seed.widthCm)} · عمق ${arNum(seed.depthCm ?? 0)} · ارتفاع ${arNum(seed.heightCm)} سم`,
    );
  }
  if (seed.weightKg) {
    push("Weight", `${seed.weightKg} kg`, "الوزن", `${arNum(seed.weightKg)} كجم`);
  }
  if (seed.family === "lighting") {
    push("Cable", "Braided silk, 3m supplied", "الكابل", "حرير مضفور، ٣ أمتار");
  }
  push("Certification", "CE · RoHS", "الشهادات", "CE · RoHS");

  const [a, b] = seed.leadWeeks ?? [4, 6];
  push(
    "Lead time",
    a === b ? `${a} week` : `${a}–${b} weeks`,
    "مدة التنفيذ",
    a === b ? `${arNum(a)} أسبوع` : `${arNum(a)}–${arNum(b)} أسبوع`,
  );

  return rows;
}

function sectionsFor(seed: Seed): Section[] {
  const lighting = seed.family === "lighting";
  const [a, b] = seed.leadWeeks ?? [4, 6];

  const sections: Section[] = [
    {
      id: "description",
      title: { en: "Description", ar: "الوصف" },
      body: {
        en: `${seed.summary.en} Every unit is assembled, lit, levelled and signed by one maker before it is crated, and the fixing point is adjusted on site to suit your ceiling.`,
        ar: `${seed.summary.ar} تُجمَّع كل وحدة وتُضاء وتُسوّى وتُوقَّع على يد صانع واحد قبل التغليف، وتُضبط نقطة التثبيت في الموقع بما يناسب سقفك.`,
      },
    },
    {
      id: "materials",
      title: { en: "Materials & Finish", ar: "المواد والتشطيب" },
      body: {
        en: "Sand-cast brass, patinated and sealed with a matte lacquer rated for coastal and Gulf humidity. Stone is hand-selected block by block — veining varies piece to piece and is not considered a fault. Internal wiring is braided silk over PTFE.",
        ar: "نحاس مسبوك بالرمل، معتّق ومغلق بطلاء مطفي مصنّف لرطوبة السواحل والخليج. يُنتقى الحجر كتلة كتلة — ويختلف التعرّق من قطعة لأخرى ولا يُعد عيباً. الأسلاك الداخلية حرير مضفور فوق PTFE.",
      },
    },
    {
      id: "dimensions",
      title: { en: "Dimensions", ar: "الأبعاد" },
      body: {
        en: seed.diameterCm
          ? `Ø ${seed.diameterCm} cm · standard drop ${seed.dropCm ?? 160} cm, adjustable 60–260 cm · ceiling rose Ø 18 cm · weight ${seed.weightKg ?? "—"} kg. Full dimensioned drawing and DWG available on request.`
          : `W ${seed.widthCm ?? "—"} · D ${seed.depthCm ?? "—"} · H ${seed.heightCm ?? "—"} cm · weight ${seed.weightKg ?? "—"} kg. Full dimensioned drawing and DWG available on request.`,
        ar: seed.diameterCm
          ? `القطر ${arNum(seed.diameterCm)} سم · الارتفاع القياسي ${arNum(seed.dropCm ?? 160)} سم، قابل للضبط ٦٠–٢٦٠ سم · قاعدة السقف ١٨ سم · الوزن ${arNum(seed.weightKg ?? 0)} كجم. الرسم الكامل بالأبعاد وملف DWG متاحان عند الطلب.`
          : `عرض ${arNum(seed.widthCm ?? 0)} · عمق ${arNum(seed.depthCm ?? 0)} · ارتفاع ${arNum(seed.heightCm ?? 0)} سم · الوزن ${arNum(seed.weightKg ?? 0)} كجم. الرسم الكامل بالأبعاد وملف DWG متاحان عند الطلب.`,
      },
    },
  ];

  if (lighting) {
    sections.push({
      id: "technical",
      title: { en: "Technical Details", ar: "التفاصيل الفنية" },
      body: {
        en: `${seed.lights ?? 1} × E14 · max 5W LED each · 2700K recommended · 220–240V 50Hz · ${
          seed.technical.includes("dimmable") ? "dimmable with trailing-edge dimmers" : "non-dimmable"
        } · ${seed.technical.includes("ip44") ? "IP65" : "IP20"} · CE marked. IES photometric files available to trade.`,
        ar: `${arNum(seed.lights ?? 1)} × E14 · بحد أقصى ٥ واط لكل نقطة · ٢٧٠٠ كلفن موصى بها · ٢٢٠–٢٤٠ فولت ٥٠ هرتز · ${
          seed.technical.includes("dimmable") ? "قابل للتعتيم بمخفتات التعتيم الخلفي" : "غير قابل للتعتيم"
        } · ${seed.technical.includes("ip44") ? "IP65" : "IP20"} · شهادة CE. ملفات IES متاحة للمحترفين.`,
      },
    });
    sections.push({
      id: "installation",
      title: { en: "Installation Guide", ar: "دليل التركيب" },
      body: {
        en: `Professional installation required. The fixed point must support ${Math.max(
          10,
          Math.round((seed.weightKg ?? 5) * 2),
        )} kg. Thurayyā offers installation in Greater Cairo, Alexandria, Dubai, Abu Dhabi and Riyadh; elsewhere we brief your electrician and supply a rigging drawing.`,
        ar: `التركيب يتطلب فنياً محترفاً. يجب أن تتحمل نقطة التثبيت ${arNum(
          Math.max(10, Math.round((seed.weightKg ?? 5) * 2)),
        )} كجم. توفر ثريا التركيب في القاهرة الكبرى والإسكندرية ودبي وأبوظبي والرياض، وفي غيرها نزوّد فنيك بالتعليمات ورسم التثبيت.`,
      },
    });
  }

  sections.push(
    {
      id: "care",
      title: { en: "Care Instructions", ar: "تعليمات العناية" },
      body: {
        en: "Dust brass with a dry microfibre cloth; never use acidic or ammonia-based cleaners. Stone may be wiped with a barely damp cloth. Patina deepens over time — this is intended.",
        ar: "امسح النحاس بقطعة ميكروفايبر جافة، ولا تستخدم منظفات حمضية أو تحتوي على الأمونيا. يمكن مسح الحجر بقطعة رطبة قليلاً. تزداد العتاقة عمقاً مع الوقت — وهذا مقصود.",
      },
    },
    {
      id: "delivery",
      title: { en: "Delivery & Returns", ar: "التوصيل والإرجاع" },
      body: {
        en: `Crated and shipped white-glove. Egypt 5–7 days after production, GCC 10–14 days, international 3–4 weeks. Production takes ${
          a === b ? `${a} week` : `${a}–${b} weeks`
        }. Returns accepted within 14 days of delivery on ready-to-ship items in original crating. Made-to-order and custom pieces are final sale.`,
        ar: `تُغلَّف وتُشحن بخدمة متكاملة. مصر ٥–٧ أيام بعد الإنتاج، الخليج ١٠–١٤ يوماً، دولياً ٣–٤ أسابيع. يستغرق الإنتاج ${
          a === b ? `${arNum(a)} أسبوع` : `${arNum(a)}–${arNum(b)} أسبوع`
        }. يُقبل الإرجاع خلال ١٤ يوماً من التسليم للقطع الجاهزة بتغليفها الأصلي. القطع المصنوعة حسب الطلب والخاصة نهائية.`,
      },
    },
    {
      id: "warranty",
      title: { en: "Warranty", ar: "الضمان" },
      body: {
        en: "Five years on structure and finish, two years on electrical components, registered to your account at purchase. Replacement parts are stocked for the life of the collection.",
        ar: "خمس سنوات على الهيكل والتشطيب، وسنتان على المكونات الكهربائية، مسجلة على حسابك عند الشراء. قطع الغيار متوفرة طوال عمر المجموعة.",
      },
    },
  );

  return sections;
}

const REVIEW_POOL: {
  author: string;
  meta: Localized;
  date: Localized;
  body: Localized;
  rating: number;
  verified: boolean;
  shots: number;
}[] = [
  {
    author: "Nour A.",
    meta: { en: "Verified · New Cairo", ar: "مؤكد · القاهرة الجديدة" },
    date: { en: "March 2026", ar: "مارس ٢٠٢٦" },
    rating: 5,
    verified: true,
    shots: 2,
    body: {
      en: "The alabaster reads warm even unlit. The installation team levelled it in an hour and took the crate away.",
      ar: "يبدو الألاباستر دافئاً حتى وهو مطفأ. سوّى فريق التركيب القطعة في ساعة وأخذ الصندوق معه.",
    },
  },
  {
    author: "Studio Kharouf",
    meta: { en: "Trade account", ar: "حساب محترفين" },
    date: { en: "January 2026", ar: "يناير ٢٠٢٦" },
    rating: 5,
    verified: true,
    shots: 0,
    body: {
      en: "Specified across nine villas. Lead times held and the IES files were accurate, which is rare at this level.",
      ar: "استُخدمت في تسع فيلات. التزمت مدد التنفيذ وكانت ملفات IES دقيقة، وهو أمر نادر في هذا المستوى.",
    },
  },
  {
    author: "Hala M.",
    meta: { en: "Verified · Zamalek", ar: "مؤكد · الزمالك" },
    date: { en: "November 2025", ar: "نوفمبر ٢٠٢٥" },
    rating: 5,
    verified: true,
    shots: 1,
    body: {
      en: "Ordered on a Thursday, delivered the following week, and it looks exactly like the photographs at 2700K.",
      ar: "طلبتها يوم الخميس ووصلت الأسبوع التالي، وتبدو تماماً كالصور عند ٢٧٠٠ كلفن.",
    },
  },
  {
    author: "Karim S.",
    meta: { en: "Verified · Sheikh Zayed", ar: "مؤكد · الشيخ زايد" },
    date: { en: "September 2025", ar: "سبتمبر ٢٠٢٥" },
    rating: 4,
    verified: true,
    shots: 0,
    body: {
      en: "Beautiful object. I would have liked a longer cable in the box, though the studio sent one the same week.",
      ar: "قطعة جميلة. كنت أفضل كابلاً أطول داخل العلبة، رغم أن الاستوديو أرسل واحداً في الأسبوع نفسه.",
    },
  },
  {
    author: "Dana R.",
    meta: { en: "Verified · Dubai", ar: "مؤكد · دبي" },
    date: { en: "June 2026", ar: "يونيو ٢٠٢٦" },
    rating: 5,
    verified: true,
    shots: 2,
    body: {
      en: "Shipped to Dubai crated, arrived without a mark, and customs paperwork was already prepared.",
      ar: "شُحنت إلى دبي مغلّفة ووصلت دون خدش، وكانت مستندات الجمارك جاهزة مسبقاً.",
    },
  },
  {
    author: "Omar H.",
    meta: { en: "Verified · Alexandria", ar: "مؤكد · الإسكندرية" },
    date: { en: "April 2026", ar: "أبريل ٢٠٢٦" },
    rating: 5,
    verified: true,
    shots: 0,
    body: {
      en: "The dimming curve is the best I have used — it goes genuinely low without flickering.",
      ar: "منحنى التعتيم هو الأفضل الذي استخدمته — ينخفض فعلاً دون أي ارتعاش.",
    },
  },
];

function reviewsFor(seed: Seed, index: number): Review[] {
  const a = REVIEW_POOL[index % REVIEW_POOL.length];
  const b = REVIEW_POOL[(index + 2) % REVIEW_POOL.length];
  return [a, b].map((r, i) => ({ id: `${seed.slug}-review-${i + 1}`, ...r }));
}

function questionsFor(seed: Seed): Question[] {
  const by: Localized = { en: "Thurayyā Studio", ar: "استوديو ثريا" };
  const list: Question[] = [];

  if (seed.family === "lighting" && seed.dropCm) {
    list.push({
      id: `${seed.slug}-q1`,
      q: { en: "Can the drop be shortened for a 2.9 m ceiling?", ar: "هل يمكن تقصير الارتفاع لسقف ٢٫٩ متر؟" },
      a: {
        en: "Yes — the cable is field-adjustable between 60 and 260 cm. For a 2.9 m ceiling over a dining table we would set the fixture base at roughly 165 cm from the floor.",
        ar: "نعم — الكابل قابل للضبط في الموقع بين ٦٠ و٢٦٠ سم. لسقف ٢٫٩ متر فوق طاولة طعام نضبط قاعدة الوحدة على نحو ١٦٥ سم من الأرض.",
      },
      by,
    });
  }

  list.push({
    id: `${seed.slug}-q2`,
    q: {
      en: "Is it suitable for a coastal home in Ras El Hekma?",
      ar: "هل تصلح لمنزل ساحلي في رأس الحكمة؟",
    },
    a: {
      en: seed.technical.includes("ip44")
        ? "Yes, including covered outdoor use — it is rated IP65 and the brass is left unlacquered so it patinates evenly in salt air."
        : "Indoors, yes. The lacquer is rated for humid and saline air. For covered outdoor use we would recommend the Layl series at IP65.",
      ar: seed.technical.includes("ip44")
        ? "نعم، بما في ذلك الاستخدام الخارجي المغطى — بتصنيف IP65 والنحاس متروك بلا طلاء ليتعتّق بانتظام في الهواء المالح."
        : "داخلياً نعم. الطلاء مصنّف للهواء الرطب والمالح. للاستخدام الخارجي المغطى نوصي بسلسلة ليل بتصنيف IP65.",
    },
    by,
  });

  list.push({
    id: `${seed.slug}-q3`,
    q: { en: "Do you supply the bulbs?", ar: "هل تُورَّد اللمبات معها؟" },
    a: {
      en: "Not by default. We stock the matched 2700K dimmable set we photograph with — add it to your bag and the room will look like the catalogue.",
      ar: "ليست ضمن التوريد افتراضياً. لدينا الطقم المطابق ٢٧٠٠ كلفن القابل للتعتيم الذي نصوّر به — أضفه إلى حقيبتك لتبدو الغرفة كما في الكتالوج.",
    },
    by,
  });

  return list;
}

function highlightsFor(seed: Seed): Localized[] {
  const out: Localized[] = [
    { en: "Hand-finished in Cairo", ar: "تشطيب يدوي في القاهرة" },
    seed.materials.includes("alabaster")
      ? { en: "Brass & alabaster, no plating", ar: "نحاس وألاباستر، دون طلاء" }
      : { en: "Solid materials, no veneer", ar: "مواد صلبة، دون قشرة" },
    { en: "5-year warranty", ar: "ضمان ٥ سنوات" },
    { en: "Insured crated delivery", ar: "توصيل مغلّف ومؤمَّن" },
  ];
  return out;
}

function leadTimeFor(seed: Seed): Localized {
  const [a, b] = seed.leadWeeks ?? [4, 6];
  if (seed.availability === "ready-to-ship") {
    return { en: "Ready to ship · 3–5 days", ar: "جاهز للشحن · ٣–٥ أيام" };
  }
  return {
    en: a === b ? `Made to order · ${a} week` : `Made to order · ${a}–${b} weeks`,
    ar: a === b ? `يُصنع حسب الطلب · ${arNum(a)} أسبوع` : `يُصنع حسب الطلب · ${arNum(a)}–${arNum(b)} أسبوع`,
  };
}

function buildProduct(seed: Seed, index: number): Product {
  return {
    id: `p-${index + 1}`,
    slug: seed.slug,
    title: seed.title,
    shortTitle: seed.shortTitle,
    family: seed.family,
    category: seed.category,
    collection: seed.collection,
    price: seed.price,
    finishLabel: seed.finishLabel,
    availability: seed.availability,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    rooms: seed.rooms,
    materials: seed.materials,
    finishes: seed.finishes,
    colours: seed.colours,
    technical: seed.technical,
    diameterCm: seed.diameterCm,
    dropCm: seed.dropCm,
    lights: seed.lights,
    leadTime: leadTimeFor(seed),
    summary: seed.summary,
    highlights: highlightsFor(seed),
    shots: shotsFor(seed),
    finishOptions: finishOptionsFor(seed),
    sizeOptions: sizeOptionsFor(seed),
    specs: specsFor(seed),
    sections: sectionsFor(seed),
    reviews: reviewsFor(seed, index),
    questions: questionsFor(seed),
    isNew: seed.isNew ?? false,
    isBestSeller: seed.isBestSeller ?? false,
    releasedAt: seed.releasedAt,
    relatedSlugs: seed.relatedSlugs ?? [],
  };
}

export const PRODUCTS: Product[] = SEEDS.map(buildProduct);

/** The alternate ("hover") card image label, kept next to the seed it came from. */
export const CARD_ALT_SHOT: Record<string, Localized> = Object.fromEntries(
  SEEDS.map((s) => [s.slug, s.shotAlt]),
);

/** The primary card image label. */
export const CARD_SHOT: Record<string, Localized> = Object.fromEntries(
  SEEDS.map((s) => [s.slug, s.shot]),
);
