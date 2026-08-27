import type { Direction, Locale } from "@/lib/types";

export const LOCALES: readonly Locale[] = ["en", "ar"] as const;

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  ar: "العربية",
};

export const LOCALE_HTML_LANG: Record<Locale, string> = {
  en: "en",
  ar: "ar",
};

export const DIRECTION: Record<Locale, Direction> = {
  en: "ltr",
  ar: "rtl",
};

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "ar";
}

/** Falls back to the default locale rather than throwing - used on route params. */
export function coerceLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** Pick one side of a `Localized` value. */
export function t<T extends Partial<Record<Locale, string>>>(
  value: T,
  locale: Locale,
): string {
  return (value[locale] ?? value.en ?? "") as string;
}
