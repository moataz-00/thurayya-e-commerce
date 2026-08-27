# Design system

The art direction, and the tokens that carry it. Everything here is implemented in
`src/app/globals.css` and rendered live at `/[lang]/style-guide`.

> **Celestial, architectural, quiet.** Thurayyā is presented like a museum of light: warm
> ivory surfaces, deep onyx rooms, and brass used as a line rather than a fill. Layouts are
> wide and unhurried — one idea per screen, generous margins, and photography given the
> space a showroom would give an object. Motion is limited to a fade, a brass rule drawing
> itself, and a soft warm glow behind lit products.

---

## 1. Colour

| Token           | Hex       | Share   | Used for                                                                 |
| --------------- | --------- | ------- | ------------------------------------------------------------------------ |
| Moon Ivory      | `#F2EEE5` | 55%     | Primary background and surfaces. Warm, tactile, never pure white.        |
| Midnight Onyx   | `#161819` | 30%     | Dark rooms, footer, headline text, packaging-inspired panels.            |
| Travertine Taupe| `#B7AA98` | 10%     | Secondary surfaces, spec panels, muted type, architectural detail.       |
| Antique Brass   | `#A9844F` | 5%      | Fine lines, icons, active states, badges, metallic CTAs.                 |
| Deep Emerald    | `#183C36` | limited | Limited editions, trade services, selected editorial only.               |

Functional:

| Token    | Hex       | Used for                                          |
| -------- | --------- | ------------------------------------------------- |
| `ink`    | `#161819` | Body text on ivory                                |
| `body`   | `#4E4A45` | Long copy                                         |
| `muted`  | `#8A8073` | Labels and secondary text — 12px and above only   |
| `danger` | `#9C3A2C` | Field errors, never as a fill                     |

Placeholder surfaces (`--color-surface-1` … `-4`, `#E4DDD0` → `#C9C0B0`) stand in for
photography and are the only greys in the system.

**Rules**

- Brass is a **line**, not a fill. It is never used for body text on ivory — accents,
  rules, icons, small badges and one metallic CTA per screen.
- Onyx on ivory measures **14.8:1**. Muted type appears only at 12px and above.
- Emerald appears at most once per page.
- Status is never carried by colour alone; every pill carries text.

Tailwind: `bg-ivory` `text-ink` `border-brass/50` `bg-onyx` `bg-emerald` `bg-taupe/28`
`bg-surface-2`.

---

## 2. Type

| Role          | Family                | Weight | Size    | Notes                                       |
| ------------- | --------------------- | ------ | ------- | ------------------------------------------- |
| Display       | Cormorant Garamond    | 300    | 46–86px | Editorial only. Never below 20px.           |
| H2            | Cormorant Garamond    | 300    | 38–52px |                                             |
| H3            | Cormorant Garamond    | 400    | 24px    | Product titles on cards sit at 20px         |
| Body          | Manrope               | 300–400| 14.5px  | line-height 1.9                             |
| UI label      | Manrope               | 400–500| 10–12px | uppercase, tracking 0.13–0.18em             |
| Eyebrow       | Manrope               | 400    | 10px    | uppercase, tracking 0.24em, brass           |
| Mono          | IBM Plex Mono         | 400    | 9.5px   | Spec captions, shot labels, step numbers    |
| Arabic display| Reem Kufi             | 400    | —       | Production target: the custom ثريا wordmark |
| Arabic body   | IBM Plex Sans Arabic  | 200–400| 15px    | Production target: 29LT Bukra               |

**Pairing rules**

- Cormorant Garamond 300 for anything editorial; never below 20px, never uppercase below
  24px.
- Manrope 300–500 for UI. Letter-spacing 0.13em on uppercase labels, 0.02em on body.
- Arabic body runs **+0.5px size and +0.1 line-height** against Latin for optical balance,
  and Arabic buttons drop the uppercase transform and letter-spacing entirely.
- Type floors: body 13px, uppercase labels 10px at 0.16em tracking.

Classes: `.t-display` `.t-eyebrow` `.t-label` `.t-mono` `.t-prose`.

---

## 3. Layout and spacing

- **Baseline grid 8px.** Section rhythm 88 / 120 / 160px vertical.
- **Max content width 1440px**, centred (`.t-shell`).
- **Gutters** 20px mobile → 24px tablet → 40px desktop, applied by `.t-shell`.
- **Product grid** gap 28px, card aspect 4:5.
- **Editorial imagery** 16:10 or 4:5.
- **Breakpoints** 1440 / 1280 / 1024 / 768 / 390. Product grid runs 4 → 4 → 3 → 2 → 2
  columns; the PLP sidebar becomes a drawer below 1024.
- **Sticky offsets** header bar 88px, PDP purchase panel and PLP sidebar `top: 70px`.

---

## 4. Components

### Buttons — `.t-btn`

| Variant                     | Rest                        | Hover                       |
| --------------------------- | --------------------------- | --------------------------- |
| `.t-btn--primary`           | Onyx fill, ivory text       | Brass fill, onyx text       |
| `.t-btn--brass`             | Brass fill, onyx text       | Ivory fill, onyx text       |
| `.t-btn--outline`           | Transparent, onyx rule      | Brass rule and text         |
| `.t-btn--ghost` (on dark)   | Transparent, ivory rule     | Brass rule and text         |
| `:disabled`                 | Muted text, faint rule      | `not-allowed`               |

All buttons transition over 300ms and carry a 44px minimum target height.

### Text link — `.t-link`

10.5px uppercase, 0.16em tracking, 1px brass underline at 4px offset. Goes brass on hover.

### Fields — `.t-input` `.t-textarea` `.t-select`

Bottom-rule only. Default `rgb(ink/0.28)`, focus brass, error `#9C3A2C` plus a message
below, disabled taupe fill. Labels are `.t-label` above the field.

### Product card

Aspect 4:5. States: default with status pill; hover — the alternate lifestyle image
cross-fades over **700ms** while the Add to Bag bar rises **8px**; wishlist saved fills the
brass diamond. The whole image is one link; the wishlist and bag buttons sit above it.

### Status pills

`Ready to ship` (ivory + hairline) · `Made to order` (ivory + brass rule, brass text) ·
`Pre-order` (onyx) · `Limited edition` (emerald). Text always present.

### Accordion

Single-open on the PDP; multi-open in the PLP filter sidebar. `+` / `−` in brass, 1px rule
above each row, `aria-expanded` and `aria-controls` wired.

### Feedback

Toast (onyx, bottom-end, 2.6s, with a View bag link) · cookie banner (analytics off until
accepted) · empty states · no-results · loading skeletons.

---

## 5. Motion

| What                                | Duration | Easing                        |
| ----------------------------------- | -------- | ----------------------------- |
| Mega menu open (hover intent delay) | 120ms    | —                             |
| Mega menu panel fade                | 220ms    | ease                          |
| Brass rule under active nav item    | 350ms    | `cubic-bezier(.2,.7,.2,1)`    |
| Card image cross-fade               | 700ms    | `cubic-bezier(.2,.7,.2,1)`    |
| Quick action rise                   | 400ms    | `cubic-bezier(.2,.7,.2,1)`    |
| Button colour inversion             | 300ms    | ease                          |
| Screen enter (`.t-screen`)          | 600ms    | fade + 14px rise              |
| Warm glow behind lit products       | 6–9s     | ease-in-out, infinite         |

**No parallax, no glassmorphism, no scroll-jacking.** Everything above collapses to near
zero under `prefers-reduced-motion: reduce`, which `globals.css` honours globally.

---

## 6. Focus and states

Focus is a **2px brass outline at 3px offset** and is never removed. Every interactive
element is reachable by keyboard; the mega menu and both drawers close on `Escape`, and the
mobile drawer locks body scroll and takes focus on open.

---

## 7. Adding to the system

1. If it repeats and carries brand meaning, add a `.t-*` class in the `@layer components`
   block of `globals.css`.
2. If it is one-off layout, use Tailwind utilities in the component.
3. If it is a colour, add it to `@theme` — never hard-code a hex outside `globals.css` and
   the style-guide swatch table.
4. Add the variant to `/[lang]/style-guide` so it is visible and reviewable.
