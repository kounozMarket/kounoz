# Batch 07: social links

Status: **done**. Date: 2026-10-11.

Official client accounts (Confirmed, owner 2026-10-11), tracking params stripped:
- Instagram: https://www.instagram.com/marketkonouz
- Facebook: https://www.facebook.com/share/1F9VkYAgim/
- TikTok: https://www.tiktok.com/@konouzmarket

## Changes
- `siteConfig.social` holds the 3 links (single source).
- `src/components/ui/SocialLinks.tsx`: official brand glyphs (filled SVG, currentColor) + `SocialLinks` with two variants: `icons` (round buttons) and `cards` (labelled gold-icon tiles with @handle; Facebook share link shows the company name).
- Footer: icon row before WhatsApp / ©.
- `/contact`: « Suivez-nous » section with 3 cards under the coordinates.
- `/a-propos`: icon row at the bottom of the « Notre mission » card.
- All links open in a new tab (`noopener noreferrer`), icon-only links have an `aria-label`.

## Verification
- `npx tsc --noEmit`, `npm run lint`, `npm run build`: pass. No browser check.

## Next
- Google Sheets + Purchase events (see batch 05).
