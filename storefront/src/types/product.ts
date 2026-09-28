import type { StaticImageData } from "next/image";

/**
 * Presentation variant, chosen per CATEGORY (never per product id) — D-12.
 * - "stage":  vertical spotlight/pedestal treatment for bottle & package products
 *             (perfume, body care, sprays, oils…).
 * - "studio": even, soft light for any other shape (accessories, devices…).
 */
export type Presentation = "stage" | "studio";

export type ProductMedia = {
  /** Intrinsic width / height of the product image, e.g. 0.8 for 4:5. */
  ratio: number;
  src?: StaticImageData | string;
  alt: string;
};

/** Minimal product shape the listing UI needs. WooCommerce will map onto it later. */
export type ProductSummary = {
  id: string;
  /** URL segment: /produit/[slug]. */
  slug: string;
  name: string;
  href: string;
  category: { name: string; presentation: Presentation };
  /** Current selling price in MAD. */
  price: number;
  /** Regular price when on sale (shown crossed out). */
  compareAtPrice?: number;
  media: ProductMedia;
  /** Extra views for the product page gallery (the main `media` is always first). */
  gallery?: ProductMedia[];
  /** Client-supplied description. Absent → the page shows an "À compléter" marker. */
  description?: string;
};
