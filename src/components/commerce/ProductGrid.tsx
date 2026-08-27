"use client";

import type { Product } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { ProductCard } from "./ProductCard";

const COLUMN_CLASSES: Record<2 | 3 | 4, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
};

/** Grid gap 28px, card aspect 4:5, 4 → 3 → 2 columns down the breakpoints. */
export function ProductGrid({
  products,
  columns = 4,
  compact = false,
  className = "",
}: {
  products: Product[];
  columns?: 2 | 3 | 4;
  compact?: boolean;
  className?: string;
}) {
  const { d } = useLocale();
  if (products.length === 0) return null;
  return (
    <div
      role="list"
      aria-label={d.a11y.productGrid}
      className={`grid gap-x-5 gap-y-9 sm:gap-x-7 ${COLUMN_CLASSES[columns]} ${className}`}
    >
      {products.map((p) => (
        <div role="listitem" key={p.slug}>
          <ProductCard product={p} compact={compact} />
        </div>
      ))}
    </div>
  );
}

export function ProductGridSkeleton({ count = 6, columns = 3 }: { count?: number; columns?: 2 | 3 | 4 }) {
  return (
    <div className={`grid gap-x-5 gap-y-9 sm:gap-x-7 ${COLUMN_CLASSES[columns]}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3.5">
          <div className="t-skeleton aspect-4/5" />
          <div className="t-skeleton h-[11px] w-[70%]" />
          <div className="t-skeleton h-[9px] w-[45%]" />
          <div className="t-skeleton h-[9px] w-[30%]" />
        </div>
      ))}
    </div>
  );
}
