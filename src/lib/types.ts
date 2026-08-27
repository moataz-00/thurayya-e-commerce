/**
 * Thurayya - domain types.
 *
 * Everything the storefront renders is described here. The mock layer in
 * `src/lib/mock` is the only thing that fills these shapes today; when the API
 * arrives it has to return the same shapes and nothing in `src/app` or
 * `src/components` needs to change. See docs/BACKEND-INTEGRATION.md.
 */

export type Locale = "en" | "ar";

export type Direction = "ltr" | "rtl";

export type Currency = "EGP" | "AED" | "SAR" | "USD";

/** A string that exists in both languages. */
export type Localized = Record<Locale, string>;

/** Availability states. Copy avoids discount language by design. */
export type Availability =
  | "ready-to-ship"
  | "made-to-order"
  | "pre-order"
  | "limited-edition";

export type ProductFamily = "lighting" | "furniture";

/**
 * A photography slot. The design ships labelled placeholders rather than
 * images so the shot brief stays visible; `src` is filled in when the real
 * photograph exists.
 */
export interface Shot {
  id: string;
  label: Localized;
  kind: "hero" | "detail" | "lit" | "lifestyle" | "scale" | "video";
  /** 1 = lightest placeholder tone, 4 = deepest. */
  tone?: 1 | 2 | 3 | 4;
  src?: string;
}

export interface FinishOption {
  id: string;
  name: Localized;
  hex: string;
}

export interface SizeOption {
  id: string;
  label: Localized;
  sub: Localized;
  /** EGP. `null` means "On request" - custom sizing, quoted per project. */
  price: number | null;
}

export interface SpecRow {
  k: Localized;
  v: Localized;
}

export interface Section {
  id: string;
  title: Localized;
  body: Localized;
}

export interface Review {
  id: string;
  author: string;
  meta: Localized;
  rating: number;
  date: Localized;
  body: Localized;
  verified: boolean;
  shots: number;
}

export interface Question {
  id: string;
  q: Localized;
  a: Localized;
  by: Localized;
}

export interface Product {
  id: string;
  slug: string;
  title: Localized;
  /** Short form for cards, cart lines and mobile. */
  shortTitle: Localized;
  family: ProductFamily;
  /** Category slug, e.g. "chandeliers". */
  category: string;
  /** Collection slug, e.g. "celestial". */
  collection?: string;
  /** Base price in EGP. All display conversion happens in `formatMoney`. */
  price: number;
  finishLabel: Localized;
  availability: Availability;
  rating: number;
  reviewCount: number;

  /* Facets - these drive the PLP filter sidebar. */
  rooms: string[];
  materials: string[];
  finishes: string[];
  colours: string[];
  technical: string[];
  diameterCm?: number;
  dropCm?: number;
  lights?: number;

  leadTime: Localized;
  summary: Localized;
  highlights: Localized[];

  shots: Shot[];
  finishOptions: FinishOption[];
  sizeOptions: SizeOption[];
  specs: SpecRow[];
  sections: Section[];
  reviews: Review[];
  questions: Question[];

  isNew: boolean;
  isBestSeller: boolean;
  /** ISO date - drives "New Arrivals" ordering. */
  releasedAt: string;
  /** Slugs of pieces shown under "Complete the Room". */
  relatedSlugs: string[];
}

export interface Category {
  slug: string;
  family: ProductFamily;
  name: Localized;
  plural: Localized;
  intro: Localized;
  bannerShot: Localized;
  tileShot: Localized;
  note: Localized;
  /** Image ids from `src/lib/images.ts`. */
  bannerSrc?: string;
  tileSrc?: string;
}

export interface Collection {
  slug: string;
  name: Localized;
  kicker: Localized;
  lede: Localized;
  concept: Localized;
  facts: { label: Localized; title: Localized; body: Localized }[];
  heroShot: Localized;
  campaignShots: Localized[];
  accent: "onyx" | "emerald";
  productSlugs: string[];
  heroSrc?: string;
  campaignSrcs?: string[];
}

export interface Room {
  slug: string;
  name: Localized;
  lede: Localized;
  heroShot: Localized;
  tileShot: Localized;
  heroSrc?: string;
  tileSrc?: string;
  tips: Localized[];
  productSlugs: string[];
  /** Percentage hotspots over the hero image. */
  hotspots: { x: number; y: number; slug: string }[];
}

export interface JournalPost {
  slug: string;
  category: Localized;
  categorySlug: string;
  title: Localized;
  excerpt: Localized;
  readingTime: Localized;
  date: Localized;
  isoDate: string;
  heroShot: Localized;
  heroSrc?: string;
  author: Localized;
  standfirst: Localized;
  body: {
    type: "p" | "h2" | "quote" | "shot" | "list";
    value: Localized | Localized[];
    /** Only on `shot` blocks. */
    src?: string;
  }[];
  productSlugs: string[];
  featured: boolean;
}

export interface FilterGroup {
  id: string;
  title: Localized;
  items: { value: string; label: Localized }[];
}

export interface CartLine {
  id: string;
  slug: string;
  title: Localized;
  variant: Localized;
  status: Localized;
  /** Unit price in EGP. */
  unitPrice: number;
  qty: number;
  availability: Availability;
}

export interface Order {
  id: string;
  reference: string;
  placedOn: Localized;
  status: "in-production" | "shipped" | "delivered" | "cancelled";
  statusLabel: Localized;
  total: number;
  lines: { slug: string; title: Localized; variant: Localized; qty: number; price: number }[];
  timeline: { label: Localized; date: Localized; done: boolean }[];
  action: Localized;
}

export interface Address {
  id: string;
  label: Localized;
  name: string;
  lines: string[];
  phone: string;
  isDefault: boolean;
}

export interface Appointment {
  id: string;
  service: Localized;
  format: Localized;
  date: Localized;
  time: Localized;
  designer: Localized;
  status: "confirmed" | "requested" | "completed";
}

export interface Showroom {
  slug: string;
  city: Localized;
  address: Localized;
  hours: Localized;
  phone: string;
  note: Localized;
  shot: Localized;
  shotSrc?: string;
}

export interface Faq {
  q: Localized;
  a: Localized;
}

export interface PressQuote {
  quote: Localized;
  source: string;
}

export interface Craft {
  slug: string;
  name: Localized;
  note: Localized;
}

export interface SupportArticle {
  slug: string;
  title: Localized;
  lede: Localized;
  sections: { heading: Localized; body: Localized[] }[];
  faqs?: Faq[];
}
