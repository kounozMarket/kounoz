# Batch 02.5 — Modern store redesign — STATUS: COMPLETE

Date: 2026-09-27. Owner feedback: the serif typography felt unclear and the site looked too basic. The site needed a modern, professional online-store look on every page, with all features kept and full mobile responsiveness (D-21).

## Typography
- **Plus Jakarta Sans** everywhere: a variable font, self-hosted through `next/font`, latin + latin-ext. It replaces Cormorant Garamond + Manrope, so the site loads one font family instead of two.
- Scale:
  - hero display 36 → 76 px, ExtraBold, uppercase (the uppercase hero is kept from the owner's earlier request)
  - h1 34 → 64 px
  - h2 28 → 48 px
  - h3 17 → 20 px
  - tight negative tracking on headings
- Prices are bold with tabular figures. Sale prices are gold and the regular price is crossed out.

## Visual system (`globals.css`)
- New utilities:
  - `card`: 24 px radius, hairline border, subtle top highlight
  - `glass`: blur + saturate
  - `eyebrow`: pill label with a gold dot
  - `text-gold` / `bg-gold`: theme-aware gold gradient
  - `bg-grid`: faint grid, radially masked
- Theme-aware `--gold-gradient` and `--glow` variables for dark and light (D-20 is kept).
- Buttons are pills in sizes md (48–52 px) and sm (40 px). The primary button has an inner highlight, lifts on hover and gets a gold shadow. Variants: `secondary` (glass), `ghost`, `link`.
- Container max width is 1312 px. Gutters are 16 / 24 / 32 px.

## Components redesigned
- **Header**: a floating glass capsule, which gets denser on scroll.
  - Desktop: bold nav items with a pill highlight for the active page, plus the theme toggle and a "Voir la boutique" button.
  - Mobile: a round menu button. It opens a full-screen sheet of large bold link cards plus the 3 confirmed badges.
  - Unchanged: accessibility (inert, Escape, focus, scroll lock) and the no-layout-shift header.
- **Hero**:
  - pill eyebrow, bold uppercase headline with one gold-gradient word (placeholder copy)
  - CTA pair
  - the 3 confirmed reassurance badges with icons
  - product "stage" card: concentric rings, glow, "Paiement à la réception" glass chip, floating delivery chip (xl), featured sample-product mini card
  - desktop parallax
- **Engagements**: 3 feature cards with an icon tile and a hover glow.
- **Product cards**:
  - rounded media that keeps the product ratio, with a gold `−X %` badge on the image
  - category, bold name, `Price`, round arrow CTA
  - hover: zoom, gold border, and the arrow fills gold
  - the reveal clip-path is rounded
- **Showcase**: same data-driven rail (mobile) and offset columns (desktop), with tighter spacing.
- **Closing band**: a rounded CTA panel with grid and glow, a CTA pair and badge chips.
- **Inner pages**:
  - `PageHeader`: centred, breadcrumb pill, grid/glow background
  - Boutique: a toolbar card (count, sample tag, badges) above the masonry grid
  - À propos: logo panel and story card, then engagements, steps and a CTA card
  - Contact: a large WhatsApp card and detail cards
  - Legal: a sticky "Sommaire" card plus an "À lire aussi" card, and numbered section cards
  - `OrderSteps`: gold numbered circles with a dashed connector on desktop
  - `ToComplete`: a rounded gold dashed box
- **404**: a large gold-gradient "404" with a CTA pair.
- Footer (compact, D-19) is kept as is.

## Kept functionality
- Dark/light toggle with no flash on load.
- Mobile menu.
- GSAP `Reveal` / `Parallax`, reduced-motion safe.
- CSS hero intro.
- All routes and placeholder markers (`data-placeholder`).
- Sample-data rules and the confirmed-facts-only content.

## Responsive
- **Mobile**: stacked hero with full-width CTAs and badges in a single column. The stage card is 4:5 with the mini card inside it (no overflow). Product rail. The header capsule is 64 px.
- **Tablet (sm/md)**: 2-column badge/detail grids, stage card 1:1, 2-column masonry.
- **Desktop**: 12-column layouts, floating chips and parallax, sticky legal sidebar.

## Verification
- `npx tsc --noEmit` — pass.
- `npm run lint` — pass.
- `npm run build` — pass. 9 static routes.
- Dev server: all routes return 200, unknown URLs return 404.
- New utilities are present in the built CSS.
- **No browser/visual check** (per project rules). The owner reviews via `npm run dev`.

## Mobile fixes (after owner review)
Verified with Playwright iPhone 13 emulation in headless Chrome (scratchpad only, nothing added to the project). This was explicitly needed to find the mobile bugs.
- **Root bug: the page laid out about 960 px wide on phones, so the browser zoomed out.**
  - Each product card's absolutely positioned `sr-only` label had no positioned ancestor, so it escaped the rail's scroll container and widened the document.
  - Fix: `relative` on `ProductCard` and on the rail.
- The header "Voir la boutique" button was visible on mobile because the button's `inline-flex` overrode `hidden`. That pushed the menu button off-screen. Fix: a wrapper `span.hidden lg:block`.
- Buttons can now wrap (`min-h` + `py`, `text-center`; the sm size keeps nowrap), so the long placeholder CTA no longer overflows.
- `ToComplete` text wraps (`overflow-wrap:anywhere`), which fixes the overflowing box on the Contact page.
- The page-header, hero and 404 backgrounds now fade out (mask) instead of ending in a hard edge.
- Boutique: **2 columns on phones**, compact card details (the arrow button is hidden below sm in grid layout), and a smaller placeholder label.
- Homepage selection aside: the tag and link no longer stretch to full width.
- Feature parity on mobile:
  - delivery chip inside the hero stage (the floating version stays at xl)
  - a gold "Voir la boutique" CTA in the mobile menu
  - parallax at half strength below 1024 px (still off with reduced motion)
- The floating WhatsApp button is hidden while the mobile menu is open, so it no longer covers the badges.
- Result: all 8 routes × 375 / 390 / 430 px show no horizontal overflow (`scrollWidth === innerWidth`). Dark, light and the open-menu screenshots were reviewed.

## Background motif (owner request)
- The square grid background (`bg-grid`) is replaced by **`bg-motif`**: a 200/260 px tile of thin line drawings (perfume bottle, cream jar, shopping bag, gem, sparkles, dots).
  - The shapes are mixed on purpose, so no single product category is implied (D-12). The gem nods to "Konouz" (treasures).
  - It is drawn as a CSS mask over `--color-line-strong`, so it follows dark/light mode, and it keeps the radial edge fade.
- Used on: the hero, page headers, the closing band, the Contact WhatsApp card and the 404 page. It is softer on mobile (45–55% opacity) than on desktop.

## Next
- Owner visual review at 375 / 390 / 430 / 768 / 1024 / 1280 / 1440, in both themes.
- Then **Batch 03 — Product page skeleton**, as previously recommended.
