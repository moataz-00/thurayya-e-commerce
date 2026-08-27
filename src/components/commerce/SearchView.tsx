"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useLocale } from "@/lib/i18n/provider";
import { useStore } from "@/lib/store/store";
import { routes } from "@/lib/routes";
import { fill } from "@/lib/i18n/dictionary";
import {
  CATEGORIES,
  POSTS,
  TRENDING_SEARCHES,
  getCategory,
  searchProducts,
  searchSuggestions,
} from "@/lib/mock";
import { ShotSlot } from "@/components/ui/ShotSlot";
import { Money } from "@/components/ui/Money";
import { Wordmark } from "@/components/ui/primitives";

export function SearchView({ initialQuery = "" }: { initialQuery?: string }) {
  const { locale, d, t } = useLocale();
  const router = useRouter();
  const { recentSearches, pushSearch } = useStore();
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => searchProducts(query, locale), [query, locale]);
  const suggestions = useMemo(() => searchSuggestions(query), [query]);
  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return POSTS.filter((p) =>
      `${p.title.en} ${p.title.ar} ${p.excerpt.en} ${p.excerpt.ar}`.toLowerCase().includes(q),
    ).slice(0, 3);
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="t-screen min-h-screen bg-onyx text-ivory">
      <div className="t-shell flex items-center justify-between pt-10">
        <Link href={routes.home(locale)} className="text-ivory no-underline">
          <Wordmark size="md" />
        </Link>
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={d.nav.close}
          className="h-10 w-10 cursor-pointer border border-ivory/30 bg-transparent text-[15px] text-ivory"
        >
          ×
        </button>
      </div>

      <div className="mx-auto w-full max-w-[1000px] px-5 pt-16 lg:px-10 lg:pt-20">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            pushSearch(query);
          }}
          className="flex items-center gap-4.5 border-b border-ivory/30 pb-4.5"
        >
          <span aria-hidden className="h-[15px] w-[15px] flex-none rounded-full border border-brass" />
          <label htmlFor="search-input" className="t-sr-only">
            {d.search.placeholder}
          </label>
          <input
            id="search-input"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={d.search.placeholder}
            className="flex-1 border-0 bg-transparent text-[26px] text-ivory outline-none sm:text-[40px]"
            style={{ fontFamily: "var(--font-display)" }}
          />
          <span className="hidden text-[10.5px] uppercase tracking-[0.14em] text-ivory/45 sm:inline">
            {d.search.escToClose}
          </span>
        </form>

        <div className="grid gap-12 pt-12 lg:grid-cols-2 lg:gap-16">
          {/* ------------------------------------------------------ left rail */}
          <div className="flex flex-col gap-10">
            {hasQuery && suggestions.length > 0 ? (
              <section className="flex flex-col gap-4">
                <span className="t-label text-brass">{d.search.suggestions}</span>
                {suggestions.map((s) => {
                  const category = getCategory(s.label);
                  return (
                    <Link
                      key={s.label}
                      href={routes.lighting(locale, s.label)}
                      className="flex items-baseline justify-between border-b border-ivory/10 pb-3 text-[15px] text-ivory no-underline hover:text-brass"
                    >
                      {category ? t(category.plural) : s.label}
                      <span className="text-[11px] text-ivory/40">
                        {s.count} {d.common.products}
                      </span>
                    </Link>
                  );
                })}
              </section>
            ) : null}

            {recentSearches.length > 0 ? (
              <section className="flex flex-col gap-3.5">
                <span className="t-label text-brass">{d.search.recent}</span>
                <div className="flex flex-wrap gap-2.5">
                  {recentSearches.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setQuery(r)}
                      className="cursor-pointer border border-ivory/25 bg-transparent px-3.5 py-2 text-[11.5px] text-ivory/75"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="flex flex-col gap-3.5">
              <span className="t-label text-brass">{d.search.trending}</span>
              <div className="flex flex-wrap gap-2.5">
                {TRENDING_SEARCHES.map((item) => (
                  <button
                    key={item.en}
                    type="button"
                    onClick={() => setQuery(t(item))}
                    className="cursor-pointer border border-brass/45 bg-transparent px-3.5 py-2 text-[11.5px] text-brass"
                  >
                    {t(item)}
                  </button>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-3">
              <span className="t-label text-brass">{d.search.categories}</span>
              <div className="flex flex-col gap-2.5 text-[14px] text-ivory/75">
                {CATEGORIES.slice(0, 6).map((c) => (
                  <Link
                    key={c.slug}
                    href={
                      c.family === "lighting"
                        ? routes.lighting(locale, c.slug)
                        : routes.furniture(locale, c.slug)
                    }
                    className="text-inherit no-underline hover:text-brass"
                  >
                    {t(c.plural)} · {t(c.note)}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* ----------------------------------------------------- right rail */}
          <div className="flex flex-col gap-4">
            <span className="t-label text-brass">{d.search.productsLabel}</span>

            {!hasQuery ? (
              <p className="text-[13px] leading-relaxed text-ivory/55">{d.search.placeholder}</p>
            ) : results.length === 0 ? (
              <div className="flex flex-col gap-3.5 border border-ivory/16 p-7">
                <span className="text-[24px]" style={{ fontFamily: "var(--font-display)" }}>
                  {fill(d.search.noResultsTitle, { q: query })}
                </span>
                <span className="text-[12.5px] leading-relaxed text-ivory/60">
                  {d.search.noResultsBody}
                </span>
                <Link href={routes.consultation(locale)} className="t-btn t-btn--ghost mt-1 self-start">
                  {d.common.askExpert}
                </Link>
              </div>
            ) : (
              <>
                {results.slice(0, 6).map((p) => (
                  <Link
                    key={p.slug}
                    href={routes.product(locale, p.slug)}
                    onClick={() => pushSearch(query)}
                    className="grid grid-cols-[76px_1fr_auto] items-center gap-4.5 border-b border-ivory/10 pb-4 text-ivory no-underline"
                  >
                    <div className="aspect-4/5 bg-ivory/10">
                      <ShotSlot dark showLabel={false} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[19px]" style={{ fontFamily: "var(--font-display)" }}>
                        {t(p.title)}
                      </span>
                      <span className="text-[11.5px] text-ivory/50">{t(p.finishLabel)}</span>
                      <span className="text-[10px] uppercase tracking-[0.14em] text-brass">
                        {d.availability[p.availability]}
                      </span>
                    </div>
                    <Money amount={p.price} className="text-[13px]" />
                  </Link>
                ))}
                <Link
                  href={routes.lighting(locale)}
                  className="mt-2 self-start border-b border-brass/40 pb-1 text-[10.5px] uppercase tracking-[0.16em] text-brass no-underline"
                >
                  {fill(d.search.viewAllResults, { n: results.length })}
                </Link>
              </>
            )}

            {posts.length > 0 ? (
              <section className="mt-8 flex flex-col gap-3">
                <span className="t-label text-brass">{d.journal.kicker}</span>
                {posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={routes.post(locale, p.slug)}
                    className="border-b border-ivory/10 pb-3 text-[14px] text-ivory/80 no-underline hover:text-brass"
                  >
                    {t(p.title)}
                  </Link>
                ))}
              </section>
            ) : null}
          </div>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
}
