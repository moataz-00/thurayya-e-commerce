import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { Localized } from "@/lib/types";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { PRODUCTS } from "@/lib/mock";
import { PageShell } from "@/components/layout/PageShell";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { StyleGuideControls } from "@/components/style-guide/StyleGuideControls";
import { Eyebrow, MonoLabel } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.styleGuide.title, description: d.styleGuide.lede };
}

const SWATCHES: { name: Localized; hex: string; share: Localized; use: Localized }[] = [
  {
    name: { en: "Midnight Onyx", ar: "أونيكس منتصف الليل" },
    hex: "#161819",
    share: { en: "30%", ar: "٣٠٪" },
    use: {
      en: "Dark rooms, footer, headline text, packaging-inspired panels.",
      ar: "الغرف الداكنة والتذييل ونصوص العناوين واللوحات المستوحاة من التغليف.",
    },
  },
  {
    name: { en: "Moon Ivory", ar: "عاجي القمر" },
    hex: "#F2EEE5",
    share: { en: "55%", ar: "٥٥٪" },
    use: {
      en: "Primary background and surfaces. Warm, tactile, never pure white.",
      ar: "الخلفية والأسطح الأساسية. دافئة وملموسة، وليست بيضاء نقية أبداً.",
    },
  },
  {
    name: { en: "Antique Brass", ar: "نحاس عتيق" },
    hex: "#A9844F",
    share: { en: "5%", ar: "٥٪" },
    use: {
      en: "Fine lines, icons, active states, badges, metallic CTAs. Never a large flat fill.",
      ar: "الخطوط الدقيقة والأيقونات والحالات النشطة والشارات. لا يُستخدم كمساحة مصمتة كبيرة أبداً.",
    },
  },
  {
    name: { en: "Travertine Taupe", ar: "ترابي الترافرتين" },
    hex: "#B7AA98",
    share: { en: "10%", ar: "١٠٪" },
    use: {
      en: "Secondary surfaces, spec panels, muted type, architectural detail.",
      ar: "الأسطح الثانوية ولوحات المواصفات والنصوص الباهتة والتفاصيل المعمارية.",
    },
  },
  {
    name: { en: "Deep Emerald", ar: "زمردي عميق" },
    hex: "#183C36",
    share: { en: "limited", ar: "محدود" },
    use: {
      en: "Limited editions, trade services, selected editorial only.",
      ar: "الإصدارات المحدودة وخدمات المحترفين ومواد تحريرية مختارة فقط.",
    },
  },
];

const PAIRING_RULES: Localized[] = [
  {
    en: "Cormorant Garamond 300 for anything editorial; never below 20px, never uppercase below 24px.",
    ar: "خط Cormorant Garamond بوزن ٣٠٠ لكل ما هو تحريري، ولا يقل عن ٢٠ بكسل، ولا يُكتب بأحرف كبيرة دون ٢٤ بكسل.",
  },
  {
    en: "Manrope 300–500 for UI. Letter-spacing 0.13em on uppercase labels, 0.02em on body.",
    ar: "خط Manrope بأوزان ٣٠٠–٥٠٠ للواجهة. تباعد ٠٫١٣ للتسميات بالأحرف الكبيرة و٠٫٠٢ للنص.",
  },
  {
    en: "Arabic display uses Reem Kufi; Arabic UI and body use IBM Plex Sans Arabic (production: 29LT Bukra). Arabic body sizes run +0.5px and line-height +0.1 against Latin.",
    ar: "العناوين العربية بخط Reem Kufi، والواجهة والنصوص بخط IBM Plex Sans Arabic (في الإنتاج: 29LT Bukra). أحجام النص العربي أكبر بـ٠٫٥ بكسل وارتفاع السطر أعلى بـ٠٫١.",
  },
  {
    en: "Baseline grid 8px. Section rhythm 88 / 120 / 160px. Page gutters 40px desktop, 20px mobile. Max content width 1440px.",
    ar: "شبكة أساس ٨ بكسل. إيقاع الأقسام ٨٨ / ١٢٠ / ١٦٠ بكسل. هوامش ٤٠ بكسل للحاسب و٢٠ للجوال. أقصى عرض للمحتوى ١٤٤٠ بكسل.",
  },
];

export default async function StyleGuidePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <PageShell>
      <div className="t-shell flex flex-col gap-20 pb-28 pt-16 lg:gap-24">
        {/* ==================================================== art direction */}
        <section className="grid items-end gap-12 border-b border-ink/12 pb-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <MonoLabel className="mb-6 block text-brass">{d.styleGuide.kicker}</MonoLabel>
            <h1 className="t-display mb-5 text-[44px] leading-[1.02] sm:text-[58px] lg:text-[66px]">
              {d.styleGuide.title}
            </h1>
            <p className="max-w-[520px] text-[14.5px] leading-[1.9] text-body">
              {d.styleGuide.lede}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative flex h-[230px] items-center justify-center overflow-hidden bg-onyx">
              <div className="t-glow left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2" />
              <div className="relative text-center text-ivory">
                <div
                  className="text-[34px] tracking-[0.34em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  THURAYY&#256;
                </div>
                <div
                  className="mt-2 text-[19px] text-brass"
                  style={{ fontFamily: "var(--font-arabic-display)" }}
                >
                  ثريا
                </div>
              </div>
            </div>
            <MonoLabel className="text-muted">{d.styleGuide.lockup}</MonoLabel>
          </div>
        </section>

        {/* ========================================================== colour */}
        <section className="flex flex-col gap-6">
          <MonoLabel className="text-brass">{d.styleGuide.colour}</MonoLabel>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {SWATCHES.map((swatch) => (
              <div key={swatch.hex} className="flex flex-col gap-3">
                <div
                  className="h-[126px] border border-ink/10"
                  style={{ background: swatch.hex }}
                />
                <span className="text-[21px]" style={{ fontFamily: "var(--font-display)" }}>
                  {swatch.name[locale]}
                </span>
                <MonoLabel className="text-muted">
                  {swatch.hex} · {swatch.share[locale]}
                </MonoLabel>
                <span className="text-[12px] leading-[1.75] text-body">{swatch.use[locale]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ type */}
        <section className="flex flex-col gap-6">
          <MonoLabel className="text-brass">{d.styleGuide.type}</MonoLabel>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_380px]">
            <div className="flex flex-col gap-7 border-t border-ink/12 pt-7">
              <TypeRow label="DISPLAY / 72">
                <span className="t-display text-[44px] leading-none sm:text-[64px]">
                  {locale === "ar" ? "الضوء، بمعناه الأرفع" : "Light, Elevated."}
                </span>
              </TypeRow>
              <TypeRow label="H2 / 40">
                <span className="t-display text-[32px] leading-[1.1] sm:text-[40px]">
                  {locale === "ar" ? "فن الإضاءة" : "The Art of Illumination"}
                </span>
              </TypeRow>
              <TypeRow label="H3 / 24">
                <span className="text-[24px]" style={{ fontFamily: "var(--font-display)" }}>
                  {locale === "ar" ? "نوكتيرن المعلقة، ألاباستر" : "Nocturne Pendant, Alabaster"}
                </span>
              </TypeRow>
              <TypeRow label="BODY / 14.5">
                <span className="block max-w-[420px] text-[14.5px] leading-[1.9] text-body">
                  {locale === "ar"
                    ? "يحمل خط IBM Plex Sans Arabic كل السطوح الوظيفية — التنقل والمواصفات والنماذج والأسعار."
                    : "Manrope carries every functional surface — navigation, specifications, forms and prices — at 14.5px with 1.9 line height for long copy."}
                </span>
              </TypeRow>
              <TypeRow label="EYEBROW / 10">
                <Eyebrow>
                  {locale === "ar" ? "صُنع في أتيليه ثريا" : "Made in the Thurayyā Atelier"}
                </Eyebrow>
              </TypeRow>
              <TypeRow label="ARABIC / 40">
                <span
                  dir="rtl"
                  className="text-[30px] leading-[1.35] sm:text-[36px]"
                  style={{ fontFamily: "var(--font-arabic-display)" }}
                >
                  الضوء، بمعناه الأرفع
                </span>
              </TypeRow>
              <TypeRow label="ARABIC BODY">
                <span
                  dir="rtl"
                  className="block max-w-[420px] text-[14.5px] leading-[2] text-body"
                  style={{ fontFamily: "var(--font-arabic)" }}
                >
                  إضاءة نحتية وأثاث مدروس لمساحات ذات حضور دائم، تُصنع بأيدي حرفيين في القاهرة.
                </span>
              </TypeRow>
            </div>

            <div className="flex flex-col gap-5 bg-onyx p-8 text-ivory">
              <MonoLabel className="text-brass">{d.styleGuide.pairing}</MonoLabel>
              <div className="flex flex-col gap-4 text-[12.5px] leading-[1.85] text-ivory/70">
                {PAIRING_RULES.map((rule) => (
                  <span key={rule.en}>{rule[locale]}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ buttons, forms, states */}
        <StyleGuideControls />

        {/* ==================================================== product cards */}
        <section className="flex flex-col gap-6">
          <MonoLabel className="text-brass">{d.styleGuide.cards}</MonoLabel>
          <ProductGrid products={PRODUCTS.slice(0, 4)} columns={4} />
          <p className="max-w-[760px] text-[12px] leading-[1.8] text-body">
            {d.styleGuide.cardNote}
          </p>
        </section>
      </div>
    </PageShell>
  );
}

function TypeRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid items-baseline gap-4 sm:grid-cols-[140px_1fr] sm:gap-7">
      <MonoLabel className="text-muted">{label}</MonoLabel>
      <div>{children}</div>
    </div>
  );
}
