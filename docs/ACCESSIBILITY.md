# Accessibility

The target is **WCAG 2.2 AA**. Anything below it is treated as a defect, not a backlog
item. This document records what the build already does and what still needs an audit.

---

## Colour and contrast

| Pair                          | Ratio  | Verdict            |
| ----------------------------- | ------ | ------------------ |
| Onyx `#161819` on Ivory `#F2EEE5` | 14.8:1 | AAA                |
| Body `#4E4A45` on Ivory       | 8.0:1  | AAA                |
| Muted `#8A8073` on Ivory      | 3.8:1  | **12px and above only** — labels and secondary text, never long copy |
| Ivory on Onyx                 | 14.8:1 | AAA                |
| Brass `#A9844F` on Onyx       | 5.5:1  | AA                 |
| Brass on Ivory                | 2.7:1  | **Never body text.** Accents, rules, icons and small badges only |
| Danger `#9C3A2C` on Ivory     | 7.1:1  | AAA                |

**Status is never carried by colour alone.** Every availability pill contains its own text
("Ready to ship", "Made to order", …). Field errors render a rule colour *and* a message.

---

## Keyboard

- Every interactive element is reachable. Nothing relies on hover to become usable — the
  card's Add to Bag button is `tabIndex={-1}` while hidden and the whole image remains a
  focusable link to the product.
- **Focus is a 2px brass outline at 3px offset and is never removed.** It is declared once
  on `:focus-visible` in `globals.css`.
- `Escape` closes the mega menu and both drawers.
- The mobile drawer and the filter drawer are `role="dialog" aria-modal="true"`, lock body
  scroll, and take focus on open.
- A skip link is first in the tab order and targets `#main`.

---

## Semantics

| Pattern                | What is used                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| Custom checkbox        | `<button role="checkbox" aria-checked>`                              |
| Custom radio           | `<button role="radio" aria-checked>` inside `role="radiogroup"`      |
| Accordion              | `aria-expanded` + `aria-controls`, heading-wrapped trigger           |
| PDP gallery thumbnails | `role="tablist"` / `role="tab"` with `aria-selected`                 |
| Breadcrumbs            | `<nav aria-label>` with `aria-current="page"` on the tail            |
| Checkout steps         | `<nav>` with `aria-current="step"`                                   |
| Toast                  | `role="status" aria-live="polite"`                                   |
| Form success           | `role="status"`                                                      |
| Product grid           | `role="list"` / `role="listitem"` with a labelled container          |
| Specification table    | `<dl>` / `<dt>` / `<dd>`                                             |
| Quantity readout       | `aria-live="polite"`                                                 |

Every field is wired to a real `<label>` through a generated `id` (`Field` in
`src/components/ui/form.tsx`). Icon-only controls carry an `aria-label`; the wishlist
button also carries `aria-pressed` and names the product it applies to.

---

## Motion

`prefers-reduced-motion: reduce` is honoured globally in `globals.css` — all animations
collapse to 0.01ms and smooth scrolling is disabled. There is no parallax, no
scroll-jacking and no auto-playing video.

---

## Imagery

Placeholders render as `role="img"` with the shot brief as their accessible name, so a
screen reader announces what is intended rather than nothing. When real photography lands,
`ShotSlot` passes the same label to `alt` — **that label must become a real alt text at
that point**, because "hero — chandelier front elevation on ivory, 1600×2000" is a
production note, not a description for a reader. See [IMAGE-BRIEF.md](IMAGE-BRIEF.md).

---

## Language

`<html lang>` and `dir` are set from the route, so assistive technology switches voice and
reading order correctly. Arabic sits at +0.5px and +0.1 line-height, and drops uppercase
and letter-spacing, which damage Arabic letterforms.

---

## Content

- Copy avoids discount language. Availability states are the only stock language:
  Ready to Ship, Made to Order, Pre-Order, Limited Edition.
- Link text is meaningful on its own — "Shop All Lighting", not "click here".
- The cookie banner keeps analytics **off until accepted**, and "Essential only" is given
  equal visual weight to "Accept".

---

## Still to do

- [ ] Automated axe pass on every route, both locales.
- [ ] Screen-reader walkthrough (NVDA + VoiceOver) of the PDP and the checkout.
- [ ] Focus-order audit of the mega menu with a keyboard only.
- [ ] Real `alt` text for every photograph once shooting is done.
- [ ] Zoom to 400% and 320px-wide reflow check.
- [ ] Confirm the brass focus ring is visible against every dark surface it can land on.
