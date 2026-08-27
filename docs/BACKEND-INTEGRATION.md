# Backend integration

This build is frontend-only on purpose. It was written so that adding a backend is a set of
contained replacements rather than a rewrite. This document is the list.

---

## The principle

Nothing in `src/app` or `src/components` imports a data array. Everything reads through the
query functions in `src/lib/mock/index.ts`. Replace those function bodies and the pages
keep working.

```
                  ┌──────────────────────────┐
pages/components →│ src/lib/mock/index.ts    │→ arrays today
                  │ getProduct, listProducts │→ fetch() tomorrow
                  └──────────────────────────┘
                              ↑
                     src/lib/types.ts
                  the contract both sides honour
```

---

## 1. Catalogue

**Replace:** the bodies of `getProduct`, `getProducts`, `listProducts`, `newArrivals`,
`bestSellers`, `relatedProducts`, `alsoLike`, `searchProducts`, `searchSuggestions`.

**The API must return `Product` as defined in `src/lib/types.ts`** — including `Localized`
fields, EGP integer prices and facet slugs that match `taxonomy.ts`.

Two things to decide when you do:

1. **Filtering moves server-side.** `ProductListing` currently filters in the browser
   because 31 products is free. Past a few hundred, turn `facets` and `sort` into query
   parameters, make the component read `searchParams`, and let the server do the work.
   The component already keeps all filter state in one place, so this is one file.
2. **These functions become async.** Server components can `await` them directly. The
   client PLP will need a fetch-on-change, which is where React Query or `useSWR` earns
   its place — there is deliberately no data-fetching library installed yet.

**Search** is a substring scorer. It exists so the search page has something real to
render. Replace it with a real index (Algolia, Meilisearch, Typesense) rather than porting
the scoring logic.

---

## 2. Cart and orders

Today the bag lives in `localStorage` via `src/lib/store/store.tsx`.

**What has to move server-side:**

| Concern              | Why it cannot stay on the client                                      |
| -------------------- | ---------------------------------------------------------------------- |
| Price                | `unitPrice` is captured at add-time from the catalogue. The server must re-price the whole bag before payment. |
| Stock                | Nothing checks availability today.                                     |
| Promo codes          | `PROMO_CODES` is a client-readable object. Move validation server-side. |
| Totals               | `computeTotals` is correct maths but client-run. The server figure is the one that counts. |
| VAT and delivery     | Hard-coded at 14% and EGP 3,500 / 1,900. These are business rules.      |

**Suggested shape:** keep the store as the optimistic local cache, add a server cart keyed
by a cookie, and reconcile on load. The `CartLine` type already carries everything a server
line needs (`slug`, `variant`, `qty`) — `unitPrice` becomes a display hint rather than the
truth.

**Checkout** (`CheckoutView`) currently calls `clearBag()` and routes to
`/checkout/confirmation`. That is the seam: replace it with a `createOrder` call, and pass
the real reference to the confirmation page rather than reading `ORDERS[0]`.

---

## 3. Payment

Nothing is integrated. The card fields in step 3 are inert and the page says so
(`checkout.demoNote`).

**Do not build a card form.** Use the provider's hosted fields or redirect flow — Paymob or
Stripe for cards, and the design already anticipates Valu instalments, bank transfer, Apple
Pay and cash on delivery in Egypt. 3-D Secure is promised in the copy; honour it.

---

## 4. Accounts

`CUSTOMER`, `ORDERS`, `ADDRESSES`, `APPOINTMENTS` and `BOARDS` in
`src/lib/mock/account.ts` are static. `/sign-in` links straight to `/account` without
authenticating anything.

Add real auth (NextAuth / Auth.js, or the platform's own), then:

- Gate `/account/**` and `/checkout` behind a session.
- Move `wishlist` out of `localStorage` for signed-in users, and merge the local list on
  sign-in rather than discarding it.
- Replace the account section fetches with per-user queries.

---

## 5. Forms

Five forms submit nowhere: consultation booking, custom project enquiry, trade
application, studio contact and the newsletter. Each sets a local `sent` flag.

**Where the POST goes:** each form's submit handler in `src/components/forms/`. They are
already the only place that knows about submission, so adding a server action per form is
localised. Add validation (Zod), a honeypot or captcha, and rate limiting — public forms
that email a studio are an obvious spam target.

The consultation booking also needs real availability: `CONSULTATION_DAYS` and
`CONSULTATION_TIMES` are hard-coded, including which slots are unavailable.

---

## 6. Content

Product, editorial and support copy is authored in TypeScript. That is fine for a
prototype and wrong for a studio that publishes a journal.

The `JournalPost.body` block vocabulary (`p`, `h2`, `quote`, `shot`, `list`) was kept
deliberately small so it maps cleanly onto a CMS rich-text field. Whatever you pick has to
be genuinely bilingual — per-field locale variants, not two disconnected trees.

---

## 7. Images

See [IMAGE-BRIEF.md](IMAGE-BRIEF.md). Short version: set `src` on the `Shot` records, swap
the `<img>` in `ShotSlot` for `next/image`, add the host to `images.remotePatterns`, and
rewrite the shot briefs as real alt text.

---

## 8. Currency and rates

`RATES` in `src/lib/format.ts` is indicative. Fetch live rates, cache them, and keep the
rule that **prices are stored in EGP and converted only for display** — the amount charged
must be the EGP amount, which is what the terms page already says.

---

## 9. Things this build does not have and will need

- Analytics (the cookie banner already gates consent — respect it)
- Error monitoring
- A sitemap and `robots.txt`
- Structured data (`Product`, `BreadcrumbList`, `Organization`)
- Rate limiting on anything public
- Tests — see [TESTING.md](TESTING.md)

---

## Order of work

1. Catalogue reads → real API. Nothing else can be trusted until prices are.
2. Server cart and re-pricing.
3. Auth, then gate account and checkout.
4. Payment.
5. Forms with validation and rate limiting.
6. Images.
7. CMS for the journal.
