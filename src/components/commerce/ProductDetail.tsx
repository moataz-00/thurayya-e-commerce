"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes } from "@/lib/routes";
import { fill } from "@/lib/i18n/dictionary";
import { formatDecimal } from "@/lib/format";
import { getCollection } from "@/lib/mock/collections";
import { getCategory } from "@/lib/mock/taxonomy";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { Accordion } from "@/components/ui/Accordion";
import { QuantityStepper } from "@/components/ui/form";
import { Money, useMoney } from "@/components/ui/Money";
import { Breadcrumbs, Diamond, Rating, SectionHead, TextLink } from "@/components/ui/primitives";
import { ProductGrid } from "./ProductGrid";

export function ProductDetail({
  product,
  crossSell,
  alsoLike,
}: {
  product: Product;
  crossSell: Product[];
  alsoLike: Product[];
}) {
  const { locale, d, t } = useLocale();
  const { addToBag, showToast, toggleWishlist, inWishlist, markViewed, hydrated } = useStore();
  const money = useMoney();

  const [shotIndex, setShotIndex] = useState(0);
  const [finishIndex, setFinishIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(product.sizeOptions.length > 1 ? 1 : 0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    markViewed(product.slug);
  }, [markViewed, product.slug]);

  const size = product.sizeOptions[sizeIndex];
  const finish = product.finishOptions[finishIndex];
  const unitPrice = size.price ?? product.price;
  const saved = hydrated && inWishlist(product.slug);
  const collection = product.collection ? getCollection(product.collection) : undefined;
  const category = getCategory(product.category);

  const variant = {
    en: [finish?.name.en, size.label.en].filter(Boolean).join(" · ") || product.finishLabel.en,
    ar: [finish?.name.ar, size.label.ar].filter(Boolean).join(" · ") || product.finishLabel.ar,
  };

  const onAdd = () => {
    addToBag({ slug: product.slug, variant, unitPrice, qty });
    showToast({
      title: d.common.added,
      href: routes.cart(locale),
      linkLabel: d.common.viewBag,
    });
  };

  return (
    <div className="t-screen">
      <div className="t-shell pt-5.5">
        <Breadcrumbs
          items={[
            { label: d.common.home, href: routes.home(locale) },
            {
              label: product.family === "lighting" ? d.nav.lighting : d.nav.furniture,
              href:
                product.family === "lighting"
                  ? routes.lighting(locale)
                  : routes.furniture(locale),
            },
            ...(category
              ? [
                  {
                    label: t(category.plural),
                    href:
                      product.family === "lighting"
                        ? routes.lighting(locale, category.slug)
                        : routes.furniture(locale, category.slug),
                  },
                ]
              : []),
            { label: t(product.shortTitle) },
          ]}
        />
      </div>

      {/* ================================================ gallery + purchase */}
      <div className="t-shell grid items-start gap-10 pb-24 pt-7 lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_466px]">
        {/* ------------------------------------------------------- gallery */}
        <div className="grid gap-4.5 sm:grid-cols-[84px_1fr]">
          <div
            className="order-2 flex gap-3 overflow-x-auto sm:sticky sm:top-[70px] sm:order-1 sm:flex-col sm:overflow-visible"
            role="tablist"
            aria-label={d.pdp.gallery}
          >
            {product.shots.map((shot, i) => (
              <button
                key={shot.id}
                type="button"
                role="tab"
                aria-selected={shotIndex === i}
                aria-label={`${d.pdp.selectImage} — ${t(shot.label)}`}
                onClick={() => setShotIndex(i)}
                className={`aspect-square w-[68px] flex-none cursor-pointer overflow-hidden border bg-surface-2 p-0 sm:w-auto ${
                  shotIndex === i ? "border-brass" : "border-transparent"
                }`}
              >
                <ShotSlot label={shot.label} tone={shot.tone ?? 2} showLabel={false} />
              </button>
            ))}
          </div>

          <div className="order-1 flex flex-col gap-4.5 sm:order-2">
            <div className="relative aspect-4/5 overflow-hidden bg-surface-1">
              <ShotSlot label={product.shots[shotIndex].label} tone={1} />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(46% 34% at 50% 34%, rgb(169 132 79 / 0.18), transparent 70%)",
                }}
              />
              <button
                type="button"
                className="absolute bottom-4.5 end-4.5 cursor-pointer border-0 bg-ivory/92 px-4 py-3 text-[10px] uppercase tracking-[0.16em]"
              >
                {d.pdp.zoom}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4.5">
              <div className="aspect-square bg-surface-2">
                <ShotSlot label={product.shots[1].label} tone={2} />
              </div>
              <div className="aspect-square bg-surface-3">
                <ShotSlot label={product.shots[4].label} tone={3} />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------ purchase */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-[70px]">
          <div className="flex flex-col gap-3">
            {collection ? (
              <Link
                href={routes.collection(locale, collection.slug)}
                className="t-eyebrow no-underline"
              >
                {t(collection.name)}
              </Link>
            ) : null}
            <h1 className="t-display text-[36px] leading-[1.06] sm:text-[46px]">
              {t(product.title)}
            </h1>
            <div className="flex flex-wrap items-center gap-3.5 text-[12px] text-muted">
              <Rating value={product.rating} count={product.reviewCount} />
              <span aria-hidden className="h-3 w-px bg-ink/20" />
              <span>{d.availability[product.availability]}</span>
            </div>
            <div className="mt-1.5 flex flex-wrap items-baseline gap-3.5">
              <Money amount={size.price} className="text-[32px]" />
              {size.price ? (
                <span className="text-[11.5px] text-muted">
                  {fill(d.pdp.instalments, { amount: money(Math.round(size.price / 6)) })}
                </span>
              ) : null}
            </div>
          </div>

          <hr className="t-rule" />

          {/* finishes */}
          {product.finishOptions.length > 0 ? (
            <div className="flex flex-col gap-3.5">
              <div className="flex justify-between text-[10.5px] uppercase tracking-[0.16em]">
                <span>{d.pdp.finish}</span>
                <span className="text-[12px] normal-case tracking-normal text-muted">
                  {finish ? t(finish.name) : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-3.5" role="radiogroup" aria-label={d.pdp.finish}>
                {product.finishOptions.map((f, i) => (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={finishIndex === i}
                    aria-label={t(f.name)}
                    title={t(f.name)}
                    onClick={() => setFinishIndex(i)}
                    className="h-[38px] w-[38px] cursor-pointer rounded-full border border-ink/20 p-0"
                    style={{
                      background: f.hex,
                      outline: finishIndex === i ? "1px solid var(--color-brass)" : "1px solid transparent",
                      outlineOffset: "3px",
                    }}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* sizes */}
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between text-[10.5px] uppercase tracking-[0.16em]">
              <span>{d.pdp.sizeDrop}</span>
              <Link
                href={routes.support(locale, "installation")}
                className="border-b border-brass/40 text-[10.5px] text-brass no-underline"
              >
                {d.pdp.dimensionGuide}
              </Link>
            </div>
            <div
              className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
              role="radiogroup"
              aria-label={d.pdp.sizeDrop}
            >
              {product.sizeOptions.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={sizeIndex === i}
                  onClick={() => setSizeIndex(i)}
                  className={`flex cursor-pointer flex-col items-start gap-1.5 border px-2.5 py-3.5 text-start ${
                    sizeIndex === i ? "border-ink bg-ink/5" : "border-ink/20 bg-transparent"
                  }`}
                >
                  <span className="text-[12.5px] text-ink">{t(s.label)}</span>
                  <span className="text-[10px] leading-snug text-muted">{t(s.sub)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* bulb + qty */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <div className="flex flex-col gap-2.5">
              <span className="text-[10.5px] uppercase tracking-[0.16em]">{d.pdp.bulbTemp}</span>
              <div className="flex justify-between border border-ink/20 px-3.5 py-3 text-[12.5px] text-body">
                {d.pdp.bulbValue}
                <span aria-hidden className="text-brass">
                  ▾
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="text-[10.5px] uppercase tracking-[0.16em]">{d.common.quantity}</span>
              <QuantityStepper value={qty} onChange={setQty} />
            </div>
          </div>

          {/* delivery */}
          <div className="t-panel flex flex-col gap-2.5 px-5 py-4.5">
            <div className="flex justify-between gap-4 text-[12.5px]">
              <span className="text-body">{d.pdp.estimatedDelivery}</span>
              <span>{t(product.leadTime)}</span>
            </div>
            <div className="flex justify-between gap-4 text-[12.5px]">
              <span className="text-body">{d.pdp.destination}</span>
              <span className="border-b border-brass/40 text-brass">{d.pdp.destinationValue}</span>
            </div>
            <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{d.pdp.whiteGlove}</p>
          </div>

          {/* actions */}
          <div className="flex flex-col gap-3">
            <button type="button" onClick={onAdd} className="t-btn t-btn--primary w-full py-5">
              {d.common.addToBag} — {money(size.price ? size.price * qty : null)}
            </button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => toggleWishlist(product.slug)}
                aria-pressed={saved}
                className="t-btn t-btn--outline flex-1"
              >
                {saved ? d.common.inWishlist : d.common.addToWishlist}
              </button>
              <Link href={routes.consultation(locale)} className="t-btn t-btn--outline flex-1">
                {d.common.askExpert}
              </Link>
            </div>
            <Link
              href={routes.trade(locale)}
              className="pt-1 text-center text-[11px] uppercase tracking-[0.12em] text-muted no-underline hover:text-brass"
            >
              {d.pdp.tradeEnquiry}
            </Link>
          </div>

          {/* highlights */}
          <div className="grid grid-cols-1 gap-4 border-t border-ink/12 pt-5.5 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <div key={h.en} className="flex gap-3 text-[12px] leading-snug text-body">
                <Diamond className="mt-1.5" />
                {t(h)}
              </div>
            ))}
          </div>

          <Accordion
            className="mt-2"
            defaultOpen="description"
            items={product.sections.map((s) => ({
              id: s.id,
              title: t(s.title),
              body: (
                <p className="pe-5 text-[13px] leading-[1.95] text-body">{t(s.body)}</p>
              ),
            }))}
          />
        </div>
      </div>

      {/* ================================================== specification */}
      <section className="bg-onyx text-ivory">
        <div className="t-shell grid gap-14 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="t-display mb-7 text-[30px] sm:text-[34px]">{d.pdp.specTitle}</h2>
            <dl className="m-0 flex flex-col">
              {product.specs.map((row) => (
                <div
                  key={row.k.en}
                  className="grid grid-cols-2 gap-5 border-b border-ivory/10 py-3.5 text-[12.5px]"
                >
                  <dt className="text-ivory/55">{t(row.k)}</dt>
                  <dd className="m-0">{t(row.v)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="t-display mb-7 text-[30px] sm:text-[34px]">{d.pdp.specDownloads}</h2>
            <p className="mb-7 max-w-[440px] text-[13px] leading-relaxed text-ivory/60">
              {t(product.summary)}
            </p>
            <div className="flex flex-wrap gap-3.5">
              {[d.pdp.downloadDwg, d.pdp.downloadIes, d.pdp.downloadSpec].map((label) => (
                <span
                  key={label}
                  className="border border-ivory/30 px-3.5 py-2.5 text-[10.5px] uppercase tracking-[0.14em]"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="mt-6 text-[11px] text-ivory/40">{d.common.mockNotice}</p>
          </div>
        </div>
      </section>

      {/* ================================================== complete the room */}
      {crossSell.length > 0 ? (
        <section className="t-shell pt-24">
          <SectionHead title={d.pdp.completeRoom} size="md" />
          <ProductGrid products={crossSell} columns={4} compact />
        </section>
      ) : null}

      {/* ============================================================ reviews */}
      <section className="t-shell grid gap-14 py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead
            title={d.pdp.reviews}
            size="md"
            action={<Rating value={product.rating} count={product.reviewCount} />}
          />
          <div className="flex flex-col gap-7">
            {product.reviews.map((r) => (
              <article key={r.id} className="flex flex-col gap-3 border-t border-ink/12 pt-5.5">
                <div className="flex flex-wrap justify-between gap-3 text-[11.5px] text-muted">
                  <span>
                    {r.author} · {t(r.meta)}
                  </span>
                  <span>{t(r.date)}</span>
                </div>
                <p
                  className="text-[19px] leading-[1.5] sm:text-[21px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  “{t(r.body)}”
                </p>
                {r.shots > 0 ? (
                  <div className="flex gap-2.5">
                    {Array.from({ length: r.shots }).map((_, i) => (
                      <div key={i} className="h-[74px] w-[74px] bg-surface-2">
                        <ShotSlot showLabel={false} tone={i === 0 ? 2 : 3} />
                      </div>
                    ))}
                  </div>
                ) : null}
                <span className="text-[11px] text-muted">
                  {formatDecimal(r.rating, locale, 0)} / 5
                </span>
              </article>
            ))}
          </div>
        </div>

        <div>
          <SectionHead title={d.pdp.qa} size="md" />
          <div className="flex flex-col gap-5">
            {product.questions.map((q) => (
              <div key={q.id} className="border-t border-ink/12 pt-5">
                <div className="mb-2.5 text-[13.5px]">{t(q.q)}</div>
                <p className="text-[13px] leading-[1.9] text-body">{t(q.a)}</p>
                <div className="mt-2.5 text-[11px] text-muted">{t(q.by)}</div>
              </div>
            ))}
            <Link href={routes.showrooms(locale)} className="t-btn t-btn--outline mt-1.5 self-start">
              {d.pdp.askQuestion}
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== also like */}
      {alsoLike.length > 0 ? (
        <section className="t-shell pb-28">
          <SectionHead title={d.pdp.alsoLike} size="md" />
          <ProductGrid products={alsoLike} columns={4} compact />
          <div className="mt-16 border-t border-ink/12 pt-8">
            <TextLink href={routes.lighting(locale)}>{d.common.shopAll}</TextLink>
          </div>
        </section>
      ) : null}
    </div>
  );
}
