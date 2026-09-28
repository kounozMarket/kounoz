# KONOUZ MARKET — Claude Code instructions

@AGENTS.md

Moroccan COD e-commerce store (konouzmarket.com, D-25). Headless: **Next.js storefront + WordPress/WooCommerce backend**. Mobile-first, conversion-focused, dark premium design. Traffic mainly from TikTok/Meta ads.

Site language: **French, LTR** (D-15). No Arabic RTL, no language switcher.

## Code
- The Next.js app lives at the **repository root** (D-23, required by Hostinger): Next.js 16 App Router, TypeScript, Tailwind CSS v4. Read `AGENTS.md`: this Next.js version differs from training data — check `node_modules/next/dist/docs/` before using an API.
- Design tokens: `src/app/globals.css` (`@theme`). Site config and placeholders: `src/config/site.ts`.
- Font (D-21): Plus Jakarta Sans only (`font-sans`; `font-display` is an alias). Modern store look: `card`, `glass`, `eyebrow` pill, `text-gold`, `bg-motif` (product line-motif background) utilities in `globals.css`.
- Motion (D-17): GSAP + ScrollTrigger only via `src/lib/motion/gsap.ts` and the `Reveal` / `Parallax` components; CSS for hover/header/above-the-fold intro. Always reduced-motion safe.
- Checks (run from the repo root): `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Hostinger (D-24): keep `next.config.mjs` (not .ts), `build` = `next build --webpack`, and `@next/swc-wasm-nodejs` pinned to the same version as `next`. Reproduce Hostinger locally with `NEXT_TEST_WASM=1 npm run build`.
- Maintenance (D-26): ON unless `MAINTENANCE_MODE=off`. Local dev: put `MAINTENANCE_MODE=off` in `.env.local` to work on the store.

## Read first (do not re-analyze sources already documented)
- `docs/batches/` — latest batch status file = current state and next step.
- `docs/decisions/decisions.md` — confirmed decisions (D-xx) and open questions (Q-xx).
- `docs/project/requirements.md` — CDC requirements. `business.md`, `brand.md`, `ux-ui.md`, `architecture.md` as needed.

## Source files (read-only — never modify, move or delete)
`Cahier des Charges - KONOUZ MARKET (1).docx`, `inspire home_Page.pdf`, `inspire single_Product.pdf`, `logos/*.png`.
The PDFs are nakamastore.ma screenshots: inspiration only, never clone.

## Non-negotiables
- COD only, no online payment, no account. Order form fields only: full name, phone (WhatsApp), city, address.
- Ordering (D-22): primary « Commander maintenant » = inline COD form on the product page; secondary « Ajouter au panier » → `/panier` → `/commande` (same fields). Direct order stays the main flow.
- Order sending (WooCommerce + Sheets + Purchase event) is not connected yet; forms validate and show a "not sent" notice. Floating WhatsApp on all pages. Reassurance badges.
- Purchase event only after successful COD order, never duplicated on refresh. Meta Pixel + CAPI, TikTok Pixel.
- Orders → Google Sheets in real time (Nom, Tél, Ville, Produit, Prix, Date).
- Mobile load < 2 s, WebP images, green PageSpeed mobile.
- Palette: accent `#D4A359`, hover `#B37D37`, bg `#111215`, surface `#1A1B1E`, footer `#2C2B2A`, text `#F5F5F7`, muted `#9E9E9E`. Gold sparingly.
- Official logos only; never redesign.
- Data-driven: never hardcode products, prices or category-specific visuals. Bottle/package treatment only for relevant categories.
- Secrets (Woo keys, CAPI token, Google creds) server-side only.

## Source discipline
Tag info as Confirmed / Inspiration / Recommendation / Open question. Never invent product names, prices, categories, carriers, policies or marketing claims. Unspecified → "Non spécifié dans le cahier des charges." Recommendations become decisions only when recorded in `decisions.md`.

## Workflow
- Small isolated batches; one status file per batch in `docs/batches/batch-NN-*.md`.
- Update the batch status file (and `decisions.md` if needed) before the user runs `/clear`.
- Targeted verification during work; full lint/type/build only when a batch is ready. No test loops.
- No browser/Chrome MCP unless browser verification is explicitly needed.
