# Architecture — KONOUZ MARKET (analysis only, nothing implemented)

Legend: **[A] Confirmed** · **[C] Recommendation** · **[D] Open question**.

## Overview
- [A] CDC §5 lets the provider choose the stack, provided the admin is simple and the solution is light.
- [A] Project owner decision: **headless** — **Next.js** customer-facing storefront + **WordPress/WooCommerce** commerce backend.
- [A] The client manages the store in WordPress/WooCommerce **without editing Next.js code**.

```
[Customer mobile browser]
        │  HTML/JS (SSG/ISR, edge-cached)
        ▼
[Next.js storefront — konouzmarket.com]
        │  server-side only (secrets never in browser)
        ├──► WooCommerce REST API  (read products, create orders)
        ├──► Meta Conversions API  (server Purchase event)
        └──► (Google Sheets — via WP/Woo hook or Next.js server) 
[WordPress + WooCommerce — admin/backend, e.g. subdomain]
        └──► Google Sheets, shipping-label plugin/export
```

## Next.js frontend role [A/C]
- Render all public pages: home, category/listing, product, thank-you, legal pages.
- Product data fetched from WooCommerce at build/revalidate time [C: ISR + on-demand revalidation via Woo webhook on product update].
- COD order form posts to a **Next.js server route / server action**, which validates input and creates the order in WooCommerce server-side.
- Fire client pixels (Meta, TikTok) and server CAPI; Purchase only after successful order creation.
- No cart, no online payment.

## WordPress / WooCommerce role [A]
- Products, prices, sale prices (strikethrough), product media (photos/videos), inventory, orders, other commerce admin.
- [C] Also host: legal page content (WP pages), global settings (WhatsApp number, reassurance texts) via an options page or similar, so the client never edits code.
- [C] Categories + a per-category "presentation variant" field to drive layout (bottle/vertical vs others).
- [C] Orders created with payment method = COD, status e.g. "processing/on-hold" pending phone confirmation.

## Expected data flow [C]
1. **Catalog**: Woo admin edit → webhook → Next.js revalidates affected pages → fast static pages.
2. **Order**: form submit → Next.js server validates (name, Moroccan phone, city/address), anti-spam → Woo REST `POST /orders` (COD) → returns order ID → redirect to thank-you page keyed by order ID.
3. **Google Sheets**: on Woo order creation → append row (Nom, Tél, Ville, Produit, Prix, Date). Options: WP plugin / Woo webhook to Google Apps Script / Next.js server calling Sheets API. [D] choose in a dedicated batch.
4. **Tracking**: thank-you page fires Pixel `Purchase` once (guard with order ID stored as "already fired" to prevent refresh duplicates); server sends CAPI `Purchase` with same `event_id` for deduplication; TikTok Pixel `CompletePayment`/Purchase-equivalent once.
5. **Labels**: from WooCommerce admin via export/plugin for Moroccan carriers. [D] mechanism per carrier.

## Future extensibility [A/C]
- [A] Must not be hardcoded around the first 2–3 products.
- [C] Everything product-related is data-driven (slugs, categories, attributes, media from Woo).
- [C] Category-level presentation variants; generic product-page sections that render only when data exists.
- [C] Typed data layer (adapter) between Woo responses and UI components so the backend could change later.
- [C] Variants (sizes/volumes) supported by the data model even if not used at launch.

## Performance considerations
- [A] < 2 s mobile load, WebP images, efficient caching, green PageSpeed mobile.
- [C] Static/ISR rendering, CDN caching, `next/image` (WebP/AVIF, responsive sizes), self-hosted subset Arabic font with `font-display: swap`, minimal JS on product pages, pixels loaded after interaction/idle where compatible with tracking accuracy, no heavy UI libraries, video lazy-loaded.
- [D] Hosting for Next.js: Hostinger (current) — Node.js support depends on plan. Alternatives (e.g. Vercel for frontend, Hostinger for WP) to be confirmed with client.

## Security considerations [C]
- Woo consumer key/secret, CAPI token, Google credentials: **server-side env vars only**, never exposed to the client.
- Woo REST keys with minimal permissions; WordPress admin on a separate subdomain, strong auth, updates.
- Server-side validation and sanitization of order input; rate limiting, honeypot, duplicate-order detection.
- Webhook signature verification for revalidation endpoints.
- HTTPS everywhere; CORS restricted.
- Personal data (name, phone, address) minimized in logs; [D] privacy/CNDP obligations to confirm.

## Not decided yet
Hosting topology, WP domain/subdomain, Sheets integration method, label/carrier mechanism, i18n/RTL strategy, analytics beyond Meta/TikTok. See `docs/decisions/decisions.md`.
