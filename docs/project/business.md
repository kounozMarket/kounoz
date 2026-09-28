# Business — KONOUZ MARKET

Legend used in all project docs:
- **[A] Confirmed** — stated in the Cahier des Charges (CDC) or by the project owner's brief.
- **[B] Inspiration** — observed in the visual reference PDFs; not a requirement.
- **[C] Recommendation** — technical/UX recommendation; not yet approved.
- **[D] Open question** — requires client confirmation.

Primary source: `Cahier des Charges - KONOUZ MARKET (1).docx` (CDC, written in French). Secondary source: project owner's discovery brief (2026-09-27).

## Identity
- [A] Store name: **KONOUZ MARKET** (CDC).
- [A] Domain: **konouzmarket.com** (project owner, D-25). The CDC header said konouzmarket.shop.
- [A] Current hosting: **Hostinger** (CDC — "Hébergement actuel").

## Positioning (CDC §1)
- [A] Online store dedicated to "produits tendance et d'accessoires premium au Maroc" (trending products and premium accessories in Morocco).
- [A] Project owner brief: initial products are expected to be bottle/package-type products (perfumes, fragrances, body care, sprays, essential oils or similar).
- [D] The CDC wording ("produits tendance et accessoires premium") is broader than the brief. Exact initial product line → to confirm.

## Business model
- [A] **100% Cash on Delivery (COD)** — "Paiement à la Livraison" (CDC §1). No online payment.
- [A] Market: **Morocco** only (CDC header, §1, §3).

## Goals stated in the CDC (§1)
- [A] Ultra-fast mobile store.
- [A] Maximum conversion rate.
- [A] Sober, high-end ("sobre et haut de gamme") design.
- [A] Simplified daily management: adding products and following orders **without touching code**.

## Acquisition context
- [A] More than 90% of traffic comes from **smartphone ads on TikTok / Meta Ads** (CDC §2).
- [A] Meta Pixel + Conversions API (CAPI) and TikTok Pixel are required (CDC §5). See `requirements.md`.

## COD workflow (as described by the CDC)
1. [A] Visitor lands (mostly from TikTok/Meta ad, on mobile).
2. [A] Visitor orders directly from the product page (or a dedicated non-intrusive popup) by filling only: full name, phone (WhatsApp), city / delivery address (CDC §3).
3. [A] Order is recorded and synced **in real time** to Google Sheets (Nom, Tél, Ville, Produit, Prix, Date) (CDC §4).
4. [A] Sales team calls the customer to confirm the order ("appels de confirmation") (CDC §4).
5. [A] Shipping labels can be exported/printed for Moroccan carriers (Amana, Cathedis, Ozone, etc.) (CDC §4).
6. [A] Delivery 24/48h everywhere in Morocco; customer pays on receipt; customer may inspect the parcel before paying (CDC §3 reassurance badges).
- [D] Order statuses, confirmation script, cancellation handling, returns logistics: Non spécifié dans le cahier des charges.

## Initial product situation
- [A] CDC deliverable: integration of **3 test products supplied by the client** (CDC §6).
- [A] Brief: launch may contain only 2 or 3 products.
- [D] Product names, prices, descriptions, media: not provided yet. **Do not invent them.**

## Future category expansion
- [A] Brief: the store may later contain multiple categories with completely different product shapes and presentation. Architecture and design must not be hardcoded around the first products.
- [D] Future categories: Non spécifié dans le cahier des charges.

## Not specified in the CDC
- Shipping fees / free shipping threshold — Non spécifié dans le cahier des charges.
- Delivery zones exceptions — "partout au Maroc" only.
- Return / exchange conditions (only the need for a policy page is specified).
- Customer accounts, loyalty, coupons, upsells, bundles — Non spécifié dans le cahier des charges.
- Site language(s) — Non spécifié explicitly (see `requirements.md`).

## Budget & timeline (CDC §7)
- [A] Timeline: to be defined by provider (estimated 3 to 7 days).
- [A] Payment: per accepted quote (deposit at start, balance after test validation and go-live).
