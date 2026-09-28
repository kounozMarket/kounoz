# Batch 05 — Real COD orders — STATUS: COMPLETE

Date: 2026-09-28. Owner report: « Commander maintenant » still showed the "Aucune commande n'a été envoyée" placeholder.

## Implemented (D-28)
- `src/lib/orders.ts` (server-only):
  - `createCodOrder`:
    - re-validates the fields
    - merges and clamps quantities (1–10, max 20 lines)
    - live-checks each product (published, purchasable, not out of stock)
    - POSTs `wc/v3/orders` with `payment_method: cod`, `set_paid: false`, `status: processing`, billing and shipping (country MA), `_km_source=storefront` meta
    - totals are computed by WooCommerce; no client price is ever used
  - `getOrderForThankYou`: returns the order only when id + `order_key` match.
- `src/lib/woo.ts`: `wooRequest` (uncached GET/POST/DELETE) and the `WooOrder` type.
- `src/app/api/commande/route.ts`: JSON API. Guards:
  - config check
  - honeypot `website`
  - form open for ≥ 3 s
  - rate limit of 5 per 10 min per IP
  - `requestId` idempotency
  - French error messages (field errors come back to the form)
- `src/app/merci/[id]/page.tsx`: thank-you page. It shows the first name, the phone to be called, order n°, lines, the total to pay on delivery, the address and badges. noindex; 404 on a wrong or missing key.
- Client:
  - `useCodForm` posts the order, has submitting / error states, and redirects to `/merci`
  - `SubmitArea`: spinner "Envoi de la commande…", error alert, honeypot
  - Product page: the order is for this product × qty
  - Checkout: the order is the cart lines; the cart is cleared on success
- Removed: `SubmitNotice`. Added: `src/lib/cart-limits.ts` (qty limits shared by client and server).

## Verification (live WooCommerce, WASM build + `next start`)
- Product-page order: ×2 → redirect to `/merci/19` showing "Merci TEST Claude, c'est commandé !" and 500 DH. In WooCommerce: processing / cod / unpaid, phone `+212612345678`, city, address, country MA, line total 500 MAD.
- Checkout order → `/merci/20`, and the cart badge is empty afterwards.
- Double submit with the same `requestId` → the same order (#21 twice).
- Rejections, none of which created an order:
  - bad phone → 422 with a field error
  - honeypot → 400
  - too fast → 400
  - unknown product → 409
  - no items → 422
  - invalid JSON → 400
- Thank-you page: wrong key 404, no key 404, right key 200.
- **Test orders #19, #20, #21 were deleted** (only orders whose address contains "TEST"). The store is back to 0 orders.
- tsc, lint and build pass.

## Notes
- Maintenance (D-26) also covers `/api/commande`: while it is ON, only preview-cookie browsers can order.
- The rate limit and idempotency live in memory: they reset on app restart. That is fine for one Node process; use a shared store if the app ever scales out.
- Woo sends its own new-order e-mails (WooCommerce → Settings → Emails).

## Next
- Google Sheets row per order (Q-09: Google account/sheet): Woo webhook or server-side append.
- Purchase events on `/merci`, fired once (Meta Pixel + CAPI with a shared event_id, TikTok) (Q-16: IDs/tokens).
