# Thurayyā — Storefront (frontend)

Sculptural lighting and considered furnishings, made in Cairo. This repository is the
**frontend only**: every page of the storefront is built and navigable, and all data comes
from a typed mock layer. There is no backend, no database and no payment processing yet —
see [docs/BACKEND-INTEGRATION.md](docs/BACKEND-INTEGRATION.md) for the seams that were left
open for one.

Built from the Claude Design source `Thurayyā Site.dc.html`.

---

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:3000> — you will be redirected to `/en` (or `/ar` if your
browser asks for Arabic first).

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Dev server on port 3000 with hot reload             |
| `npm run build`     | Production build, prerenders every static route     |
| `npm run start`     | Serve the production build                          |
| `npm run typecheck` | `tsc --noEmit`                                      |
| `npm run check`     | Typecheck then build — run this before every commit |

**Requirements:** Node 20.9+ (Next 16 requirement). Nothing else.

---

## What is in the box

- **30 routes**, every one of them bilingual → 60+ URLs, most of them prerendered.
- **English and Arabic**, with real RTL: `dir="rtl"`, logical CSS properties throughout,
  mirrored navigation and chevrons, Arabic-Indic numerals in prices.
- **Four currencies** (EGP, AED, SAR, USD) converted from a single EGP source price.
- **31 products** across 14 categories, 6 collections, 8 rooms and 6 journal articles,
  each with full specifications, gallery slots, reviews and Q&A.
- **A working bag**: add, change quantity, remove, save to wishlist, promo codes, gift
  wrapping, delivery method, four-step checkout and an order confirmation, all persisted
  to `localStorage`.
- **Filtering and search** over the whole catalogue — eleven facet groups, five sort
  orders, load-more paging, empty and loading states.
- **A living style guide** at `/[lang]/style-guide` rendered from the same components
  production uses.

## What is deliberately not here

- No backend, API routes, authentication or persistence beyond the browser.
- No real photography — every image is a labelled `ShotSlot` placeholder that names the
  shot it is waiting for. See [docs/IMAGE-BRIEF.md](docs/IMAGE-BRIEF.md).
- No payment integration. The checkout takes card fields, charges nothing, and says so.
- No analytics or tracking. The cookie banner keeps analytics off until accepted.

---

## Stack

| Layer      | Choice                       | Why                                                        |
| ---------- | ---------------------------- | ---------------------------------------------------------- |
| Framework  | Next.js 16 (App Router)      | Real URLs per page, prerendering, and an obvious API seam   |
| Language   | TypeScript (strict)          | The mock layer and the future API share one set of types    |
| Styling    | Tailwind CSS v4 + CSS tokens | Design tokens live in CSS; utilities do the layout          |
| State      | React Context + localStorage | Bag, wishlist and currency only — nothing that needs a store |
| Fonts      | Google Fonts via `<link>`    | No build-time network dependency; see the note below        |

Fonts are loaded with a stylesheet link rather than `next/font` so the build never depends
on the network. Switching to `next/font/google` is a small, isolated change in
`src/app/[lang]/layout.tsx` when you want self-hosted fonts.

---

## Layout of the repository

```
src/
  app/[lang]/          One folder per route. `[lang]` is "en" or "ar".
  components/
    account/           Account dashboard and its sections
    commerce/          Cards, grids, PLP, PDP, cart, checkout, search, tracking
    forms/             Consultation booking, project, trade and contact forms
    layout/            Header, footer, page shell, document page, skip link
    style-guide/       The interactive half of /style-guide
    ui/                Primitives: shot slots, money, fields, accordion, toast
  lib/
    i18n/              Locale config, dictionaries, provider
    mock/              The entire data layer and its query functions
    store/             Bag, wishlist, currency, toast
    format.ts          Currency conversion and order maths
    routes.ts          Every internal href
    types.ts           Domain types
  proxy.ts             Redirects any unprefixed URL to /en or /ar
docs/                  The documents listed below
```

---

## Documentation

| Document                                                     | What it covers                                          |
| ------------------------------------------------------------ | ------------------------------------------------------- |
| [ARCHITECTURE.md](docs/ARCHITECTURE.md)                       | Rendering strategy, folder rules, data flow             |
| [ROUTES.md](docs/ROUTES.md)                                   | Every route, what renders it, and how it is generated   |
| [DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)                     | Colour, type, spacing, motion, component specs          |
| [COMPONENTS.md](docs/COMPONENTS.md)                           | The component catalogue and when to reach for each      |
| [CONTENT-MODEL.md](docs/CONTENT-MODEL.md)                     | The domain types, field by field                        |
| [MOCK-DATA.md](docs/MOCK-DATA.md)                             | What is mocked, where it lives, how to change it        |
| [I18N-RTL.md](docs/I18N-RTL.md)                               | Bilingual rules, RTL mirroring, numerals, currency      |
| [ACCESSIBILITY.md](docs/ACCESSIBILITY.md)                     | The WCAG 2.2 AA commitments this build makes            |
| [IMAGE-BRIEF.md](docs/IMAGE-BRIEF.md)                         | The photography brief every placeholder is waiting on   |
| [BACKEND-INTEGRATION.md](docs/BACKEND-INTEGRATION.md)         | Exactly what to replace when the API arrives            |
| [TESTING.md](docs/TESTING.md)                                 | The manual QA pass, route by route                      |
| [ROADMAP.md](docs/ROADMAP.md)                                 | What is next, in the order it should happen             |
| [CONTRIBUTING.md](CONTRIBUTING.md)                            | Conventions for anyone adding to this                   |
| [CHANGELOG.md](CHANGELOG.md)                                  | What landed, when                                       |

---

## Prototype conventions worth knowing

- **Prices are EGP integers.** Nothing else in the app divides by a rate — only
  `formatMoney` in `src/lib/format.ts` does.
- **Every internal link goes through `routes.ts`.** No hand-written `/en/...` strings.
- **Copy that ships in both languages is a `Localized` object** (`{ en, ar }`). UI chrome
  lives in `src/lib/i18n/dictionary.ts`; product and editorial copy lives beside its data.
- **Client components are the exception, not the rule.** Anything with state, hover or
  storage is `"use client"`; everything else renders on the server.
- **Promo codes that work in the prototype:** `ATELIER10` (10%) and `TRADE15` (15%).
- **The order reference that resolves on `/track`:** `TH-20418`.
