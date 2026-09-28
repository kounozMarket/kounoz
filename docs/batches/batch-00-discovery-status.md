# Batch 00 — Discovery & project setup — STATUS: COMPLETE

Date: 2026-09-27

> **No application code has been implemented.** No Next.js app, no dependencies, no WordPress setup. Only documentation was created. Source files were not modified.

## Sources studied
- `Cahier des Charges - KONOUZ MARKET (1).docx` — full text (7 sections). Contains no images (only embedded fonts).
- `inspire home_Page.pdf` — 2 pages, image-only desktop screenshots of nakamastore.ma homepage.
- `inspire single_Product.pdf` — 1 page, image-only desktop screenshot of a nakamastore.ma product page.
- `logos/logo.png` — KM monogram + "KONOUZ MARKET" subtitle, 1054×567 transparent PNG.
- `logos/logo without sub title.png` — KM monogram only, 992×404 transparent PNG.
- Project owner discovery brief (palette, architecture, business context).

## Documentation created
- `CLAUDE.md`
- `docs/project/business.md`
- `docs/project/requirements.md`
- `docs/project/brand.md`
- `docs/project/ux-ui.md`
- `docs/project/architecture.md`
- `docs/decisions/decisions.md`
- `docs/batches/batch-00-discovery-status.md` (this file)

## Confirmed decisions
See `docs/decisions/decisions.md` D-01 … D-14.

## Open questions
See `docs/decisions/decisions.md` Q-01 … Q-19. Most blocking for implementation: Q-01 (language/RTL), Q-02/Q-03 (form fields), Q-08 (hosting), Q-12 (product data).

## Assumptions still needing client confirmation
- Customer-facing UI is Arabic, RTL (implied by Arabic CTA + Arabic font requirement; not stated explicitly).
- No cart at all (CDC forbids the standard cart funnel).
- Initial products are bottle/package type (brief) — CDC is more generic.
- WordPress admin will live on a separate subdomain.
- Recommended Sheets / label / hosting approaches in `architecture.md` are recommendations, not decisions.

## Discrepancies noted
- CDC background "#000000" vs official palette "#111215" → resolved in favour of palette (D-04).
- Reference PDFs show "Add to cart" and order CTA below the fold → rejected (CDC §3).
- Reference shows "free delivery" → not a KONOUZ claim; not specified in CDC.

## Recommended next step
**Batch 01 — Frontend foundation (no backend yet):** scaffold Next.js (App Router, TypeScript), design tokens from the official palette, Arabic font + RTL base layout, optimized logo derivatives (copies, originals untouched), and a static app shell (header, footer, floating WhatsApp placeholder). Start only after Q-01 (language/RTL) is answered, or explicitly proceed with the Arabic-RTL assumption.
