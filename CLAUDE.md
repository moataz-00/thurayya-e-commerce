# CLAUDE.md

Guidance for Claude Code working in this repository.

## What this is

The **frontend only** of the Thurayyā storefront — a bilingual (EN/AR) lighting and
furniture site built from the Claude Design source `Thurayyā Site.dc.html`. All data comes
from a typed mock layer in `src/lib/mock/`. There is no backend, no auth and no payment.

## Commands

```bash
npm run dev        # dev server on :3000
npm run check      # typecheck + production build — run this before finishing
npm run typecheck  # tsc --noEmit only
```

There is no test suite and no linter configured. `npm run check` is the gate.

## Non-obvious things to know

- **`src/app/[lang]/layout.tsx` is the root layout.** There is deliberately no
  `src/app/layout.tsx` — that is what lets `<html lang dir>` be set from the route.
  `src/proxy.ts` (not `middleware.ts`; Next 16 renamed the convention) redirects unprefixed
  URLs.
- **A constant shared between a server route and a client component must not live in a
  `"use client"` file.** Client exports arrive on the server as references, not values, and
  `generateStaticParams` will fail at build time with a confusing error. See
  `src/lib/account-sections.ts`.
- **Money formatting is hand-rolled on purpose.** `Intl.NumberFormat` output has drifted
  between Node versions, which produces hydration mismatches. Do not "simplify" it.
- **The store renders defaults until `hydrated` is true.** Any component reading the bag,
  the wishlist or the currency must respect that flag or it will mismatch on hydration.
- **The PLP takes a `scope` object, not a filtered list**, because a server component
  cannot hand a filter callback to a client component.
- **Prices are EGP integers everywhere.** Only `formatMoney` converts.
- **Every internal href goes through `src/lib/routes.ts`.**
- **Every image goes through `ShotSlot` and `src/lib/images.ts`.** Ids are Unsplash photo
  paths today and local paths later; `resolveImage` handles both. Always pass a `sizes`
  hint, and `priority` only above the fold.
- **Dark heroes run the photo at 40–45% under a scrim.** The design specified 16–20% for
  the placeholder pattern; real photography needs more to read. Changing it means
  re-checking text contrast.

## Conventions

- Server components by default; `"use client"` only for state, hover, events or storage.
- Every customer-facing string is `Localized` (`{ en, ar }`) or a dictionary key. The
  English dictionary defines the shape and TypeScript enforces the Arabic.
- Logical CSS properties only (`ms-`, `ps-`, `start-`, `text-start`) — never `ml-`/`left-`
  for layout.
- Colours come from `@theme` in `src/app/globals.css`. Do not hard-code hexes.
- Brand-meaningful repeated styles get a `.t-*` class in the `@layer components` block.

## Where to look first

| Question                          | File                                       |
| --------------------------------- | ------------------------------------------- |
| What routes exist?                | `docs/ROUTES.md`                            |
| What shape is the data?           | `src/lib/types.ts`, `docs/CONTENT-MODEL.md` |
| Where does this data come from?   | `src/lib/mock/index.ts`                     |
| What are the design rules?        | `docs/DESIGN-SYSTEM.md`, `/en/style-guide`  |
| How do I add a backend?           | `docs/BACKEND-INTEGRATION.md`               |
| What still needs doing?           | `docs/ROADMAP.md`                           |

## When finishing a change

1. `npm run check`.
2. Walk the affected pages in **both** `/en` and `/ar` — most layout regressions surface in
   Arabic first.
3. Update `docs/ROUTES.md` if you added a route, and `CHANGELOG.md` for anything notable.
