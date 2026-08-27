# Component catalogue

Twenty-six components, grouped by what they are for. `C` marks a client component.

---

## `src/components/ui/` — primitives

| Component        | C | Props worth knowing                                   | Notes                                                              |
| ---------------- | - | ----------------------------------------------------- | ------------------------------------------------------------------ |
| `ShotSlot`       | ● | `label` `tone` `dark` `src` `showLabel`                | Photography placeholder. Pass `src` and it renders the image instead — the one change needed when real photography arrives. |
| `Money`          | ● | `amount` (EGP)                                         | The only place a price becomes text. `useMoney()` returns the same as a string. |
| `Accordion`      | ● | `items` `defaultOpen` `multi` `dark`                   | Single-open by default; `multi` for filter groups.                 |
| `Toast`          | ● | —                                                      | Mounted once in the locale layout, raised via `showToast`.         |
| `CookieBanner`   | ● | —                                                      | Analytics stay off until accepted; decline is equal weight.        |
| `primitives.tsx` | ● | `Eyebrow` `MonoLabel` `SectionHead` `StatusPill` `Rating` `Diamond` `Breadcrumbs` `Wordmark` `StarMark` `TextLink` `L` | Small shared pieces. `StarMark` is never mirrored in RTL. |
| `form.tsx`       | ● | `Field` `TextField` `TextAreaField` `SelectField` `CheckRow` `RadioRow` `QuantityStepper` `InlineSubmit` | Every field the site uses. Labels are always wired with a real `id`. |

---

## `src/components/layout/`

| Component      | C | Notes                                                                                     |
| -------------- | - | ----------------------------------------------------------------------------------------- |
| `Header`       | ● | Utility bar (delivery, region, language, currency, search, account, wishlist, bag) plus the main bar, mega menu and mobile drawer. `variant`: `light` \| `dark` \| `over`. |
| `Footer`       | ● | Four link columns from `FOOTER_COLUMNS`, newsletter, legal row.                             |
| `PageShell`    |   | Header + children + footer. The default frame for every page except checkout and search.    |
| `DocumentPage` |   | One-column long-form frame shared by `/support/[slug]` and `/legal/[slug]`.                 |
| `SkipLink`     | ● | First in the tab order, visible on focus, targets `#main`.                                   |

**`variant="over"` is special:** the page renders `<Header variant="over" />` itself, inside
its dark hero, so the header sits transparently over the image. Those pages do not wrap in
`PageShell` — they compose `Header` and `Footer` directly (home, collection detail, custom,
about).

---

## `src/components/commerce/`

| Component        | C | Notes                                                                                  |
| ---------------- | - | -------------------------------------------------------------------------------------- |
| `ProductCard`    | ● | Hover cross-fade, wishlist diamond, Add to Bag on hover, status pill.                   |
| `ProductGrid`    | ● | `columns` 2 \| 3 \| 4 and the responsive ladder. `ProductGridSkeleton` matches its shape. |
| `ProductListing` | ● | The whole interactive PLP: facets, chips, sort, load-more, drawer, empty and loading states. Takes a `scope`, not a pre-filtered list. |
| `ListingPage`    |   | Server frame around `ProductListing`: dark banner, breadcrumb, lead-time rail.           |
| `ProductDetail`  | ● | Gallery, finish and size selection, quantity, delivery panel, add to bag, highlights, accordions, spec table, reviews, Q&A, related. |
| `CartView`       | ● | Lines, extras, promo, summary, cross-sell, empty state.                                  |
| `CheckoutView`   | ● | Four steps with its own chrome; `Place order` clears the bag and routes to confirmation. |
| `SearchView`     | ● | Full-viewport dark overlay: suggestions, recent, trending, categories, product and journal results, no-results state. |
| `TrackOrderView` | ● | Reference lookup against `ORDERS`, with the production timeline.                          |
| `AddRoomToBag`   | ● | "Add all to bag" for a room's shop-the-look.                                              |

---

## `src/components/forms/`

| Component               | C | Notes                                                                       |
| ----------------------- | - | --------------------------------------------------------------------------- |
| `ConsultationBooking`   | ● | Service, format, day, time, project fields, live summary aside, confirmed state. |
| `CustomProjectForm`     | ● | Project enquiry with file-drop affordance.                                   |
| `TradeApplicationForm`  | ● | Trade account application.                                                   |
| `ContactForm`           | ● | Studio contact.                                                              |
| `TrackOrderForm`        | ● | Reference input; the lookup itself lives in `TrackOrderView`.                 |

Every form is client-side only. On submit it prevents the default, sets a local `sent`
flag and renders the confirmation copy, so the success state is designed rather than
imagined. See [BACKEND-INTEGRATION.md](BACKEND-INTEGRATION.md) for where the POST goes.

---

## `src/components/account/`

`AccountView` (●) renders the sidebar plus whichever sections the current `section` calls
for. The dashboard deliberately stacks several sections (summary cards, orders, wishlist,
addresses) so it reads as a dashboard rather than an empty shell. Section slugs live in
`src/lib/account-sections.ts` — **not** in the client component, because
`generateStaticParams` on the server needs the real array.

---

## `src/components/style-guide/`

`StyleGuideControls` (●) is the interactive half of `/style-guide`: buttons, fields,
controls, chips, skeleton and feedback surfaces, all rendered from the production classes.
The static half (colour, type, pairing rules, cards) lives in the page itself.

---

## Conventions

- **Props are data, never callbacks, across the server → client boundary.**
- **Locale comes from `useLocale()` in client components** and from `coerceLocale(params.lang)`
  plus `getDictionary(locale)` in server components. Never thread it through props by hand.
- **`t(value)`** picks the current language out of a `Localized` object.
- **Every interactive element gets an accessible name** — `aria-label` when the visible
  content is a glyph, a real `<label>` when it is a field.
