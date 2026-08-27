# Content model

Every shape the storefront renders, defined once in `src/lib/types.ts`. The mock layer is
the only thing filling them today; an API has to return the same shapes.

---

## Building blocks

```ts
type Locale    = "en" | "ar";
type Localized = Record<Locale, string>;   // { en: "...", ar: "..." }
type Currency  = "EGP" | "AED" | "SAR" | "USD";
type Availability =
  | "ready-to-ship" | "made-to-order" | "pre-order" | "limited-edition";
```

**`Localized` is the backbone.** Anything a customer reads that exists in both languages is
one of these. `t(value)` in client components, or `value[locale]` in server components,
picks the right side. There is no runtime fallback chain beyond `?? value.en` — a missing
Arabic string should be caught by the type system, not papered over.

---

## `Product`

The largest type, and the one an API most needs to match.

### Identity

| Field        | Type            | Notes                                              |
| ------------ | --------------- | -------------------------------------------------- |
| `id`         | `string`        | Stable internal id                                 |
| `slug`       | `string`        | The URL segment — `/products/<slug>`               |
| `title`      | `Localized`     | Full name                                          |
| `shortTitle` | `Localized`     | Cards, cart lines, breadcrumb tail, mobile         |
| `family`     | `"lighting" \| "furniture"` | Drives which listing tree it appears under |
| `category`   | `string`        | Category slug                                      |
| `collection` | `string?`       | Collection slug, if it belongs to one              |

### Commerce

| Field          | Type           | Notes                                                        |
| -------------- | -------------- | ------------------------------------------------------------ |
| `price`        | `number`       | **Always EGP.** Conversion happens only in `formatMoney`.    |
| `availability` | `Availability` | Also used as a filter facet                                  |
| `leadTime`     | `Localized`    | Prose, e.g. "Made to order · 6–8 weeks"                      |
| `rating`       | `number`       | 0–5, one decimal                                             |
| `reviewCount`  | `number`       |                                                              |

### Facets

`rooms`, `materials`, `finishes`, `colours`, `technical` are `string[]` of slugs that must
exist in `src/lib/mock/taxonomy.ts`. `diameterCm`, `dropCm` and `lights` are optional
numbers that the band filters (diameter, drop, number of lights) match against.

A product with no `diameterCm` will never match a diameter band — that is intentional, not
a bug: furniture should not appear under a chandelier diameter filter.

### Detail

| Field           | Type              | Notes                                                             |
| --------------- | ----------------- | ----------------------------------------------------------------- |
| `summary`       | `Localized`       | One or two sentences; also the meta description                   |
| `highlights`    | `Localized[]`     | Four short trust points beside the buy button                     |
| `shots`         | `Shot[]`          | Six slots: hero, detail, lit, video, lifestyle, scale             |
| `finishOptions` | `FinishOption[]`  | `{ id, name, hex }` — the swatch row                              |
| `sizeOptions`   | `SizeOption[]`    | `{ id, label, sub, price }`; `price: null` means "On request"     |
| `specs`         | `SpecRow[]`       | `{ k, v }` pairs for the specification table                      |
| `sections`      | `Section[]`       | The PDP accordions                                                |
| `reviews`       | `Review[]`        |                                                                   |
| `questions`     | `Question[]`      |                                                                   |
| `relatedSlugs`  | `string[]`        | "Complete the Room"; `alsoLike()` is scored, not authored         |

`Shot` carries `label` (the brief), `kind`, an optional placeholder `tone` 1–4 and an
optional `src` for when the real photograph exists.

---

## Taxonomy

### `Category`

`slug`, `family`, `name` / `plural` (`Localized`), `intro` (banner copy), `bannerShot`,
`tileShot`, `note` (e.g. "24 pieces"). Fourteen of them.

### `FilterGroup`

`{ id, title, items: { value, label }[] }`. Eleven groups: category, price, room, finish,
material, colour, diameter, drop, number of lights, technical, availability.

**Filter semantics:** values are OR-ed *within* a group and AND-ed *across* groups. That
logic lives in `listProducts` and `groupOf` in `src/lib/mock/index.ts`.

---

## Editorial

### `Collection`

`slug`, `name`, `kicker`, `lede`, `concept` (the long paragraph), `facts` (three
label/title/body triples), `heroShot`, `campaignShots` (three), `accent` (`onyx` |
`emerald`), `productSlugs`.

### `Room`

`slug`, `name`, `lede`, `heroShot`, `tileShot`, `tips` (three), `productSlugs`, and
`hotspots` — `{ x, y, slug }` percentages positioned over the hero image.

### `JournalPost`

`slug`, `category` / `categorySlug`, `title`, `excerpt`, `readingTime`, `date` +
`isoDate`, `heroShot`, `author`, `standfirst`, `productSlugs`, `featured`, and `body`:

```ts
body: { type: "p" | "h2" | "quote" | "shot" | "list"; value: Localized | Localized[] }[]
```

`list` carries `Localized[]`; every other type carries a single `Localized`. This is a
deliberately small block vocabulary — if a CMS lands later, these five map cleanly onto
rich-text nodes.

---

## Commerce state

### `CartLine`

`{ key, slug, qty, variant, unitPrice }`. `key` is `slug::variant.en`, so the same piece in
two finishes is two lines. `unitPrice` is captured **at the time it was added** so a later
catalogue price change does not silently rewrite someone's bag.

### `Order`

`reference` (e.g. `TH-20418`), `placedOn`, `status` + `statusLabel`, `total`, `lines`,
`timeline` (`{ label, date, done }`) and `action`. The timeline is what `/track` and the
confirmation page render.

### `Address`, `Appointment`

Straightforward records; see `src/lib/types.ts`.

---

## Studio and support

`Showroom`, `Craft`, `PressQuote`, `Faq`, and `SupportArticle`
(`{ slug, title, lede, sections: { heading, body: Localized[] }[], faqs? }`), which is
shared by both `/support/[slug]` and `/legal/[slug]`.

---

## Rules for adding data

1. **Add the type first**, in `src/lib/types.ts`.
2. **Both languages, always.** A `Localized` with an empty `ar` is worse than an obviously
   untranslated one — write the Arabic.
3. **Prices are EGP integers.** No decimals, no currency in the number.
4. **Facet values must exist in `taxonomy.ts`.** A typo'd facet silently never matches.
5. **Slugs are kebab-case and permanent.** They are URLs.
6. Expose new data through a function in `src/lib/mock/index.ts` rather than importing the
   array directly from a page.
