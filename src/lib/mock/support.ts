import type { Faq, SupportArticle } from "@/lib/types";

export const SUPPORT_ARTICLES: SupportArticle[] = [
  {
    slug: "delivery",
    title: { en: "Delivery & Shipping", ar: "التوصيل والشحن" },
    lede: {
      en: "Everything leaves the atelier crated. Where it goes next depends on where you are and what you ordered.",
      ar: "يغادر كل شيء الأتيليه مغلّفاً. وما يحدث بعد ذلك يتوقف على مكانك وعلى ما طلبته.",
    },
    sections: [
      {
        heading: { en: "Timings", ar: "المواعيد" },
        body: [
          {
            en: "Ready-to-ship pieces leave within 3–5 working days. Made-to-order pieces are produced first — the lead time on each product page is the one we hold to, and we will move your date rather than send something early.",
            ar: "تغادر القطع الجاهزة خلال ٣–٥ أيام عمل. أما القطع المصنوعة حسب الطلب فتُنتج أولاً — ومدة التنفيذ المذكورة في صفحة كل منتج هي التي نلتزم بها، وسنؤجل موعدك بدل أن نرسل شيئاً قبل أوانه.",
          },
          {
            en: "After production: Egypt 5–7 days, GCC 10–14 days, Europe and the UK 3–4 weeks, North America 4–5 weeks.",
            ar: "بعد الإنتاج: مصر ٥–٧ أيام، الخليج ١٠–١٤ يوماً، أوروبا والمملكة المتحدة ٣–٤ أسابيع، أمريكا الشمالية ٤–٥ أسابيع.",
          },
        ],
      },
      {
        heading: { en: "White-glove delivery", ar: "التوصيل المتكامل" },
        body: [
          {
            en: "In Greater Cairo, Alexandria, Dubai, Abu Dhabi and Riyadh we deliver with a two-person team, install, commission the fixture with your electrician, and take the crating away. EGP 3,500 in Greater Cairo; quoted elsewhere.",
            ar: "في القاهرة الكبرى والإسكندرية ودبي وأبوظبي والرياض نوصّل بفريق من شخصين، ونركّب، ونشغّل الوحدة بالتنسيق مع فنيك، ونأخذ مخلفات التغليف. ٣٬٥٠٠ ج.م داخل القاهرة الكبرى، وبعرض سعر في غيرها.",
          },
          {
            en: "Elsewhere we ship crated and insured with a rigging drawing, and brief your electrician by video before the install.",
            ar: "وفي غيرها نشحن مغلّفاً ومؤمَّناً مع رسم للتثبيت، ونشرح لفنيك عبر مكالمة مرئية قبل التركيب.",
          },
        ],
      },
      {
        heading: { en: "Split shipments", ar: "الشحنات المجزأة" },
        body: [
          {
            en: "If your order mixes ready-to-ship and made-to-order pieces we will dispatch the stocked items first at no extra cost, unless you ask us to hold them.",
            ar: "إن جمع طلبك بين قطع جاهزة وأخرى تُصنع حسب الطلب فسنشحن القطع المتوفرة أولاً دون تكلفة إضافية، إلا إن طلبت منا الانتظار.",
          },
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: { en: "Returns & Exchanges", ar: "الإرجاع والاستبدال" },
    lede: {
      en: "Fourteen days on ready-to-ship pieces. Made-to-order and custom work is final sale, and we say so before you pay.",
      ar: "أربعة عشر يوماً للقطع الجاهزة. أما المصنوع حسب الطلب والأعمال الخاصة فبيع نهائي، ونوضّح ذلك قبل الدفع.",
    },
    sections: [
      {
        heading: { en: "What can be returned", ar: "ما يمكن إرجاعه" },
        body: [
          {
            en: "Ready-to-ship items, unused and in their original crating, within 14 days of delivery. We arrange collection; the return shipping cost is deducted from the refund unless the piece arrived faulty.",
            ar: "القطع الجاهزة، غير المستخدمة وبتغليفها الأصلي، خلال ١٤ يوماً من التسليم. نرتب الاستلام، وتُخصم تكلفة الشحن من المبلغ المسترد إلا إذا وصلت القطعة معيبة.",
          },
          {
            en: "Made-to-order, custom, and numbered limited-edition pieces cannot be returned. If something is wrong with one, that is a warranty matter and we will put it right.",
            ar: "لا يمكن إرجاع القطع المصنوعة حسب الطلب والخاصة والإصدارات المحدودة المرقّمة. وإن كان بها خلل فهذه مسألة ضمان وسنصلحها.",
          },
        ],
      },
      {
        heading: { en: "Damage in transit", ar: "التلف أثناء الشحن" },
        body: [
          {
            en: "Photograph the crate before opening it if the outer packaging is damaged, and tell us within 48 hours. Everything is insured and we replace rather than repair when glass or stone is involved.",
            ar: "صوّر الصندوق قبل فتحه إن كان التغليف الخارجي متضرراً، وأخبرنا خلال ٤٨ ساعة. كل شيء مؤمَّن، ونستبدل بدل الإصلاح حين يتعلق الأمر بالزجاج أو الحجر.",
          },
        ],
      },
    ],
  },
  {
    slug: "warranty",
    title: { en: "Warranty", ar: "الضمان" },
    lede: {
      en: "Five years on structure and finish, two on electrical components, registered to your account at purchase.",
      ar: "خمس سنوات على الهيكل والتشطيب، وسنتان على المكونات الكهربائية، مسجّلة على حسابك عند الشراء.",
    },
    sections: [
      {
        heading: { en: "What is covered", ar: "ما يشمله الضمان" },
        body: [
          {
            en: "Structural failure, finish failure that is not ordinary patina, and electrical components that fail in normal use. Replacement parts are stocked for the life of a collection, including editions that have closed.",
            ar: "الخلل الإنشائي، وتلف التشطيب الذي لا يُعد عتاقة طبيعية، والمكونات الكهربائية التي تتعطل في الاستخدام العادي. وقطع الغيار متوفرة طوال عمر المجموعة، بما فيها الإصدارات المغلقة.",
          },
        ],
      },
      {
        heading: { en: "What is not", ar: "ما لا يشمله" },
        body: [
          {
            en: "Patina developing over time — that is intended and is not a fault. Damage from acidic or ammonia-based cleaners, from installation by someone other than an electrician, or from outdoor use of an IP20 fixture.",
            ar: "تطوّر العتاقة مع الوقت — فهو مقصود وليس عيباً. وكذلك الضرر الناتج عن منظفات حمضية أو تحتوي على الأمونيا، أو عن تركيب بغير فني كهرباء، أو عن استخدام وحدة IP20 في الخارج.",
          },
        ],
      },
    ],
  },
  {
    slug: "installation",
    title: { en: "Installation Support", ar: "دعم التركيب" },
    lede: {
      en: "Every fixture above five kilograms needs a professional and a fixing point that can take twice its weight.",
      ar: "كل وحدة تتجاوز خمسة كيلوجرامات تحتاج فنياً محترفاً ونقطة تثبيت تتحمل ضعف وزنها.",
    },
    sections: [
      {
        heading: { en: "Before the install", ar: "قبل التركيب" },
        body: [
          {
            en: "Confirm the ceiling construction. Concrete slabs are straightforward; suspended plasterboard needs a timber noggin or a proprietary anchor rated for the load. We supply a rigging drawing with every made-to-order piece.",
            ar: "تأكد من نوع السقف. الأسقف الخرسانية سهلة، أما الجبس المعلق فيحتاج عارضة خشبية أو مثبتاً مخصصاً بتحمّل مناسب. ونوفر رسم تثبيت مع كل قطعة تُصنع حسب الطلب.",
          },
          {
            en: "Decide the drop before the electrician arrives. Field-adjusting a cable is five minutes on the day and an hour afterwards.",
            ar: "حدّد الارتفاع قبل وصول الفني. ضبط الكابل في الموقع يستغرق خمس دقائق في يوم التركيب وساعة بعده.",
          },
        ],
      },
      {
        heading: { en: "Dimming", ar: "التعتيم" },
        body: [
          {
            en: "Use a trailing-edge dimmer. Leading-edge dimmers will buzz with LED loads this small, and no fixture design can fix that.",
            ar: "استخدم مخفتاً من نوع التعتيم الخلفي. مخفتات التعتيم الأمامي ستصدر طنيناً مع أحمال LED الصغيرة، ولا يمكن لأي تصميم أن يعالج ذلك.",
          },
        ],
      },
    ],
  },
  {
    slug: "care",
    title: { en: "Product Care", ar: "العناية بالمنتج" },
    lede: {
      en: "Dry cloth on brass, barely damp on stone, and nothing at all on the inside of a shade.",
      ar: "قطعة جافة للنحاس، ورطبة قليلاً للحجر، ولا شيء إطلاقاً داخل الظل.",
    },
    sections: [
      {
        heading: { en: "Brass", ar: "النحاس" },
        body: [
          {
            en: "Dust with a dry microfibre cloth. Never use acidic or ammonia-based cleaners, and never polish — the patina is the finish, and removing it voids the finish warranty.",
            ar: "امسح الغبار بقطعة ميكروفايبر جافة. لا تستخدم منظفات حمضية أو تحتوي على الأمونيا أبداً، ولا تلمّع — فالعتاقة هي التشطيب، وإزالتها تُسقط ضمان التشطيب.",
          },
        ],
      },
      {
        heading: { en: "Alabaster and travertine", ar: "الألاباستر والترافرتين" },
        body: [
          {
            en: "Wipe with a barely damp cloth and dry immediately. Stone is porous; standing water will mark it. Reseal travertine surfaces annually.",
            ar: "امسح بقطعة رطبة قليلاً وجفّف فوراً. الحجر مسامي، والماء الراكد يترك أثراً. وأعد إغلاق أسطح الترافرتين سنوياً.",
          },
        ],
      },
      {
        heading: { en: "Glass", ar: "الزجاج" },
        body: [
          {
            en: "Remove the shade, wash in warm water with a drop of neutral soap, dry with a lint-free cloth. Never spray a cleaner onto a shade that is still on the fixture.",
            ar: "انزع الظل واغسله بماء دافئ مع قطرة صابون محايد وجففه بقطعة خالية من الوبر. ولا ترشّ أي منظف على ظل ما يزال مركباً على الوحدة.",
          },
        ],
      },
    ],
  },
  {
    slug: "faqs",
    title: { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
    lede: {
      en: "The questions the studio answers most often, written out once.",
      ar: "الأسئلة التي يجيب عنها الاستوديو أكثر من غيرها، مكتوبة مرة واحدة.",
    },
    sections: [],
    faqs: [
      {
        q: { en: "Do your prices include VAT?", ar: "هل تشمل الأسعار ضريبة القيمة المضافة؟" },
        a: {
          en: "Prices are shown before VAT. Egyptian VAT at 14% is added at checkout. Export orders outside Egypt are zero-rated and any local duty is payable on arrival.",
          ar: "تُعرض الأسعار قبل الضريبة. وتُضاف ضريبة القيمة المضافة المصرية بنسبة ١٤٪ عند الدفع. أما طلبات التصدير خارج مصر فمعفاة، وتُدفع أي رسوم محلية عند الوصول.",
        },
      },
      {
        q: { en: "Can I see a piece before I buy it?", ar: "هل يمكنني رؤية القطعة قبل الشراء؟" },
        a: {
          en: "Yes — the Zamalek and Dubai showrooms hold the current range, and we will light anything on a dimmer for you. Book an appointment and come at dusk.",
          ar: "نعم — تضم صالتا العرض في الزمالك ودبي المجموعة الحالية، وسنضيء لك أي قطعة على مخفت. احجز موعداً وتعال عند الغروب.",
        },
      },
      {
        q: { en: "Do you offer instalments?", ar: "هل توفرون التقسيط؟" },
        a: {
          en: "Valu instalments over 6 months are available on Egyptian orders at checkout. Trade accounts are invoiced on 30-day terms once approved.",
          ar: "التقسيط عبر فاليو على ٦ أشهر متاح للطلبات داخل مصر عند الدفع. أما حسابات المحترفين فتُفوتر بمهلة ٣٠ يوماً بعد الاعتماد.",
        },
      },
      {
        q: { en: "Can a fixture be rewired for a different country?", ar: "هل يمكن إعادة توصيل الوحدة لبلد آخر؟" },
        a: {
          en: "Every fixture ships 220–240V as standard. We can supply 110V drivers and a US or UK plug on request at no extra cost — tell us at checkout.",
          ar: "تُشحن كل وحدة بجهد ٢٢٠–٢٤٠ فولت قياسياً. ويمكننا توفير مشغّلات ١١٠ فولت وقابس أمريكي أو بريطاني عند الطلب دون تكلفة إضافية — أخبرنا عند الدفع.",
        },
      },
      {
        q: { en: "How do I know what size to order?", ar: "كيف أعرف المقاس المناسب؟" },
        a: {
          en: "Halve your table width for a diameter, and hang the base 165 cm from the floor for a 2.9 m ceiling. If you send a photograph and a ceiling height, a designer will confirm it in a day.",
          ar: "اقسم عرض طاولتك على اثنين لتحصل على القطر، واجعل القاعدة على ارتفاع ١٦٥ سم من الأرض لسقف ٢٫٩ متر. وإن أرسلت صورة وارتفاع السقف فسيؤكده لك مصمم خلال يوم.",
        },
      },
      {
        q: { en: "What happens if a piece breaks in five years?", ar: "ماذا يحدث إن انكسرت قطعة بعد خمس سنوات؟" },
        a: {
          en: "We stock spare cups, shades and cable for the life of a collection. Out of warranty we charge for the part and not for the labour.",
          ar: "نحتفظ بكؤوس وظلال وكابلات احتياطية طوال عمر المجموعة. وخارج الضمان نحاسبك على القطعة فقط دون أجرة العمل.",
        },
      },
    ],
  },
];

export function getSupportArticle(slug: string): SupportArticle | undefined {
  return SUPPORT_ARTICLES.find((a) => a.slug === slug);
}

export const LEGAL_DOCS: SupportArticle[] = [
  {
    slug: "terms",
    title: { en: "Terms of Sale", ar: "شروط البيع" },
    lede: {
      en: "The short version: we make what you ordered, we hold the lead time we published, and made-to-order work is final.",
      ar: "باختصار: نصنع ما طلبته، ونلتزم بمدة التنفيذ المعلنة، والعمل المصنوع حسب الطلب نهائي.",
    },
    sections: [
      {
        heading: { en: "Orders", ar: "الطلبات" },
        body: [
          {
            en: "An order is accepted when we send a confirmation, not when payment is taken. If a piece cannot be produced as ordered we will tell you within two working days and refund in full.",
            ar: "يُعد الطلب مقبولاً عند إرسالنا التأكيد لا عند تحصيل الدفع. وإن تعذّر إنتاج القطعة كما طُلبت فسنخبرك خلال يومَي عمل ونعيد المبلغ كاملاً.",
          },
        ],
      },
      {
        heading: { en: "Pricing and currency", ar: "الأسعار والعملة" },
        body: [
          {
            en: "Prices are set in Egyptian pounds. Other currencies are shown for guidance at an indicative rate and the amount charged is the EGP amount converted by your card issuer.",
            ar: "تُحدَّد الأسعار بالجنيه المصري. وتُعرض العملات الأخرى للاسترشاد بسعر تقريبي، والمبلغ المحصّل هو قيمة الجنيه المصري محوّلة من مُصدر بطاقتك.",
          },
        ],
      },
      {
        heading: { en: "Made-to-order work", ar: "العمل حسب الطلب" },
        body: [
          {
            en: "Production begins after payment clears. Made-to-order, custom and numbered pieces are not returnable, which is stated on the product page and again at checkout.",
            ar: "يبدأ الإنتاج بعد تمام الدفع. والقطع المصنوعة حسب الطلب والخاصة والمرقّمة غير قابلة للإرجاع، وهو ما يُذكر في صفحة المنتج ومرة أخرى عند الدفع.",
          },
        ],
      },
    ],
  },
  {
    slug: "privacy",
    title: { en: "Privacy", ar: "الخصوصية" },
    lede: {
      en: "We keep what we need to make and deliver your order, and nothing else.",
      ar: "نحتفظ بما نحتاجه لصنع طلبك وتسليمه، ولا شيء غير ذلك.",
    },
    sections: [
      {
        heading: { en: "What we collect", ar: "ما نجمعه" },
        body: [
          {
            en: "Your name, contact details, delivery address, order history and any files you send with a project enquiry. Card details are handled by our payment processor and never reach our systems.",
            ar: "اسمك وبيانات تواصلك وعنوان التسليم وسجل طلباتك وأي ملفات ترسلها مع استفسار مشروع. أما بيانات البطاقة فيتولاها مزود الدفع ولا تصل أنظمتنا أبداً.",
          },
        ],
      },
      {
        heading: { en: "Cookies", ar: "ملفات تعريف الارتباط" },
        body: [
          {
            en: "Essential cookies keep your bag and language choice. Analytics cookies are off until you accept them, and declining changes nothing about how the site works for you.",
            ar: "ملفات الارتباط الأساسية تحفظ حقيبتك واختيارك للغة. أما ملفات التحليلات فمعطلة حتى توافق عليها، ورفضها لا يغيّر شيئاً في طريقة عمل الموقع بالنسبة لك.",
          },
        ],
      },
      {
        heading: { en: "Your rights", ar: "حقوقك" },
        body: [
          {
            en: "Ask us for a copy of what we hold, or ask us to delete it, and we will act within 30 days. Order records we are required to keep for tax purposes are the one exception.",
            ar: "اطلب نسخة مما نحتفظ به عنك، أو اطلب حذفه، وسننفذ خلال ٣٠ يوماً. والاستثناء الوحيد سجلات الطلبات التي يلزمنا القانون بحفظها لأغراض ضريبية.",
          },
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: { en: "Accessibility", ar: "إمكانية الوصول" },
    lede: {
      en: "We build to WCAG 2.2 AA and treat anything below it as a defect, not a backlog item.",
      ar: "نبني وفق معيار WCAG 2.2 AA ونتعامل مع أي قصور دونه كعيب لا كمهمة مؤجلة.",
    },
    sections: [
      {
        heading: { en: "What we commit to", ar: "ما نلتزم به" },
        body: [
          {
            en: "Onyx on ivory measures 14.8:1. Muted type is used only at 12px and above. Brass is never used for body text on ivory — accents, rules and icons only.",
            ar: "تباين الأونيكس على العاجي ١٤٫٨:١. ولا يُستخدم اللون الباهت للنص إلا من مقاس ١٢ بكسل فأعلى. ولا يُستخدم النحاسي أبداً لنص المتن على العاجي — بل للتفاصيل والخطوط والأيقونات فقط.",
          },
          {
            en: "Every interactive element is reachable by keyboard. Menus and drawers trap focus and return it on close. Focus is a 2px brass outline at 3px offset and is never removed.",
            ar: "كل عنصر تفاعلي يمكن الوصول إليه بلوحة المفاتيح. وتحصر القوائم واللوحات المنزلقة التركيز وتعيده عند الإغلاق. ومؤشر التركيز إطار نحاسي بسماكة ٢ بكسل بإزاحة ٣ بكسل، ولا يُزال أبداً.",
          },
          {
            en: "Status is never carried by colour alone — every pill carries text. Motion respects prefers-reduced-motion, and there is no parallax and no scroll-jacking anywhere on the site.",
            ar: "لا تُنقل الحالة باللون وحده أبداً — فكل شارة تحمل نصاً. وتحترم الحركة إعداد تقليل الحركة، ولا يوجد أي تأثير بارالاكس ولا تحكم في التمرير في أي مكان بالموقع.",
          },
        ],
      },
      {
        heading: { en: "If something is wrong", ar: "إن وجدت خللاً" },
        body: [
          {
            en: "Tell us what page and what happened. We treat accessibility reports as defects and aim to fix them in the next release.",
            ar: "أخبرنا بالصفحة وبما حدث. نتعامل مع بلاغات إمكانية الوصول كعيوب ونستهدف إصلاحها في الإصدار التالي.",
          },
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string): SupportArticle | undefined {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}

export const SUPPORT_FAQS: Faq[] =
  SUPPORT_ARTICLES.find((a) => a.slug === "faqs")?.faqs ?? [];
