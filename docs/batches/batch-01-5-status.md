# Batch 01.5 — Creative / premium visual system — STATUS: COMPLETE

Date: 2026-09-27. Scope: visual foundation only. No WooCommerce, API, product fetching, COD form, Sheets, pixels, legal pages or final content.

## Visual direction (Recommendation, implemented)
"Dark gallery / vitrine": editorial, asymmetric, one type family.
- **Typography**: Manrope kept. Hierarchy comes from weight contrast (ExtraLight 200 vs SemiBold 600 in the same headline), very large fluid sizes, tight negative tracking on display type, and wide-tracked uppercase labels.
- **Shapes**: sharp by default (no "everything in a rounded box"). Pills for buttons and icon buttons. A **tall arch** frames the hero visual and decorates the closing band. It is a neutral vitrine motif (echoing Moroccan architecture), not a product silhouette.
- **Depth**: static body atmosphere (a faint warm top glow plus SVG film grain, painted once), a layered hero (outline wordmark → halo → arch → glass card), float shadows, one glass surface.
- **Gold**: eyebrows and rules, the primary CTA, sale %, focus, hover hairlines, icon strokes. No large gold surfaces.

## Typography update (D-18, after the first review)
- Headings (`h1`–`h4`, product names, mobile menu links, reassurance labels) use **Cormorant Garamond**, a variable font loaded in normal + italic. Italics echo the KM script: in the hero, section and closing headlines, a light line is paired with an italic line.
- **Manrope** is kept for UI, body text, eyebrows (`eyebrow` forces the sans font), buttons, prices and the outline wordmark.
- The heading scale was enlarged, because Cormorant has a small x-height:
  - display (hero H1): 36 → 84 px, set in uppercase with +0.01em tracking
  - h1: 44 → 92 px
  - h2: 36 → 64 px
  - h3: 22 → 28 px
  - tracking loosened to suit a serif
- Font setup: `--font-display` token in `globals.css`, font loading in `layout.tsx`.
- Checks: tsc, lint and build all pass.

## Footer redesign (D-19, after review, 2nd version)
- The first large footer was rejected by the owner as too big. It is replaced by a **compact black band** (`#000`) with a gold hairline on top:
  - monogram logo
  - the 3 legal pages (plain text)
  - a WhatsApp link (inactive placeholder until a number is set)
  - the © line
- Responsive:
  - mobile: centred stack, with extra bottom padding for the floating WhatsApp button
  - lg: a single row
- `id="contact"` is the target of the "Contact us" menu item.

## Navigation update (owner)
- Menu items (owner, French): **Accueil, Nos engagements, Boutique, À propos, Contact**.
- Links:
  - Boutique → `/#selection`
  - Contact → `/#contact` (footer)
  - À propos → `/a-propos`, a **planned page that returns 404 until it is built**
- Items are **bold**:
  - desktop: Manrope 700, uppercase
  - mobile sheet: Cormorant 700, 40 px
- Desktop header: logo | centred nav | meta ("Paiement à la réception", xl only) + theme toggle.

## Dark / light mode (D-20)
- The `data-theme` attribute on `<html>` is the source of truth. The default is `dark`.
- `src/lib/theme.ts` holds the storage key and an inline `<head>` script that applies the saved choice before first paint. This follows the Next 16 guide "preventing-flash-before-hydration", with `suppressHydrationWarning` on `<html>`.
- `ThemeToggle` (client component, `useSyncExternalStore` on the attribute) sits in the header on all breakpoints. The icon is a moon/sun crossfade with rotation, and the aria-label is in French.
- Token sets live in `globals.css` under `[data-theme="dark"]` and `[data-theme="light"]`. Any element can be a dark island. The footer follows the theme through `--color-footer`: #000 in dark mode, #EAE7E1 in light mode.
- Background and text colours cross-fade over 0.4 s.
- Known limitations in light mode:
  - The official gold PNG logo has lower contrast on #F5F5F7. brand.md advises against light backgrounds, and an SVG or dark logo variant would help (Q-19).
  - Product-frame white highlights are barely visible on white, which is harmless.
  - Light mode has not been checked in a browser.

## Tokens added (`storefront/src/app/globals.css`)
- Type scale: `text-display` (48 → 132 px), `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-eyebrow`, `text-cta`, `text-price`. All fluid `clamp()` with their own line-height and tracking.
- Derived colours (outside the official palette):
  - `accent-soft` (gold 14%)
  - `accent-line` (gold 32%)
- Motion easings:
  - `ease-premium` (cubic-bezier .22,1,.36,1)
  - `ease-soft`
- Shadows: `shadow-float`, `shadow-gold`.
- Layout:
  - `--header-h` (72 / 88 px) → `h-header`, `pt-header`, `-mt-header`
  - `--rail-h`
  - container widened to 1376 px, gutters 20 / 40 px
  - section spacing 72 / 128 px
  - `2xl` breakpoint 1440 px
- Utilities:
  - `eyebrow` (label with a gold rule)
  - `link-sweep` (growing underline)
  - `rule-gold`
  - `outline-text`
  - `no-scrollbar`
- Components layer:
  - `.intro-line`, `.intro-fade`, `.intro-frame` (CSS entrance)
  - `.rail-item`

## GSAP setup
- Packages: `gsap` 3.15.0, `@gsap/react` 2.1.2.
- `src/lib/motion/gsap.ts` is the **only** GSAP import point:
  - registers `ScrollTrigger` + `useGSAP` once, client-side
  - exports `MOTION_OK` / `MOTION_OK_DESKTOP` media queries, `EASE`, `DURATION`, `STAGGER`
- Reusable components (client, wrap server-rendered markup):
  - `components/motion/Reveal.tsx` is a scroll-reveal scope.
    - Descendants opt in with `data-reveal="fade-up" | "fade" | "media"`.
    - `media` = clip-path opening plus an inner zoom-out on `[data-reveal-inner]`.
    - Uses `ScrollTrigger.batch`, so elements that enter together are staggered, once only.
    - Inline transforms are cleared afterwards so CSS hover states keep working.
  - `components/motion/Parallax.tsx` handles scroll-scrubbed `yPercent` drift, desktop ≥1024 px only.
    - Uses `clamp()` starts, so above-the-fold layers don't jump on load.
- Everything runs inside `gsap.matchMedia()` and is reverted on unmount or media change.

## Animation strategy
| Where | Technique | Why |
|---|---|---|
| Hero entrance (headline line masks, text, frame) | **CSS keyframes** (`.intro-*`, stagger via `--d`) | Starts at first paint and never waits for hydration, which protects mobile LCP |
| Section / card / media reveals | GSAP `Reveal` (ScrollTrigger.batch) | Coordinated stagger + image reveal |
| Hero layers, background wordmark, closing arch | GSAP `Parallax` (desktop only) | Depth, scrubbed, transform-only |
| Header state, mobile menu, buttons, links, card hover | CSS transitions | GSAP adds nothing here |

- Card hover:
  - image scales 1.045
  - a gold hairline draws under the image
  - the title turns gold
  - the arrow button fills gold and rotates −45°
- Buttons: the primary button lifts 2 px with a gold glow; arrows nudge on hover.
- Durations: 0.3–0.9 s for UI, ≤1.6 s for media reveals. No continuous or looping animation.
- Reduced motion:
  - GSAP registers nothing (content stays static and visible).
  - CSS intro animations are disabled.
  - The global guard neutralises transitions.

## Header
- Fixed and transparent at the top. After 16 px of scroll it switches to a blurred `bg/75` bar with a hairline, and the logo scales to 90%.
- The header height never changes (no CLS). Pages reserve space through `main { padding-top: --header-h }`. The hero bleeds under the header with `-mt-header`.
- Desktop: 3-zone grid.
  - Left: nav with a sweep-underline indicator.
  - Centre: KM monogram.
  - Right: the confirmed badge "Paiement à la réception".
- Mobile: logo on the left; on the right, a "Menu ⇄ Fermer" rolling label with a two-line icon that morphs into an X.
  - The menu opens a full-screen blurred sheet: numbered large links (staggered CSS), plus 2 confirmed badges at the bottom (safe-area aware).
  - Accessibility: `inert` when closed, `aria-expanded` / `aria-controls`, Escape closes and returns focus, focus moves to the first link, scroll is locked, and the menu closes when the viewport resizes to ≥1024 px.
- **Nav items are PLACEHOLDER** (`siteConfig.mainNav`, Q-17): Accueil, La sélection, Nos engagements, all anchors on the homepage frame.

## Homepage frame (`src/app/page.tsx`) — all copy is placeholder
1. **Hero**
   - Eyebrow plus a "Contenu provisoire" tag.
   - A 3-line display headline mixing weights.
   - Placeholder lead text.
   - Primary CTA (`siteConfig.orderCtaLabel`, still Q-20) and a link CTA.
   - Arch visual with a labelled empty stage ("Visuel produit · À venir · tout format").
   - A floating glass card using sample product A.
   - A giant outline "KONOUZ" wordmark.
   - A desktop base line: 2 confirmed badges plus a "Défiler" cue.
2. **Nos engagements**: the 3 confirmed CDC badges, each with an icon, as an editorial strip (stacked on mobile, 3 columns with dividers from 768 px).
3. **La sélection**: product presentation from sample data (see below), with a "Données d'exemple" tag.
4. **Closing band**: placeholder headline and CTA with decorative arch outlines.

## Product presentation
- `types/product.ts`:
  - `ProductSummary`: the minimal shape WooCommerce will map onto.
  - `Presentation` = `"stage"` (spotlight + pedestal glow, for bottle/package categories only) or `"studio"` (even light, for any other shape). It is set **per category** (D-12).
- `data/sample-products.ts`: 4 **fictitious** products (names "Produit exemple A–D", fake prices, ratios 4:5, 1:1, 3:2, 3:4, mixed presentations). **Not client data.**
- `ProductMediaFrame`:
  - the frame takes the product's own aspect ratio
  - category lighting
  - `next/image` (`object-contain`) when a `src` exists, otherwise a labelled placeholder showing the ratio
- `ProductCard`: no box; the image is the card.
  - index number
  - category label
  - name
  - `Price`
  - round arrow CTA
  - the whole card is one link (sample `href` = `#selection`)
- `Price`: the current price leads, the regular price is crossed out, and the discount % is **derived from the data**. Includes screen-reader text.
  - Currency suffix `DH` (`siteConfig.currencyLabel`) — Recommendation, not specified in the CDC.
- `ProductShowcase`: layout driven by index, works for any count.
  - Below 1024 px: a horizontal snap rail where every media shares one height (`--rail-h`) and each width follows its ratio (capped at 84vw).
  - From 1024 px: two offset editorial columns (7/5, right column dropped 176 px) with alternating widths.

## Responsive strategy
- **375–430 (mobile)**:
  - stacked hero: text → full-width CTA → arch at 88% width, right-aligned, with the glass card overlapping on the left
  - product rail with a "Faites glisser" hint
  - badges as stacked rows
  - no parallax
- **768 (tablet)**:
  - arch at 68% width
  - badges in 3 columns
  - the rail shows 2+ items
  - the hero stays single-column
- **1024–1280 (desktop)**:
  - 12-column asymmetric hero; the display headline deliberately overlaps the arch (z-layered)
  - editorial product columns
  - parallax on
  - desktop header nav
- **1440+**: container capped at 1376 px, display type capped at 132 px, hero height capped at 960 px.
- Overflow guards:
  - `body { overflow-x: clip }`
  - the hero and closing sections use `overflow-hidden`
  - the rail scrolls inside its own box (`-mx-gutter` bleed to the screen edge only)

## Files
Created:
- `storefront/src/lib/motion/gsap.ts`
- `storefront/src/components/motion/Reveal.tsx`
- `storefront/src/components/motion/Parallax.tsx`
- `storefront/src/components/home/Hero.tsx`
- `storefront/src/components/home/HeroVisual.tsx`
- `storefront/src/components/home/Engagements.tsx`
- `storefront/src/components/home/ClosingBand.tsx`
- `storefront/src/components/product/ProductCard.tsx`
- `storefront/src/components/product/ProductMediaFrame.tsx`
- `storefront/src/components/product/ProductShowcase.tsx`
- `storefront/src/components/product/Price.tsx`
- `storefront/src/components/ui/icons.tsx`
- `storefront/src/components/ui/SectionHeading.tsx`
- `storefront/src/components/ui/PlaceholderTag.tsx`
- `storefront/src/types/product.ts`
- `storefront/src/data/sample-products.ts`

Changed:
- `storefront/src/app/globals.css` (rewritten token system)
- `storefront/src/app/layout.tsx` (`pt-header` on main)
- `storefront/src/app/page.tsx` (new frame)
- `storefront/src/components/layout/SiteHeader.tsx` (now a client component)
- `storefront/src/components/layout/SiteFooter.tsx` (gold rule, 12-column grid)
- `storefront/src/components/layout/WhatsAppButton.tsx` (glass, lift, safe-area)
- `storefront/src/components/ui/button.ts` (pill buttons, `link` variant, arrow nudge)
- `storefront/src/config/site.ts` (`currencyLabel`, placeholder `mainNav`, confirmed `reassurance`)
- `storefront/package.json` (gsap, @gsap/react)

Docs:
- `docs/decisions/decisions.md` (D-17)
- `CLAUDE.md` (motion rule)
- this file

## Verification performed
- `npx tsc --noEmit` — pass.
- `npm run lint` — pass, 0 warnings. Fixed along the way: a `react-hooks/refs` error in `Reveal` and a stray expression.
- `npm run build` — pass. `/` is prerendered static.
- Built CSS checked for the custom tokens and variant utilities (`h-header`, `rail-item`, `text-display`, `hover:shadow-gold`, `hover:[&_svg]:translate-x-1`, …).
- Prerendered HTML carries `data-placeholder` markers (content ×3, hero-visual, navigation, product-image ×4, whatsapp-number).
- **No browser or visual check** was done, per batch rules (no browser automation). The responsive behaviour above is by construction, not observed.

## Known limitations
- Not yet seen in a real browser. Before Batch 02, do a manual `npm run dev` pass at 375 / 390 / 430 / 768 / 1024 / 1280 / 1440, checking especially:
  - the headline/arch overlap at 1024
  - the glass card position on mobile
  - rail item heights
- On lg the hero headline intentionally overlaps the visual. If real copy is long, the hero may need `text-h1` instead of `text-display`.
- The mobile menu has no focus trap beyond `inert` on the page behind it (the page content itself is not inerted). Acceptable for 3 links; revisit if the menu grows.
- `backdrop-filter` is used on the header, menu sheet, glass card and WhatsApp button. It is cheap at these sizes, but check it on low-end Android.
- GSAP adds about 46 KB gzip of client JS (core 28 KB + ScrollTrigger 18 KB, measured from the dist files). Only `Reveal` / `Parallax` / `SiteHeader` are client components; the hero entrance does not depend on them.
- All copy, nav items, sample products and prices are placeholders. The CTA label is still Q-20. The `DH` suffix is a recommendation.

## Recommended next batch
**Batch 02 — UI primitives & static page templates (no backend)**, reusing this system:
- Consolidate primitives: badge / pill, reassurance row (compact variant for next to the CTA), and section wrappers.
- Legal page template (editorial long-form typography).
- Product page skeleton:
  - media gallery respecting ratio + presentation
  - info column with `Price`
  - order-form slot (no logic)
  - sticky mobile CTA bar
  - uses `ProductSummary` / sample fixtures
- Manual responsive check of Batch 01.5 at the breakpoints listed above.
