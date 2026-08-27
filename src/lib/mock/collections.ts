import type { Collection } from "@/lib/types";

export const COLLECTIONS: Collection[] = [
  {
    slug: "celestial",
    name: { en: "The Celestial Collection", ar: "مجموعة سيليستيال" },
    kicker: { en: "Collection 01 · Seven pieces", ar: "المجموعة ٠١ · سبع قطع" },
    lede: {
      en: "Seven stars, seven fixtures. A cluster drawn in brass and lit through carved alabaster.",
      ar: "سبعة نجوم، وسبع وحدات. عنقود مرسوم بالنحاس ومضاء عبر ألاباستر منحوت.",
    },
    concept: {
      en: "The collection began with a single constraint: seven points of light, no visible hardware, and a structure thin enough to disappear when the room is lit. Eleven months of prototyping produced a machined brass hub that carries all seven arms from one bearing surface, which is why the fixture reads as a drawing rather than an object.",
      ar: "بدأت المجموعة بقيد واحد: سبع نقاط ضوء، دون أي تثبيت ظاهر، وهيكل نحيف بما يكفي ليختفي حين تُضاء الغرفة. أحد عشر شهراً من النماذج أنتجت محوراً نحاسياً مخروطاً يحمل الأذرع السبعة من سطح ارتكاز واحد، ولهذا تبدو الوحدة رسماً لا جسماً.",
    },
    facts: [
      {
        label: { en: "Materials", ar: "المواد" },
        title: { en: "Cast brass, carved alabaster, silk-braided cable", ar: "نحاس مسبوك، ألاباستر منحوت، كابل حريري مضفور" },
        body: {
          en: "Alabaster from a single quarry near Beni Suef, selected for translucency rather than pattern.",
          ar: "ألاباستر من محجر واحد قرب بني سويف، منتقى لشفافيته لا لنقشه.",
        },
      },
      {
        label: { en: "Making", ar: "الصناعة" },
        title: { en: "Eleven months, four prototypes, one hub", ar: "أحد عشر شهراً، أربعة نماذج، محور واحد" },
        body: {
          en: "Each fixture is assembled, lit, levelled and signed by one maker before crating.",
          ar: "تُجمَّع كل وحدة وتُضاء وتُسوّى وتُوقَّع على يد صانع واحد قبل التغليف.",
        },
      },
      {
        label: { en: "Edition", ar: "الإصدار" },
        title: { en: "Numbered, 120 per fixture per year", ar: "مرقّمة، ١٢٠ وحدة سنوياً لكل تصميم" },
        body: {
          en: "Custom drops and diameters available to trade and private commission.",
          ar: "الارتفاعات والأقطار الخاصة متاحة للمحترفين والطلبات الخاصة.",
        },
      },
    ],
    heroShot: {
      en: "collection hero — full bleed campaign, 2400x1300",
      ar: "الصورة الرئيسية للمجموعة — حملة بعرض الشاشة، ٢٤٠٠×١٣٠٠",
    },
    campaignShots: [
      { en: "campaign 01 — chandelier in emerald room, wide", ar: "الحملة ٠١ — ثريا في غرفة زمردية، لقطة واسعة" },
      { en: "campaign 02 — alabaster cup detail", ar: "الحملة ٠٢ — تفصيل كأس الألاباستر" },
      { en: "behind the scenes — hub on the lathe", ar: "كواليس — المحور على المخرطة" },
    ],
    accent: "emerald",
    productSlugs: [
      "thurayya-seven-chandelier",
      "najm-halo-chandelier",
      "qamar-dome-pendant",
      "thurayya-cluster-rug",
      "hilal-crescent-pendant",
      "maha-tiered-chandelier",
    ],
  },
  {
    slug: "nocturne",
    name: { en: "The Nocturne Collection", ar: "مجموعة نوكتيرن" },
    kicker: { en: "Collection 02 · Five pieces", ar: "المجموعة ٠٢ · خمس قطع" },
    lede: {
      en: "Smoked glass, blackened brass, and light kept deliberately low.",
      ar: "زجاج دخاني، ونحاس مسوّد، وضوء مبقى منخفضاً عن قصد.",
    },
    concept: {
      en: "Nocturne is the collection for the hours after the ceiling light goes off. Every fixture in it dims to two percent without flicker, and every shade is tinted so the source is never the brightest thing in the room. It was drawn for apartments where the evening is the point.",
      ar: "نوكتيرن مجموعة الساعات التي تلي إطفاء إضاءة السقف. كل وحدة فيها تُخفَّت إلى اثنين بالمئة دون ارتعاش، وكل ظل ملوّن حتى لا يكون المصدر ألمع ما في الغرفة. رُسمت لشقق يكون المساء فيها هو المقصد.",
    },
    facts: [
      {
        label: { en: "Palette", ar: "اللوحة اللونية" },
        title: { en: "Smoke, amber, blackened brass", ar: "دخاني، كهرماني، نحاس مسوّد" },
        body: {
          en: "Glass is tinted in the batch rather than sprayed, so the colour survives cleaning.",
          ar: "يُلوّن الزجاج في الخلطة لا بالرش، فيبقى اللون بعد التنظيف.",
        },
      },
      {
        label: { en: "Control", ar: "التحكم" },
        title: { en: "Dims to 2% without flicker", ar: "يُخفَّت حتى ٢٪ دون ارتعاش" },
        body: {
          en: "Tested against the six trailing-edge dimmers most common in Egypt and the GCC.",
          ar: "مختبَرة مع ستة من أكثر مخفتات التعتيم الخلفي شيوعاً في مصر والخليج.",
        },
      },
      {
        label: { en: "Scale", ar: "المقياس" },
        title: { en: "Drawn for apartments, not villas", ar: "مرسومة للشقق لا للفيلات" },
        body: {
          en: "Nothing in Nocturne needs more than a 2.7 m ceiling to sit correctly.",
          ar: "لا شيء في نوكتيرن يحتاج أكثر من سقف ٢٫٧ متر ليجلس كما ينبغي.",
        },
      },
    ],
    heroShot: { en: "nocturne hero — dark room, single lit pendant", ar: "الصورة الرئيسية — غرفة معتمة، معلقة واحدة مضاءة" },
    campaignShots: [
      { en: "campaign 01 — smoked glass at 2% dim", ar: "الحملة ٠١ — زجاج دخاني عند تعتيم ٢٪" },
      { en: "campaign 02 — blackened brass collar, macro", ar: "الحملة ٠٢ — طوق نحاسي مسوّد، لقطة قريبة" },
      { en: "behind the scenes — glass tinting batch", ar: "كواليس — دفعة تلوين الزجاج" },
    ],
    accent: "onyx",
    productSlugs: ["nocturne-pendant", "anbar-cluster-pendant", "samt-column-lamp", "sidra-linear-suspension"],
  },
  {
    slug: "alabaster",
    name: { en: "The Alabaster Collection", ar: "مجموعة ألاباستر" },
    kicker: { en: "Collection 03 · Four pieces", ar: "المجموعة ٠٣ · أربع قطع" },
    lede: {
      en: "Egyptian stone, hollowed until it holds light.",
      ar: "حجر مصري، مُفرَّغ حتى يحتفظ بالضوء.",
    },
    concept: {
      en: "Alabaster is the only material in the studio that changes what light is rather than where it goes. Blocks are selected at the quarry for translucency, cut oversize, and carved down until the wall is thin enough to glow but thick enough to hold. Nothing is dyed and nothing is filled.",
      ar: "الألاباستر هو المادة الوحيدة في الاستوديو التي تغيّر ماهية الضوء لا اتجاهه فقط. تُنتقى الكتل في المحجر لشفافيتها، وتُقطع بمقاس أكبر، ثم تُنحت حتى يصير الجدار رقيقاً بما يكفي ليتوهج وسميكاً بما يكفي ليتماسك. لا تلوين ولا حشو.",
    },
    facts: [
      {
        label: { en: "Source", ar: "المصدر" },
        title: { en: "One quarry, near Beni Suef", ar: "محجر واحد، قرب بني سويف" },
        body: { en: "We buy the whole block and carry the waste.", ar: "نشتري الكتلة كاملة ونتحمل الفاقد." },
      },
      {
        label: { en: "Wall", ar: "السماكة" },
        title: { en: "Carved to 4 mm at the thinnest", ar: "منحوت حتى ٤ مم عند أنحف نقطة" },
        body: { en: "Below that the stone stops being reliable.", ar: "أرقّ من ذلك يفقد الحجر ثباته." },
      },
      {
        label: { en: "Variation", ar: "التباين" },
        title: { en: "No two pieces match, by definition", ar: "لا تتطابق قطعتان، بحكم الطبيعة" },
        body: { en: "Veining is the record of the block, not a defect.", ar: "التعرّق سجل الكتلة، لا عيباً فيها." },
      },
    ],
    heroShot: { en: "alabaster hero — backlit stone, macro", ar: "الصورة الرئيسية — حجر مضاء من الخلف" },
    campaignShots: [
      { en: "campaign 01 — carving bench, dust", ar: "الحملة ٠١ — منضدة النحت والغبار" },
      { en: "campaign 02 — block selection at the quarry", ar: "الحملة ٠٢ — انتقاء الكتل في المحجر" },
      { en: "behind the scenes — wall thickness gauge", ar: "كواليس — قياس سماكة الجدار" },
    ],
    accent: "onyx",
    productSlugs: ["alabaster-wall-light", "dune-alabaster-lamp", "nour-ceiling-flush", "hilal-crescent-pendant"],
  },
  {
    slug: "brass-atelier",
    name: { en: "Brass Atelier", ar: "أتيليه النحاس" },
    kicker: { en: "Collection 04 · Furniture", ar: "المجموعة ٠٤ · أثاث" },
    lede: {
      en: "The furniture the lighting asked for.",
      ar: "الأثاث الذي طلبته الإضاءة.",
    },
    concept: {
      en: "Clients kept asking what table a 96 cm chandelier belongs over. Brass Atelier is the answer: a short line of furniture proportioned to the fixtures, in walnut, travertine and the same patinated brass, with a shadow line wherever two materials meet.",
      ar: "ظل العملاء يسألون: أي طاولة تليق تحت ثريا بقطر ٩٦ سم؟ أتيليه النحاس هو الجواب: خط قصير من الأثاث بنسب مشتقة من الوحدات، من الجوز والترافرتين والنحاس المعتّق نفسه، بخط ظل عند كل التقاء بين مادتين.",
    },
    facts: [
      {
        label: { en: "Joinery", ar: "النجارة" },
        title: { en: "Mortise and tenon, no fasteners on show", ar: "نقر ولسان، دون مثبتات ظاهرة" },
        body: { en: "Frames are dry-fitted, taken apart, then glued once.", ar: "تُركَّب الهياكل جافة ثم تُفك وتُلصق مرة واحدة." },
      },
      {
        label: { en: "Stone", ar: "الحجر" },
        title: { en: "Honed, never polished", ar: "مصنفر، لا ملمّع أبداً" },
        body: { en: "Polish reflects the fixture above and ruins the room.", ar: "التلميع يعكس الوحدة أعلاه ويفسد الغرفة." },
      },
      {
        label: { en: "Sizing", ar: "المقاسات" },
        title: { en: "Cut to your room on request", ar: "يُقص على مقاس غرفتك عند الطلب" },
        body: { en: "Tops are made to order in 10 cm increments.", ar: "تُصنع الأسطح حسب الطلب بزيادات ١٠ سم." },
      },
    ],
    heroShot: { en: "brass atelier hero — console and chandelier together", ar: "الصورة الرئيسية — كونسول وثريا معاً" },
    campaignShots: [
      { en: "campaign 01 — walnut frame, dry fit", ar: "الحملة ٠١ — هيكل جوز، تركيب جاف" },
      { en: "campaign 02 — travertine edge profile", ar: "الحملة ٠٢ — حافة الترافرتين" },
      { en: "behind the scenes — oiling the frame", ar: "كواليس — تزييت الهيكل" },
    ],
    accent: "onyx",
    productSlugs: ["layl-travertine-console", "sahra-dining-table", "nujum-side-table", "nadi-lounge-chair"],
  },
  {
    slug: "modern-heritage",
    name: { en: "Modern Heritage", ar: "التراث المعاصر" },
    kicker: { en: "Collection 05 · Four pieces", ar: "المجموعة ٠٥ · أربع قطع" },
    lede: {
      en: "Mashrabiya, read as a light source rather than a screen.",
      ar: "المشربية، مقروءة كمصدر ضوء لا كحاجب.",
    },
    concept: {
      en: "Traditional mashrabiya controls what comes in. Ours controls what goes out: the same geometry, pierced in brass and lit from inside so the pattern lands on the wall instead of the floor. Drawn from screens photographed in Rashid and Old Cairo, redrawn until they could be cut on a modern press.",
      ar: "المشربية التقليدية تتحكم فيما يدخل. ومشربيتنا تتحكم فيما يخرج: الهندسة نفسها، مخرّمة في النحاس ومضاءة من الداخل فيقع النقش على الجدار لا على الأرض. مستمدة من مشربيات صُوِّرت في رشيد والقاهرة القديمة، ثم أُعيد رسمها حتى أمكن قصّها على مكبس حديث.",
    },
    facts: [
      {
        label: { en: "Pattern", ar: "النقش" },
        title: { en: "Six geometries, redrawn from photographs", ar: "ست هندسات، أُعيد رسمها عن صور" },
        body: { en: "Each is named for the street it was recorded on.", ar: "كل واحدة تحمل اسم الشارع الذي وُثّقت فيه." },
      },
      {
        label: { en: "Cut", ar: "القص" },
        title: { en: "Pressed, then filed by hand", ar: "مكبوسة، ثم مبرودة يدوياً" },
        body: { en: "Every aperture is deburred so the shadow has a clean edge.", ar: "تُنعَّم كل فتحة ليكون للظل حافة نظيفة." },
      },
      {
        label: { en: "Use", ar: "الاستخدام" },
        title: { en: "Corridors, stairs, and blank walls", ar: "الممرات والسلالم والجدران الفارغة" },
        body: { en: "The pattern needs a plain surface to land on.", ar: "يحتاج النقش سطحاً بسيطاً ليقع عليه." },
      },
    ],
    heroShot: { en: "heritage hero — patterned shadow on plaster", ar: "الصورة الرئيسية — ظل منقوش على الجبس" },
    campaignShots: [
      { en: "campaign 01 — pierced brass, macro", ar: "الحملة ٠١ — نحاس مخرّم، لقطة قريبة" },
      { en: "campaign 02 — corridor at night", ar: "الحملة ٠٢ — ممر ليلاً" },
      { en: "behind the scenes — filing the apertures", ar: "كواليس — تنعيم الفتحات" },
    ],
    accent: "onyx",
    productSlugs: ["mashrabiya-wall-sconce", "sahn-ceiling-plate", "qandil-table-lamp"],
  },
  {
    slug: "limited-editions",
    name: { en: "Limited Editions", ar: "الإصدارات المحدودة" },
    kicker: { en: "Archive · Numbered", ar: "الأرشيف · مرقّمة" },
    lede: {
      en: "Pieces we make once, or once a year, and then stop.",
      ar: "قطع نصنعها مرة، أو مرة في العام، ثم نتوقف.",
    },
    concept: {
      en: "A limited edition is not a marketing decision here — it is what happens when a piece takes so long that we can only honestly promise a handful a year. Each is numbered, recorded in the archive, and supported for life even after the edition closes.",
      ar: "الإصدار المحدود عندنا ليس قراراً تسويقياً — بل نتيجة أن القطعة تستغرق وقتاً يجعلنا لا نعد بصدق إلا بعدد قليل في العام. كل قطعة مرقّمة ومسجلة في الأرشيف ومدعومة مدى الحياة حتى بعد إغلاق الإصدار.",
    },
    facts: [
      {
        label: { en: "Numbering", ar: "الترقيم" },
        title: { en: "Stamped on the rose, recorded in the archive", ar: "مطبوع على القاعدة، ومسجّل في الأرشيف" },
        body: { en: "Your number is tied to your account at purchase.", ar: "يُربط رقمك بحسابك عند الشراء." },
      },
      {
        label: { en: "Support", ar: "الدعم" },
        title: { en: "Parts stocked for life", ar: "قطع الغيار متوفرة مدى الحياة" },
        body: { en: "Including after an edition has closed.", ar: "بما في ذلك بعد إغلاق الإصدار." },
      },
      {
        label: { en: "Waiting", ar: "الانتظار" },
        title: { en: "10–14 weeks, and we will not rush it", ar: "١٠–١٤ أسبوعاً، ولن نستعجلها" },
        body: { en: "We would rather move your date than send it early.", ar: "نفضّل تأجيل موعدك على إرسالها مبكراً." },
      },
    ],
    heroShot: { en: "limited edition hero — stairwell cascade, 4m", ar: "الصورة الرئيسية — تدرّج بئر السلم، ٤ أمتار" },
    campaignShots: [
      { en: "campaign 01 — numbered rose stamp", ar: "الحملة ٠١ — ختم الترقيم على القاعدة" },
      { en: "campaign 02 — archive drawer", ar: "الحملة ٠٢ — درج الأرشيف" },
      { en: "behind the scenes — final levelling", ar: "كواليس — التسوية النهائية" },
    ],
    accent: "emerald",
    productSlugs: ["orion-cascade-chandelier", "maha-tiered-chandelier", "thurayya-cluster-rug"],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
