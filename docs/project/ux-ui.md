# UX / UI — KONOUZ MARKET

Legend: **[A] Confirmed** · **[B] Inspiration** · **[C] Recommendation** · **[D] Open question**.

## 0. About the reference files
- `inspire home_Page.pdf` (2 pages) and `inspire single_Product.pdf` (1 page) contain **desktop screenshots only** (1440 px wide @2x) of **nakamastore.ma** ("NAKAMA STORE" — decorative wooden katanas, Black Dragon / White Dragon). No text layer, no mobile views.
- Everything in §1–§2 is **[B] inspiration**: layout mood and patterns, **not** requirements. Their content (katanas, dragons, Japanese text, "free delivery", "Add to cart", prices) must **not** be copied.
- Mobile behaviour is **not visible** in the references; mobile design must be derived from the CDC mobile-first requirement.

## 1. Homepage inspiration analysis [B]
Top to bottom:
1. **Header** (transparent over dark bg): left text nav in small wide-tracked uppercase (Catalogue, About, Quality, Contact); centred logo; right: pill toggle linking the two products + cart icon.
2. **Hero / collection intro**: Arabic calligraphic eyebrow in gold → small Japanese subline → very large thin serif uppercase title ("DRAGON COLLECTION") → tiny gold divider ornament → 2-line muted intro paragraph. Centred, lots of vertical air.
3. **Product showcase cards** (2 side by side, large, rounded ~16px, thin border): full-bleed atmospheric product image as card background; Arabic name in gold top-left; "AVAILABLE" outlined pill top-right; large serif product name; gold tracked tagline (3 words); short description; large price with small "DH"; two CTAs: solid gold "View details →" + outlined "Order now".
4. Outlined secondary CTA "View full catalogue".
5. **Closing CTA band**: Arabic eyebrow "اطلب الآن" → big serif headline → delivery promise sentence → solid gold "Order now" + outlined "View collection".
6. **"Why choose us"**: small gold eyebrow + serif headline; 4 cards (icon in small rounded square, small-caps serif title, muted text) — materials, audience, delivery, product range.
7. **Footer**: logo + brand paragraph + disclaimer; 3 link columns with gold tracked headings (Navigation, Collection, Contact with WhatsApp / Instagram / email); bottom bar with copyright + disclaimer.

Observations:
- Near-black background with very subtle texture/vignette; hierarchy by size and letter-spacing rather than colour.
- Gold used sparingly: eyebrows, primary buttons, small labels, dividers, border hints.
- Generous section padding (~120–160 px desktop), thin 1px section separators.
- Primary/secondary CTA pairs everywhere (solid gold + outlined).

## 2. Single product inspiration analysis [B]
1. Same header.
2. **Immersive hero**: full-width dark atmospheric scene; product vertically centred on a pedestal with spotlight; left column: Arabic name (gold), small script line, huge serif name split on 2 lines, short gold rule, gold tagline, divider, short description, small tracked material/disclaimer line.
3. Right column: "view controls" (eye / zoom + / zoom − / share round icon buttons) and **price block** ("Starting from 599 DH") with 2 bullet specs (size/material, delivery).
4. **Thumbnail gallery** below hero: 5 rounded thumbnails with small uppercase captions (Full view, Handle, Scabbard, Engraving, Kashira).
5. **Specifications strip**: 5 equal columns separated by thin vertical lines; round outlined gold icon, tiny gold label, value (Purpose, Length, Finish, Packaging, Delivery).
6. **CTA row**: solid gold "Order now" + outlined "Add to cart" + outlined "Catalogue".
7. Same footer.

Observations:
- The product is the visual hero; copy is short and poetic.
- Price is present but visually secondary to the product name.
- The order CTA is **below the fold** on desktop — **not suitable** for our COD/ad-traffic funnel (see §4).
- "Add to cart" conflicts with the CDC (standard cart funnel forbidden) — **do not adopt**.

## 3. Navigation
- [A] Floating WhatsApp button on **all pages** (CDC §3).
- [C] Mobile header: monogram logo centred or start-aligned, minimal (menu icon + WhatsApp shortcut optional). No cart icon (no cart).
- [C] Keep navigation shallow: Home, product/category listing, legal pages in footer. Category nav appears only when more than one category exists (data-driven).
- [C] Ad landing traffic goes straight to product pages; navigation must never distract from the order form there.
- [D] Menu items / pages beyond products + legal pages (About, Contact) — Non spécifié dans le cahier des charges.

## 4. Product presentation
- [A] Photos/videos managed by client (CDC §4); strikethrough price for promotions (CDC §4).
- [C] Product page order on mobile: media (swipeable gallery, video support) → name → price (sale + strikethrough) → reassurance badges → **order form/CTA** → description → specs → FAQ-like details (if client provides content).
- [C] Presentation variant driven by category (bottle/vertical vs other shapes) — see `brand.md`.
- [C] Product cards (home/listing): image, name, price/strikethrough, one CTA to the product page. Card layout must accept any aspect ratio.

## 5. CTA strategy
- [A] CTA text: **« اطلب الآن والدفع عند الاستلام »**, visible and punchy (CDC §3).
- [C] Solid gold primary button (`#D4A359`, hover `#B37D37`), high-contrast dark label, full width on mobile, min 48px tall.
- [C] **Sticky bottom CTA bar on mobile product pages** that scrolls to / opens the order form. Order CTA above the fold.
- [C] One primary action per screen; secondary actions outlined.

## 6. COD form strategy
- [A] Fields: full name, phone (WhatsApp), city / address. Nothing else required (CDC §3).
- [A] Inline on product page **or** dedicated non-intrusive popup (CDC §3).
- [D] Inline vs popup (or bottom-sheet on mobile) — to choose. [C] Recommendation: inline form on product page + sticky CTA that scrolls to it; bottom-sheet only if tested better.
- [C] Correct mobile keyboards (`inputmode="tel"`), large tap targets, RTL-aware labels, clear inline error messages in Arabic, disabled/loading state on submit to prevent double submit.
- [C] Show product summary + total price inside/next to the form.
- [C] After submission: dedicated thank-you page (one Purchase event, refresh-safe) telling the customer they will be called to confirm.

## 7. Trust / reassurance
- [A] Badges (CDC §3): Livraison 24/48h partout au Maroc · Paiement à la réception · Droit de vérification du colis avant paiement.
- [A] Floating WhatsApp.
- [C] Place badges directly next to the CTA/form, as compact icon + short text rows.
- [D] Customer reviews/testimonials, guarantees, "free delivery" — Non spécifié dans le cahier des charges. **Do not add claims** (the reference's "free delivery" is not a KONOUZ claim).

## 8. Mobile-first principles
- [A] >90% mobile traffic from TikTok/Meta ads; flawless mobile display; < 2s load (CDC §2).
- [C] Design at 360–430 px first; desktop is an enhancement.
- [C] 16–20 px side gutters; thumb-zone primary actions; no hover-dependent UI.
- [C] Arabic RTL layout by default (pending language confirmation).
- [C] Lightweight hero: optimized product image rather than heavy background scenes/videos above the fold (performance budget).
- [C] Scale down the reference's huge serif titles on mobile; prioritize the product image and CTA.

## 9. Spacing / layout observations (from references) [B]
- Centred compositions, large vertical rhythm, thin 1px separators, rounded cards (~12–16 px radius) with subtle borders, tiny wide-tracked uppercase labels, gold used for ≤10% of the surface.
- [C] Translate into a spacing scale (4/8-based) and tokens in the first implementation batch; tighter section padding on mobile (≈48–64 px).

## 10. Inspiration vs requirement summary
| Element | Status |
|---|---|
| Dark premium look, gold accents | [A] confirmed (CDC + brief) |
| Apple-like minimalism | [A] CDC |
| Serif display titles, Japanese sublines, dragon imagery | [B] inspiration only / not applicable |
| Product showcase cards with dual CTA | [B] |
| Specs strip with icons | [B] |
| Add to cart / cart icon | [B] — conflicts with CDC, not adopted |
| View controls (zoom/share) | [B] optional |
| Order CTA below the fold | [B] — rejected for our funnel |
| Floating WhatsApp, reassurance badges, 3-field COD form | [A] CDC |
