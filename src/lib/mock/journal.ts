import type { JournalPost, Localized } from "@/lib/types";
import { JOURNAL_IMAGES } from "@/lib/images";

export const JOURNAL_CATEGORIES: { slug: string; label: Localized }[] = [
  { slug: "lighting-guides", label: { en: "Lighting Guides", ar: "أدلة الإضاءة" } },
  { slug: "interior-inspiration", label: { en: "Interior Inspiration", ar: "إلهام الديكور" } },
  { slug: "materials-craft", label: { en: "Materials & Craft", ar: "المواد والحِرفية" } },
  { slug: "styling-advice", label: { en: "Styling Advice", ar: "نصائح التنسيق" } },
  { slug: "studio-stories", label: { en: "Studio Stories", ar: "حكايات الاستوديو" } },
];

const studio: Localized = { en: "Thurayyā Studio", ar: "استوديو ثريا" };

const POST_SEEDS: JournalPost[] = [
  {
    slug: "choosing-a-chandelier-for-your-dining-room",
    categorySlug: "lighting-guides",
    category: { en: "Lighting Guides", ar: "أدلة الإضاءة" },
    title: {
      en: "How to Choose the Right Chandelier for Your Dining Room",
      ar: "كيف تختار الثريا المناسبة لغرفة طعامك",
    },
    excerpt: {
      en: "Diameter, drop, and colour temperature — the three decisions that determine whether a chandelier looks specified or borrowed. With a table of proportions for the most common Egyptian and Gulf ceiling heights.",
      ar: "القطر والارتفاع ودرجة حرارة اللون — ثلاثة قرارات تحدد ما إذا كانت الثريا تبدو مختارة بعناية أم مستعارة. مع جدول نسب لأكثر ارتفاعات الأسقف شيوعاً في مصر والخليج.",
    },
    readingTime: { en: "6 min", ar: "٦ دقائق" },
    date: { en: "12 August 2026", ar: "١٢ أغسطس ٢٠٢٦" },
    isoDate: "2026-08-12",
    heroShot: {
      en: "feature article hero — chandelier scale study, 1600x1000",
      ar: "صورة المقال الرئيسية — دراسة مقياس الثريا، ١٦٠٠×١٠٠٠",
    },
    author: studio,
    standfirst: {
      en: "Most dining rooms fail on proportion, not on taste. Three numbers fix it.",
      ar: "معظم غرف الطعام تخطئ في النسبة لا في الذوق. ثلاثة أرقام تصحح ذلك.",
    },
    featured: true,
    body: [
      {
        type: "p",
        value: {
          en: "A chandelier over a dining table has one job: to make the table the subject of the room. It fails when it is too small, when it hangs too high, or when it is a different colour temperature to everything around it. Everything else — style, material, budget — is downstream of those three.",
          ar: "للثريا فوق طاولة الطعام مهمة واحدة: أن تجعل الطاولة موضوع الغرفة. وتفشل حين تكون صغيرة، أو حين تُعلَّق مرتفعة، أو حين تختلف درجة حرارة لونها عمّا حولها. وكل ما عدا ذلك — الطراز والمادة والميزانية — يأتي بعد هذه الثلاثة.",
        },
      },
      { type: "h2", value: { en: "Diameter", ar: "القطر" } },
      {
        type: "p",
        value: {
          en: "Take the width of your table and halve it. That is your fixture diameter, give or take ten centimetres. A 260 cm table wants something around 96 cm across; a 180 cm table wants 70 cm. Going wider than the table itself is the single most common mistake, and it makes the room feel smaller rather than grander.",
          ar: "خذ عرض طاولتك واقسمه على اثنين. تلك هي قطر الوحدة، بزيادة أو نقص عشرة سنتيمترات. طاولة بعرض ٢٦٠ سم تحتاج نحو ٩٦ سم، وطاولة ١٨٠ سم تحتاج ٧٠ سم. وتجاوز عرض الطاولة نفسها هو الخطأ الأكثر شيوعاً، ويجعل الغرفة تبدو أصغر لا أفخم.",
        },
      },
      {
        type: "shot",
        value: {
          en: "in-article diagram — table width to fixture diameter",
          ar: "رسم داخل المقال — عرض الطاولة مقابل قطر الوحدة",
        },
      },
      { type: "h2", value: { en: "Drop", ar: "الارتفاع" } },
      {
        type: "p",
        value: {
          en: "Measure from the floor to the lowest point of the fixture, not from the ceiling. For a 2.9 m ceiling, 165 cm is right. Add roughly 8 cm for every extra 30 cm of ceiling height, and stop adding once the fixture is more than 220 cm up — beyond that you are lighting the ceiling, not the table.",
          ar: "قِس من الأرض إلى أخفض نقطة في الوحدة، لا من السقف. لسقف ٢٫٩ متر يكون ١٦٥ سم صحيحاً. أضف نحو ٨ سم لكل ٣٠ سم زيادة في ارتفاع السقف، وتوقف عن الإضافة متى تجاوزت الوحدة ٢٢٠ سم — بعدها تكون تضيء السقف لا الطاولة.",
        },
      },
      {
        type: "list",
        value: [
          { en: "2.6 m ceiling — 150 cm to the fixture base", ar: "سقف ٢٫٦ م — ١٥٠ سم إلى قاعدة الوحدة" },
          { en: "2.9 m ceiling — 165 cm", ar: "سقف ٢٫٩ م — ١٦٥ سم" },
          { en: "3.2 m ceiling — 175 cm", ar: "سقف ٣٫٢ م — ١٧٥ سم" },
          { en: "4 m+ or double height — hang level with the first floor slab", ar: "٤ م فأكثر أو ارتفاع مزدوج — علّقها بمستوى بلاطة الدور الأول" },
        ],
      },
      { type: "h2", value: { en: "Colour temperature", ar: "درجة حرارة اللون" } },
      {
        type: "p",
        value: {
          en: "2700K, every bulb, no exceptions. A single 3000K lamp in a 2700K room reads as broken rather than bright. If you want the room to feel warmer at dinner, dim it — do not change the temperature.",
          ar: "٢٧٠٠ كلفن، لكل لمبة، دون استثناء. لمبة واحدة بـ٣٠٠٠ كلفن في غرفة ٢٧٠٠ تبدو معطلة لا مشرقة. وإن أردت الغرفة أدفأ على العشاء فخفّت الإضاءة — لا تغيّر درجة الحرارة.",
        },
      },
      {
        type: "quote",
        value: {
          en: "If you only remember one number, remember 165. It is right more often than any other height we have measured.",
          ar: "إن لم تتذكر إلا رقماً واحداً، فتذكّر ١٦٥. إنه الصحيح أكثر من أي ارتفاع آخر قسناه.",
        },
      },
      {
        type: "p",
        value: {
          en: "Everything above assumes a rectangular table and a fixture on a single point. Round tables take a round fixture at the same half-width rule; long tables above 280 cm are better served by a linear suspension than a cluster.",
          ar: "كل ما سبق يفترض طاولة مستطيلة ووحدة على نقطة تعليق واحدة. الطاولات الدائرية تناسبها وحدة دائرية بالقاعدة نفسها، والطاولات الأطول من ٢٨٠ سم تخدمها وحدة خطية أفضل من العنقود.",
        },
      },
    ],
    productSlugs: ["thurayya-seven-chandelier", "sidra-linear-suspension", "warm-led-bulbs"],
  },
  {
    slug: "layering-light",
    categorySlug: "lighting-guides",
    category: { en: "Lighting Guides", ar: "أدلة الإضاءة" },
    title: {
      en: "Layering Light: A Guide to Ambient, Task, and Accent Lighting",
      ar: "طبقات الضوء: دليل الإضاءة المحيطة والوظيفية والمركّزة",
    },
    excerpt: {
      en: "Most rooms fail on one circuit. A room that works after dark needs three, each doing one job and none of them doing all three.",
      ar: "معظم الغرف تفشل على دائرة واحدة. الغرفة التي تعمل بعد الغروب تحتاج ثلاث دوائر، كل منها تؤدي مهمة واحدة ولا واحدة تؤدي الثلاث.",
    },
    readingTime: { en: "8 min", ar: "٨ دقائق" },
    date: { en: "29 July 2026", ar: "٢٩ يوليو ٢٠٢٦" },
    isoDate: "2026-07-29",
    heroShot: { en: "living room, three light layers annotated", ar: "غرفة معيشة، ثلاث طبقات ضوء موضّحة" },
    author: studio,
    standfirst: {
      en: "Ambient, task, accent. Learn which is which and a difficult room becomes an easy one.",
      ar: "محيطة، ووظيفية، ومركّزة. اعرف أيها أي، وتصير الغرفة الصعبة سهلة.",
    },
    featured: false,
    body: [
      {
        type: "p",
        value: {
          en: "Ambient light sets the level you read the room by. It should be the dimmest layer you can live with, and it should never come from a single central fixture — a pendant plus two wall lights will always beat one bright source in the middle of the ceiling.",
          ar: "الإضاءة المحيطة تحدد المستوى الذي تقرأ به الغرفة. ينبغي أن تكون أخفت طبقة تحتملها، وألا تأتي أبداً من وحدة مركزية واحدة — معلقة مع وحدتَي حائط تتفوق دائماً على مصدر ساطع واحد وسط السقف.",
        },
      },
      {
        type: "shot",
        value: { en: "in-article image — three light layers annotated", ar: "صورة داخل المقال — ثلاث طبقات ضوء موضّحة" },
      },
      {
        type: "p",
        value: {
          en: "Task light is the only layer allowed to be bright, and only where the task is: a reading chair, a kitchen counter, a desk. Accent light is what makes a room feel considered — grazing a plaster wall, washing a stone surface, or lighting the object you care about most.",
          ar: "الإضاءة الوظيفية هي الطبقة الوحيدة المسموح لها أن تكون ساطعة، وفقط حيث توجد المهمة: كرسي القراءة، أو سطح المطبخ، أو المكتب. أما الإضاءة المركّزة فهي ما يجعل الغرفة تبدو مدروسة — تلامس جداراً جبسياً، أو تغسل سطحاً حجرياً، أو تضيء القطعة التي تهتم بها أكثر.",
        },
      },
      { type: "h2", value: { en: "Three circuits, three switches", ar: "ثلاث دوائر، ثلاثة مفاتيح" } },
      {
        type: "p",
        value: {
          en: "The layering only works if you can turn the layers off independently. Ask your electrician for three circuits before the plaster goes on; retrofitting a second circuit costs more than the fixtures.",
          ar: "لا تعمل الطبقات إلا إذا استطعت إطفاء كل منها على حدة. اطلب من الفني ثلاث دوائر قبل أعمال الجبس، فإضافة دائرة ثانية لاحقاً تكلف أكثر من الوحدات نفسها.",
        },
      },
      {
        type: "list",
        value: [
          { en: "Circuit one — ambient, dimmed to 30% by default", ar: "الدائرة الأولى — محيطة، مخفّتة إلى ٣٠٪ افتراضياً" },
          { en: "Circuit two — task, full output, switched locally", ar: "الدائرة الثانية — وظيفية، بكامل القدرة، بمفتاح موضعي" },
          { en: "Circuit three — accent, on a timer or a scene", ar: "الدائرة الثالثة — مركّزة، على مؤقت أو ضمن مشهد" },
        ],
      },
    ],
    productSlugs: ["nocturne-pendant", "alabaster-wall-light", "meridian-floor-lamp"],
  },
  {
    slug: "brass-glass-and-stone",
    categorySlug: "materials-craft",
    category: { en: "Materials & Craft", ar: "المواد والحِرفية" },
    title: {
      en: "Brass, Glass, and Stone: The Materials Behind Thurayyā",
      ar: "النحاس والزجاج والحجر: المواد التي تصنع ثريا",
    },
    excerpt: {
      en: "What we buy, where it comes from, and why a patina that changes is a feature rather than a fault.",
      ar: "ما نشتريه، ومن أين يأتي، ولماذا تُعد العتاقة المتغيرة ميزة لا عيباً.",
    },
    readingTime: { en: "5 min", ar: "٥ دقائق" },
    date: { en: "14 July 2026", ar: "١٤ يوليو ٢٠٢٦" },
    isoDate: "2026-07-14",
    heroShot: { en: "atelier bench with tools", ar: "منضدة الأتيليه والأدوات" },
    author: studio,
    standfirst: {
      en: "Three materials, three suppliers, and one rule: nothing is plated and nothing is filled.",
      ar: "ثلاث مواد، وثلاثة موردين، وقاعدة واحدة: لا طلاء ولا حشو.",
    },
    featured: false,
    body: [
      {
        type: "p",
        value: {
          en: "Brass arrives as ingot and leaves as a patinated surface that will keep moving for the first two years. We sand-cast rather than machine because a cast surface takes patina unevenly, and that unevenness is what makes the metal look like metal.",
          ar: "يصل النحاس سبيكةً ويغادر سطحاً معتّقاً يستمر في التغير خلال أول سنتين. نسبكه بالرمل لا نخرطه، لأن السطح المسبوك يتلقى العتاقة بتفاوت، وهذا التفاوت هو ما يجعل المعدن يبدو معدناً.",
        },
      },
      {
        type: "p",
        value: {
          en: "Glass is mouth-blown in batches of forty. Anything with a visible seam or a bubble larger than a millimetre goes back into the furnace. What survives is tinted in the batch, not sprayed, so cleaning never lifts the colour.",
          ar: "يُنفخ الزجاج بالفم على دفعات من أربعين قطعة. وما فيه خط لحام ظاهر أو فقاعة أكبر من مليمتر يعود إلى الفرن. وما يبقى يُلوَّن في الخلطة لا بالرش، فلا يزيل التنظيف لونه أبداً.",
        },
      },
      {
        type: "quote",
        value: {
          en: "We buy the whole block and carry the waste. It is the only honest way to choose stone for light.",
          ar: "نشتري الكتلة كاملة ونتحمل الفاقد. هي الطريقة الصادقة الوحيدة لاختيار حجر يُضاء.",
        },
      },
      {
        type: "p",
        value: {
          en: "Alabaster is the difficult one. It is bought by the block at a single quarry near Beni Suef, cut oversize, and carved down until the wall is around four millimetres — thin enough to glow, thick enough to hold. Perhaps a third of each block becomes a finished piece.",
          ar: "الألاباستر هو الأصعب. يُشترى بالكتلة من محجر واحد قرب بني سويف، ويُقطع بمقاس أكبر، ثم يُنحت حتى يصير الجدار نحو أربعة مليمترات — رقيقاً بما يكفي للتوهج وسميكاً بما يكفي للتماسك. ولعل ثلث كل كتلة فقط يصير قطعة نهائية.",
        },
      },
    ],
    productSlugs: ["alabaster-wall-light", "nocturne-pendant", "thurayya-seven-chandelier"],
  },
  {
    slug: "six-cairo-apartments",
    categorySlug: "interior-inspiration",
    category: { en: "Interior Inspiration", ar: "إلهام الديكور" },
    title: {
      en: "Six Cairo Apartments That Understand Evening Light",
      ar: "ست شقق قاهرية تفهم ضوء المساء",
    },
    excerpt: {
      en: "From a 1930s flat in Garden City to a new build in Sheikh Zayed — six rooms photographed at the hour they were designed for.",
      ar: "من شقة ثلاثينية في جاردن سيتي إلى مبنى جديد في الشيخ زايد — ست غرف صُوِّرت في الساعة التي صُممت لأجلها.",
    },
    readingTime: { en: "7 min", ar: "٧ دقائق" },
    date: { en: "2 July 2026", ar: "٢ يوليو ٢٠٢٦" },
    isoDate: "2026-07-02",
    heroShot: { en: "apartment interior, golden hour", ar: "داخل شقة، الساعة الذهبية" },
    author: studio,
    standfirst: {
      en: "None of these rooms are bright. All of them are legible.",
      ar: "لا واحدة من هذه الغرف ساطعة. وكلها واضحة المعالم.",
    },
    featured: false,
    body: [
      {
        type: "p",
        value: {
          en: "What the six have in common is restraint about the ceiling. In every one of them the brightest thing in the room at 9pm is at or below eye level — a table lamp, a wall light, a lit shelf — and the ceiling fixture is either off or at a fraction of its output.",
          ar: "ما يجمع الست هو ضبط النفس تجاه السقف. في كل واحدة منها يكون ألمع شيء في التاسعة مساءً عند مستوى النظر أو تحته — أباجورة طاولة، أو ضوء حائط، أو رف مضاء — بينما وحدة السقف مطفأة أو تعمل بجزء يسير من قدرتها.",
        },
      },
      {
        type: "shot",
        value: { en: "apartment 01 — Garden City, 1930s, shutters half closed", ar: "الشقة ٠١ — جاردن سيتي، ثلاثينيات، شيش نصف مغلق" },
      },
      {
        type: "p",
        value: {
          en: "The Garden City flat is the clearest example. Three metre ceilings, original shutters, and a single alabaster wall light on each pier between the windows. The owner has never installed a ceiling fixture in the living room and says she does not intend to.",
          ar: "شقة جاردن سيتي هي المثال الأوضح. أسقف بثلاثة أمتار، وشيش أصلي، وضوء ألاباستر واحد على كل دعامة بين النوافذ. لم تركّب المالكة أي وحدة سقف في غرفة المعيشة وتقول إنها لا تنوي ذلك.",
        },
      },
    ],
    productSlugs: ["alabaster-wall-light", "dune-alabaster-lamp", "najm-halo-chandelier"],
  },
  {
    slug: "where-to-stop",
    categorySlug: "styling-advice",
    category: { en: "Styling Advice", ar: "نصائح التنسيق" },
    title: {
      en: "Where to Stop: Restraint in a Room Full of Brass",
      ar: "أين تتوقف: ضبط النفس في غرفة مليئة بالنحاس",
    },
    excerpt: {
      en: "Brass is a line, not a fill. Four rules for using it once more than you think you should and one time less than you want to.",
      ar: "النحاس خط لا مساحة. أربع قواعد لاستخدامه مرة أكثر مما تظن ومرة أقل مما تشتهي.",
    },
    readingTime: { en: "4 min", ar: "٤ دقائق" },
    date: { en: "18 June 2026", ar: "١٨ يونيو ٢٠٢٦" },
    isoDate: "2026-06-18",
    heroShot: { en: "styled console, brass accents", ar: "كونسول منسّق بلمسات نحاسية" },
    author: studio,
    standfirst: {
      en: "The room stops working at the fourth brass object. Usually.",
      ar: "تتوقف الغرفة عن العمل عند القطعة النحاسية الرابعة. غالباً.",
    },
    featured: false,
    body: [
      {
        type: "list",
        value: [
          {
            en: "One brass object per sightline. If you can see two from where you sit, move one.",
            ar: "قطعة نحاسية واحدة في كل خط نظر. إن رأيت اثنتين من مجلسك فانقل واحدة.",
          },
          {
            en: "Match the patina depth, not the finish name. Two different suppliers rarely agree on antique brass.",
            ar: "طابق عمق العتاقة لا اسم التشطيب. نادراً ما يتفق موردان على معنى «نحاس عتيق».",
          },
          {
            en: "Keep brass off the floor. It belongs at eye level and above.",
            ar: "أبقِ النحاس بعيداً عن الأرض. مكانه عند مستوى النظر وما فوقه.",
          },
          {
            en: "Let one thing be the brightest. A room with two focal points has none.",
            ar: "اجعل شيئاً واحداً هو الألمع. الغرفة بمركزَي انتباه لا مركز لها.",
          },
        ],
      },
      {
        type: "p",
        value: {
          en: "None of this is about quantity for its own sake. It is about giving the eye somewhere to rest — which in a warm palette means leaving large areas of ivory and taupe entirely alone.",
          ar: "لا يتعلق الأمر بالكمية لذاتها، بل بمنح العين مكاناً ترتاح فيه — وهو ما يعني في لوحة دافئة ترك مساحات واسعة من العاجي والترابي دون أي إضافة.",
        },
      },
    ],
    productSlugs: ["mashrabiya-wall-sconce", "qamar-brass-mirror", "qandil-table-lamp"],
  },
  {
    slug: "the-seven-stars",
    categorySlug: "studio-stories",
    category: { en: "Studio Stories", ar: "حكايات الاستوديو" },
    title: {
      en: "The Seven Stars: Drawing the First Thurayyā Chandelier",
      ar: "النجوم السبعة: رسم أول ثريا",
    },
    excerpt: {
      en: "Eleven months, four prototypes, and the moment the hub finally carried all seven arms from one bearing surface.",
      ar: "أحد عشر شهراً، وأربعة نماذج، واللحظة التي حمل فيها المحور الأذرع السبعة من سطح ارتكاز واحد.",
    },
    readingTime: { en: "9 min", ar: "٩ دقائق" },
    date: { en: "30 May 2026", ar: "٣٠ مايو ٢٠٢٦" },
    isoDate: "2026-05-30",
    heroShot: { en: "sketches pinned to studio wall", ar: "رسومات معلقة على جدار الاستوديو" },
    author: studio,
    standfirst: {
      en: "The first three prototypes all worked. None of them looked like a drawing.",
      ar: "النماذج الثلاثة الأولى كلها نجحت. ولم يبدُ أي منها كرسم.",
    },
    featured: false,
    body: [
      {
        type: "p",
        value: {
          en: "The brief was written on the back of an invoice: seven points of light, no visible hardware, thin enough to disappear when the room is lit. The first prototype used a spider bracket, which worked structurally and looked like a spider bracket. The second hid the bracket inside a cup and put the weight in the wrong place.",
          ar: "كُتب المطلوب على ظهر فاتورة: سبع نقاط ضوء، دون تثبيت ظاهر، ونحيف بما يكفي ليختفي حين تُضاء الغرفة. استخدم النموذج الأول حاملاً عنكبوتياً نجح إنشائياً وبدا حاملاً عنكبوتياً. أما الثاني فأخفى الحامل داخل كأس ووضع الثقل في المكان الخطأ.",
        },
      },
      {
        type: "shot",
        value: { en: "prototype 02 — spider bracket, rejected", ar: "النموذج ٠٢ — حامل عنكبوتي، مرفوض" },
      },
      {
        type: "p",
        value: {
          en: "The fourth was the one. A single machined hub, turned from solid, with all seven arms landing on one bearing surface at slightly different angles. It took three attempts on the lathe to get the angles right and one more to get the tolerance tight enough that the arms level themselves.",
          ar: "كان الرابع هو المطلوب. محور واحد مخروط من كتلة صلبة، تلتقي عنده الأذرع السبعة على سطح ارتكاز واحد بزوايا متفاوتة قليلاً. استغرق ضبط الزوايا ثلاث محاولات على المخرطة، ومحاولة رابعة حتى صار التفاوت المسموح ضيقاً بما يكفي لتستوي الأذرع من تلقاء نفسها.",
        },
      },
      {
        type: "quote",
        value: {
          en: "It stopped being an object and started being a drawing. That was the day the studio had a product.",
          ar: "توقفت عن كونها جسماً وصارت رسماً. في ذلك اليوم صار للاستوديو منتج.",
        },
      },
    ],
    productSlugs: ["thurayya-seven-chandelier", "najm-halo-chandelier", "maha-tiered-chandelier"],
  },
];

/** Attach the hero and the in-article frames, in the order the body declares them. */
export const POSTS: JournalPost[] = POST_SEEDS.map((post) => {
  const images = JOURNAL_IMAGES[post.slug];
  let shotIndex = 0;
  return {
    ...post,
    heroSrc: images?.hero,
    body: post.body.map((block) =>
      block.type === "shot"
        ? { ...block, src: images?.blocks?.[shotIndex++] }
        : block,
    ),
  };
});

export function getPost(slug: string): JournalPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function postsByCategory(categorySlug?: string): JournalPost[] {
  if (!categorySlug || categorySlug === "all") return POSTS;
  return POSTS.filter((p) => p.categorySlug === categorySlug);
}
