# Bilingual and RTL

Arabic is not a translation layer bolted on top of English here — it is the second half of
every string, and the layout mirrors properly because it was built with logical properties
from the start.

---

## 1. How a locale reaches a component

**Server components** get it from the route:

```tsx
const { lang } = await params;
const locale = coerceLocale(lang);      // "en" | "ar", never throws
const d = getDictionary(locale);        // UI chrome
<h1>{product.title[locale]}</h1>        // content
```

**Client components** get it from context:

```tsx
const { locale, d, t, isRtl } = useLocale();
<h1>{t(product.title)}</h1>
```

`LocaleProvider` sits in the locale layout, above the store, so everything below it can
read the language without prop drilling.

---

## 2. Where copy lives

| Kind                                            | Home                              |
| ----------------------------------------------- | --------------------------------- |
| Navigation, buttons, labels, empty states, errors | `src/lib/i18n/dictionary.ts`      |
| Product names, summaries, specs, accordions      | `src/lib/mock/products.ts`        |
| Category, collection, room, journal copy         | The matching file in `src/lib/mock/` |
| Support and legal prose                          | `src/lib/mock/support.ts`         |

The English dictionary object is the source of truth for the **shape**:
`type Dictionary = typeof en`, and `const ar: Dictionary = { … }`. A missing Arabic key is
a compile error, not a blank on the page.

For strings with a value in them, use `fill`:

```ts
fill(d.checkout.pay, { amount: "EGP 282,948" })   // "Pay EGP 282,948"
```

---

## 3. Document direction

`src/app/[lang]/layout.tsx` sets both attributes on the root element:

```html
<html lang="ar" dir="rtl">
```

Everything else follows from that. There is no mirrored stylesheet and no direction flag in
JavaScript driving layout.

---

## 4. What mirrors, and what does not

### Mirrors automatically (logical CSS)

Navigation order · drawer entry edge · filter sidebar side · PDP gallery and panel order ·
checkout summary side · text alignment · padding and margin.

The utilities that make this free: `ms-` `me-` `ps-` `pe-` `start-` `end-` `text-start`
`text-end` `border-s` `border-e`, plus `margin-inline` / `padding-inline` / `inset-inline`
in the component classes.

### Mirrors deliberately

Chevrons, back arrows, carousel arrows and the account `›` — anything directional gets
`.t-mirror`, which applies `transform: scaleX(-1)` only under `[dir="rtl"]`.

### Never mirrors

Product photography · the seven-star brand mark (`StarMark`) · the play icon · numerals
inside technical specifications.

---

## 5. Typography adjustments

| | Latin | Arabic |
| --- | --- | --- |
| Display face | Cormorant Garamond 300 | Reem Kufi 400 |
| Body face | Manrope | IBM Plex Sans Arabic |
| Body size | 14.5px | 15px (+0.5) |
| Body line-height | 1.9 | 2.0 (+0.1) |
| Button labels | uppercase, 0.18em tracking | sentence case, no tracking |
| Display letter-spacing | −0.015em | 0 |

Arabic does not have uppercase, and tracking damages Arabic letterforms — so
`html[lang="ar"] .t-btn` and `.t-link` drop `text-transform` and `letter-spacing` entirely.
That rule lives in `globals.css`, not in individual components.

**Production note:** the design specifies 29LT Bukra for Arabic UI and a custom ثريا
wordmark for Arabic display. IBM Plex Sans Arabic and Reem Kufi stand in here because they
are freely available.

---

## 6. Numerals and currency

`src/lib/format.ts` owns all of it.

```
formatMoney(184000, "EGP", "en")  →  "EGP 184,000"
formatMoney(184000, "EGP", "ar")  →  "١٨٤٬٠٠٠ ج.م"
formatMoney(184000, "USD", "en")  →  "USD 3,794"
```

- Arabic uses **Arabic-Indic digits** and the Arabic thousands separator `٬` (U+066C), and
  puts the currency after the number.
- Technical specifications stay in Western numerals for clarity — that is what
  `formatSpecNumber` is for.
- `formatDecimal` handles ratings, swapping the decimal point for `٫` (U+066B) in Arabic.

**Why not `Intl.NumberFormat`?** Server and client must produce byte-identical strings or
React logs a hydration mismatch, and ICU output has drifted between Node versions. The
grouping here is deterministic and tested by construction.

Currency is a **presentation** choice. Every price in the catalogue is an EGP integer;
`RATES` converts at render. Nothing else in the app divides by a rate.

---

## 7. Switching language

The header renders both languages as links, not a toggle, so they are crawlable and
middle-clickable. `switchLocalePath(pathname, next)` swaps only the first segment, which
preserves the route:

```
/en/products/thurayya-seven-chandelier  →  /ar/products/thurayya-seven-chandelier
```

Scroll position is preserved by Next's client navigation. The choice is not yet persisted
per user — see [ROADMAP.md](ROADMAP.md).

---

## 8. Adding a string

1. Add the English key to `en` in `dictionary.ts`.
2. TypeScript will now fail on `ar` until you add the Arabic. Add it.
3. Use `d.section.key` in the component — never inline a bare English string.
4. If the string carries a value, use `{placeholder}` syntax and `fill`.

Two places legitimately branch on `isRtl` instead of using the dictionary: the cookie
banner and the style guide, both of which show sample copy that only exists to demonstrate
a component. Everything customer-facing goes through the dictionary.
