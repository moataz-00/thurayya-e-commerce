"use client";

import { useLocale } from "@/lib/i18n/provider";

/** First thing in the tab order; visible only when focused. */
export function SkipLink() {
  const { d } = useLocale();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[300] focus:bg-onyx focus:px-5 focus:py-3 focus:text-[11px] focus:uppercase focus:tracking-[0.16em] focus:text-ivory focus:no-underline"
    >
      {d.nav.skipToContent}
    </a>
  );
}
