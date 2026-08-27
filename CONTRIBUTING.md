# Contributing

Conventions for anyone adding to the Thurayyā storefront.

---

## Before you commit

```bash
npm run check
```

Typecheck plus a full production build. Then walk the relevant part of
[docs/TESTING.md](docs/TESTING.md) — **in both languages**.

---

## The rules that matter

### 1. Both languages, always

Every customer-facing string is a `Localized` object or a dictionary key. The English
dictionary defines the shape; a missing Arabic key is a compile error. Do not ship an
English string with a `TODO` beside it.

### 2. Prices are EGP integers

`formatMoney` is the only thing that converts and the only thing that formats. If you find
yourself multiplying by a rate anywhere else, stop.

### 3. Links go through `routes.ts`

No hand-written `/en/...` strings anywhere. Add the route helper first, then use it.

### 4. Server by default

Add `"use client"` only when the component needs state, hover, an event handler,
`localStorage` or the store. Server components pass **data**, never callbacks, across the
boundary.

A constant that both a server route and a client component need does **not** belong in a
`"use client"` file — client exports reach server code as references, not values. See
`src/lib/account-sections.ts` for the pattern.

### 5. Tokens, not hexes

Colours live in `@theme` in `globals.css`. The only hard-coded hexes outside that file are
the finish swatches and the style-guide swatch table, both of which are data.

### 6. Logical properties

`ms-` `me-` `ps-` `pe-` `start-` `end-` `text-start` `border-s`. Never `ml-` / `left-` for
layout. RTL is not a variant to remember; it is the default way to write the CSS.

### 7. Accessible names

Every field gets a real `<label>` through `Field`. Every icon-only control gets an
`aria-label`. Focus is never removed.

---

## Where things go

| Adding…                       | Goes in…                                        |
| ----------------------------- | ------------------------------------------------ |
| A page                        | `src/app/[lang]/<route>/page.tsx`                |
| A route helper                | `src/lib/routes.ts`                              |
| UI chrome copy                | `src/lib/i18n/dictionary.ts` (both languages)    |
| Product / editorial copy      | The matching file in `src/lib/mock/`             |
| A visual primitive            | `src/components/ui/`                             |
| Commerce UI                   | `src/components/commerce/`                       |
| A domain type                 | `src/lib/types.ts`                               |
| Money maths                   | `src/lib/format.ts` — nowhere else               |
| A design token                | `@theme` in `src/app/globals.css`                |

---

## Naming

- **Files:** `PascalCase.tsx` for components, `kebab-case.ts` for everything else.
- **Slugs:** kebab-case, and permanent — they are URLs.
- **CSS classes:** `t-` prefix for brand classes (`t-btn`, `t-shell`, `t-shot`).
- **Facet values:** kebab-case, and they must exist in `taxonomy.ts` or they silently never
  match.

---

## Comments

Comment the **why**, not the what. The codebase has a handful of decisions that will look
wrong without their reason — the deterministic number formatting, the `hydrated` flag, the
`scope`-not-list PLP prop, `proxy.ts` instead of `middleware.ts`. Each of those carries a
short note. Match that density; do not narrate the obvious.

---

## Adding a page — the checklist

1. Route helper in `src/lib/routes.ts`.
2. `page.tsx` with `generateMetadata`, and `generateStaticParams` if the segment is dynamic
   with a known set.
3. Wrap in `<PageShell>` unless the page owns its chrome (checkout, search).
4. Add the link somewhere reachable — `PRIMARY_NAV`, a mega menu, or `FOOTER_COLUMNS` in
   `src/lib/mock/navigation.ts`.
5. Add the row to [docs/ROUTES.md](docs/ROUTES.md).
6. `npm run check`, then walk it in both languages.

---

## Adding a product — the checklist

1. Seed in `SEEDS` in `src/lib/mock/products.ts`.
2. Facet values that already exist in `taxonomy.ts`.
3. Add it to a collection or room if it belongs to one.
4. Point two or three other products' `relatedSlugs` at it.
5. `npm run check`.

---

## Commits

Short imperative subject, and say what changed rather than which files moved:

```
Add Quick View modal to the product card
Fix RTL mirroring on the checkout step bar
Move account section slugs out of the client module
```
