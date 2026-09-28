# Batch 03 — Product page, cart, checkout (UI, no backend) — STATUS: COMPLETE

Date: 2026-09-27. Owner request: single product page (responsive), French buttons « Commander maintenant » / « Ajouter au panier », cart page, and a checkout page with Contact / Delivery / Your order sections.
Owner decisions (D-22): both flows with direct order first, and a quantity selector.

## Routes
| Route | Content |
|---|---|
| `/produit/[slug]` | SSG for the 4 sample products (`dynamicParams = false`, unknown slug → 404). Contents: breadcrumb, gallery, buy box, inline COD form, description, "Vous aimerez aussi". |
| `/panier` | Cart lines (visual, name, unit price, qty stepper, line total, remove), "Continuer mes achats", sticky "Récapitulatif" with « Passer la commande ». Empty state. |
| `/commande` | Checkout form. Steps 1 "Informations de contact" (Nom complet, Numéro de téléphone · WhatsApp) and 2 "Informations de livraison" (Ville, Adresse de livraison), then step 3 "Votre commande" (lines, sous-total, livraison « À confirmer », total hors livraison, "Paiement à la réception", badges, « Confirmer la commande »). Empty state. |

## Product page
- **Gallery**: the main view keeps the product ratio. Height is capped at 46svh on phones and 72svh on desktop, so name, price and CTAs stay near the fold. Thumbnails appear only when there are more than 1 view. The discount badge is derived from the data. It is sticky on desktop.
- **Buy box**:
  - category pill, "Données d'exemple" tag, bold name, `Price`, 3 confirmed badges
  - quantity stepper (1–10)
  - **« Commander maintenant »** (gold, full width) scrolls to `#commander` and focuses "Nom complet"
  - **« Ajouter au panier »** (secondary) adds qty × product, shows "Ajouté au panier" feedback plus a "Voir le panier" link, and updates the header badge
- **Inline COD form** (`#commander`): the same fields as checkout, a summary with an editable qty, and « Confirmer la commande ».
- **Sticky mobile CTA bar**: name, price and « Commander maintenant ». It shows whenever neither the buy box nor the form is on screen (IntersectionObserver). While it is visible, the floating WhatsApp button moves above it.
- Missing description → "À compléter" marker (Q-12). Nothing is invented.

## Shared order layer
- `src/lib/catalog.ts`: `getProducts`, `getProductBySlug`, `getProductById`. This is the single swap point for WooCommerce.
- `src/lib/cart.ts`: localStorage cart (`km-cart`, ids + qty only; prices always come from the catalogue). Built on `useSyncExternalStore`, so it syncs across tabs and is safe when storage is blocked.
- `src/lib/validation.ts`: French error messages. Moroccan phone validation accepts `0[5-7]XXXXXXXX`, or `+212` / `00212` / `212` followed by `[5-7]XXXXXXXX` (spaces, dots and dashes ignored). The number is normalised to `+212…`.
- `src/components/order/`:
  - `CodFields`: labelled inputs, `inputMode="tel"`, autocomplete, `aria-invalid` + error text, focus goes to the first error
  - `OrderSummary`
  - `QtyStepper` (48 px touch targets)
  - `useCodForm`
  - `SubmitNotice`
  - `CartView`, `CheckoutView`, `EmptyCart`, `useCartLines`
- Header: bag icon with a count badge on all sizes.
- Home hero « Commander maintenant » now links to the featured product's `#commander`. The closing band links to the boutique.
- `siteConfig.orderCtaLabel` = « Commander maintenant » (Q-20 closed). `addToCartLabel` = « Ajouter au panier ».
- Prices use French grouping ("1 047 DH").

## Not connected (by design, later batch)
- **No order is sent.** A valid submit shows a "Formulaire valide — … Aucune commande n'a été envoyée" notice (`data-placeholder="order-backend"`). The cart is not cleared.
- Still to build: WooCommerce order creation, Google Sheets row (Nom, Tél, Ville, Produit, Prix, Date), the thank-you page, and the Purchase event (Meta + CAPI, TikTok), fired once and refresh-safe.
- Delivery fee: "À confirmer" everywhere (Q-04). It is never shown as free.
- Anti-spam / duplicate-order protection: not yet (Recommendation in requirements §4).

## Verification
- `npx tsc --noEmit` — pass (after `next typegen` for the new route).
- `npm run lint` — pass.
- `npm run build` — pass. 15 routes; the 4 product pages are SSG.
- Playwright iPhone 13 end-to-end (scratchpad only), with no page errors:
  - "+1" then « Ajouter au panier » → header shows "Panier, 2 articles"
  - « Commander maintenant » → focus goes to `name`
  - empty submit → 4 errors
  - bad phone → phone error only
  - valid → notice
  - cart total 598 DH, then 897 DH after "+"
  - checkout valid submit → notice
  - empty cart state OK
  - sticky bar shows once the buy box and form are off-screen
- No horizontal overflow at 375 / 390 / 430 on the product (A, C), cart and checkout pages, nor on the 8 earlier routes.
- Mobile and desktop screenshots reviewed: product, form, cart, checkout.

## Next
- **Batch 04 — Order backend**:
  - Next.js route handler: server-side validation, WooCommerce order (COD), Google Sheets append
  - thank-you page
  - Purchase event with dedup (event_id shared by Pixel and CAPI)
  - anti-spam
  - secrets server-side only
- Replace sample data with WooCommerce products (`src/lib/catalog.ts`).
