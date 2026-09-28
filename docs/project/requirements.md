# Requirements — KONOUZ MARKET

Legend: **[A] Confirmed** (CDC / project owner) · **[B] Inspiration** · **[C] Recommendation** · **[D] Open question**.
CDC = `Cahier des Charges - KONOUZ MARKET (1).docx`. Section numbers refer to the CDC.

## 1. Functional requirements

### Storefront / order funnel (CDC §3)
- [A] The standard funnel (Cart > complex billing details > online payment) must be **totally forbidden** ("totalement proscrit").
- [A] **Direct one-page checkout**: order directly on the product page, or via a dedicated **non-intrusive popup**.
- [A] Order form fields — **only**:
  1. Nom et prénom (full name)
  2. Numéro de téléphone (WhatsApp)
  3. Ville / Adresse de livraison (city / delivery address)
- [A] CTA: visible, punchy, text: **« اطلب الآن والدفع عند الاستلام »** ("Order now, pay on delivery").
- [A] Reassurance badges, clearly integrated:
  - Livraison 24/48h partout au Maroc
  - Paiement à la réception
  - Droit de vérification du colis avant paiement
- [A] **Floating WhatsApp button on all pages** for direct information requests.
- [D] Whether "Ville / Adresse" is one field or two (city + address) — ambiguous in the CDC.
- [D] Quantity selector, product variants (size/volume), multi-product orders — Non spécifié dans le cahier des charges.
- [D] WhatsApp number to use — not provided.
- [D] Post-order confirmation / thank-you page content — Non spécifié dans le cahier des charges.
- [D] Cart: the CDC forbids the standard cart funnel. Whether any cart exists at all — Non spécifié; default assumption is **no cart** (see decisions).
- [C] Moroccan phone-number validation (e.g. 06/07/+212 formats) to reduce fake orders.

### Back-office (CDC §4)
- [A] Client manages the store autonomously, day to day.
- [A] Catalog management: clear interface to add, edit, or deactivate a product; change its price **with strikethrough price for promotions**; add photos/videos in a few clicks.
- [A] Order follow-up without touching code (CDC §1).
- [A] Shipping labels: possibility to **export or print delivery labels** for Moroccan carriers (**Amana, Cathedis, Ozone, etc.**).
- [D] Label format/mechanism per carrier (CSV export, PDF label, carrier API/plugin) — Non spécifié dans le cahier des charges.
- [D] Which carrier(s) the client actually uses — only examples are listed.

### Google Sheets sync (CDC §4)
- [A] Every new order must be recorded **automatically, in real time** in a Google Sheets spreadsheet.
- [A] Columns: **Nom, Tél, Ville, Produit, Prix, Date**.
- [A] Purpose: facilitate confirmation calls by the sales team.
- [D] Google account / spreadsheet ownership, sheet structure beyond these 6 columns (address, order ID, status, quantity) — Non spécifié.
- [C] Also add order ID and full address columns (to be confirmed — not a requirement).

## 2. UX/UI requirements (CDC §2)
- [A] Full dark theme — CDC text: "Dark mode intégral / Noir pur #000000".
  - **Note:** the project owner's brief defines the official palette with main background `#111215` (see `brand.md`, `decisions.md` D-04).
- [A] Clean, modern style **inspired by the Apple universe** (minimalism, sober white and gold typography, sharp contrasts).
- [A] Typography: modern, readable **Arabic font (e.g. Cairo or Readex Pro)**, paired with a **system sans-serif** for Latin text/numbers.
- [A] Mobile-first: mobile display must be flawless.
- [A] **Update 2026-09-27 (D-15): site is French, LTR, no Arabic RTL.** The note below is historical.
- [D] (historical) Site language(s): Non spécifié explicitly. The Arabic CTA and Arabic font requirement strongly imply Arabic (RTL) customer-facing content; French/Latin presence is implied only for Latin text/numbers. → To confirm (Arabic only? Arabic + French?).

## 3. Performance requirements (CDC §2, §5)
- [A] Load time **< 2 seconds** on mobile.
- [A] Automatic image compression (**WebP**).
- [A] Efficient caching.
- [A] **Green mobile PageSpeed score**.
- [A] Solution must be optimized "sans lourdeur" (no bloat).

## 4. Order requirements (summary)
- [A] COD only. No online payment method.
- [A] 3-field order form (see §1).
- [A] Real-time Google Sheets entry per order.
- [A] Purchase tracking event fired once, only after COD form validation (see §6).
- [A] Label export/print for Moroccan carriers.
- [D] Anti-spam / duplicate-order protection — Non spécifié. [C] Recommended (rate limit, honeypot, duplicate phone detection).
- [D] Shipping cost shown to customer — Non spécifié.
- [D] Stock management behaviour when out of stock — Non spécifié.

## 5. Technical requirements (CDC §5)
- [A] CMS is the provider's choice: "WordPress/WooCommerce optimisé sans lourdeur, Shopify, ou CMS headless léger", **provided the admin interface is simple**.
- [A] Project owner decision: **Next.js headless storefront + WordPress/WooCommerce backend** (see `architecture.md`).
- [A] Deployed on **konouzmarket.com** (D-25; the CDC said konouzmarket.shop). Hosting: Hostinger, Node.js app (D-23, D-24).
- [D] Where the Next.js frontend and WordPress backend will be hosted (Hostinger plan capabilities, subdomain for WP) — Non spécifié.

## 6. Tracking requirements (CDC §5)
- [A] **Meta Pixel** (Facebook / Instagram) installed and configured **with Conversions API (CAPI)**.
- [A] **TikTok Pixel** installed.
- [A] **Purchase** event fired cleanly **only after COD form validation**, **no duplicate on refresh**.
- [D] Other events (ViewContent, InitiateCheckout, etc.) — Non spécifié dans le cahier des charges.
- [D] TikTok Events API (server-side) — not required by CDC (only TikTok Pixel). [C] Could be considered later.
- [D] Pixel IDs, CAPI access token, Business Manager access — to be supplied by client.
- [D] Google Analytics / GTM — Non spécifié dans le cahier des charges.
- [D] Cookie consent banner — Non spécifié dans le cahier des charges.

## 7. Legal requirements (CDC §6)
- [A] Required legal pages:
  - Politique de livraison (shipping policy)
  - Conditions générales (terms & conditions)
  - Politique de retour/échange (return/exchange policy)
- [D] Content of these pages — not provided. Must come from the client. **Do not invent policies.**
- [D] Privacy policy, legal mentions (company name, ICE, address), CNDP (Moroccan data protection) declaration — Non spécifié dans le cahier des charges.

## 8. Deliverables (CDC §6)
- [A] Functional store deployed on **konouzmarket.com** (D-25).
- [A] Legal pages integrated (shipping, T&C, return/exchange).
- [A] Integration and formatting of **3 test products (supplied by the client)**.
- [A] Complete setup of pixels and Google Sheets sync.
- [A] Short handover session or **short video tutorial (3–5 min)** showing how to add a new product and process an order.

## 9. Delivery terms (CDC §7)
- [A] Timeline: defined by provider, estimated **3 to 7 days**.
- [A] Budget per accepted quote; deposit at start, balance after tests validated and go-live.

## 10. Explicitly NOT specified in the CDC (do not invent)
Product names, prices, descriptions, categories, shipping fees, carrier choice, customer accounts, search, reviews/testimonials, blog, coupons, upsells, multilingual support, analytics beyond Meta/TikTok, email/SMS notifications, contact page content, social media handles.
