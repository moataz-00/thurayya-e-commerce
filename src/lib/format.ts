import type { Currency, Locale } from "@/lib/types";

/**
 * Indicative conversion rates against EGP. Every price in the catalogue is
 * stored in EGP; display currency is a presentation concern only.
 *
 * When the backend lands these come from a rates endpoint - see
 * docs/BACKEND-INTEGRATION.md. Nothing else in the app should divide by a rate.
 */
export const RATES: Record<Currency, number> = {
  EGP: 1,
  AED: 1 / 13.3,
  SAR: 1 / 12.9,
  USD: 1 / 48.5,
};

export const CURRENCIES: readonly Currency[] = ["EGP", "AED", "SAR", "USD"] as const;

export const CURRENCY_LABEL: Record<Currency, Record<Locale, string>> = {
  EGP: { en: "EGP", ar: "ج.م" },
  AED: { en: "AED", ar: "د.إ" },
  SAR: { en: "SAR", ar: "ر.س" },
  USD: { en: "USD", ar: "$" },
};

const ARABIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/**
 * Deterministic digit grouping. We avoid `Intl.NumberFormat` here on purpose:
 * server and client must produce byte-identical strings or React logs a
 * hydration mismatch, and ICU output has drifted between Node versions.
 */
function group(value: number, separator: string): string {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  const digits = String(Math.abs(rounded));
  let out = "";
  for (let i = 0; i < digits.length; i += 1) {
    if (i > 0 && (digits.length - i) % 3 === 0) out += separator;
    out += digits[i];
  }
  return sign + out;
}

function toArabicDigits(value: string): string {
  return value.replace(/[0-9]/g, (d) => ARABIC_DIGITS[Number(d)]);
}

/** `12500` -> `"12,500"` / `"١٢٬٥٠٠"` */
export function formatNumber(value: number, locale: Locale): string {
  const separator = locale === "ar" ? "٬" : ",";
  const grouped = group(value, separator);
  return locale === "ar" ? toArabicDigits(grouped) : grouped;
}

/**
 * `formatMoney(184000, "EGP", "en")` -> `"EGP 184,000"`
 * `formatMoney(184000, "EGP", "ar")` -> `"١٨٤٬٠٠٠ ج.م"`
 *
 * Pass `null` for a piece that is quoted per project.
 */
export function formatMoney(
  amountEgp: number | null | undefined,
  currency: Currency,
  locale: Locale,
): string {
  if (amountEgp === null || amountEgp === undefined) {
    return locale === "ar" ? "بحسب الطلب" : "On request";
  }
  const converted = amountEgp * RATES[currency];
  const label = CURRENCY_LABEL[currency][locale];
  const digits = formatNumber(converted, locale);
  return locale === "ar" ? `${digits} ${label}` : `${label} ${digits}`;
}

/** Keeps technical specifications in Western numerals, per the design handoff. */
export function formatSpecNumber(value: number): string {
  return group(value, ",");
}

/** `4.9` -> `"4.9"` / `"٤٫٩"` */
export function formatDecimal(value: number, locale: Locale, places = 1): string {
  const fixed = value.toFixed(places);
  if (locale !== "ar") return fixed;
  return toArabicDigits(fixed).replace(".", "٫");
}

/** Star row used on cards, PDP and reviews. */
export function stars(rating: number): string {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full).padEnd(5, "☆");
}

export const VAT_RATE = 0.14;

export interface Totals {
  subtotal: number;
  giftWrap: number;
  delivery: number;
  vat: number;
  discount: number;
  total: number;
}

/** All values in EGP. The single place order maths happens. */
export function computeTotals(input: {
  subtotal: number;
  giftWrap?: boolean;
  delivery?: number;
  discountRate?: number;
}): Totals {
  const giftWrap = input.giftWrap ? 450 : 0;
  const delivery = input.delivery ?? 3500;
  const discount = Math.round(input.subtotal * (input.discountRate ?? 0));
  const taxable = input.subtotal + giftWrap + delivery - discount;
  const vat = Math.round(taxable * VAT_RATE);
  return {
    subtotal: input.subtotal,
    giftWrap,
    delivery,
    vat,
    discount,
    total: taxable + vat,
  };
}
