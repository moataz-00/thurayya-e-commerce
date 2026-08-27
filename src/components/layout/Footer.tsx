"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n/provider";
import { routes } from "@/lib/routes";
import { FOOTER_COLUMNS } from "@/lib/mock/navigation";
import { Wordmark } from "@/components/ui/primitives";
import { InlineSubmit } from "@/components/ui/form";

export function Footer() {
  const { locale, d, t } = useLocale();

  return (
    <footer className="bg-onyx text-ivory/72">
      <div className="t-shell pb-10 pt-20 lg:pt-22">
        <div className="grid gap-12 border-b border-ivory/12 pb-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Wordmark size="lg" className="text-ivory" />
            <p className="max-w-[270px] text-[12.5px] leading-relaxed text-ivory/60">
              {d.footer.blurb}
            </p>
            <div className="mt-2 flex flex-col gap-3">
              <span className="t-label text-brass">{d.home.newsKicker}</span>
              <InlineSubmit
                dark
                placeholder={d.home.newsPlaceholder}
                cta={d.home.newsCta}
                done={d.home.newsThanks}
              />
            </div>
            <div className="mt-2 flex gap-2.5" aria-label={d.footer.follow}>
              {["IG", "PI", "LI"].map((s) => (
                <span
                  key={s}
                  className="flex h-[26px] w-[26px] items-center justify-center border border-brass/45 text-[8px] tracking-[0.1em] text-ivory/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title.en} aria-label={t(col.title)} className="flex flex-col gap-4">
              <div className="t-label text-brass">{t(col.title)}</div>
              {col.items.map((li) => (
                <Link
                  key={li.label.en}
                  href={li.href(locale)}
                  className="text-[12.5px] tracking-[0.02em] text-ivory/68 no-underline hover:text-ivory"
                >
                  {t(li.label)}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-[11px] tracking-[0.06em] text-ivory/45">
          <span>{d.footer.rights}</span>
          <div className="flex flex-wrap gap-6">
            <Link href={routes.legal(locale, "terms")} className="text-inherit no-underline hover:text-ivory">
              {d.footer.terms}
            </Link>
            <Link href={routes.legal(locale, "privacy")} className="text-inherit no-underline hover:text-ivory">
              {d.footer.privacy}
            </Link>
            <Link href={routes.legal(locale, "accessibility")} className="text-inherit no-underline hover:text-ivory">
              {d.footer.accessibility}
            </Link>
            <Link href={routes.track(locale)} className="text-inherit no-underline hover:text-ivory">
              {d.footer.track}
            </Link>
          </div>
        </div>

        <p className="mt-6 text-[10.5px] leading-relaxed text-ivory/35">{d.common.mockNotice}</p>
      </div>
    </footer>
  );
}
