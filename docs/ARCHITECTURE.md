# Architecture

How the frontend is put together, and the rules that keep it that way.

---

## 1. Rendering strategy

Everything is a **server component by default**. A file gets `"use client"` only when it
needs one of: local state, hover, an event handler, `localStorage`, or the store.

| Renders on the server                              | Renders on the client                                  |
| -------------------------------------------------- | ------------------------------------------------------ |
| Every `page.tsx` and `layout.tsx`                   | `Header`, `Footer`, `ProductCard`, `ProductGrid`        |
| `ListingPage`, `DocumentPage`, `PageShell`          | `ProductListing`, `ProductDetail`, `CartView`           |
| All copy resolution from `getDictionary(locale)`    | `CheckoutView`, `SearchView`, `TrackOrderView`          |
| All catalogue reads (`getProduct`, `listProducts`)  | Every form, `ShotSlot`, `Money`, `Toast`, `CookieBanner` |

Server pages read data and hand plain, serialisable objects to client components. A server
component never passes a function across the boundary — that is why, for example, the PLP
passes a `scope` object rather than a pre-filtered list plus a filter callback.

### Prerendering

`generateStaticParams` is exported from every dynamic route that has a known, finite set of
values: products, collections, rooms, journal posts, support articles, legal documents,
categories and account sections. `npm run build` prerenders all of them in both languages.

Two routes stay dynamic on purpose:

- `/[lang]/lighting` and `/[lang]/furniture` (and their category children) read
  `searchParams.open` so the mega menu can deep-link an open filter group.
- `/[lang]/search` reads `searchParams.q`.

---

## 2. Locale routing

There is no `src/app/layout.tsx`. `src/app/[lang]/layout.tsx` **is** the root layout — it
renders `<html lang dir>` and `<body>`, which is what makes real RTL possible without a
client-side flash.

`src/proxy.ts` redirects anything that arrives without a locale prefix:

```
/                  → /en          (or /ar if Accept-Language asks for Arabic)
/products/foo      → /en/products/foo
/_next/...         → untouched
```

The matcher excludes `_next`, `api`, `favicon.ico` and anything with a file extension.

> The file is named `proxy.ts` because Next 16 deprecated the `middleware` convention. It
> exports a default function; the `config.matcher` shape is unchanged.

Language switching preserves the route: `switchLocalePath("/en/products/x", "ar")` returns
`/ar/products/x`. The header uses it for both language links.

---

## 3. Data flow

```
src/lib/mock/*.ts        the data, as plain typed arrays
        │
        ├── query functions in src/lib/mock/index.ts
        │     getProduct · listProducts · searchProducts · relatedProducts · alsoLike
        │
        ├── server pages call them directly at render time
        └── client components import the same functions (they are pure)
```

Both sides can call the query functions because they are synchronous and side-effect free.
When the backend lands, the server side becomes `await fetch(...)` and the client side
becomes a request — the *signatures* stay the same. That is the whole point of routing
every read through `src/lib/mock/index.ts` rather than importing the arrays directly.

See [BACKEND-INTEGRATION.md](BACKEND-INTEGRATION.md).

---

## 4. Client state

One context, in `src/lib/store/store.tsx`, mounted once in the locale layout:

| Slice                              | Persisted | Notes                                              |
| ---------------------------------- | --------- | -------------------------------------------------- |
| `currency`                         | yes       | Presentation only; prices stay EGP internally      |
| `bag` (lines with variant and qty)  | yes       | Seeded from `STARTING_CART` so the cart is never empty on a cold visit |
| `wishlist` (slugs)                 | yes       | Drives the card diamond and the account wishlist   |
| `giftWrap`, `installation`, `promo` | yes       | Feed `computeTotals`                               |
| `recentlyViewed`, `recentSearches` | yes       | Capped at 8 and 6 entries                          |
| `toast`                            | no        | Auto-dismisses after 2.6s                          |

**Hydration rule.** The provider renders its defaults on the server *and* on the first
client render, then reads `localStorage` in an effect and flips `hydrated` to `true`.
Components that would otherwise mismatch (bag count, wishlist state, cart contents) read
`hydrated` and show the default until it is set. Every storage access is wrapped in
`try/catch` so private mode and blocked storage degrade to a working, non-persisting
session rather than a crash.

---

## 5. Styling

Design tokens are CSS custom properties declared in `@theme` in
`src/app/globals.css`, which makes them available both as `var(--color-brass)` and as
Tailwind utilities (`bg-brass`, `text-brass`, `border-brass/50`).

Three layers, in order of preference:

1. **Component classes** (`.t-btn`, `.t-input`, `.t-shell`, `.t-shot`, `.t-prose`) for
   anything that repeats and carries brand meaning.
2. **Tailwind utilities** for layout, spacing and one-off sizing.
3. **Inline `style`** only for values that come from data — a swatch hex, a hotspot
   percentage, an opacity driven by hover state.

Logical properties are used throughout (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`,
`text-start`, `text-end`) so RTL needs no mirrored stylesheet. See
[I18N-RTL.md](I18N-RTL.md).

---

## 6. Where things belong

| If you are adding…                              | Put it in…                                  |
| ------------------------------------------------ | ------------------------------------------- |
| A new page                                       | `src/app/[lang]/<route>/page.tsx`           |
| An internal link target                          | `src/lib/routes.ts` first, then use it      |
| UI chrome copy                                   | `src/lib/i18n/dictionary.ts` (both languages) |
| Product, editorial or studio copy                | The matching file in `src/lib/mock/`        |
| A reusable visual primitive                      | `src/components/ui/`                        |
| Anything commerce-shaped                         | `src/components/commerce/`                  |
| A domain type                                    | `src/lib/types.ts`                          |
| Money maths                                      | `src/lib/format.ts` — nowhere else          |

---

## 7. Known constraints

- **`listProducts` runs in the browser over the full catalogue.** At 31 products that is
  free. Past a few hundred, move filtering to the server and paginate.
- **Search is a substring scorer**, not an index. It is honest about that: it exists so the
  search page has something real to render.
- **`ShotSlot` renders a labelled placeholder.** It already accepts `src`; wiring
  `next/image` is one component change, not a page-by-page rewrite.
- **Forms do not submit anywhere.** Each one sets a local `sent` flag and shows the
  confirmation copy, so the success state is designed and reviewable.
