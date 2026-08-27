"use client";

import type { Product } from "@/lib/types";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes } from "@/lib/routes";

/** "Add all to bag" on a room page — one click, every piece in the look. */
export function AddRoomToBag({ products }: { products: Product[] }) {
  const { locale, d } = useLocale();
  const { addToBag, showToast } = useStore();

  return (
    <button
      type="button"
      onClick={() => {
        products.forEach((p) =>
          addToBag({ slug: p.slug, variant: p.finishLabel, unitPrice: p.price }),
        );
        showToast({
          title: d.common.added,
          href: routes.cart(locale),
          linkLabel: d.common.viewBag,
        });
      }}
      className="t-btn t-btn--primary mt-10"
    >
      {d.room.addAll}
    </button>
  );
}
