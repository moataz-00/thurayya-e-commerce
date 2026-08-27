import type { Locale } from "@/lib/types";

/**
 * Every internal href goes through here so the `/{locale}` prefix is never
 * hand-written, and so renaming a route is a one-line change.
 */
export const routes = {
  home: (l: Locale) => `/${l}`,
  search: (l: Locale) => `/${l}/search`,

  lighting: (l: Locale, category?: string) =>
    category ? `/${l}/lighting/${category}` : `/${l}/lighting`,
  furniture: (l: Locale, category?: string) =>
    category ? `/${l}/furniture/${category}` : `/${l}/furniture`,
  newArrivals: (l: Locale) => `/${l}/new-arrivals`,
  product: (l: Locale, slug: string) => `/${l}/products/${slug}`,

  collections: (l: Locale) => `/${l}/collections`,
  collection: (l: Locale, slug: string) => `/${l}/collections/${slug}`,

  rooms: (l: Locale) => `/${l}/rooms`,
  room: (l: Locale, slug: string) => `/${l}/rooms/${slug}`,

  journal: (l: Locale) => `/${l}/journal`,
  post: (l: Locale, slug: string) => `/${l}/journal/${slug}`,

  custom: (l: Locale) => `/${l}/custom`,
  trade: (l: Locale) => `/${l}/trade`,
  consultation: (l: Locale) => `/${l}/consultation`,
  about: (l: Locale) => `/${l}/about`,
  showrooms: (l: Locale) => `/${l}/showrooms`,

  cart: (l: Locale) => `/${l}/cart`,
  checkout: (l: Locale) => `/${l}/checkout`,
  confirmation: (l: Locale) => `/${l}/checkout/confirmation`,

  account: (l: Locale) => `/${l}/account`,
  accountSection: (l: Locale, section: string) => `/${l}/account/${section}`,
  wishlist: (l: Locale) => `/${l}/account/wishlist`,
  signIn: (l: Locale) => `/${l}/sign-in`,

  support: (l: Locale, slug?: string) =>
    slug ? `/${l}/support/${slug}` : `/${l}/support`,
  legal: (l: Locale, slug: string) => `/${l}/legal/${slug}`,
  track: (l: Locale) => `/${l}/track`,

  styleGuide: (l: Locale) => `/${l}/style-guide`,
};

/**
 * Swap the locale segment on the current path so the language toggle preserves
 * the route, as the design handoff requires.
 */
export function switchLocalePath(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${next}`;
  parts[0] = next;
  return `/${parts.join("/")}`;
}
