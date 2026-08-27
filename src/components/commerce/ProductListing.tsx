"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLocale } from "@/lib/i18n/provider";
import { routes } from "@/lib/routes";
import {
  DEFAULT_OPEN_GROUPS,
  FILTER_GROUPS,
  facetLabel,
  listProducts,
  newArrivals,
  type ListOptions,
  type SortKey,
} from "@/lib/mock";
import { SORT_KEYS } from "@/lib/mock";
import { ProductGrid, ProductGridSkeleton } from "./ProductGrid";

const PAGE_SIZE = 9;

export function ProductListing({
  scope,
  openGroup,
  defaultSort = "featured",
}: {
  scope: ListOptions;
  /** `?open=finish` from the mega menu opens that group on arrival. */
  openGroup?: string;
  defaultSort?: SortKey;
}) {
  const { locale, d, t } = useLocale();

  const [facets, setFacets] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>(defaultSort);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [open, setOpen] = useState<string[]>(() =>
    openGroup ? [...new Set([...DEFAULT_OPEN_GROUPS, openGroup])] : DEFAULT_OPEN_GROUPS,
  );

  const results = useMemo(
    () => listProducts({ ...scope, facets, sort }),
    [scope, facets, sort],
  );

  /* A short skeleton pass whenever the query changes, matching the design's
     loading state. Replace the timer with the real request when the API lands. */
  useEffect(() => {
    if (facets.length === 0) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 260);
    return () => clearTimeout(timer);
  }, [facets, sort]);

  useEffect(() => setVisible(PAGE_SIZE), [facets, sort]);

  const toggleFacet = (value: string) =>
    setFacets((current) =>
      current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
    );

  const toggleGroup = (id: string) =>
    setOpen((current) => (current.includes(id) ? current.filter((g) => g !== id) : [...current, id]));

  const shown = results.slice(0, visible);

  const sidebar = (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
        <span className="text-[10.5px] uppercase tracking-[0.18em]">{d.common.filters}</span>
        <span className="text-[10.5px] text-brass">
          {facets.length} {d.common.applied}
        </span>
      </div>
      {FILTER_GROUPS.map((group) => {
        const isOpen = open.includes(group.id);
        return (
          <div key={group.id} className="border-b border-ink/10">
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between border-0 bg-transparent px-0 py-4 text-[11.5px] uppercase tracking-[0.1em] text-ink"
            >
              {t(group.title)}
              <span aria-hidden className="text-[14px] text-brass">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <div className="flex flex-col gap-3 pb-4.5">
                {group.items.map((item) => {
                  const on = facets.includes(item.value);
                  return (
                    <button
                      key={item.value}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggleFacet(item.value)}
                      className="flex cursor-pointer items-center gap-3 border-0 bg-transparent p-0 text-start text-[12.5px] text-body"
                    >
                      <span
                        aria-hidden
                        className={`h-3.5 w-3.5 flex-none border transition-colors duration-[250ms] ${
                          on ? "border-brass bg-brass" : "border-ink/30"
                        }`}
                      />
                      {t(item.label)}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {/* ------------------------------------------------- chips + controls */}
      <div className="t-shell flex flex-wrap items-center justify-between gap-5 border-b border-ink/12 pb-5 pt-7">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[12px] tracking-[0.06em] text-muted">
            {results.length} {d.common.products}
          </span>
          {facets.length > 0 ? (
            <>
              <span aria-hidden className="h-3 w-px bg-ink/18" />
              {facets.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => toggleFacet(value)}
                  className="flex cursor-pointer items-center gap-2.5 border border-ink bg-transparent px-3 py-1.5 text-[11px]"
                >
                  {t(facetLabel(value))}
                  <span aria-hidden className="text-brass">
                    ×
                  </span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setFacets([])}
                className="cursor-pointer border-0 bg-transparent p-0 text-[10.5px] uppercase tracking-[0.12em] text-muted underline underline-offset-4"
              >
                {d.common.clearAll}
              </button>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="cursor-pointer border border-ink/20 bg-transparent px-3.5 py-2.5 text-[11px] uppercase tracking-[0.1em] lg:hidden"
          >
            {d.common.filters}
            {facets.length ? ` · ${facets.length}` : ""}
          </button>
          <label className="flex items-center gap-2 border border-ink/20 px-3.5 py-2.5 text-[11px] uppercase tracking-[0.1em]">
            <span className="text-muted">{d.common.sort}:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer appearance-none border-0 bg-transparent pe-4 uppercase tracking-[0.1em] outline-none"
            >
              {SORT_KEYS.map((key) => (
                <option key={key} value={key}>
                  {d.sort[key]}
                </option>
              ))}
            </select>
            <span aria-hidden className="-ms-4 text-brass">
              ▾
            </span>
          </label>
        </div>
      </div>

      {/* --------------------------------------------------- sidebar + grid */}
      <div className="t-shell grid items-start gap-14 pb-24 pt-11 lg:grid-cols-[264px_1fr]">
        <aside className="sticky top-[70px] hidden lg:block">{sidebar}</aside>

        <div>
          {loading ? (
            <ProductGridSkeleton count={6} columns={3} />
          ) : results.length > 0 ? (
            <>
              <ProductGrid products={shown} columns={3} />
              <div className="mt-18 flex flex-col items-center gap-5">
                <span className="text-[11px] tracking-[0.1em] text-muted">
                  {d.common.showing} {shown.length} {d.common.of} {results.length}
                </span>
                <div className="relative h-px w-[180px] bg-ink/15">
                  <span
                    className="absolute inset-y-0 start-0 bg-brass transition-[width] duration-500"
                    style={{ width: `${(shown.length / results.length) * 100}%` }}
                  />
                </div>
                {shown.length < results.length ? (
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="t-btn t-btn--outline"
                  >
                    {d.common.loadMore}
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <div className="border border-ink/12 px-8 py-20 text-center">
              <div className="flex flex-col items-center gap-5">
                <span aria-hidden className="h-[34px] w-[34px] rotate-45 border border-brass" />
                <h2 className="t-display mt-2 text-[30px] sm:text-[34px]">{d.plp.emptyTitle}</h2>
                <p className="max-w-[420px] text-[13.5px] leading-relaxed text-body">
                  {d.plp.emptyBody}
                </p>
                <div className="mt-2 flex flex-wrap justify-center gap-3.5">
                  <button type="button" onClick={() => setFacets([])} className="t-btn t-btn--primary">
                    {d.plp.emptyClear}
                  </button>
                  <Link href={routes.consultation(locale)} className="t-btn t-btn--outline">
                    {d.common.bookConsultation}
                  </Link>
                </div>
              </div>
              <div className="mt-11 border-t border-ink/10 pt-8 text-start">
                <span className="t-label text-brass">{d.plp.consider}</span>
                <div className="mt-5">
                  <ProductGrid products={newArrivals(3)} columns={3} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------ filter drawer */}
      {drawer ? (
        <div className="fixed inset-0 z-[150] lg:hidden">
          <button
            type="button"
            aria-label={d.nav.close}
            onClick={() => setDrawer(false)}
            className="absolute inset-0 cursor-default border-0 bg-onyx/60 p-0"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={d.common.filters}
            className="absolute inset-y-0 start-0 flex w-[88%] max-w-[400px] flex-col bg-ivory"
          >
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <span className="text-[11px] uppercase tracking-[0.16em]">{d.common.filters}</span>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                aria-label={d.nav.close}
                className="h-11 w-11 cursor-pointer border-0 bg-transparent text-[18px]"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{sidebar}</div>
            <div className="flex gap-3 border-t border-ink/10 px-5 py-4">
              <button
                type="button"
                onClick={() => setFacets([])}
                className="t-btn t-btn--outline flex-1"
              >
                {d.common.clearAll}
              </button>
              <button
                type="button"
                onClick={() => setDrawer(false)}
                className="t-btn t-btn--primary flex-1"
              >
                {d.plp.applyFilters}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
