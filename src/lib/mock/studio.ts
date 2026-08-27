import type { Craft, Faq, Localized, PressQuote, Showroom } from "@/lib/types";
import { SHOWROOM_IMAGES } from "@/lib/images";

/* ==========================================================================
   Materials & craft
   ========================================================================== */

export const CRAFTS: Craft[] = [
  {
    slug: "brass",
    name: { en: "Brass", ar: "النحاس" },
    note: {
      en: "Sand-cast, hand-patinated, sealed against Gulf humidity.",
      ar: "مسبوك بالرمل، معتّق يدوياً، ومغلق ضد رطوبة الخليج.",
    },
  },
  {
    slug: "glass",
    name: { en: "Glass", ar: "الزجاج" },
    note: {
      en: "Mouth-blown in small batches; each shade varies slightly.",
      ar: "منفوخ بالفم على دفعات صغيرة، ويختلف كل ظل قليلاً عن غيره.",
    },
  },
  {
    slug: "stone",
    name: { en: "Stone", ar: "الحجر" },
    note: {
      en: "Alabaster and travertine, hand-selected block by block.",
      ar: "ألاباستر وترافرتين، منتقى يدوياً كتلة كتلة.",
    },
  },
  {
    slug: "wood",
    name: { en: "Wood", ar: "الخشب" },
    note: {
      en: "Kiln-dried walnut and oak, oiled rather than lacquered.",
      ar: "جوز وبلوط مجففان بالفرن، مزيّتان لا ملمّعان.",
    },
  },
  {
    slug: "hand-finishing",
    name: { en: "Hand-Finished Details", ar: "لمسات يدوية" },
    note: {
      en: "Every joint filed, every rose aligned, signed and numbered.",
      ar: "كل وصلة مبرودة، وكل قاعدة مُحاذاة، وموقّعة ومرقّمة.",
    },
  },
];

/* ==========================================================================
   Press
   ========================================================================== */

export const PRESS: PressQuote[] = [
  {
    quote: {
      en: "A studio translating the Pleiades into brass and alabaster with unusual restraint.",
      ar: "استوديو يترجم مجموعة الثريا إلى نحاس وألاباستر بضبط نفس غير معتاد.",
    },
    source: "Architectural Digest Middle East",
  },
  {
    quote: {
      en: "The most convincing new lighting voice out of Cairo in a decade.",
      ar: "أكثر الأصوات الجديدة إقناعاً في الإضاءة خارجة من القاهرة منذ عقد.",
    },
    source: "Wallpaper*",
  },
  {
    quote: {
      en: "Specification-grade quality with the patience of a jewellery atelier.",
      ar: "جودة بمستوى التوصيف الهندسي وبصبر أتيليه مجوهرات.",
    },
    source: "Identity Magazine",
  },
];

/* ==========================================================================
   Custom & projects
   ========================================================================== */

export const PROCESS: { step: Localized; body: Localized }[] = [
  {
    step: { en: "Discover", ar: "الاستكشاف" },
    body: {
      en: "A call and a floor plan. We map circuits, ceiling heights, and the mood you are after.",
      ar: "مكالمة ومخطط للمساحة. نرسم الدوائر الكهربائية وارتفاعات الأسقف والمزاج الذي تريده.",
    },
  },
  {
    step: { en: "Design", ar: "التصميم" },
    body: {
      en: "Fixture selection, drop heights, colour temperature, and a rendered lighting scheme.",
      ar: "اختيار الوحدات، وارتفاعات التعليق، ودرجة حرارة اللون، ومخطط إضاءة مُعالَج بصرياً.",
    },
  },
  {
    step: { en: "Prototype", ar: "النموذج" },
    body: {
      en: "A sample arm, cup, or finish plate for approval before production begins.",
      ar: "عيّنة ذراع أو كأس أو لوح تشطيب للاعتماد قبل بدء الإنتاج.",
    },
  },
  {
    step: { en: "Produce", ar: "الإنتاج" },
    body: {
      en: "6–10 weeks in the Cairo atelier. Photographs at each milestone.",
      ar: "٦–١٠ أسابيع في أتيليه القاهرة. صور عند كل مرحلة.",
    },
  },
  {
    step: { en: "Deliver", ar: "التسليم" },
    body: {
      en: "Crated, shipped, installed, and commissioned with your electrician.",
      ar: "تغليف وشحن وتركيب وتشغيل بالتنسيق مع فنيك.",
    },
  },
];

export const PROJECT_SHOTS: Localized[] = [
  { en: "project 01 — villa stairwell cascade, New Cairo", ar: "المشروع ٠١ — تدرّج بئر سلم فيلا، القاهرة الجديدة" },
  { en: "project 02 — boutique hotel bar, Dubai", ar: "المشروع ٠٢ — بار فندق بوتيك، دبي" },
  { en: "project 03 — restaurant, Riyadh", ar: "المشروع ٠٣ — مطعم، الرياض" },
  { en: "project 04 — private library, Zamalek", ar: "المشروع ٠٤ — مكتبة خاصة، الزمالك" },
  { en: "project 05 — developer show apartment", ar: "المشروع ٠٥ — شقة عرض لمطوّر" },
];

export const CUSTOMISATION_OPTIONS: Localized[] = [
  { en: "Diameter & drop", ar: "القطر والارتفاع" },
  { en: "Number of lights", ar: "عدد النقاط الضوئية" },
  { en: "Finish & patina depth", ar: "التشطيب وعمق العتاقة" },
  { en: "Stone selection", ar: "انتقاء الحجر" },
  { en: "Glass tint", ar: "لون الزجاج" },
  { en: "Colour temperature", ar: "درجة حرارة اللون" },
  { en: "Dimming protocol", ar: "بروتوكول التعتيم" },
  { en: "Engraving & numbering", ar: "النقش والترقيم" },
];

export const PROJECT_TYPES: Localized[] = [
  { en: "Private residence", ar: "سكن خاص" },
  { en: "Villa", ar: "فيلا" },
  { en: "Apartment", ar: "شقة" },
  { en: "Hospitality", ar: "ضيافة" },
  { en: "Restaurant or bar", ar: "مطعم أو بار" },
  { en: "Commercial or office", ar: "تجاري أو مكتبي" },
  { en: "Developer / show unit", ar: "مطوّر / وحدة عرض" },
];

export const BUDGET_BANDS: Localized[] = [
  { en: "Under EGP 250,000", ar: "أقل من ٢٥٠٬٠٠٠ ج.م" },
  { en: "EGP 250,000 – 1M", ar: "٢٥٠٬٠٠٠ – مليون ج.م" },
  { en: "EGP 1M – 3M", ar: "مليون – ٣ ملايين ج.م" },
  { en: "EGP 3M+", ar: "أكثر من ٣ ملايين ج.م" },
  { en: "Not yet defined", ar: "غير محدد بعد" },
];

export const CUSTOM_FAQS: Faq[] = [
  {
    q: { en: "What is the minimum project size?", ar: "ما الحد الأدنى لحجم المشروع؟" },
    a: {
      en: "We take bespoke commissions from a single statement fixture upward. Hospitality projects usually start at 20 fixtures.",
      ar: "نقبل الطلبات الخاصة ابتداءً من وحدة واحدة مميزة. أما مشاريع الضيافة فتبدأ عادةً من ٢٠ وحدة.",
    },
  },
  {
    q: { en: "Can you match an existing finish?", ar: "هل يمكنكم مطابقة تشطيب قائم؟" },
    a: {
      en: "Yes. Send a sample or photograph and we will produce a finish plate for approval.",
      ar: "نعم. أرسل عيّنة أو صورة وسننتج لوح تشطيب للاعتماد.",
    },
  },
  {
    q: { en: "Do you ship outside Egypt and the GCC?", ar: "هل تشحنون خارج مصر والخليج؟" },
    a: {
      en: "Yes — Europe, the UK, and North America, crated and insured, with customs documentation prepared.",
      ar: "نعم — أوروبا والمملكة المتحدة وأمريكا الشمالية، مغلّفة ومؤمَّنة، مع تجهيز مستندات الجمارك.",
    },
  },
  {
    q: { en: "Who owns the design of a bespoke piece?", ar: "لمن تعود ملكية تصميم القطعة الخاصة؟" },
    a: {
      en: "You hold exclusivity for two years on commissioned designs; after that we may add a variant to the archive with your consent.",
      ar: "لك حصرية لمدة سنتين على التصاميم المطلوبة خصيصاً، وبعدها قد نضيف نسخة مشتقة إلى الأرشيف بموافقتك.",
    },
  },
];

/* ==========================================================================
   Trade
   ========================================================================== */

export const TRADE_BENEFITS: { title: Localized; body: Localized }[] = [
  {
    title: { en: "Trade pricing", ar: "أسعار المحترفين" },
    body: {
      en: "Tiered by annual volume, applied automatically at checkout and on quotations.",
      ar: "مدرّجة حسب الحجم السنوي، وتُطبَّق تلقائياً عند الدفع وفي عروض الأسعار.",
    },
  },
  {
    title: { en: "Specification files", ar: "ملفات التوصيف" },
    body: {
      en: "DWG, 3DM, RFA, IES and spec sheets for every fixture, kept current.",
      ar: "ملفات DWG و3DM وRFA وIES وكتيبات المواصفات لكل وحدة، ومحدّثة باستمرار.",
    },
  },
  {
    title: { en: "Samples", ar: "العينات" },
    body: {
      en: "Finish plates, alabaster offcuts and glass tiles shipped free to trade accounts.",
      ar: "ألواح تشطيب وقصاصات ألاباستر وبلاطات زجاج تُشحن مجاناً لحسابات المحترفين.",
    },
  },
  {
    title: { en: "Project support", ar: "دعم المشاريع" },
    body: {
      en: "Bulk lead times, staged delivery, site coordination and commissioning.",
      ar: "مدد تنفيذ للكميات، وتسليم على مراحل، وتنسيق موقعي، وتشغيل.",
    },
  },
];

export const TRADE_DOWNLOADS: { title: Localized; meta: string }[] = [
  { title: { en: "2026 Lighting Catalogue", ar: "كتالوج الإضاءة ٢٠٢٦" }, meta: "PDF · 24 MB" },
  { title: { en: "CAD & Revit library", ar: "مكتبة CAD وRevit" }, meta: "ZIP · 88 MB" },
  { title: { en: "IES photometric files", ar: "ملفات IES الضوئية" }, meta: "ZIP · 6 MB" },
  { title: { en: "Finish & material guide", ar: "دليل التشطيبات والمواد" }, meta: "PDF · 9 MB" },
];

export const DISCIPLINES: Localized[] = [
  { en: "Interior design", ar: "تصميم داخلي" },
  { en: "Architecture", ar: "عمارة" },
  { en: "Developer", ar: "تطوير عقاري" },
  { en: "Hospitality group", ar: "مجموعة ضيافة" },
  { en: "Contractor", ar: "مقاولات" },
  { en: "Lighting consultant", ar: "استشارات إضاءة" },
];

export const SPEND_BANDS: Localized[] = [
  { en: "Under EGP 500,000", ar: "أقل من ٥٠٠٬٠٠٠ ج.م" },
  { en: "EGP 500,000 – 2M", ar: "٥٠٠٬٠٠٠ – مليونان ج.م" },
  { en: "EGP 2M+", ar: "أكثر من مليونَي ج.م" },
];

/* ==========================================================================
   Consultation
   ========================================================================== */

export const CONSULTATION_SERVICES: { id: string; name: Localized; meta: Localized }[] = [
  {
    id: "lighting",
    name: { en: "Lighting Consultation", ar: "استشارة إضاءة" },
    meta: { en: "45 min · complimentary", ar: "٤٥ دقيقة · مجاناً" },
  },
  {
    id: "styling",
    name: { en: "Interior Styling", ar: "تنسيق داخلي" },
    meta: { en: "60 min · EGP 1,500, credited", ar: "٦٠ دقيقة · ١٬٥٠٠ ج.م تُخصم من طلبك" },
  },
  {
    id: "custom",
    name: { en: "Custom Project", ar: "مشروع خاص" },
    meta: { en: "60 min · by application", ar: "٦٠ دقيقة · بموجب طلب" },
  },
  {
    id: "trade",
    name: { en: "Trade / Hospitality", ar: "محترفون / ضيافة" },
    meta: { en: "90 min · with project manager", ar: "٩٠ دقيقة · مع مدير مشروع" },
  },
];

export const CONSULTATION_FORMATS: { id: string; label: Localized }[] = [
  { id: "virtual", label: { en: "Virtual", ar: "افتراضي" } },
  { id: "zamalek", label: { en: "Showroom — Zamalek", ar: "صالة العرض — الزمالك" } },
  { id: "dubai", label: { en: "Showroom — Dubai", ar: "صالة العرض — دبي" } },
  { id: "home", label: { en: "At home", ar: "في المنزل" } },
];

export const CONSULTATION_DAYS: {
  id: string;
  dow: Localized;
  day: string;
  dayAr: string;
  available: boolean;
}[] = [
  { id: "mon-14", dow: { en: "Mon", ar: "الاثنين" }, day: "14", dayAr: "١٤", available: false },
  { id: "tue-15", dow: { en: "Tue", ar: "الثلاثاء" }, day: "15", dayAr: "١٥", available: true },
  { id: "wed-16", dow: { en: "Wed", ar: "الأربعاء" }, day: "16", dayAr: "١٦", available: true },
  { id: "thu-17", dow: { en: "Thu", ar: "الخميس" }, day: "17", dayAr: "١٧", available: true },
  { id: "fri-18", dow: { en: "Fri", ar: "الجمعة" }, day: "18", dayAr: "١٨", available: true },
  { id: "sat-19", dow: { en: "Sat", ar: "السبت" }, day: "19", dayAr: "١٩", available: true },
  { id: "sun-20", dow: { en: "Sun", ar: "الأحد" }, day: "20", dayAr: "٢٠", available: false },
];

export const CONSULTATION_MONTH: Localized = { en: "Sep 2026", ar: "سبتمبر ٢٠٢٦" };

export const CONSULTATION_TIMES: { id: string; label: Localized; available: boolean }[] = [
  { id: "1000", label: { en: "10:00", ar: "١٠:٠٠" }, available: true },
  { id: "1130", label: { en: "11:30", ar: "١١:٣٠" }, available: true },
  { id: "1300", label: { en: "13:00", ar: "١٣:٠٠" }, available: true },
  { id: "1500", label: { en: "15:00", ar: "١٥:٠٠" }, available: false },
  { id: "1700", label: { en: "17:00", ar: "١٧:٠٠" }, available: true },
];

export const ROOM_COUNTS: Localized[] = [
  { en: "1 – 3", ar: "١ – ٣" },
  { en: "4 – 6", ar: "٤ – ٦" },
  { en: "7 – 12", ar: "٧ – ١٢" },
  { en: "12+", ar: "١٢ فأكثر" },
];

export const TIMELINES: Localized[] = [
  { en: "Within 1 month", ar: "خلال شهر" },
  { en: "Within 3 months", ar: "خلال ٣ أشهر" },
  { en: "Within 6 months", ar: "خلال ٦ أشهر" },
  { en: "Just exploring", ar: "مجرد استكشاف" },
];

/* ==========================================================================
   About
   ========================================================================== */

export const VALUES: { title: Localized; body: Localized }[] = [
  {
    title: { en: "One maker per piece", ar: "صانع واحد لكل قطعة" },
    body: {
      en: "The person who assembles a fixture lights it, levels it and signs it. Nothing moves down a line here.",
      ar: "من يجمّع الوحدة هو من يضيئها ويسوّيها ويوقّعها. لا شيء يمر على خط إنتاج هنا.",
    },
  },
  {
    title: { en: "Materials that age", ar: "مواد تتقادم بجمال" },
    body: {
      en: "Patina, veining and small variations are the record of how something was made. We do not plate over them.",
      ar: "العتاقة والتعرّق والاختلافات الصغيرة سجل لطريقة الصنع. ولا نغطيها بطلاء.",
    },
  },
  {
    title: { en: "Specification-grade honesty", ar: "صدق بمستوى التوصيف" },
    body: {
      en: "Published lead times are the ones we hold, and the IES files match what the fixture actually does.",
      ar: "مدد التنفيذ المعلنة هي التي نلتزم بها، وملفات IES تطابق أداء الوحدة فعلياً.",
    },
  },
  {
    title: { en: "Supported for life", ar: "دعم مدى الحياة" },
    body: {
      en: "Spare cups, shades and cable are stocked for the life of a collection, including closed editions.",
      ar: "الكؤوس والظلال والكابلات الاحتياطية متوفرة طوال عمر المجموعة، بما فيها الإصدارات المغلقة.",
    },
  },
];

export const TIMELINE: { year: string; yearAr: string; title: Localized; body: Localized }[] = [
  {
    year: "2019",
    yearAr: "٢٠١٩",
    title: { en: "A bench in Sayeda Zeinab", ar: "منضدة في السيدة زينب" },
    body: {
      en: "Two people, one lathe, and a commission for a stairwell in Maadi that took four months longer than promised.",
      ar: "شخصان ومخرطة واحدة، وطلب لبئر سلم في المعادي استغرق أربعة أشهر أكثر مما وُعد به.",
    },
  },
  {
    year: "2021",
    yearAr: "٢٠٢١",
    title: { en: "The first alabaster block", ar: "أول كتلة ألاباستر" },
    body: {
      en: "A quarry near Beni Suef agreed to sell whole blocks. Two thirds of that first one became dust.",
      ar: "وافق محجر قرب بني سويف على بيع كتل كاملة. وصار ثلثا تلك الكتلة الأولى غباراً.",
    },
  },
  {
    year: "2023",
    yearAr: "٢٠٢٣",
    title: { en: "Thurayyā Seven", ar: "ثريا سيفن" },
    body: {
      en: "Eleven months of prototyping produced the machined hub, and with it a product the studio could repeat.",
      ar: "أحد عشر شهراً من النماذج أنتجت المحور المخروط، وبه منتجاً يمكن للاستوديو تكراره.",
    },
  },
  {
    year: "2024",
    yearAr: "٢٠٢٤",
    title: { en: "Zamalek showroom", ar: "صالة عرض الزمالك" },
    body: {
      en: "A ground floor flat with three metre ceilings, every fixture on a dimmer, open by appointment at dusk.",
      ar: "شقة أرضية بأسقف ثلاثة أمتار، كل وحدة فيها على مخفت، وتُفتح بموعد عند الغروب.",
    },
  },
  {
    year: "2026",
    yearAr: "٢٠٢٦",
    title: { en: "Dubai and the Celestial Collection", ar: "دبي ومجموعة سيليستيال" },
    body: {
      en: "A second showroom, a trade programme, and 340 commissioned fixtures on the books.",
      ar: "صالة عرض ثانية، وبرنامج للمحترفين، و٣٤٠ وحدة مطلوبة في السجلات.",
    },
  },
];

export const TEAM: { name: Localized; role: Localized; shot: Localized }[] = [
  {
    name: { en: "Yasmin Adel", ar: "ياسمين عادل" },
    role: { en: "Founder & Design Director", ar: "المؤسِّسة ومديرة التصميم" },
    shot: { en: "portrait — founder at the drawing board", ar: "بورتريه — المؤسِّسة أمام لوح الرسم" },
  },
  {
    name: { en: "Ramy Botros", ar: "رامي بطرس" },
    role: { en: "Head of Atelier", ar: "رئيس الأتيليه" },
    shot: { en: "portrait — head of atelier at the lathe", ar: "بورتريه — رئيس الأتيليه عند المخرطة" },
  },
  {
    name: { en: "Salma Farid", ar: "سلمى فريد" },
    role: { en: "Lighting Designer", ar: "مصممة إضاءة" },
    shot: { en: "portrait — designer with floor plans", ar: "بورتريه — مصممة مع المخططات" },
  },
  {
    name: { en: "Tarek Idris", ar: "طارق إدريس" },
    role: { en: "Projects & Trade", ar: "المشاريع والمحترفون" },
    shot: { en: "portrait — projects lead on site", ar: "بورتريه — مسؤول المشاريع في الموقع" },
  },
];

/* ==========================================================================
   Showrooms
   ========================================================================== */

const SHOWROOM_SEEDS: Showroom[] = [
  {
    slug: "zamalek",
    city: { en: "Cairo — Zamalek", ar: "القاهرة — الزمالك" },
    address: {
      en: "14 Shagaret El Dorr, Zamalek, Cairo 11211, Egypt",
      ar: "١٤ شارع شجرة الدر، الزمالك، القاهرة ١١٢١١، مصر",
    },
    hours: { en: "Sun–Thu 11:00–20:00 · Sat by appointment", ar: "الأحد–الخميس ١١:٠٠–٢٠:٠٠ · السبت بموعد" },
    phone: "+20 2 0000 0000",
    note: {
      en: "The original showroom. Ground floor, three metre ceilings, every fixture on a dimmer.",
      ar: "صالة العرض الأولى. طابق أرضي، أسقف ثلاثة أمتار، وكل وحدة على مخفت.",
    },
    shot: { en: "showroom — Zamalek, evening", ar: "صالة العرض — الزمالك، مساءً" },
  },
  {
    slug: "dubai",
    city: { en: "Dubai — Alserkal", ar: "دبي — السركال" },
    address: {
      en: "Unit 12, Alserkal Avenue, Al Quoz 1, Dubai, UAE",
      ar: "الوحدة ١٢، السركال أفنيو، القوز ١، دبي، الإمارات",
    },
    hours: { en: "Mon–Sat 10:00–19:00", ar: "الاثنين–السبت ١٠:٠٠–١٩:٠٠" },
    phone: "+971 4 000 0000",
    note: {
      en: "Trade-focused, with the full finish library and a sample wall.",
      ar: "موجهة للمحترفين، بمكتبة التشطيبات الكاملة وجدار عينات.",
    },
    shot: { en: "showroom — Dubai, sample wall", ar: "صالة العرض — دبي، جدار العينات" },
  },
  {
    slug: "riyadh",
    city: { en: "Riyadh — By appointment", ar: "الرياض — بموعد" },
    address: {
      en: "Studio office, Al Olaya, Riyadh, Saudi Arabia",
      ar: "مكتب الاستوديو، العليا، الرياض، السعودية",
    },
    hours: { en: "By appointment only", ar: "بموعد مسبق فقط" },
    phone: "+966 11 000 0000",
    note: {
      en: "Project office rather than a showroom — samples and drawings, no stock.",
      ar: "مكتب مشاريع لا صالة عرض — عينات ورسومات دون مخزون.",
    },
    shot: { en: "studio office — Riyadh, drawings", ar: "مكتب الاستوديو — الرياض، رسومات" },
  },
];

export const SHOWROOMS: Showroom[] = SHOWROOM_SEEDS.map((s) => ({
  ...s,
  shotSrc: SHOWROOM_IMAGES[s.slug],
}));

export const CONTACT_SUBJECTS: Localized[] = [
  { en: "General enquiry", ar: "استفسار عام" },
  { en: "An existing order", ar: "طلب قائم" },
  { en: "Custom project", ar: "مشروع خاص" },
  { en: "Trade account", ar: "حساب محترفين" },
  { en: "Press", ar: "صحافة" },
  { en: "Careers", ar: "وظائف" },
];
