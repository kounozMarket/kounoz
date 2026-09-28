import type { ProductSummary } from "@/types/product";

/**
 * SAMPLE DATA — visual demonstration only (Batch 01.5).
 * Names, categories and prices are fictitious placeholders, NOT client data (Q-12).
 * Replaced by WooCommerce data in a later batch (see src/lib/catalog.ts). Ratios are deliberately varied to
 * prove the layout adapts to the product instead of forcing one shape.
 */
export const sampleProducts: ProductSummary[] = [
  {
    id: "sample-a",
    slug: "produit-exemple-a",
    name: "Produit exemple A",
    href: "/produit/produit-exemple-a",
    category: { name: "Catégorie exemple · flacon", presentation: "stage" },
    price: 299,
    compareAtPrice: 399,
    media: { ratio: 4 / 5, alt: "Visuel produit à venir" },
    gallery: [
      { ratio: 4 / 5, alt: "Vue 2 à venir" },
      { ratio: 4 / 5, alt: "Vue 3 à venir" },
    ],
  },
  {
    id: "sample-b",
    slug: "produit-exemple-b",
    name: "Produit exemple B",
    href: "/produit/produit-exemple-b",
    category: { name: "Catégorie exemple · accessoire", presentation: "studio" },
    price: 189,
    media: { ratio: 1, alt: "Visuel produit à venir" },
  },
  {
    id: "sample-c",
    slug: "produit-exemple-c",
    name: "Produit exemple C",
    href: "/produit/produit-exemple-c",
    category: { name: "Catégorie exemple · accessoire", presentation: "studio" },
    price: 449,
    compareAtPrice: 520,
    media: { ratio: 3 / 2, alt: "Visuel produit à venir" },
  },
  {
    id: "sample-d",
    slug: "produit-exemple-d",
    name: "Produit exemple D",
    href: "/produit/produit-exemple-d",
    category: { name: "Catégorie exemple · soin", presentation: "stage" },
    price: 149,
    media: { ratio: 3 / 4, alt: "Visuel produit à venir" },
  },
];
