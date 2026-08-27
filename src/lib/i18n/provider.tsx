"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Direction, Locale, Localized } from "@/lib/types";
import { DIRECTION } from "./config";
import { getDictionary, type Dictionary } from "./dictionary";

interface LocaleValue {
  locale: Locale;
  dir: Direction;
  d: Dictionary;
  /** Pick the current language out of a `Localized` value. */
  t: (value: Localized) => string;
  isRtl: boolean;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleValue>(
    () => ({
      locale,
      dir: DIRECTION[locale],
      d: getDictionary(locale),
      t: (v: Localized) => v[locale] ?? v.en,
      isRtl: locale === "ar",
    }),
    [locale],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}
