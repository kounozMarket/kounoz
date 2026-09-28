/**
 * Site-wide configuration.
 * Values marked PLACEHOLDER are not confirmed by the client yet
 * (see docs/decisions/decisions.md open questions) and must not be treated as final.
 */
export const siteConfig = {
  name: "KONOUZ MARKET",
  domain: "konouzmarket.shop",
  locale: "fr-MA",
  lang: "fr",

  /**
   * WhatsApp number in international format without "+" (e.g. 2126XXXXXXXX).
   * PLACEHOLDER: set NEXT_PUBLIC_WHATSAPP_NUMBER once the client provides it (Q-05).
   * While empty, the floating button renders in a non-functional placeholder state.
   */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",

  /** Order CTA (owner, D-22 — closes Q-20). Primary action everywhere. */
  orderCtaLabel: "Commander maintenant",
  /** Secondary action on product pages (D-22). */
  addToCartLabel: "Ajouter au panier",

  /** Price suffix. Recommendation (not in the CDC): "DH", the usual MAD notation in Morocco. */
  currencyLabel: "DH",

  /** Main navigation — items and French labels from the project owner. */
  mainNav: [
    { label: "Accueil", href: "/" },
    { label: "Nos engagements", href: "/#engagements" },
    { label: "Boutique", href: "/boutique" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],

  /** Required legal pages (CDC §6, D-10). Content: src/content/legal.ts. */
  legalPages: [
    { label: "Politique de livraison", href: "/politique-de-livraison" },
    { label: "Conditions générales", href: "/conditions-generales" },
    { label: "Politique de retour et d'échange", href: "/politique-de-retour" },
  ],

  /** Confirmed reassurance badges (CDC §3, D-07). Wording is the CDC's own French text. */
  reassurance: [
    { id: "delivery", label: "Livraison 24/48h partout au Maroc" },
    { id: "cod", label: "Paiement à la réception" },
    { id: "check", label: "Droit de vérification du colis avant paiement" },
  ],
} as const;

export function whatsappHref(number: string): string | null {
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}
