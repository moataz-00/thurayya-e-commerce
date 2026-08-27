import type { Locale, Product } from "@/lib/types";
import { PRODUCTS } from "./products";
import {
  DIAMETER_BANDS,
  DROP_BANDS,
  FILTER_GROUPS,
  LIGHT_COUNT_BANDS,
  PRICE_BANDS,
} from "./taxonomy";

export * from "./taxonomy";
export * from "./products";
export * from "./collections";
export * from "./rooms";
export * from "./journal";
export * from "./studio";
export * from "./account";
export * from "./support";

/* ==========================================================================
   Queries
   --------------------------------------------------------------------------
   These are the seams the real API will slot into. Pages never touch the
   arrays directly - they call the functions below, which is why swapping the
   mock for `fetch` later is a change in this file only.
   ========================================================================== */

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProducts(slugs: string[]): Product[] {
  return slugs.map((s) => getProduct(s)).filter((p): p is Product => Boolean(p));
}

export type SortKey = "featured" | "newest" | "priceAsc" | "priceDesc" | "rating";

export const SORT_KEYS: SortKey[] = ["featured", "newest", "priceAsc", "priceDesc", "rating"];

function inBand(
  bands: { value: string; min: number; max: number }[],
  value: string,
  n: number | undefined,
): boolean {
  const band = bands.find((b) => b.value === value);
  if (!band) return false;
  if (n === undefined) return false;
  return n >= band.min && n < band.max;
}

/** Does a single selected facet value apply to this product? */
function matchesValue(product: Product, value: string): boolean {
  if (product.category === value) return true;
  if (product.availability === value) return true;
  if (product.rooms.includes(value)) return true;
  if (product.materials.includes(value)) return true;
  if (product.finishes.includes(value)) return true;
  if (product.colours.includes(value)) return true;
  if (product.technical.includes(value)) return true;
  if (inBand(PRICE_BANDS, value, product.price)) return true;
  if (inBand(DIAMETER_BANDS, value, product.diameterCm)) return true;
  if (inBand(DROP_BANDS, value, product.dropCm)) return true;
  if (inBand(LIGHT_COUNT_BANDS, value, product.lights)) return true;
  return false;
}

/** Which filter group does a value belong to? Used to OR within, AND across. */
function groupOf(value: string): string | undefined {
  return FILTER_GROUPS.find((g) => g.items.some((i) => i.value === value))?.id;
}

export interface ListOptions {
  family?: "lighting" | "furniture";
  category?: string;
  collection?: string;
  room?: string;
  /** Selected facet values from the sidebar / chip row. */
  facets?: string[];
  sort?: SortKey;
  newOnly?: boolean;
}

export function listProducts(options: ListOptions = {}): Product[] {
  const { family, category, collection, room, facets = [], sort = "featured", newOnly } = options;

  let out = PRODUCTS.filter((p) => {
    if (family && p.family !== family) return false;
    if (category && p.category !== category) return false;
    if (collection && p.collection !== collection) return false;
    if (room && !p.rooms.includes(room)) return false;
    if (newOnly && !p.isNew) return false;
    return true;
  });

  if (facets.length > 0) {
    const byGroup = new Map<string, string[]>();
    for (const value of facets) {
      const group = groupOf(value) ?? "other";
      byGroup.set(group, [...(byGroup.get(group) ?? []), value]);
    }
    out = out.filter((p) =>
      [...byGroup.values()].every((values) => values.some((v) => matchesValue(p, v))),
    );
  }

  return sortProducts(out, sort);
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const out = [...list];
  switch (sort) {
    case "newest":
      return out.sort((a, b) => b.releasedAt.localeCompare(a.releasedAt));
    case "priceAsc":
      return out.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return out.sort((a, b) => b.price - a.price);
    case "rating":
      return out.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "featured":
    default:
      return out.sort((a, b) => {
        const score = (p: Product) => (p.isBestSeller ? 2 : 0) + (p.isNew ? 1 : 0);
        return score(b) - score(a) || b.rating - a.rating;
      });
  }
}

export function newArrivals(limit = 4): Product[] {
  return [...PRODUCTS]
    .sort((a, b) => b.releasedAt.localeCompare(a.releasedAt))
    .slice(0, limit);
}

export function bestSellers(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.isBestSeller)
    .concat(PRODUCTS.filter((p) => !p.isBestSeller))
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, limit);
}

export function relatedProducts(slug: string, limit = 4): Product[] {
  const product = getProduct(slug);
  if (!product) return PRODUCTS.slice(0, limit);
  const explicit = getProducts(product.relatedSlugs);
  if (explicit.length >= limit) return explicit.slice(0, limit);
  const filler = PRODUCTS.filter(
    (p) => p.slug !== slug && !product.relatedSlugs.includes(p.slug) && p.category === product.category,
  );
  return [...explicit, ...filler].slice(0, limit);
}

export function alsoLike(slug: string, limit = 4): Product[] {
  const product = getProduct(slug);
  if (!product) return PRODUCTS.slice(0, limit);
  const scored = PRODUCTS.filter((p) => p.slug !== slug).map((p) => {
    let score = 0;
    if (p.collection && p.collection === product.collection) score += 3;
    score += p.materials.filter((m) => product.materials.includes(m)).length;
    score += p.rooms.filter((r) => product.rooms.includes(r)).length * 0.5;
    if (Math.abs(p.price - product.price) < product.price * 0.4) score += 1;
    return { p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

/** Naive relevance search across both languages - good enough for a prototype. */
export function searchProducts(query: string, locale: Locale = "en"): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.map((p) => {
    const haystack = [
      p.title.en,
      p.title.ar,
      p.shortTitle[locale],
      p.finishLabel.en,
      p.finishLabel.ar,
      p.summary.en,
      p.summary.ar,
      p.category,
      p.collection ?? "",
      ...p.materials,
      ...p.rooms,
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    if (p.title.en.toLowerCase().startsWith(q) || p.title.ar.startsWith(query.trim())) score += 5;
    if (haystack.includes(q)) score += 2;
    for (const word of q.split(/\s+/)) {
      if (word.length > 2 && haystack.includes(word)) score += 1;
    }
    return { p, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.p);
}

/** Category / journal suggestions shown beside product results. */
export function searchSuggestions(query: string): { label: string; count: number }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = searchProducts(q);
  const byCategory = new Map<string, number>();
  for (const p of results) byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + 1);
  return [...byCategory.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([label, count]) => ({ label, count }));
}

export const PRODUCT_COUNT = PRODUCTS.length;
