import Link from "next/link";
import type { Locale } from "@/lib/types";
import { coerceLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { routes } from "@/lib/routes";
import {
  CRAFTS,
  HOME_CATEGORY_TILES,
  POSTS,
  PRESS,
  ROOMS,
  bestSellers,
  getCategory,
  newArrivals,
} from "@/lib/mock";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { ProductGrid } from "@/components/commerce/ProductGrid";
import { InlineSubmit } from "@/components/ui/form";
import { Eyebrow, SectionHead, TextLink } from "@/components/ui/primitives";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale: Locale = coerceLocale(lang);
  const d = getDictionary(locale);
  const t = <T extends { en: string; ar: string }>(v: T) => v[locale];

  const arrivals = newArrivals(4);
  const best = bestSellers(4);

  return (
    <div className="t-screen bg-ivory text-ink">
      {/* ============================================================== hero */}
      <section className="relative overflow-hidden bg-onyx">
        <div className="absolute inset-0 opacity-16">
          <ShotSlot
            dark
            showLabel={false}
            label={{
              en: "hero — cinematic chandelier in warm architectural interior, 2400x1200",
              ar: "الصورة الرئيسية — ثريا في فراغ معماري دافئ",
            }}
          />
        </div>
        <div className="t-glow left-1/2 top-[-140px] h-[900px] w-[900px] -translate-x-1/2" />

        <Header variant="over" />

        <div className="t-shell relative pb-24 pt-24 text-ivory lg:pb-30 lg:pt-36">
          <div className="flex max-w-[760px] flex-col gap-7">
            <Eyebrow>{d.home.heroKicker}</Eyebrow>
            <h1 className="t-display text-[48px] leading-[1.02] sm:text-[64px] lg:text-[86px]">
              {d.home.heroTitle}
            </h1>
            <p className="max-w-[520px] text-[15px] leading-[1.85] text-ivory/72 sm:text-[16px]">
              {d.home.heroSub}
            </p>
            <div className="mt-3 flex flex-wrap gap-4">
              <Link href={routes.lighting(locale)} className="t-btn t-btn--brass">
                {d.home.heroCta1}
              </Link>
              <Link
                href={routes.collection(locale, "celestial")}
                className="t-btn t-btn--ghost"
              >
                {d.home.heroCta2}
              </Link>
            </div>
          </div>
        </div>

        <div className="t-shell relative flex items-end justify-between pb-8 text-[9.5px] tracking-[0.16em] text-ivory/40">
          <span style={{ fontFamily: "var(--font-mono)" }}>{d.home.scroll} — 01 / 04</span>
          <span style={{ fontFamily: "var(--font-mono)" }}>{d.brand.cities}</span>
        </div>
      </section>

      {/* ================================================ begin with light */}
      <section className="t-shell pt-20 lg:pt-24">
        <SectionHead
          title={d.home.catTitle}
          action={<TextLink href={routes.lighting(locale)}>{d.common.shopAll}</TextLink>}
        />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {HOME_CATEGORY_TILES.map((tile) => {
            const category = getCategory(tile.slug);
            if (!category) return null;
            return (
              <Link
                key={tile.slug}
                href={
                  tile.family === "lighting"
                    ? routes.lighting(locale, tile.slug)
                    : routes.furniture(locale, tile.slug)
                }
                className="flex flex-col gap-3.5 text-inherit no-underline"
              >
                <div className="aspect-3/4 bg-surface-2">
                  <ShotSlot label={category.tileShot} tone={2} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[22px]" style={{ fontFamily: "var(--font-display)" }}>
                    {t(category.plural)}
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.12em] text-muted">
                    {t(category.note)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ============================================================= story */}
      <section className="t-shell py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="aspect-4/5 bg-surface-3">
            <ShotSlot
              tone={3}
              label={{
                en: "atelier — hands patinating a brass arm, 1200x1500",
                ar: "الأتيليه — يدان تعتّقان ذراعاً نحاسية",
              }}
            />
          </div>
          <div className="flex flex-col gap-6">
            <Eyebrow>{d.home.storyKicker}</Eyebrow>
            <h2 className="t-display text-[36px] leading-[1.08] sm:text-[52px]">
              {d.home.storyTitle}
            </h2>
            <p className="max-w-[480px] text-[14.5px] leading-[1.95] text-body">
              {d.home.storyBody1}
            </p>
            <p className="max-w-[480px] text-[14.5px] leading-[1.95] text-body">
              {d.home.storyBody2}
            </p>
            <TextLink href={routes.about(locale)} className="self-start">
              {d.home.storyCta}
            </TextLink>
          </div>
        </div>
      </section>

      {/* ====================================================== new arrivals */}
      <section className="t-shell pb-24 lg:pb-30">
        <SectionHead
          rule
          title={d.home.newTitle}
          action={<TextLink href={routes.newArrivals(locale)}>{d.common.viewAll}</TextLink>}
        />
        <ProductGrid products={arrivals} columns={4} />
      </section>

      {/* ================================================ collection banner */}
      <section className="relative overflow-hidden bg-emerald text-ivory">
        <div className="absolute inset-0 opacity-14">
          <ShotSlot
            dark
            showLabel={false}
            label={{
              en: "celestial collection campaign — full bleed, 2400x1100",
              ar: "حملة مجموعة سيليستيال — بعرض الشاشة",
            }}
          />
        </div>
        <div className="t-shell relative grid items-center gap-12 py-24 lg:grid-cols-2 lg:gap-20 lg:py-32">
          <div className="flex flex-col gap-6">
            <Eyebrow>{d.home.collKicker}</Eyebrow>
            <h2 className="t-display text-[38px] leading-[1.06] sm:text-[60px]">
              {d.home.collTitle}
            </h2>
            <p className="max-w-[440px] text-[15px] leading-[1.9] text-ivory/75">
              {d.home.collBody}
            </p>
            <Link
              href={routes.collection(locale, "celestial")}
              className="t-btn t-btn--ghost mt-2 self-start"
            >
              {d.home.collCta}
            </Link>
          </div>
          <div className="aspect-4/3 bg-ivory/10">
            <ShotSlot
              dark
              label={{
                en: "collection hero — chandelier in emerald room",
                ar: "صورة المجموعة — ثريا في غرفة زمردية",
              }}
            />
          </div>
        </div>
      </section>

      {/* ====================================================== shop by room */}
      <section className="t-shell py-24 lg:py-30">
        <SectionHead
          title={d.home.roomTitle}
          action={<TextLink href={routes.rooms(locale)}>{d.common.viewAll}</TextLink>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.slice(0, 6).map((room) => (
            <Link
              key={room.slug}
              href={routes.room(locale, room.slug)}
              className="relative block aspect-16/11 overflow-hidden bg-surface-3 text-ivory no-underline"
            >
              <ShotSlot label={room.tileShot} tone={3} showLabel={false} />
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgb(22 24 25 / 0.62), transparent 62%)",
                }}
              />
              <span
                className="absolute bottom-6 start-6 text-[24px] sm:text-[27px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t(room.name)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================== materials & craft */}
      <section className="bg-onyx text-ivory">
        <div className="t-shell py-24 lg:py-30">
          <div className="mb-12 flex flex-wrap items-baseline justify-between gap-5">
            <h2 className="t-display text-[30px] sm:text-[38px]">{d.home.craftTitle}</h2>
            <span
              className="text-[9.5px] uppercase tracking-[0.16em] text-ivory/40"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {d.home.craftNote}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {CRAFTS.map((craft) => (
              <div key={craft.slug} className="flex flex-col gap-4">
                <div className="aspect-square bg-ivory/8">
                  <ShotSlot
                    dark
                    label={{
                      en: `${craft.name.en} — macro detail`,
                      ar: `${craft.name.ar} — تفصيل قريب`,
                    }}
                  />
                </div>
                <span className="text-[23px]" style={{ fontFamily: "var(--font-display)" }}>
                  {t(craft.name)}
                </span>
                <span className="text-[12px] leading-[1.8] text-ivory/60">{t(craft.note)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= best sellers */}
      <section className="t-shell py-24 lg:py-30">
        <SectionHead
          title={d.home.bestTitle}
          action={<TextLink href={routes.lighting(locale)}>{d.common.viewAll}</TextLink>}
        />
        <ProductGrid products={best} columns={4} />
      </section>

      {/* ==================================================== design your space */}
      <section className="bg-taupe/28">
        <div className="t-shell grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-28">
          <div className="flex flex-col gap-6">
            <Eyebrow>{d.home.designKicker}</Eyebrow>
            <h2 className="t-display text-[34px] leading-[1.08] sm:text-[50px]">
              {d.home.designTitle}
            </h2>
            <p className="max-w-[460px] text-[14.5px] leading-[1.9] text-body">
              {d.home.designBody}
            </p>
            <div className="mt-1.5 flex flex-wrap gap-3.5">
              <Link href={routes.consultation(locale)} className="t-btn t-btn--primary">
                {d.common.bookConsultation}
              </Link>
              <Link href={routes.custom(locale)} className="t-btn t-btn--outline">
                {d.home.designCta2}
              </Link>
            </div>
          </div>
          <div className="aspect-5/4 bg-surface-3">
            <ShotSlot
              tone={3}
              label={{
                en: "designer with floor plan and finish samples",
                ar: "مصممة مع مخطط المساحة وعينات التشطيب",
              }}
            />
          </div>
        </div>
      </section>

      {/* ========================================================= trade + press */}
      <section className="t-shell py-24 lg:py-28">
        <div className="grid items-center gap-12 border-t border-ink/12 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-18">
          <div className="flex flex-col gap-5">
            <Eyebrow>{d.home.tradeKicker}</Eyebrow>
            <h2 className="t-display text-[30px] leading-[1.1] sm:text-[40px]">
              {d.home.tradeTitle}
            </h2>
            <p className="max-w-[420px] text-[14.5px] leading-[1.9] text-body">{d.home.tradeBody}</p>
            <Link href={routes.trade(locale)} className="t-btn t-btn--outline self-start">
              {d.common.applyForTrade}
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {PRESS.map((quote) => (
              <blockquote
                key={quote.source}
                className="m-0 flex flex-col gap-4 border-t border-brass/55 pt-5"
              >
                <p
                  className="text-[19px] italic leading-[1.45] text-ink sm:text-[20px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  “{t(quote.quote)}”
                </p>
                <cite className="text-[10px] not-italic uppercase tracking-[0.16em] text-muted">
                  {quote.source}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ journal */}
      <section className="t-shell pb-24 lg:pb-30">
        <SectionHead
          title={d.home.journalTitle}
          action={<TextLink href={routes.journal(locale)}>{d.common.viewAll}</TextLink>}
        />
        <div className="grid gap-7 md:grid-cols-3">
          {POSTS.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={routes.post(locale, post.slug)}
              className="flex flex-col gap-4 text-inherit no-underline"
            >
              <div className="aspect-3/2 bg-surface-2">
                <ShotSlot label={post.heroShot} tone={2} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-brass">
                {t(post.category)} · {t(post.readingTime)}
              </span>
              <span
                className="max-w-[380px] text-[23px] leading-[1.25] sm:text-[25px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t(post.title)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================= newsletter */}
      <section className="bg-onyx text-ivory">
        <div className="mx-auto flex max-w-[1000px] flex-col items-center gap-6 px-5 py-24 text-center lg:px-10 lg:py-28">
          <Eyebrow>{d.home.newsKicker}</Eyebrow>
          <h2 className="t-display text-[34px] sm:text-[46px]">{d.home.newsTitle}</h2>
          <p className="max-w-[520px] text-[14.5px] leading-[1.9] text-ivory/66">
            {d.home.newsBody}
          </p>
          <div className="mt-2 w-full max-w-[520px]">
            <InlineSubmit
              dark
              placeholder={d.home.newsPlaceholder}
              cta={d.home.newsCta}
              done={d.home.newsThanks}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
