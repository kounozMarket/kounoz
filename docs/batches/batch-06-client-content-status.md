# Batch 06: official client content (content-only)

Status: **done**. Date: 2026-10-04. Decision: D-30.

Scope: content only. No redesign. Architecture, ordering logic, Woo integration, tracking and the order-form field count were not changed.

## Changes
- `/a-propos`: the header intro is the client's welcome paragraph. The brand card ("Notre mission") holds the mission and trust paragraphs. Engagements is shown with the title « Pourquoi choisir Konouz Market ? ».
- `/#engagements` (`Engagements.tsx`): the 4 client commitments, numbered 01–04, each with a title and a description. Data: `siteConfig.engagements`. The cards and motion are unchanged. The grid goes from 3 columns to `md:2 / xl:4` to fit 4 items. Two line icons were added (`ShieldCheckIcon`, `ChatIcon`).
  - The reassurance badges (`siteConfig.reassurance`: hero, header, product, checkout, thank-you) are **unchanged**.
- `/contact`: the 4 « À compléter » cards are replaced by: Siège administratif, Code postal, E-mail (mailto), Activité. Data: `siteConfig.contact`. The WhatsApp card still uses `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- `src/content/legal.ts`:
  - Livraison: Morocco-wide coverage, partner delivery companies, data shared only with the carrier, payment after the parcel is received and checked. Kept from the CDC: 24/48h. Still « À compléter »: fees (Q-04) and delay details (Q-11). The carrier/incident placeholders were replaced by client wording or dropped.
  - Conditions générales:
    - the seller block now has the client details
    - the order section says the order is placed « depuis la fiche produit ou le panier » (D-22)
    - the COD wording is the client's
    - the section links to the privacy page
    - still « À compléter »: ICE/RC, fees, governing law
  - Retour → « Politique d'échange et de remboursement »: the client text verbatim (Droit d'échange, Délai 48 h, Conditions, Frais de retour). Nothing added.
  - New `privacyPolicy` + route `/politique-de-confidentialite` (same `LegalPage` template). It is linked in the footer through `siteConfig.legalPages`.
- `CodFields.tsx` (follow-up, owner request): the « WhatsApp » hint next to the phone label is hidden. Each label now shows its Arabic name on the right (الاسم الكامل, رقم الهاتف, المدينة, عنوان التوصيل; `lang="ar" dir="rtl"`).
- `CodFields.tsx`: placeholders. Nom complet — الاسم الكامل, Téléphone — رقم الهاتف, Ville — المدينة, Adresse — العنوان. The same 4 fields; names, labels, validation and submission are unchanged.
- Domain: already `konouzmarket.com` (D-25). No `.shop` reference left in the code, so there was no change.

## Verification
- `npx tsc --noEmit`, `npm run lint`, `npm run build`: pass (17 routes, incl. `/politique-de-confidentialite`).
- Dev server: `/`, `/a-propos`, `/contact`, the 4 legal pages and `/commande` return 200 with the new content.

## Remaining
- `NEXT_PUBLIC_WHATSAPP_NUMBER` is not set in `.env.local`. Without it, the contact card and the floating button show the placeholder. Check that it is set on Hostinger (Q-05).
- Open legal items: Q-04, Q-11. The client's exchange text is titled « remboursement » but defines no refund procedure. Kept as provided.
- The footer label stays « Politique de retour et d'échange » (footer not in scope). The page title is now « Politique d'échange et de remboursement ».

## Next
- None started. Next planned: Google Sheets + Purchase events (see batch 05).
