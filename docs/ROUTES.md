# Routes

Every route is prefixed with a locale: `/en/…` or `/ar/…`. Anything arriving without one is
redirected by `src/proxy.ts`.

Build hint: **●** prerendered from `generateStaticParams`, **ƒ** rendered on demand
(because it reads `searchParams`).

---

## Commerce

| Route                            | File                                          | Notes                                                              |
| -------------------------------- | --------------------------------------------- | ------------------------------------------------------------------ |
| `/[lang]` ●                      | `app/[lang]/page.tsx`                         | Home — hero, categories, story, new arrivals, collection band, rooms, craft, best sellers, consultation, trade + press, journal, newsletter |
| `/[lang]/lighting` ƒ             | `app/[lang]/lighting/page.tsx`                | All lighting                                                       |
| `/[lang]/lighting/[category]` ƒ  | `app/[lang]/lighting/[category]/page.tsx`     | 9 categories                                                       |
| `/[lang]/furniture` ƒ            | `app/[lang]/furniture/page.tsx`               | All furniture                                                      |
| `/[lang]/furniture/[category]` ƒ | `app/[lang]/furniture/[category]/page.tsx`    | 5 categories                                                       |
| `/[lang]/new-arrivals` ●         | `app/[lang]/new-arrivals/page.tsx`            | Whole catalogue, sorted newest first                               |
| `/[lang]/products/[slug]` ●      | `app/[lang]/products/[slug]/page.tsx`         | 31 products                                                        |
| `/[lang]/search` ƒ               | `app/[lang]/search/page.tsx`                  | Full-viewport dark overlay, no header or footer                    |
| `/[lang]/cart` ●                 | `app/[lang]/cart/page.tsx`                    | Bag, extras, promo, summary, cross-sell, empty state               |
| `/[lang]/checkout` ●             | `app/[lang]/checkout/page.tsx`                | Four steps, own chrome                                             |
| `/[lang]/checkout/confirmation` ●| `app/[lang]/checkout/confirmation/page.tsx`   | Order confirmed, production timeline                               |

### Lighting categories

`chandeliers` · `pendant-lights` · `ceiling-lights` · `wall-lights` · `floor-lamps` ·
`table-lamps` · `outdoor-lighting` · `smart-lighting` · `accessories`

### Furniture categories

`consoles-storage` · `tables` · `seating` · `mirrors` · `rugs-accessories`

---

## Editorial and brand

| Route                          | File                                      | Notes                                    |
| ------------------------------ | ----------------------------------------- | ---------------------------------------- |
| `/[lang]/collections` ●        | `app/[lang]/collections/page.tsx`          | Index of six collections                 |
| `/[lang]/collections/[slug]` ● | `app/[lang]/collections/[slug]/page.tsx`   | `celestial` `nocturne` `alabaster` `brass-atelier` `modern-heritage` `limited-editions` |
| `/[lang]/rooms` ●              | `app/[lang]/rooms/page.tsx`                | Index of eight rooms                     |
| `/[lang]/rooms/[slug]` ●       | `app/[lang]/rooms/[slug]/page.tsx`         | Hotspot hero, shop-the-look, design tips |
| `/[lang]/journal` ƒ            | `app/[lang]/journal/page.tsx`              | `?category=` filters the five categories |
| `/[lang]/journal/[slug]` ●     | `app/[lang]/journal/[slug]/page.tsx`       | Six articles with full bodies            |
| `/[lang]/about` ●              | `app/[lang]/about/page.tsx`                | Values, timeline, atelier, team, press   |
| `/[lang]/style-guide` ●        | `app/[lang]/style-guide/page.tsx`          | The living design system                 |

---

## Services

| Route                     | File                                | Notes                                              |
| ------------------------- | ----------------------------------- | -------------------------------------------------- |
| `/[lang]/custom` ●        | `app/[lang]/custom/page.tsx`        | Projects, five-step process, enquiry form, FAQ     |
| `/[lang]/trade` ●         | `app/[lang]/trade/page.tsx`         | Benefits, application form, downloads              |
| `/[lang]/consultation` ●  | `app/[lang]/consultation/page.tsx`  | Service, format, day, time, project, confirmation  |
| `/[lang]/showrooms` ●     | `app/[lang]/showrooms/page.tsx`     | Three showrooms plus the contact form              |

---

## Account

| Route                        | File                                     | Sections                                 |
| ---------------------------- | ---------------------------------------- | ---------------------------------------- |
| `/[lang]/account` ●          | `app/[lang]/account/page.tsx`             | Dashboard (orders + wishlist + addresses) |
| `/[lang]/account/[section]` ●| `app/[lang]/account/[section]/page.tsx`   | `dashboard` `orders` `wishlist` `rooms` `addresses` `consultations` `trade` `profile` `preferences` |
| `/[lang]/sign-in` ●          | `app/[lang]/sign-in/page.tsx`             | Sign in / create account                  |

The wishlist link in the header and footer points at `/[lang]/account/wishlist`.

---

## Support and legal

| Route                        | File                                    | Slugs                                                             |
| ---------------------------- | --------------------------------------- | ----------------------------------------------------------------- |
| `/[lang]/support` ●          | `app/[lang]/support/page.tsx`            | Index                                                             |
| `/[lang]/support/[slug]` ●   | `app/[lang]/support/[slug]/page.tsx`     | `delivery` `returns` `warranty` `installation` `care` `faqs`       |
| `/[lang]/legal/[slug]` ●     | `app/[lang]/legal/[slug]/page.tsx`       | `terms` `privacy` `accessibility`                                  |
| `/[lang]/track` ●            | `app/[lang]/track/page.tsx`              | Order lookup — try `TH-20418`                                      |

---

## Errors

| Route          | File                          | Notes                                                     |
| -------------- | ----------------------------- | --------------------------------------------------------- |
| Not found      | `app/[lang]/not-found.tsx`     | Reached via `notFound()` and by any unmatched prefixed URL |

---

## Adding a route

1. Add the href to `src/lib/routes.ts`.
2. Create `src/app/[lang]/<segment>/page.tsx`.
3. Export `generateMetadata` (title at minimum) and, if the segment is dynamic with a known
   set, `generateStaticParams`.
4. Wrap the body in `<PageShell>` unless the page owns its own chrome (checkout, search).
5. Add the link to `PRIMARY_NAV`, `MEGA_MENUS` or `FOOTER_COLUMNS` in
   `src/lib/mock/navigation.ts` so it is reachable.
6. Add the row to this table.
