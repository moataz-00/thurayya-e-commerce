import type { Room } from "@/lib/types";

export const ROOMS: Room[] = [
  {
    slug: "living-room",
    name: { en: "The Living Room", ar: "غرفة المعيشة" },
    lede: {
      en: "Three layers of light in a Zamalek apartment: a low pendant over the seating group, wall grazing on the plaster, and a single reading lamp that stays on after everything else is off.",
      ar: "ثلاث طبقات من الضوء في شقة بالزمالك: معلقة منخفضة فوق مجموعة الجلوس، وضوء ملامس للجبس، وأباجورة قراءة واحدة تبقى مضاءة بعد إطفاء كل شيء.",
    },
    heroShot: {
      en: "room hero — full living room, tagged products, 2400x1200",
      ar: "الصورة الرئيسية — غرفة معيشة كاملة بمنتجات معلّمة، ٢٤٠٠×١٢٠٠",
    },
    tileShot: { en: "living room, late afternoon", ar: "غرفة المعيشة، بعد الظهيرة" },
    tips: [
      {
        en: "Hang a seating-group pendant 190–210 cm from the floor so it frames the group without blocking sightlines.",
        ar: "علّق معلقة مجموعة الجلوس على ارتفاع ١٩٠–٢١٠ سم من الأرض لتؤطر المجموعة دون أن تحجب الرؤية.",
      },
      {
        en: "Keep every bulb in the room at one colour temperature. 2700K reads warm without going amber.",
        ar: "اجعل كل اللمبات في الغرفة على درجة حرارة لون واحدة. ٢٧٠٠ كلفن دافئة دون أن تميل للكهرماني.",
      },
      {
        en: "Put wall lights on their own circuit — the room should work with the ceiling light off.",
        ar: "ضع إضاءة الحائط على دائرة مستقلة — يجب أن تعمل الغرفة وإضاءة السقف مطفأة.",
      },
    ],
    productSlugs: ["najm-halo-chandelier", "alabaster-wall-light", "meridian-floor-lamp", "thurayya-cluster-rug"],
    hotspots: [
      { x: 34, y: 38, slug: "najm-halo-chandelier" },
      { x: 57, y: 56, slug: "meridian-floor-lamp" },
      { x: 73, y: 33, slug: "alabaster-wall-light" },
    ],
  },
  {
    slug: "dining-room",
    name: { en: "The Dining Room", ar: "غرفة الطعام" },
    lede: {
      en: "One fixture, sized correctly, doing all of the work. A 96 cm cluster over a 260 cm table, with the base set 165 cm from the floor.",
      ar: "وحدة واحدة بمقاس صحيح تؤدي العمل كله. عنقود بقطر ٩٦ سم فوق طاولة ٢٦٠ سم، وقاعدته على ارتفاع ١٦٥ سم من الأرض.",
    },
    heroShot: { en: "room hero — dining room, chandelier lit at dusk", ar: "الصورة الرئيسية — غرفة الطعام، الثريا مضاءة عند الغروب" },
    tileShot: { en: "dining room, chandelier lit", ar: "غرفة الطعام، الثريا مضاءة" },
    tips: [
      {
        en: "Set the fixture diameter at roughly half the table width, and never wider than the table itself.",
        ar: "اجعل قطر الوحدة نحو نصف عرض الطاولة، ولا تجعله أبداً أعرض من الطاولة نفسها.",
      },
      {
        en: "165 cm from floor to fixture base is right for a 2.9 m ceiling. Add 8 cm for every extra 30 cm of ceiling.",
        ar: "١٦٥ سم من الأرض إلى قاعدة الوحدة مناسبة لسقف ٢٫٩ متر. أضف ٨ سم لكل ٣٠ سم زيادة في ارتفاع السقف.",
      },
      {
        en: "Dim to 40% for dinner. Anything brighter and the table stops being the subject.",
        ar: "خفّت الإضاءة إلى ٤٠٪ للعشاء. أي سطوع أعلى يجعل الطاولة تفقد موقعها كمركز للمشهد.",
      },
    ],
    productSlugs: ["thurayya-seven-chandelier", "sahra-dining-table", "sidra-linear-suspension", "warm-led-bulbs"],
    hotspots: [
      { x: 50, y: 30, slug: "thurayya-seven-chandelier" },
      { x: 48, y: 66, slug: "sahra-dining-table" },
    ],
  },
  {
    slug: "bedroom",
    name: { en: "The Bedroom", ar: "غرفة النوم" },
    lede: {
      en: "Nothing overhead that you have to look at from the pillow. Wall-mounted reading light, a low flush fitting, and stone on the bedside.",
      ar: "لا شيء فوق الرأس تضطر للنظر إليه من الوسادة. ضوء قراءة على الحائط، ووحدة سقف ملاصقة، وحجر على طاولة السرير.",
    },
    heroShot: { en: "room hero — bedroom, linen and brass, morning", ar: "الصورة الرئيسية — غرفة نوم، كتّان ونحاس، صباحاً" },
    tileShot: { en: "bedroom, linen and brass", ar: "غرفة النوم، كتّان ونحاس" },
    tips: [
      {
        en: "Mount bedside sconces 60 cm above the mattress, offset 20 cm outward from the pillow.",
        ar: "ثبّت وحدات الحائط على ارتفاع ٦٠ سم فوق المرتبة، بإزاحة ٢٠ سم للخارج عن الوسادة.",
      },
      {
        en: "A flush ceiling fitting under 12 cm deep will not read as a low ceiling.",
        ar: "وحدة سقف ملاصقة بعمق أقل من ١٢ سم لن تجعل السقف يبدو منخفضاً.",
      },
      {
        en: "Put one lamp on a dimmer you can reach from the bed. It is the only switch that matters at 1am.",
        ar: "ضع أباجورة واحدة على مخفت تصله من السرير. هو المفتاح الوحيد المهم في الواحدة صباحاً.",
      },
    ],
    productSlugs: ["nour-ceiling-flush", "rida-linear-sconce", "dune-alabaster-lamp", "qandil-table-lamp"],
    hotspots: [
      { x: 50, y: 22, slug: "nour-ceiling-flush" },
      { x: 26, y: 48, slug: "rida-linear-sconce" },
      { x: 72, y: 58, slug: "dune-alabaster-lamp" },
    ],
  },
  {
    slug: "entrance-hallway",
    name: { en: "Entrance & Hallway", ar: "المدخل والممر" },
    lede: {
      en: "The first and last room anyone sees. A console, a mirror, and one fixture with enough drop to make the height mean something.",
      ar: "أول غرفة وآخر غرفة يراها أي زائر. كونسول ومرآة ووحدة بارتفاع كافٍ ليصير علو المكان ذا معنى.",
    },
    heroShot: { en: "room hero — entrance hall, double height, evening", ar: "الصورة الرئيسية — بهو المدخل مزدوج الارتفاع، مساءً" },
    tileShot: { en: "entrance hall, double height", ar: "بهو المدخل، ارتفاع مزدوج" },
    tips: [
      {
        en: "In a double-height entrance, hang the lowest point of the fixture level with the first floor slab.",
        ar: "في مدخل مزدوج الارتفاع، اجعل أخفض نقطة في الوحدة بمستوى بلاطة الدور الأول.",
      },
      {
        en: "A mirror opposite the fixture doubles the light and the room. Low-iron glass only.",
        ar: "مرآة مقابل الوحدة تضاعف الضوء والمساحة. زجاج منخفض الحديد فقط.",
      },
      {
        en: "Leave the console light on a timer. Arriving to a lit hallway is worth the wiring.",
        ar: "اترك ضوء الكونسول على مؤقت. الوصول إلى ممر مضاء يستحق تكلفة التوصيل.",
      },
    ],
    productSlugs: ["orion-cascade-chandelier", "layl-travertine-console", "qamar-brass-mirror", "mashrabiya-wall-sconce"],
    hotspots: [
      { x: 47, y: 26, slug: "orion-cascade-chandelier" },
      { x: 30, y: 68, slug: "layl-travertine-console" },
      { x: 30, y: 44, slug: "qamar-brass-mirror" },
    ],
  },
  {
    slug: "kitchen",
    name: { en: "The Kitchen", ar: "المطبخ" },
    lede: {
      en: "Task light where the work is, and something worth looking at over the island. Tunable white if you cook early and eat late.",
      ar: "ضوء عمل حيث يجري العمل، وشيء يستحق النظر فوق الجزيرة. أبيض متغيّر إن كنت تطبخ باكراً وتأكل متأخراً.",
    },
    heroShot: { en: "room hero — kitchen island, pendants, morning", ar: "الصورة الرئيسية — جزيرة المطبخ، معلقات، صباحاً" },
    tileShot: { en: "kitchen island, pendants", ar: "جزيرة المطبخ، معلقات" },
    tips: [
      {
        en: "Three pendants over an island: space them at a third of the island length, centred.",
        ar: "ثلاث معلقات فوق الجزيرة: باعد بينها بمقدار ثلث طول الجزيرة، مع التوسيط.",
      },
      {
        en: "Base of the pendant 75–85 cm above the worktop. Any lower and you will be looking through it.",
        ar: "قاعدة المعلقة على ارتفاع ٧٥–٨٥ سم فوق سطح العمل. أخفض من ذلك ستنظر من خلالها.",
      },
      {
        en: "Under-cabinet light is not optional. It is the only layer that makes a kitchen usable.",
        ar: "الإضاءة أسفل الخزائن ليست اختيارية. هي الطبقة الوحيدة التي تجعل المطبخ صالحاً للعمل.",
      },
    ],
    productSlugs: ["qamar-dome-pendant", "safir-smart-pendant", "nocturne-pendant", "manzil-scene-controller"],
    hotspots: [
      { x: 38, y: 34, slug: "qamar-dome-pendant" },
      { x: 55, y: 32, slug: "safir-smart-pendant" },
      { x: 78, y: 52, slug: "manzil-scene-controller" },
    ],
  },
  {
    slug: "garden-terrace",
    name: { en: "Garden & Terrace", ar: "الحديقة والتراس" },
    lede: {
      en: "Light the path and the plants, not the people. Everything here is IP65 and left to patinate.",
      ar: "أضئ الممر والنباتات لا الأشخاص. كل ما هنا بتصنيف IP65 ومتروك ليتعتّق.",
    },
    heroShot: { en: "room hero — terrace at dusk, columns lit", ar: "الصورة الرئيسية — التراس عند الغروب، الأعمدة مضاءة" },
    tileShot: { en: "terrace at dusk", ar: "التراس عند الغروب" },
    tips: [
      {
        en: "Keep outdoor light below eye level. Anything above it becomes glare and kills the view.",
        ar: "أبقِ الإضاءة الخارجية تحت مستوى النظر. ما فوقه يتحول إلى وهج ويقتل المشهد.",
      },
      {
        en: "2200K outdoors. Warmer than indoors, so the inside reads bright by comparison.",
        ar: "٢٢٠٠ كلفن في الخارج. أدفأ من الداخل، فيبدو الداخل أكثر إشراقاً بالمقارنة.",
      },
      {
        en: "On the coast, choose unlacquered brass. It will go green, and it should.",
        ar: "على الساحل اختر نحاساً بلا طلاء. سيخضرّ، وهذا ما ينبغي أن يحدث.",
      },
    ],
    productSlugs: ["layl-outdoor-column", "bahr-wall-lantern", "mashrabiya-wall-sconce"],
    hotspots: [
      { x: 28, y: 60, slug: "layl-outdoor-column" },
      { x: 66, y: 42, slug: "bahr-wall-lantern" },
    ],
  },
  {
    slug: "bathroom",
    name: { en: "The Bathroom", ar: "الحمام" },
    lede: {
      en: "Light the face, not the ceiling. Two vertical sources beside a mirror beat any downlight above it.",
      ar: "أضئ الوجه لا السقف. مصدران رأسيان بجانب المرآة أفضل من أي إضاءة سقف فوقها.",
    },
    heroShot: { en: "room hero — bathroom, mirror flanked by sconces", ar: "الصورة الرئيسية — الحمام، مرآة بين وحدتي حائط" },
    tileShot: { en: "bathroom, brass and stone", ar: "الحمام، نحاس وحجر" },
    tips: [
      {
        en: "Two sconces at 165 cm, one either side of the mirror, 80 cm apart.",
        ar: "وحدتا حائط على ارتفاع ١٦٥ سم، واحدة على كل جانب من المرآة، بمسافة ٨٠ سم بينهما.",
      },
      {
        en: "IP44 minimum within 60 cm of a basin, IP65 inside a shower zone.",
        ar: "IP44 كحد أدنى ضمن ٦٠ سم من الحوض، وIP65 داخل منطقة الدش.",
      },
      {
        en: "3000K here, not 2700K. Warmer than that and skin tones stop being readable.",
        ar: "٣٠٠٠ كلفن هنا لا ٢٧٠٠. أدفأ من ذلك تصبح ألوان البشرة غير واضحة.",
      },
    ],
    productSlugs: ["rida-linear-sconce", "sahn-ceiling-plate", "qamar-brass-mirror"],
    hotspots: [
      { x: 36, y: 40, slug: "rida-linear-sconce" },
      { x: 50, y: 42, slug: "qamar-brass-mirror" },
    ],
  },
  {
    slug: "hospitality",
    name: { en: "Hospitality Spaces", ar: "مساحات الضيافة" },
    lede: {
      en: "Lobbies, bars and restaurants, specified for maintenance as much as effect. Bulk lead times and staged delivery are the norm here.",
      ar: "بهوات وبارات ومطاعم، تُوصَّف للصيانة بقدر ما تُوصَّف للأثر. مدد التنفيذ للكميات والتسليم على مراحل هي القاعدة هنا.",
    },
    heroShot: { en: "room hero — boutique hotel bar, Dubai", ar: "الصورة الرئيسية — بار فندق بوتيك، دبي" },
    tileShot: { en: "hotel lobby installation", ar: "تركيب في بهو فندق" },
    tips: [
      {
        en: "Specify one bulb type across the whole property. Housekeeping will thank you in year two.",
        ar: "حدّد نوع لمبة واحداً لكل المبنى. سيشكرك قسم الإشغال في العام الثاني.",
      },
      {
        en: "Order 5% spare shades with the project. Replacements from a later batch never match exactly.",
        ar: "اطلب ٥٪ ظلال احتياطية مع المشروع. البدائل من دفعة لاحقة لا تتطابق تماماً.",
      },
      {
        en: "Scenes, not switches. Four presets cover breakfast, lunch, dinner and close.",
        ar: "مشاهد لا مفاتيح. أربعة إعدادات تغطي الإفطار والغداء والعشاء والإغلاق.",
      },
    ],
    productSlugs: ["orion-cascade-chandelier", "anbar-cluster-pendant", "manzil-scene-controller", "maha-tiered-chandelier"],
    hotspots: [
      { x: 44, y: 30, slug: "anbar-cluster-pendant" },
      { x: 70, y: 44, slug: "manzil-scene-controller" },
    ],
  },
];

export function getRoom(slug: string): Room | undefined {
  return ROOMS.find((r) => r.slug === slug);
}
