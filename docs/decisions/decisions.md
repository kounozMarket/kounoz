# Decisions — KONOUZ MARKET

Only **confirmed** decisions are recorded here (source = CDC or project owner). Recommendations live in the project docs and become decisions only once approved.

## Confirmed decisions
| ID | Date | Decision | Source |
|---|---|---|---|
| D-01 | 2026-09-27 | Payment: **100% Cash on Delivery**. No online payment. | CDC §1 |
| D-02 | 2026-09-27 | Market: **Morocco**. ~~Domain konouzmarket.shop~~ — domain superseded by D-25. | CDC header |
| D-03 | 2026-09-27 | Stack: **headless** — Next.js storefront + WordPress/WooCommerce backend. Client manages catalog/orders in WP without touching Next.js code. | Project owner brief (CDC §5 left the choice to the provider) |
| D-04 | 2026-09-27 | Official palette: accent `#D4A359`, hover/focus `#B37D37`, background `#111215`, surface `#1A1B1E`, footer/secondary `#2C2B2A`, text `#F5F5F7`, muted `#9E9E9E`. Gold = sparse accent. This supersedes the CDC's "Noir pur #000000". | Project owner brief (later than CDC) |
| D-05 | 2026-09-27 | ~~Amended by D-22.~~ No standard cart/checkout funnel. Direct order form on product page (or non-intrusive popup) with only: full name, phone (WhatsApp), city/address. | CDC §3 |
| D-06 | 2026-09-27 | ~~Superseded by D-22 for the French site.~~ CTA text: « اطلب الآن والدفع عند الاستلام ». | CDC §3 |
| D-07 | 2026-09-27 | Floating WhatsApp button on all pages; reassurance badges (24/48h delivery all Morocco, pay on receipt, parcel check before payment). | CDC §3 |
| D-08 | 2026-09-27 | Orders synced in real time to Google Sheets with Nom, Tél, Ville, Produit, Prix, Date. | CDC §4 |
| D-09 | 2026-09-27 | Tracking: Meta Pixel + CAPI, TikTok Pixel; Purchase only after COD form validation, no refresh duplicates. | CDC §5 |
| D-10 | 2026-09-27 | Legal pages: shipping policy, T&C, return/exchange policy. | CDC §6 |
| D-11 | 2026-09-27 | Official logos: `logos/logo.png` (with "KONOUZ MARKET" subtitle) and `logos/logo without sub title.png` (KM monogram). Never redesigned. | Project owner brief |
| D-12 | 2026-09-27 | Architecture/design must be data-driven, not hardcoded around the first 2–3 products; bottle/package visual treatment only for relevant categories. | Project owner brief |
| D-13 | 2026-09-27 | Reference PDFs (nakamastore.ma screenshots) are **inspiration only**; no cloning. | Project owner brief |
| D-14 | 2026-09-27 | ~~Arabic font (Cairo / Readex Pro)~~ — **superseded by D-15** (site is French). | CDC §2 |
| D-15 | 2026-09-27 | Site language: **French**, **LTR**, no language switcher, no Arabic RTL layout. Modern French-friendly sans-serif typography. The CDC's Arabic CTA does not force RTL; final French CTA copy is still open (Q-20). | Project owner (Batch 01 brief) |
| D-16 | 2026-09-27 | ~~Superseded by D-23.~~ The Next.js storefront lives in `storefront/` (Next.js 16, App Router, TypeScript, Tailwind CSS v4). Source documents stay untouched at the repo root. | Batch 01 |
| D-17 | 2026-09-27 | **GSAP + ScrollTrigger** are part of the official visual interaction layer for KONOUZ MARKET, used selectively and with reduced-motion support. Imported only through `storefront/src/lib/motion/gsap.ts`; CSS transitions remain the default for simple micro-interactions. | Project owner (Batch 01.5 brief) |
| D-18 | 2026-09-27 | ~~Superseded by D-21.~~ Brand-related typography, derived from the official logo: **Cormorant Garamond** (display serif, normal + italic) for headings and product names, echoing the calligraphic KM monogram; **Manrope** kept for UI, body, labels, buttons and prices, echoing the light spaced "KONOUZ MARKET" subtitle. Both self-hosted via `next/font` (latin + latin-ext). | Project owner request (after Batch 01.5) |
| D-19 | 2026-09-27 | Footer background is **black (#000000)**, replacing `#2C2B2A` from D-04 for the footer only. `#2C2B2A` stays available as a secondary surface. | Project owner request (after Batch 01.5) |
| D-20 | 2026-09-27 | **Dark / light mode toggle** in the header. **Dark stays the default** and the brand reference. Light is opt-in, remembered in `localStorage` (`km-theme`), and applied before first paint. Light colours are derived from the palette: bg #F5F5F7, surface #FFFFFF, surface-2 #EAE7E1, text #111215, muted #5E5E62, and gold deepened to #93652A (hover #7A5322) with white text on gold for AA contrast. The footer follows the theme: black (#000) in dark mode, #EAE7E1 in light mode (`--color-footer`). Note: this relaxes the CDC's "Dark mode intégral" (§2) at the owner's request. | Project owner request (after Batch 01.5) |
| D-21 | 2026-09-27 | **Modern store redesign.** A single typeface, **Plus Jakarta Sans** (variable, latin + latin-ext), is used for everything. It replaces Cormorant Garamond + Manrope (D-18) because the owner found the serif unclear for a store. The visual language moves to a modern e-commerce style: floating glass capsule header, bold sans headings with one gold-gradient highlight, rounded cards (24–40 px), pill buttons and labels, a faint grid and warm glow backgrounds, and glass chips. All features are kept (theme toggle, menu, GSAP reveals and parallax, placeholders, routes). | Project owner request |
| D-22 | 2026-09-27 | **Ordering: two flows, direct order first.** Product page primary CTA **« Commander maintenant »** leads to the inline COD form on the same page (CDC flow, sticky mobile CTA bar). Secondary **« Ajouter au panier »** leads to `/panier`, then `/commande` (checkout). Checkout uses the **same 4 fields** (Nom complet, Numéro de téléphone (WhatsApp), Ville, Adresse de livraison, as separate fields) plus the order summary. **COD only**, no online payment, no account. **Quantity selector** (1–10 per line). This amends D-05 (the CDC forbade the classic cart funnel) at the owner's explicit request: the cart is secondary and has no complex billing. | Project owner (Batch 03 brief) |
| D-23 | 2026-09-28 | The Next.js app is moved to the **repository root** (Hostinger deploys Node.js apps from the repo root). `docs/`, `logos/` and `CLAUDE.md` stay at the root beside it. Client source documents stay local only (`.gitignore`). Supersedes D-16. | Project owner (deployment) |
| D-24 | 2026-09-28 | **Hostinger build compatibility.** Hostinger build servers have glibc < 2.29, so Next's native SWC (needs 2.30) cannot load and Next falls back to WebAssembly. Therefore: config is plain JS (`next.config.mjs`, no TypeScript compile), production builds use **webpack** (`next build --webpack`, since Turbopack requires native SWC), and `@next/swc-wasm-nodejs` is pinned to the exact Next version in devDependencies (no download at build time). Local `npm run dev` keeps Turbopack. Tailwind oxide / lightningcss (glibc 2.14) and sharp/libvips (2.28) are compatible. Upgrading Next means upgrading `@next/swc-wasm-nodejs` to the same version. | Deployment (Hostinger build log) |
| D-25 | 2026-09-28 | Final domain: **konouzmarket.com** (Hostinger), replacing konouzmarket.shop from the CDC header. Used in `siteConfig.domain` (metadata base URL) and the legal texts. | Project owner |

## Open questions (require client confirmation)
| ID | Question |
|---|---|
| Q-01 | ~~Site language~~ — **resolved by D-15** (French, LTR). |
| Q-02 | ~~One or two fields~~ — **separate** Ville + Adresse (D-22). Still open: city as free text (current) or a dropdown list? |
| Q-03 | ~~Quantity / multiple products~~ — yes (D-22). Still open: product variants (volume/size)? |
| Q-04 | Shipping fee shown to customer? Free delivery? (Not specified — do not claim free delivery.) |
| Q-05 | WhatsApp number(s) for floating button and form label. |
| Q-06 | ~~Arabic font~~ — obsolete (D-15). |
| Q-07 | ~~Arabic brand name spelling~~ — obsolete for UI (D-15). |
| Q-08 | Hosting: Next.js on Hostinger (Node plan?) or elsewhere (e.g. Vercel)? WordPress on subdomain (e.g. admin./api.)? |
| Q-09 | Google Sheets: which Google account/sheet; extra columns (order ID, address, quantity, status)? |
| Q-10 | Carriers actually used (Amana, Cathedis, Ozone, other) and required label format/integration. |
| Q-11 | Legal page contents (shipping, T&C, returns/exchange), company legal info, privacy policy/CNDP. |
| Q-12 | Product data for the 3 test products: names, prices, sale prices, descriptions, photos/videos. |
| Q-13 | Initial product line: CDC says "produits tendance et accessoires premium"; brief mentions perfumes/body care. Confirm. |
| Q-14 | Brief mentions a "packaging/product visual reference" — not present in the folder. Is there an additional file? |
| Q-15 | ~~Inline vs popup~~ — **inline** on the product page (D-22). |
| Q-16 | Tracking extras: ViewContent/InitiateCheckout events, TikTok Events API, GA4/GTM, cookie consent? Pixel IDs & access. |
| Q-17 | Pages beyond products + legal: owner set the menu: Accueil, Nos engagements, Boutique, À propos, Contact (French). Still open: À propos page content, a dedicated Contact page vs the footer anchor, FAQ, social links. |
| Q-18 | Out-of-stock behaviour (hide product, disable form, "notify me")? |
| Q-19 | Vector (SVG) logo available? |
| Q-20 | ~~Final French order-CTA copy~~ — **« Commander maintenant »** (D-22). |
| Q-21 | Floating WhatsApp button style: brand palette (current) or WhatsApp green for recognition? |
