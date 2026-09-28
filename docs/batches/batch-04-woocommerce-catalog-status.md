# Batch 04 — WooCommerce catalogue — STATUS: COMPLETE

Date: 2026-09-28. The WordPress/WooCommerce backend is at `admin.konouzmarket.com`. Installed plugins: ACF, WooCommerce, WPGraphQL (+ ACF, Smart Cache).

## Findings (live checks)
- REST `wc/v3` works with the owner's key. Store is in MAD, country MA. **COD is the only enabled gateway.**
- WPGraphQL works but **does not expose products** (it would need WPGraphQL for WooCommerce). So the REST API is used (D-27); the GraphQL plugins can be deactivated.
- 1 published product: "Test ynsWeb prod" (250 DH, was 300 DH), category *Beauté*, 4 JPEG photos.
  - The text is in `short_description` (HTML).
  - The ACF `presentation` field is not set on the category yet, so the product uses "studio" lighting.

## Implemented
- `src/lib/woo.ts`: server-only REST client (Basic auth over HTTPS, `import "server-only"`). Fetches are cached with `revalidate: 300` and tag `woo`.
- `src/lib/catalog.ts`:
  - async `getProducts()` / `getProductBySlug()`, deduplicated per request with React `cache`
  - mapping: decoded names, first real category, price and sale price, photos with ratios from `wp/v2/media`, sanitised description, stock
  - hidden products are excluded
  - on failure the catalogue is empty (logged) and the build succeeds
- `src/lib/html.ts`: `sanitize-html` allowlist (p, strong, em, lists, h3/h4, links), plus an entity decoder.
- `next.config.mjs`: `images.remotePatterns` for `https://<WOO host>/wp-content/uploads/**`. Photos are served resized, as WebP.
- Pages use ISR (5 min):
  - `/`: hero features the first product, with its photo in the stage and a thumbnail on the mini card
  - `/boutique`: live count, plus an empty state
  - `/produit/[slug]`: SSG + on-demand for new slugs, real gallery thumbnails, HTML description, "Rupture de stock" when out of stock
- Cart: lines now store a display snapshot (`CartProduct`). Old sample lines are ignored. Real thumbnails (`ProductThumb`) appear in the cart and summaries.
- Removed: `src/data/sample-products.ts` and the "Données d'exemple" tags.
- `.env.example` documents `WOO_*`. Local keys are in `.env.local` (git-ignored).

## Verification
- tsc, lint and build pass. Also a WASM build (`NEXT_TEST_WASM=1`, Hostinger conditions).
- `next start` against the live Woo:
  - `/`, `/boutique`, `/produit/test-ynsweb-prod` return 200; old sample slugs return 404
  - title, sale price, description and 4 photos render; the image optimizer returns WebP of about 42 KB
- Playwright (iPhone 13): add to cart gives a 250 DH cart; no page errors; no overflow on `/`, `/boutique`, product and cart. The desktop product page and hero were reviewed.

## Owner actions
- **Hostinger → Node.js app → Environment variables**: add `WOO_URL`, `WOO_CONSUMER_KEY`, `WOO_CONSUMER_SECRET`, then redeploy. Without them the live catalogue is empty; maintenance stays ON (D-26).
- Regenerate the Woo key once everything works (it was pasted in chat).
- ACF: add the `presentation` select (`stage` / `studio`) on Product categories, with "Show in REST API" on.
- WooCommerce: set price decimals to 0 (currently 2; the display rounds anyway).

## Next — Batch 05: real orders
- A route handler validates the order server-side, re-reads prices from Woo, and creates the COD order (`POST wc/v3/orders`).
- Thank-you page.
- Anti-spam.
- Then Google Sheets (Q-09) and Pixels/CAPI (Q-16).
