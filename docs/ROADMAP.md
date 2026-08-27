# Roadmap

Where this goes next, in the order it should happen. The frontend is complete as a
frontend; almost everything below is about making it real.

---

## Now — finish the frontend

Small, contained, and worth doing before a backend lands.

- [ ] **Persist the language choice per user**, not per session. The handoff asks for it;
      today the choice lives in the URL only.
- [ ] **Quick View modal** from the product card. The design specifies it; the card
      currently offers Add to Bag instead.
- [ ] **PDP image zoom** — the Zoom button is present and inert.
- [ ] **Newsletter modal** — listed in the design's component variants, not built.
- [ ] **Low-stock card state** — the fifth card variant in the design.
- [ ] **Sitemap and `robots.txt`**, both locales, with `hreflang` alternates.
- [ ] **Structured data**: `Product`, `BreadcrumbList`, `Organization`.
- [ ] **Automated axe pass** on every route in both locales.

## Next — make it real

In dependency order. See [BACKEND-INTEGRATION.md](BACKEND-INTEGRATION.md) for the detail.

1. **Catalogue API.** Replace the query functions in `src/lib/mock/index.ts`. Move filtering
   and paging server-side at the same time.
2. **Server cart.** Re-price the bag on the server; promo validation and stock checks with
   it. The client store becomes an optimistic cache.
3. **Auth.** Gate `/account/**` and `/checkout`. Merge the local wishlist on sign-in rather
   than discarding it.
4. **Payment.** Hosted fields or redirect — never a hand-rolled card form. Card, Valu, bank
   transfer, Apple Pay, cash on delivery.
5. **Forms.** Server actions with validation, spam protection and rate limiting. Real
   consultation availability instead of the hard-coded week.
6. **Photography.** Replace the Unsplash stock in `src/lib/images.ts` with the commissioned
   shoot, and rewrite every `label` as a real alt description — the labels are production
   briefs today, which screen readers currently read out. Launch blocker.
7. **CMS for the journal.** The five-block body vocabulary was kept small for exactly this.

## Later — operate it

- [ ] Search that scales — a real index rather than a substring scorer.
- [ ] Live currency rates, cached, with EGP remaining the charged amount.
- [ ] Analytics behind the existing consent gate.
- [ ] Error monitoring.
- [ ] Playwright end-to-end on the two journeys that matter, in both languages.
- [ ] Visual regression on `/style-guide`.
- [ ] Order tracking wired to the real fulfilment pipeline — the timeline UI already exists.
- [ ] Trade pricing tiers applied at render for approved accounts.
- [ ] Downloadable specification files (DWG, IES, PDF) — the buttons are already designed.

---

## Deliberately not planned

Recording these so they are not rediscovered as gaps:

- **A component library dependency.** The kit is small and specific; a general-purpose
  library would fight the art direction more than it would help.
- **A state management library.** One context covers the bag, wishlist and currency. If a
  second context ever seems necessary, reach for the server instead.
- **Dark mode.** The site is already half dark by design. A global inversion would break
  the 55/30/10/5 colour balance the art direction depends on.
- **Discount and sale mechanics beyond promo codes.** The brand's copy rules exclude
  discount language; availability is the only stock message.

---

## Known limits in the current build

| Limit                                            | Where                                    | When it matters          |
| ------------------------------------------------ | ---------------------------------------- | ------------------------ |
| Filtering runs in the browser over all products  | `ProductListing` → `listProducts`        | A few hundred products   |
| Search is a substring scorer                     | `searchProducts`                         | As soon as it is used    |
| Prices captured at add-time                      | `store.addToBag`                         | Any price change         |
| Promo codes readable in the client bundle        | `PROMO_CODES`                            | Before launch            |
| Consultation availability is hard-coded          | `CONSULTATION_DAYS` / `_TIMES`           | Before launch            |
| Forms submit nowhere                             | `src/components/forms/`                  | Before launch            |
| Fonts load from Google via `<link>`              | `app/[lang]/layout.tsx`                  | Performance budget       |
| Images are Unsplash stock, not the real pieces   | `src/lib/images.ts`                      | Before launch            |
| Alt text is still the photography brief          | every `ShotSlot` `label`                 | Before launch            |
