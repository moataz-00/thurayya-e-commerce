# Changelog

Notable changes to the Thurayyā storefront frontend.

Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [0.1.0] — 2026-08-27

First build. The complete storefront frontend, implemented from the Claude Design source
`Thurayyā Site.dc.html`, with a typed mock data layer and no backend.

### Added — foundation

- Next.js 16 App Router project with TypeScript (strict) and Tailwind CSS v4.
- Design tokens as CSS custom properties in `@theme`: five brand colours with their
  intended shares, five type families, motion easings and layout constants.
- Brand component classes: `.t-btn` (five variants), `.t-input` / `.t-textarea` /
  `.t-select`, `.t-shell`, `.t-shot`, `.t-prose`, `.t-panel`, `.t-glow`, `.t-skeleton`.
- `prefers-reduced-motion` honoured globally; focus ring declared once and never removed.

### Added — bilingual

- `/en` and `/ar` route trees from a single `[lang]` segment; `src/proxy.ts` redirects
  unprefixed URLs using `Accept-Language`.
- `<html lang dir>` set from the route, so RTL is real rather than simulated.
- Full English and Arabic UI dictionaries, type-locked to each other.
- Deterministic money formatting with Arabic-Indic numerals, Arabic separators and four
  currencies converted from a single EGP source price.
- Logical CSS properties throughout; `.t-mirror` for the glyphs that should flip and an
  explicit list of the ones that should not.

### Added — data

- 31 products across 14 categories, 6 collections and 8 rooms, each with six gallery slots,
  finish and size options, a derived specification table, eight accordions, reviews and
  Q&A. Specifications are generated from the seed numbers, so the catalogue cannot
  contradict itself.
- 6 journal articles with full bodies, 6 support articles, 3 legal documents, 3 showrooms,
  3 orders, addresses, appointments and boards.
- Eleven filter groups with OR-within / AND-across semantics.
- Query functions (`listProducts`, `searchProducts`, `alsoLike`, …) as the single seam the
  future API will replace.

### Added — pages

30 routes, each in both languages:

- **Commerce** — home, lighting and furniture listings plus their categories, new arrivals,
  31 product pages, search, cart, four-step checkout, order confirmation.
- **Editorial** — collections index and six collection pages, rooms index and eight room
  pages with hotspot heroes, journal index and six articles, about, style guide.
- **Services** — custom projects, trade programme, consultation booking, showrooms and
  contact.
- **Account** — dashboard plus nine sections, sign-in.
- **Support** — index, six articles, three legal documents, order tracking.
- **Errors** — a not-found page inside the locale tree.

### Added — behaviour

- Bag with variant-aware lines, quantity, save-for-later, promo codes, gift wrapping and
  delivery method, persisted to `localStorage` behind a hydration guard.
- Wishlist, recently viewed and recent searches, all persisted.
- Currency switch that re-renders every price on the page.
- PLP filtering, sorting, load-more paging, a mobile filter drawer, and empty and loading
  states.
- PDP gallery, finish and size selection with live price, add-to-bag toast.
- Mega menu with 120ms hover intent, `Escape` to close, and a mobile drawer that traps
  focus and locks scroll.
- Consultation booking with a live summary and confirmed state; four other forms with
  designed success states.
- Cookie banner that keeps analytics off until accepted.

### Added — documentation

`README.md`, `CONTRIBUTING.md`, `CHANGELOG.md`, `CLAUDE.md`, and `docs/`:
`ARCHITECTURE`, `ROUTES`, `DESIGN-SYSTEM`, `COMPONENTS`, `CONTENT-MODEL`, `MOCK-DATA`,
`I18N-RTL`, `ACCESSIBILITY`, `IMAGE-BRIEF`, `BACKEND-INTEGRATION`, `TESTING`, `ROADMAP`.

### Notes

- No backend, authentication, payment or persistence beyond the browser. See
  `docs/BACKEND-INTEGRATION.md`.
- No photography — every image is a labelled `ShotSlot` placeholder naming the shot it is
  waiting for. See `docs/IMAGE-BRIEF.md`.
- Next.js pinned to 16.3.3; the initial scaffold on 15.1.6 was replaced because that
  release carries CVE-2025-66478.
- The `middleware` convention was replaced by `proxy.ts`, which Next 16 requires.
