"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes } from "@/lib/routes";
import { CARD_ALT_SHOT, CARD_SHOT } from "@/lib/mock/products";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { StatusPill } from "@/components/ui/primitives";
import { Money } from "@/components/ui/Money";

/**
 * Card states: default, hover (alternate lifestyle image cross-fades over
 * 700ms while Quick View rises 8px), and wishlist-saved.
 */
export function ProductCard({
  product,
  priority: _priority = false,
  compact = false,
}: {
  product: Product;
  priority?: boolean;
  compact?: boolean;
}) {
  const { locale, d, t } = useLocale();
  const { inWishlist, toggleWishlist, addToBag, showToast, hydrated } = useStore();
  const [hover, setHover] = useState(false);

  const saved = hydrated && inWishlist(product.slug);
  const href = routes.product(locale, product.slug);

  return (
    <article
      className="group flex flex-col gap-3.5"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-surface-2">
        <Link href={href} className="absolute inset-0 block" aria-label={t(product.title)}>
          <span
            className="absolute inset-0 transition-opacity duration-700 ease-[var(--ease-thurayya)]"
            style={{ opacity: hover ? 0 : 1 }}
          >
            <ShotSlot label={CARD_SHOT[product.slug]} tone={2} />
          </span>
          <span
            className="absolute inset-0 transition-opacity duration-700 ease-[var(--ease-thurayya)]"
            style={{ opacity: hover ? 1 : 0 }}
            aria-hidden
          >
            <ShotSlot label={CARD_ALT_SHOT[product.slug]} tone={4} />
          </span>
        </Link>

        <div className="pointer-events-none absolute start-3.5 top-3.5 z-[2]">
          <StatusPill availability={product.availability} />
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={saved}
          aria-label={`${saved ? d.common.inWishlist : d.common.addToWishlist} — ${t(product.shortTitle)}`}
          className="absolute end-3 top-3 z-[2] flex h-[30px] w-[30px] cursor-pointer items-center justify-center border-0 bg-ivory/90 p-0"
        >
          <span
            aria-hidden
            className="h-[9px] w-[9px] rotate-45 border border-brass transition-colors duration-300"
            style={{ background: saved ? "var(--color-brass)" : "transparent" }}
          />
        </button>

        {!compact ? (
          <button
            type="button"
            onClick={() => {
              addToBag({
                slug: product.slug,
                variant: product.finishLabel,
                unitPrice: product.price,
              });
              showToast({
                title: d.common.added,
                href: routes.cart(locale),
                linkLabel: d.common.viewBag,
              });
            }}
            className="absolute inset-x-3.5 bottom-3.5 z-[2] cursor-pointer border-0 bg-onyx/86 py-2.5 text-[10px] uppercase tracking-[0.18em] text-ivory transition-all duration-[400ms] ease-[var(--ease-thurayya)]"
            style={{
              opacity: hover ? 1 : 0,
              transform: `translateY(${hover ? 0 : 8}px)`,
              pointerEvents: hover ? "auto" : "none",
            }}
            tabIndex={hover ? 0 : -1}
          >
            {d.common.addToBag}
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <Link
          href={href}
          className="text-[20px] leading-[1.2] text-ink no-underline hover:text-brass"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(product.title)}
        </Link>
        <span className="text-[11.5px] tracking-[0.05em] text-muted">{t(product.finishLabel)}</span>
        <Money amount={product.price} className="mt-0.5 text-[13px] tracking-[0.04em] text-ink" />
      </div>
    </article>
  );
}
