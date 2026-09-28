# Batch 01 — Frontend foundation — STATUS: COMPLETE

Date: 2026-09-27

## Implemented
- Next.js **16.3.6** app in `storefront/` (App Router, TypeScript, Tailwind CSS v4, ESLint, `src/` dir, `@/*` alias). Generated with `create-next-app`, no git init.
- Global styling system (`src/app/globals.css`, Tailwind `@theme`):
  - Official palette tokens: `accent` #D4A359, `accent-hover` #B37D37 (also focus), `bg` #111215, `surface` #1A1B1E, `surface-2` #2C2B2A, `text` #F5F5F7, `muted` #9E9E9E.
  - Derived tokens, outside the official palette: `line` / `line-strong` (hairlines, text colour at 8% / 16% opacity), `on-accent` (#111215 text on gold).
  - Typography: **Manrope** via `next/font/google` (self-hosted, `latin` + `latin-ext` for French characters like œ, `display: swap`) with system sans-serif fallback. `text-display` uses a fluid clamp; `text-eyebrow` is small tracked uppercase.
  - Spacing: Tailwind 4px scale + `gutter` (16px) / `gutter-lg` (32px), `section` (56px) / `section-lg` (96px), a `container-site` utility (max 1200px).
  - Radius: sm 6 / md 10 / lg 16 / xl 24 px.
  - Breakpoints, mobile-first min-width: sm 640, md 768, lg 1024, xl 1280.
  - Base: dark `color-scheme`, body bg/text, balanced headings, gold `::selection`, `:focus-visible` 2px outline in #B37D37, reduced-motion guard.
- Brand assets:
  - Trimmed copies of the official logos (transparent margins removed only, nothing redesigned) in `src/assets/brand/`.
  - Served through `next/image` (automatic WebP and resizing).
  - `src/app/icon.png` favicon: monogram on #111215, 512×512.
  - Originals in `/logos` are unchanged (MD5 verified).
- Shell:
  - `SiteHeader`: sticky, translucent dark, hairline border, KM monogram linking to home. Empty navigation slot.
  - `SiteFooter`: #2C2B2A surface, full logo, the "Informations" column listing the 3 required legal pages as plain text (no links yet), "Contact" column, copyright.
  - `WhatsAppButton`: floating on all pages. **Placeholder:** it stays inactive (`data-placeholder="whatsapp-number"`) until `NEXT_PUBLIC_WHATSAPP_NUMBER` is set (see `.env.example`).
- Homepage **frame only** (`src/app/page.tsx`): placeholder hero (display type, primary + secondary button), a neutral 2/4-column card grid with square placeholders (no product-shape assumptions), and a palette check. All copy is explicitly placeholder.
- `src/config/site.ts`:
  - name, domain, `lang: "fr"`, WhatsApp env value.
  - **Placeholder CTA** `"[À confirmer] Commander – paiement à la livraison"`.
- Metadata: title template, `robots: noindex` until launch, `themeColor` #111215, dark `colorScheme`, `<html lang="fr">`.

## Files created / changed
- `storefront/` (scaffold). Removed: default `public/*.svg`, `src/app/favicon.ico`.
- Replaced: `storefront/src/app/globals.css`, `layout.tsx`, `page.tsx`, `README.md`.
- Created:
  - `storefront/src/config/site.ts`
  - `storefront/src/components/brand/Logo.tsx`
  - `storefront/src/components/layout/SiteHeader.tsx`
  - `storefront/src/components/layout/SiteFooter.tsx`
  - `storefront/src/components/layout/WhatsAppButton.tsx`
  - `storefront/src/components/ui/button.ts`
  - `storefront/src/assets/brand/logo-full.png`
  - `storefront/src/assets/brand/logo-monogram.png`
  - `storefront/src/app/icon.png`
  - `storefront/.env.example`
- Changed: `storefront/.gitignore` (allow `.env.example`).
- Docs:
  - `CLAUDE.md` (language, code locations, checks, CTA note)
  - `docs/decisions/decisions.md` (D-15, D-16, Q-01/06/07 closed, Q-20/21 added)
  - `docs/project/requirements.md` (language note)
  - this file

## Checks performed
- `npx tsc --noEmit` — pass.
- `npm run lint` — pass, no warnings.
- `npm run build` — pass. `/` is prerendered as static.
- Built CSS contains all custom token utilities.
- Prerendered HTML has `lang="fr"`, header, footer, logos through `/_next/image`, and the WhatsApp placeholder.
- No browser/visual check was run (per batch rules).

## Known issues / notes
- Visual rendering has not been checked in a browser, including mobile breakpoints. Do a manual check with `npm run dev` before Batch 02 is signed off.
- The logo PNGs are about 120–145 KB at source. `next/image` serves resized WebP, so this is fine; an SVG logo (Q-19) would be better.
- `create-next-app` generated `storefront/AGENTS.md` and `storefront/CLAUDE.md`. They are kept; they warn that this Next.js version has breaking API changes.
- Manrope is an implementation choice for "modern French-friendly sans-serif" (D-15). It can be swapped in one place (`layout.tsx`).

## Decisions made
- D-15: French, LTR (from project owner).
- D-16: the app lives in `storefront/`.

## Remaining work (later batches)
- Navigation, final homepage, product pages, the COD form, WooCommerce, Google Sheets, pixels/CAPI, legal pages, and carrier labels.

## Recommended next batch
**Batch 02 — UI primitives & static page templates (no backend):**
- Reusable components:
  - button/link
  - badge/pill
  - price with a crossed-out sale price
  - reassurance badge row (3 confirmed badges, French wording marked placeholder)
  - product card that accepts any image ratio
  - section heading
- Static routes with placeholder content:
  - legal page template, using `Politique de livraison` as the example
  - product page layout skeleton (media / info / order-form slot) with a sticky mobile CTA bar, using typed mock data from one local fixture file (no WooCommerce yet)
- Manual mobile check of the shell.
