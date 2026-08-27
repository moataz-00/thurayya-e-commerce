import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LOCALES, coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import { COLLECTIONS, getCollection, getProducts } from "@/lib/mock";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { Eyebrow, SectionHead, TextLink } from "@/components/ui/primitives";

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => COLLECTIONS.map((c) => ({ lang, slug: c.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.name[locale], description: collection.lede[locale] };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const collection = getCollection(slug);
  if (!collection) notFound();

  const products = getProducts(collection.productSlugs);

  return (
    <div className="t-screen bg-ivory text-ink">
      {/* ============================================================== hero */}
      <section
        className={`relative overflow-hidden ${
          collection.accent === "emerald" ? "bg-emerald" : "bg-onyx"
        }`}
      >
        <div className="absolute inset-0 opacity-[0.42]">
          <ShotSlot dark showLabel={false} label={collection.heroShot} src={collection.heroSrc} priority sizes="100vw" />
        </div>
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgb(22 24 25 / 0.62), rgb(22 24 25 / 0.42) 45%, rgb(22 24 25 / 0.78))" }}
        />
        <div className="t-glow left-[62%] top-[-180px] h-[820px] w-[820px]" />

        <Header variant="over" />

        <div className="t-shell relative pb-24 pt-24 text-ivory lg:pb-32 lg:pt-36">
          <div className="flex max-w-[640px] flex-col gap-6">
            <Eyebrow>{collection.kicker[locale]}</Eyebrow>
            <h1 className="t-display text-[44px] leading-[1.02] sm:text-[60px] lg:text-[78px]">
              {collection.name[locale]}
            </h1>
            <p className="max-w-[480px] text-[15px] leading-[1.85] text-ivory/72 sm:text-[16px]">
              {collection.lede[locale]}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================== concept */}
      <section className="mx-auto flex max-w-[1080px] flex-col items-center gap-7 px-5 pt-24 text-center lg:px-10 lg:pt-30">
        <Eyebrow>{d.collection.concept}</Eyebrow>
        <h2 className="t-display text-[32px] leading-[1.15] sm:text-[44px]">
          {collection.lede[locale]}
        </h2>
        <p className="max-w-[660px] text-[14.5px] leading-[1.95] text-body">
          {collection.concept[locale]}
        </p>
      </section>

      {/* ========================================================= campaign */}
      <section className="t-shell grid gap-6 py-20 lg:grid-cols-[1.4fr_1fr] lg:py-24">
        <div className="aspect-16/11 bg-surface-3">
          <ShotSlot tone={3} label={collection.campaignShots[0]} src={collection.campaignSrcs?.[0]} sizes="(max-width: 1024px) 100vw, 58vw" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="min-h-[200px] flex-1 bg-surface-2">
            <ShotSlot tone={2} label={collection.campaignShots[1]} src={collection.campaignSrcs?.[1]} sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
          <div className="min-h-[200px] flex-1 bg-surface-4">
            <ShotSlot tone={4} label={collection.campaignShots[2]} src={collection.campaignSrcs?.[2]} sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        </div>
      </section>

      {/* ============================================================ facts */}
      <section className="bg-onyx text-ivory">
        <div className="t-shell grid gap-14 py-20 md:grid-cols-3 lg:py-24">
          {collection.facts.map((fact) => (
            <div key={fact.label.en} className="flex flex-col gap-3.5">
              <span
                className="text-[9.5px] uppercase tracking-[0.18em] text-brass"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {fact.label[locale]}
              </span>
              <span className="text-[27px]" style={{ fontFamily: "var(--font-display)" }}>
                {fact.title[locale]}
              </span>
              <span className="text-[12.5px] leading-[1.9] text-ivory/62">
                {fact.body[locale]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================== pieces */}
      <section className="t-shell py-24 lg:py-28">
        <SectionHead
          title={d.collection.pieces}
          action={<TextLink href={routes.lighting(locale)}>{d.common.shopAll}</TextLink>}
        />
        <ProductGrid products={products} columns={3} />
      </section>

      {/* ============================================================== cta */}
      <section className="bg-taupe/28">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-5 py-20 text-center lg:px-10 lg:py-24">
          <h2 className="t-display text-[32px] sm:text-[44px]">{d.collection.ctaTitle}</h2>
          <p className="max-w-[520px] text-[14.5px] leading-[1.9] text-body">
            {d.collection.ctaBody}
          </p>
          <Link href={routes.consultation(locale)} className="t-btn t-btn--primary mt-2">
            {d.common.bookConsultation}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
