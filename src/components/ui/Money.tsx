"use client";

import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { formatMoney } from "@/lib/format";

/**
 * Prices are stored in EGP and formatted per the viewer's currency choice.
 * Rendering goes through this component so a currency switch updates every
 * price on the page at once.
 */
export function Money({
  amount,
  className = "",
}: {
  amount: number | null | undefined;
  className?: string;
}) {
  const { locale } = useLocale();
  const { currency } = useStore();
  return <span className={className}>{formatMoney(amount, currency, locale)}</span>;
}

/** Same formatting, when you need the string rather than an element. */
export function useMoney() {
  const { locale } = useLocale();
  const { currency } = useStore();
  return (amount: number | null | undefined) => formatMoney(amount, currency, locale);
}
