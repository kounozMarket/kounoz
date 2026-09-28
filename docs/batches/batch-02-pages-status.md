# Batch 02 — Static content pages — STATUS: COMPLETE

Date: 2026-09-27. Owner request: every menu/footer link that led to the default 404 must lead to a real page with content. No backend: WooCommerce, the COD form, Sheets and pixels are still not built.

## Pages created (all prerendered static)
| Route | Content |
|---|---|
| `/boutique` | Header plus a masonry grid of the **sample** products. Each card keeps its product ratio. Tagged "Données d'exemple". |
| `/a-propos` | Header (confirmed facts only), a brand block with the official logo, **À compléter** marker for the brand story (Q-17), the `Engagements` strip, `OrderSteps`, and CTAs to Boutique / Contact |
| `/contact` | A WhatsApp card (button when `NEXT_PUBLIC_WHATSAPP_NUMBER` is set, otherwise a Q-05 marker). E-mail / hours / address / social links shown as À compléter. `OrderSteps`. |
| `/politique-de-livraison` | Legal template (see below) |
| `/conditions-generales` | Legal template |
| `/politique-de-retour` | Legal template |
| 404 (`app/not-found.tsx`) | Branded French 404 ("Page introuvable") replacing Next's default page, with links to home and the boutique |

- Menu:
  - Boutique → `/boutique`
  - À propos → `/a-propos`
  - Contact → `/contact`
  - Accueil → `/`
  - Nos engagements → `/#engagements`
- Footer legal items are now links (`siteConfig.legalPages`).

## Content rules applied (source discipline)
- Written as text **only when confirmed**:
  - COD only, no online payment (D-01)
  - 24/48h delivery all over Morocco, parcel check before payment (D-07)
  - order form with 3 fields, no cart (D-05)
  - confirmation call by the team (CDC §4)
  - crossed-out price for promotions (CDC §4)
  - WhatsApp for information requests (CDC §3)
- Everything else is rendered as a visible dashed **"À compléter par le client"** block (`components/page/ToComplete.tsx`, `data-placeholder="client-content"`) with its question reference:
  - shipping fees (Q-04)
  - carriers (Q-10)
  - seller identity / ICE / RC / address, return conditions, deadline, refund vs exchange, return costs, privacy / CNDP, governing law, last-updated date (Q-11)
  - brand story, e-mail, hours, social links (Q-17)
  - WhatsApp number (Q-05)
- Neutral UI wording (headings such as "Nous contacter", "Quatre étapes, sans paiement en ligne") contains no commercial promise beyond confirmed facts.

## New files
- `src/content/legal.ts`: typed legal content (`p` / `list` / `link` / `todo` blocks). Replace the `todo` blocks with client text.
- `src/components/page/`:
  - `PageHeader.tsx`: inner-page header with CSS intro
  - `LegalPage.tsx`: sticky desktop table of contents plus numbered sections, 65ch reading width
  - `ToComplete.tsx`
  - `OrderSteps.tsx`: 4 confirmed steps
- `src/app/{boutique,a-propos,contact,politique-de-livraison,conditions-generales,politique-de-retour}/page.tsx`, `src/app/not-found.tsx`.

Changed:
- `src/config/site.ts`: routes in `mainNav`, new `legalPages`
- `SiteFooter.tsx`: legal links
- `ProductCard.tsx`: `layout="rail" | "grid"` prop

## Verification
- `npx tsc --noEmit` — pass.
- `npm run lint` — pass.
- `npm run build` — pass. 9 static routes.
- Dev server: every route returns 200 with its own `<title>`; an unknown URL returns 404 with the branded page.
- No browser/visual check (per project rules).

## Known limitations / next
- Product cards still link to `#selection`. The product page (media / info / COD form slot / sticky mobile CTA) is the next batch.
- The legal pages are not publishable until the À compléter blocks are filled and the text is legally reviewed.
- Recommended next batch: **Batch 03 — Product page skeleton** (sample fixture, gallery respecting ratio and presentation, `Price`, reassurance row next to the CTA, order-form slot without logic, sticky mobile CTA bar).
