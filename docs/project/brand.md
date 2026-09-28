# Brand — KONOUZ MARKET

Legend: **[A] Confirmed** · **[B] Inspiration** · **[C] Recommendation** · **[D] Open question**.

## Name
- [A] Official brand name: **KONOUZ MARKET** (uppercase in the logo and CDC).
- [D] Arabic spelling of the brand name for Arabic UI (e.g. كنوز ماركت) — not provided; do not invent. To confirm.

## Logo assets (official — never recreate or redesign)
| File | Content | Size | Format |
|---|---|---|---|
| `logos/logo.png` | Gold script **"KM" monogram + subtitle "KONOUZ MARKET"** (spaced uppercase sans-serif) | 1054×567 | PNG, transparent (RGBA) |
| `logos/logo without sub title.png` | Gold script **"KM" monogram only**, no subtitle | 992×404 | PNG, transparent (RGBA) |

- Colours: gold gradient (lighter warm gold at top → deeper bronze/amber at bottom). Designed for dark backgrounds.
- [C] Recommended usage (not implemented yet):
  - `logo.png` (with subtitle): footer brand block, about/brand sections, social share image (OG), loading/splash, anywhere with enough room for the subtitle to stay legible.
  - `logo without sub title.png` (monogram): compact header (especially mobile), favicon / app icon source, small placements where the subtitle would be illegible.
  - Keep generous clear space; never place on busy imagery or light backgrounds; do not recolour, stretch, or add effects.
- [C] Optimized derivatives (WebP/AVIF, trimmed sizes, favicon set) should be generated from these files later, keeping originals untouched.
- [D] Vector (SVG) version of the logo — not provided. Would improve sharpness and weight.

## Official colour palette (project owner brief)
| Role | Hex |
|---|---|
| Primary accent (gold) | `#D4A359` |
| Primary hover / focus | `#B37D37` |
| Main background | `#111215` |
| Surface / card background | `#1A1B1E` |
| Footer / secondary surface | `#2C2B2A` |
| Primary text | `#F5F5F7` |
| Secondary / muted text | `#9E9E9E` |

- [A] Gold is a **premium accent, not everywhere**. The site stays dark and premium without gold overload.
- Note: the CDC §2 says "Noir pur #000000". The brief's official palette uses `#111215` as main background. See `decisions/decisions.md` (D-04).
- [C] Suggested gold usage: primary CTA, key prices, small labels/eyebrows, active/focus states, thin dividers, icon strokes. Avoid gold body text and large gold surfaces.
- [C] Check contrast: `#9E9E9E` on `#111215` passes WCAG AA for normal text (~7:1); dark text on `#D4A359` buttons should be verified at implementation.

## Visual direction
- [A] Dark, premium, minimal, elegant, modern, mobile-first, product-focused (brief).
- [A] Apple-like minimalism, sober white and gold typography, sharp contrasts (CDC §2).
- [A] General feeling inspired by the reference PDFs and the dark presentation style of nakamastore.ma — **but with its own KONOUZ MARKET identity. Do not clone.**

## Typography
- [A] Arabic: modern, readable font, e.g. **Cairo** or **Readex Pro** (CDC §2).
- [A] Latin text / numbers: **system sans-serif** (CDC §2).
- [B] The references use a high-contrast serif display face for large English titles and wide letter-spaced uppercase labels. This is inspiration only; it conflicts partly with the CDC typography guidance.
- [D] Final font choice (Cairo vs Readex Pro) — to confirm.

## Product imagery rules
- [C] Product is the hero: centred, dark/neutral backdrop, soft directional light, subtle gold rim/glow at most.
- [C] Consistent aspect ratios per category, defined as a category-level setting rather than globally.
- [C] All imagery supplied by client via WooCommerce media; served optimized (WebP, responsive sizes).
- [D] Product photos/videos: not supplied yet. Quality/style of client photography unknown.

### Bottle/package products vs future categories
- [A] The bottle/package visual treatment (tall centered product, pedestal/spotlight feel, vertical composition) is relevant to **perfumes, fragrances, body care, sprays, essential oils and similar**.
- [A] It must **not** be forced on future categories with different product shapes.
- [C] Implement presentation as per-category "presentation variants" (e.g. `vertical-hero` for bottles, `wide`/`square` for other shapes), chosen via category data in WooCommerce, never hardcoded to product IDs.
- [D] The brief mentions a "supplied packaging/product visual reference"; **no such file is present in the project folder** — the two PDFs show decorative katanas (nakamastore.ma). To confirm whether an additional packaging reference exists.
