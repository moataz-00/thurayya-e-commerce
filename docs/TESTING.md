# Testing

There is no automated test suite yet — see [ROADMAP.md](ROADMAP.md). Until there is, this
is the pass to run before calling a change done.

---

## Always

```bash
npm run check
```

Typecheck plus a full production build. The build prerenders every static route, so a
broken page usually fails here rather than in the browser.

---

## Manual pass

Run each of these in **both** `/en` and `/ar`. The Arabic pass is not optional — most
layout regressions show up there first.

### Home

- [ ] Hero header sits transparently over the image; the utility bar is still legible.
- [ ] All eleven sections render in order and the newsletter accepts an address.
- [ ] Category tiles, room tiles and journal cards all navigate.

### Listing (`/lighting`, `/lighting/chandeliers`, `/furniture`, `/new-arrivals`)

- [ ] Filter a group — the count updates, a chip appears, the skeleton flashes.
- [ ] Filter two values in one group → results widen (OR).
- [ ] Filter across two groups → results narrow (AND).
- [ ] Filter to nothing → the empty state appears with suggestions.
- [ ] Clear all restores the full list.
- [ ] Sort by each of the five orders.
- [ ] Load more advances the progress rule and stops at the total.
- [ ] Below 1024px the sidebar becomes a drawer; Apply and Clear both work.
- [ ] `?open=finish` from the mega menu opens that group on arrival.

### Product

- [ ] Thumbnails swap the main image; the active one carries a brass rule.
- [ ] Finish swatches update the named finish.
- [ ] Size selection updates **both** the headline price and the Add to Bag label.
- [ ] "Custom" shows "On request" and the button reflects it.
- [ ] Quantity multiplies the button total.
- [ ] Add to Bag raises the toast, increments the header count, and View bag navigates.
- [ ] Wishlist toggles and survives a reload.
- [ ] Accordions are single-open.
- [ ] Specification table, reviews, Q&A, Complete the Room and You May Also Like all render.

### Cart

- [ ] Quantity up and down; going below 1 removes the line.
- [ ] Remove and Save for later both work (the latter adds to the wishlist).
- [ ] Gift wrapping and installation change the totals.
- [ ] `ATELIER10` applies 10%; a nonsense code shows the error.
- [ ] Emptying the bag shows the empty state with cross-sell.
- [ ] Reload — the bag is still there.

### Checkout

- [ ] All four steps are reachable from the step bar.
- [ ] Blur the postal code empty → the error rule and message appear.
- [ ] Delivery method changes the summary total.
- [ ] Each payment method selects; only Card shows the card fields.
- [ ] Review lists the real selections.
- [ ] Place order clears the bag and lands on the confirmation with the timeline.

### Search

- [ ] Type "chand" → products, suggestions and journal results.
- [ ] Type nonsense → the no-results state with the Ask a Designer route out.
- [ ] Trending and recent chips populate the field.
- [ ] Close returns to the previous page.

### Account

- [ ] Every one of the nine sections renders from its own URL.
- [ ] The wishlist section reflects what you saved on a PDP.
- [ ] The sidebar marks the current section with `aria-current`.

### Services and editorial

- [ ] Consultation: pick a service, format, day and time; Confirm shows the confirmed
      state with the right date; unavailable days and times are not selectable.
- [ ] Custom, trade and contact forms each show their success message.
- [ ] Journal category filter narrows the list; an article renders every block type.
- [ ] Room hotspots sit over the hero and link to the right products.
- [ ] "Add all to bag" adds every piece in the look.
- [ ] `/track` with `TH-20418` resolves; anything else shows the not-found message.

### Chrome

- [ ] Mega menu opens on hover after ~120ms and closes on `Escape` and mouse-leave.
- [ ] Mobile drawer opens, locks scroll, closes on `Escape` and on backdrop click.
- [ ] Currency switch changes every price on the page at once.
- [ ] Language switch preserves the route.
- [ ] Cookie banner appears once and stays dismissed.

---

## Cross-cutting checks

| Check                | How                                                                       |
| -------------------- | ------------------------------------------------------------------------- |
| Keyboard only        | Tab the whole PDP and checkout. Focus must always be visible.              |
| Reduced motion       | Enable it at OS level — no cross-fades, no glow, no smooth scroll.         |
| Storage blocked      | Private window with site data blocked — the site must still work, unsaved. |
| Narrow viewport      | 320px wide. Nothing may scroll horizontally.                               |
| Hydration            | Console must be clean. A mismatch usually means a `hydrated` guard is missing. |

---

## When tests arrive

Suggested order, highest value first:

1. **Unit** — `formatMoney`, `computeTotals`, `listProducts` filter semantics,
   `switchLocalePath`. Pure functions, no setup, and they guard the money.
2. **Component** — `ProductCard` states, `Accordion` single-open, `QuantityStepper` floor,
   the field error state.
3. **End-to-end** (Playwright) — the two journeys that matter: browse → filter → PDP →
   add to bag → checkout → confirmation, and the same in Arabic.
4. **Visual regression** on `/style-guide`, which is exactly what it is for.
