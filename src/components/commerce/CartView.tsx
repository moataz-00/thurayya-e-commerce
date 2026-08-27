"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Product } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes } from "@/lib/routes";
import { computeTotals } from "@/lib/format";
import { getProduct } from "@/lib/mock";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { CheckRow, QuantityStepper } from "@/components/ui/form";
import { Money } from "@/components/ui/Money";
import { Diamond, SectionHead } from "@/components/ui/primitives";
import { ProductGrid } from "./ProductGrid";

export function CartView({ crossSell }: { crossSell: Product[] }) {
  const { locale, d, t } = useLocale();
  const {
    bag,
    bagCount,
    bagSubtotal,
    setQty,
    removeLine,
    giftWrap,
    setGiftWrap,
    installation,
    setInstallation,
    promo,
    promoRate,
    applyPromo,
    clearPromo,
    hydrated,
    toggleWishlist,
  } = useStore();

  const [code, setCode] = useState("");
  const [promoError, setPromoError] = useState(false);

  const totals = computeTotals({
    subtotal: bagSubtotal,
    giftWrap,
    delivery: installation ? 3500 : 1900,
    discountRate: promoRate,
  });

  if (!hydrated) {
    return <div className="t-shell py-28" aria-busy="true" />;
  }

  if (bag.length === 0) {
    return (
      <div className="t-shell py-24">
        <h1 className="t-display mb-10 text-[38px] sm:text-[48px]">{d.cart.title}</h1>
        <div className="flex flex-col items-center gap-5 border border-ink/14 px-8 py-16 text-center">
          <span aria-hidden className="h-[30px] w-[30px] rotate-45 border border-brass" />
          <h2 className="t-display mt-2 text-[30px] sm:text-[34px]">{d.cart.emptyTitle}</h2>
          <p className="max-w-[420px] text-[13.5px] leading-relaxed text-body">{d.cart.emptyBody}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-3.5">
            <Link href={routes.collection(locale, "celestial")} className="t-btn t-btn--primary">
              {d.cart.emptyCta}
            </Link>
            <Link href={routes.consultation(locale)} className="t-btn t-btn--outline">
              {d.common.bookConsultation}
            </Link>
          </div>
        </div>
        <div className="mt-20">
          <SectionHead title={d.cart.completeOrder} size="sm" />
          <ProductGrid products={crossSell} columns={4} compact />
        </div>
      </div>
    );
  }

  return (
    <div className="t-shell pb-24 pt-14">
      <div className="mb-9 flex flex-wrap items-baseline gap-4.5">
        <h1 className="t-display text-[38px] sm:text-[48px]">{d.cart.title}</h1>
        <span className="text-[12.5px] text-muted">
          {bagCount} {bagCount === 1 ? d.common.piece : d.common.pieces}
        </span>
      </div>

      <div className="grid items-start gap-14 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_420px] lg:gap-16">
        {/* ------------------------------------------------------------ lines */}
        <div className="flex flex-col">
          {bag.map((line) => {
            const product = getProduct(line.slug);
            return (
              <div
                key={line.key}
                className="grid gap-5 border-t border-ink/12 py-7 sm:grid-cols-[132px_1fr_auto] sm:gap-6"
              >
                <Link
                  href={routes.product(locale, line.slug)}
                  className="aspect-4/5 w-[112px] bg-surface-2 sm:w-auto"
                >
                  <ShotSlot showLabel={false} tone={2} />
                </Link>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={routes.product(locale, line.slug)}
                    className="text-[22px] text-ink no-underline hover:text-brass sm:text-[24px]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {product ? t(product.title) : line.slug}
                  </Link>
                  <span className="text-[12.5px] text-muted">{t(line.variant)}</span>
                  {product ? (
                    <span className="text-[11px] uppercase tracking-[0.14em] text-brass">
                      {t(product.leadTime)}
                    </span>
                  ) : null}
                  <div className="mt-2 flex flex-wrap items-center gap-5">
                    <QuantityStepper
                      compact
                      value={line.qty}
                      onChange={(next) => setQty(line.key, next)}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        toggleWishlist(line.slug);
                        removeLine(line.key);
                      }}
                      className="cursor-pointer border-0 bg-transparent p-0 text-[11px] uppercase tracking-[0.1em] text-muted hover:text-brass"
                    >
                      {d.common.saveForLater}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLine(line.key)}
                      className="cursor-pointer border-0 bg-transparent p-0 text-[11px] uppercase tracking-[0.1em] text-muted hover:text-brass"
                    >
                      {d.common.remove}
                    </button>
                  </div>
                </div>

                <Money amount={line.unitPrice * line.qty} className="text-[14px] sm:text-end" />
              </div>
            );
          })}

          {/* ------------------------------------------------- extras + promo */}
          <div className="grid gap-6 border-t border-ink/12 py-7 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <CheckRow checked={giftWrap} onChange={setGiftWrap}>
                {d.cart.giftWrap} — <Money amount={450} />
              </CheckRow>
              <CheckRow checked={installation} onChange={setInstallation}>
                {d.cart.installation}
              </CheckRow>
            </div>
            <div className="flex flex-col gap-2.5">
              <label className="t-label" htmlFor="promo">
                {d.cart.promo}
              </label>
              <div className="flex border border-ink/20">
                <input
                  id="promo"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setPromoError(false);
                  }}
                  placeholder={d.cart.promoPlaceholder}
                  className="flex-1 border-0 bg-transparent px-3.5 py-3 text-[13px] outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (applyPromo(code)) {
                      setPromoError(false);
                      setCode("");
                    } else {
                      setPromoError(true);
                    }
                  }}
                  className="cursor-pointer border-0 bg-onyx px-5 text-[10.5px] uppercase tracking-[0.14em] text-ivory"
                >
                  {d.common.apply}
                </button>
              </div>
              {promoError ? (
                <span className="text-[11px] text-danger">{d.cart.promoInvalid}</span>
              ) : promo ? (
                <span className="flex items-center gap-2 text-[11px] text-brass">
                  {d.cart.promoApplied}: {promo}
                  <button
                    type="button"
                    onClick={clearPromo}
                    className="cursor-pointer border-0 bg-transparent p-0 text-muted underline underline-offset-2"
                  >
                    {d.common.remove}
                  </button>
                </span>
              ) : (
                <span className="text-[11px] text-muted">ATELIER10 · TRADE15</span>
              )}
            </div>
          </div>

          <div className="mt-11">
            <SectionHead title={d.cart.completeOrder} size="sm" />
            <ProductGrid products={crossSell} columns={4} compact />
          </div>
        </div>

        {/* ---------------------------------------------------------- summary */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-[70px]">
          <div className="t-panel flex flex-col gap-4 p-8">
            <span className="t-label text-brass">{d.common.summary}</span>
            <div className="flex flex-col gap-3 text-[13px]">
              <Row label={d.common.subtotal} value={<Money amount={totals.subtotal} />} />
              {totals.discount > 0 ? (
                <Row
                  label={`${d.cart.promo} · ${promo}`}
                  value={
                    <span className="text-brass">
                      −<Money amount={totals.discount} />
                    </span>
                  }
                />
              ) : null}
              {totals.giftWrap > 0 ? (
                <Row label={d.cart.giftWrapLine} value={<Money amount={totals.giftWrap} />} />
              ) : null}
              <Row
                label={installation ? d.cart.deliveryLine : d.checkout.courier}
                value={<Money amount={totals.delivery} />}
              />
              <Row label={d.common.vat} value={<Money amount={totals.vat} />} />
            </div>
            <hr className="t-rule" />
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.16em]">{d.common.total}</span>
              <Money amount={totals.total} className="text-[28px] sm:text-[30px]" />
            </div>
            <Link href={routes.checkout(locale)} className="t-btn t-btn--primary mt-1.5 w-full">
              {d.common.checkout}
            </Link>
            <p className="text-[11.5px] leading-relaxed text-muted">{d.cart.madeToOrderNote}</p>
          </div>

          <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-[12px] text-body">
            {[d.cart.trust1, d.cart.trust2, d.cart.trust3, d.cart.trust4].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Diamond />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-body">{label}</span>
      <span>{value}</span>
    </div>
  );
}
