# Mock data

Everything the storefront renders comes from `src/lib/mock/`. It is typed against
`src/lib/types.ts`, written in both languages, and internally consistent — a seven-light
fixture reports 7 × 5W, and a 96 cm fixture offers a 96 cm size.

---

## The files

| File            | Holds                                                                                | Size |
| --------------- | ------------------------------------------------------------------------------------ | ---- |
| `taxonomy.ts`   | Categories, facet vocabularies, price/diameter/drop/light bands, the filter sidebar   | 14 categories, 11 filter groups |
| `products.ts`   | Product seeds **and** the builders that derive the rest                               | 31 products |
| `collections.ts`| Six collections with concept copy and campaign shot briefs                            | 6 |
| `rooms.ts`      | Eight rooms with tips, hotspots and shop-the-look lists                               | 8 |
| `journal.ts`    | Six articles with full bodies, plus the five categories                               | 6 |
| `studio.ts`     | Crafts, press, process, project shots, trade benefits, consultation options, values, timeline, team, showrooms | — |
| `account.ts`    | The signed-in customer, three orders, addresses, appointments, boards, the starting bag, promo codes | — |
| `support.ts`    | Six support articles and three legal documents                                        | 9 |
| `navigation.ts` | Primary nav, four mega menus, four footer columns                                     | — |
| `index.ts`      | Re-exports everything **and** owns the query functions                                | — |

---

## How products are built

`products.ts` has two halves.

**The seed** holds only what is genuinely unique to a piece: name, category, price, finish
label, availability, facet tags, dimensions, light count, weight, lead time, two shot
labels and a summary.

**The builders** derive everything else from those numbers:

| Builder            | Produces                                                                         |
| ------------------ | -------------------------------------------------------------------------------- |
| `shotsFor`         | Six gallery slots with per-product briefs, worded differently for furniture       |
| `finishOptionsFor` | Swatches, resolved from `FINISHES` in `taxonomy.ts`                               |
| `sizeOptionsFor`   | Three stocked sizes plus Custom for lighting with a diameter; one size otherwise  |
| `specsFor`         | The specification table — wattage, bulb, IP, voltage, dimensions, weight, lead time |
| `sectionsFor`      | The PDP accordions, including the load-bearing figure in the installation section |
| `reviewsFor`       | Two reviews per product, dealt deterministically from a pool of six               |
| `questionsFor`     | Two or three Q&As, varied by whether the piece is IP-rated and whether it hangs   |
| `highlightsFor`    | Four trust points, varied by material                                             |

This is why the catalogue does not contradict itself: change `lights: 7` to `9` and the
wattage, the size ladder and the technical accordion all follow.

---

## Query functions — `src/lib/mock/index.ts`

Pages never import the arrays. They call these:

| Function                        | Returns                                                       |
| ------------------------------- | ------------------------------------------------------------- |
| `getProduct(slug)`              | One product or `undefined`                                    |
| `getProducts(slugs)`            | Products for a slug list, dropping misses                     |
| `listProducts(options)`         | Filtered and sorted — `family`, `category`, `collection`, `room`, `facets`, `sort` |
| `sortProducts(list, sort)`      | `featured` \| `newest` \| `priceAsc` \| `priceDesc` \| `rating` |
| `newArrivals(n)` `bestSellers(n)` | The home page rows                                           |
| `relatedProducts(slug, n)`      | Authored `relatedSlugs`, topped up from the same category     |
| `alsoLike(slug, n)`             | Scored by shared collection, materials, rooms and price band  |
| `searchProducts(q, locale)`     | Substring scorer across both languages                        |
| `searchSuggestions(q)`          | Category suggestions with counts                              |
| `getCategory` `getCollection` `getRoom` `getPost` `getOrder` `getSupportArticle` `getLegalDoc` | Single lookups |

**Filter semantics:** OR within a group, AND across groups.

---

## Editing the data

### Add a product

1. Append a seed to `SEEDS` in `products.ts`. The required fields are enforced by the
   `Seed` interface.
2. Use facet values that already exist in `taxonomy.ts` — a typo silently never matches.
3. Add its slug to a `Collection.productSlugs` or `Room.productSlugs` if it belongs there.
4. Point two or three other products' `relatedSlugs` at it so it is reachable from a PDP.
5. `npm run check`.

### Add a category

Append to `CATEGORIES` in `taxonomy.ts` with the right `family`. The route, the mega menu
column and the filter group entry all read from that array — but add the mega-menu link in
`navigation.ts` explicitly, because those are authored, not generated.

### Add a journal article

Append to `POSTS` in `journal.ts`. Body blocks are `p`, `h2`, `quote`, `shot` and `list`.
Set `featured: true` on at most one per category.

### Change the seeded bag

`STARTING_CART` in `account.ts`. It is there so `/cart` and `/checkout` are never empty on
a first visit. Clearing the bag in the UI is respected — the seed only applies before
anything is stored.

---

## Prototype affordances

| Thing                | Value                                                       |
| -------------------- | ----------------------------------------------------------- |
| Promo codes          | `ATELIER10` (10%), `TRADE15` (15%) — `PROMO_CODES`          |
| Order that tracks    | `TH-20418` — also `TH-19882`, `TH-19104`                     |
| Signed-in customer   | Layla Hassan / `layla@studio.eg` — `CUSTOMER`               |
| Currency rates       | `RATES` in `src/lib/format.ts`, indicative only              |
| VAT                  | 14%, `VAT_RATE` in `src/lib/format.ts`                       |
| Delivery             | EGP 3,500 white-glove / EGP 1,900 crated courier             |

None of these are secrets and none of them are real. Everything customer-facing that could
be mistaken for a live order carries the "prototype data" note from
`dictionary.common.mockNotice`.
