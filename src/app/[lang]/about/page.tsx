import type { Metadata } from "next";
import Link from "next/link";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { CRAFTS, PRESS, TEAM, TIMELINE, VALUES } from "@/lib/mock";
import { CRAFT_IMAGES, SITE_IMAGES, TEAM_IMAGES } from "@/lib/images";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { Eyebrow, SectionHead } from "@/components/ui/primitives";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const d = getDictionary(coerceLocale(lang));
  return { title: d.about.kicker, description: d.about.lede };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);

  return (
    <div className="t-screen bg-ivory text-ink">
      <section className="relative overflow-hidden bg-onyx">
        <div className="absolute inset-0 opacity-[0.45]">
          <ShotSlot
            dark
            showLabel={false}
            src={SITE_IMAGES.aboutHero}
            priority
            sizes="100vw"
            label={{
              en: "atelier wide — the workshop at dusk, 2400x1200",
              ar: "الأتيليه — الورشة عند الغروب",
            }}
          />
        </div>
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgb(22 24 25 / 0.62), rgb(22 24 25 / 0.42) 45%, rgb(22 24 25 / 0.78))" }}
        />
        <div className="t-glow left-[20%] top-[-160px] h-[700px] w-[700px]" />

        <Header variant="over" />

        <div className="t-shell relative pb-24 pt-24 text-ivory lg:pb-28 lg:pt-32">
          <div className="flex max-w-[720px] flex-col gap-6">
            <Eyebrow>{d.about.kicker}</Eyebrow>
            <h1 className="t-display text-[42px] leading-[1.03] sm:text-[58px] lg:text-[70px]">
              {d.about.title}
            </h1>
            <p className="max-w-[520px] text-[15px] leading-[1.85] text-ivory/72 sm:text-[16px]">
              {d.about.lede}
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ values */}
      <section className="t-shell py-20 lg:py-24">
        <SectionHead title={d.about.valuesTitle} />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title.en} className="flex flex-col gap-3 border-t border-brass/60 pt-5">
              <span className="text-[24px]" style={{ fontFamily: "var(--font-display)" }}>
                {value.title[locale]}
              </span>
              <span className="text-[12.5px] leading-[1.85] text-body">{value.body[locale]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================== timeline */}
      <section className="bg-onyx text-ivory">
        <div className="t-shell py-20 lg:py-24">
          <h2 className="t-display mb-12 text-[30px] sm:text-[38px]">{d.about.timelineTitle}</h2>
          <ol className="m-0 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {TIMELINE.map((entry) => (
              <li key={entry.year} className="flex flex-col gap-3 border-t border-brass/55 pt-5">
                <span
                  className="text-[9.5px] tracking-[0.18em] text-brass"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {locale === "ar" ? entry.yearAr : entry.year}
                </span>
                <span className="text-[23px]" style={{ fontFamily: "var(--font-display)" }}>
                  {entry.title[locale]}
                </span>
                <span className="text-[12.5px] leading-[1.85] text-ivory/62">
                  {entry.body[locale]}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* =========================================================== atelier */}
      <section className="t-shell py-20 lg:py-24">
        <SectionHead title={d.about.atelierTitle} />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="aspect-16/11 bg-surface-3">
            <ShotSlot
              tone={3}
              src={SITE_IMAGES.aboutAtelier}
              sizes="(max-width: 1024px) 100vw, 58vw"
              label={{ en: "atelier — the bench, wide", ar: "الأتيليه — المنضدة، لقطة واسعة" }}
            />
          </div>
          <div className="grid gap-6">
            {CRAFTS.slice(0, 2).map((craft) => (
              <div key={craft.slug} className="flex flex-col gap-3">
                <div className="aspect-16/10 bg-surface-2">
                  <ShotSlot
                    tone={2}
                    src={CRAFT_IMAGES[craft.slug]}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    label={{
                      en: `${craft.name.en} — macro detail`,
                      ar: `${craft.name.ar} — تفصيل قريب`,
                    }}
                  />
                </div>
                <span className="text-[12.5px] leading-[1.8] text-body">{craft.note[locale]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= team */}
      <section className="t-shell pb-20">
        <SectionHead title={d.about.teamTitle} />
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((person, i) => (
            <div key={person.name.en} className="flex flex-col gap-3.5">
              <div className="aspect-4/5 bg-surface-2">
                <ShotSlot tone={2} label={person.shot} src={TEAM_IMAGES[i]} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <span className="text-[21px]" style={{ fontFamily: "var(--font-display)" }}>
                {person.name[locale]}
              </span>
              <span className="text-[11.5px] uppercase tracking-[0.12em] text-muted">
                {person.role[locale]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ press */}
      <section className="t-shell pb-20">
        <SectionHead title={d.home.pressTitle} rule />
        <div className="grid gap-5 sm:grid-cols-3">
          {PRESS.map((quote) => (
            <blockquote
              key={quote.source}
              className="m-0 flex flex-col gap-4 border-t border-brass/55 pt-5"
            >
              <p
                className="text-[19px] italic leading-[1.45] sm:text-[20px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                “{quote.quote[locale]}”
              </p>
              <cite className="text-[10px] not-italic uppercase tracking-[0.16em] text-muted">
                {quote.source}
              </cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ============================================================= join */}
      <section className="bg-taupe/28">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-5 px-5 py-20 text-center lg:px-10">
          <h2 className="t-display text-[32px] sm:text-[42px]">{d.about.joinTitle}</h2>
          <p className="max-w-[520px] text-[14.5px] leading-[1.9] text-body">{d.about.joinBody}</p>
          <Link href={routes.showrooms(locale)} className="t-btn t-btn--primary mt-2">
            {d.about.joinCta}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
