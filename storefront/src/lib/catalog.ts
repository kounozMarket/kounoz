import { sampleProducts } from "@/data/sample-products";
import type { ProductSummary } from "@/types/product";

/**
 * Catalogue access point. SAMPLE data today; WooCommerce later — only this file
 * changes when the backend is connected. Safe to import from client components.
 */
export function getProducts(): ProductSummary[] {
  return sampleProducts;
}

export function getProductBySlug(slug: string): ProductSummary | undefined {
  return sampleProducts.find((p) => p.slug === slug);
}

export function getProductById(id: string): ProductSummary | undefined {
  return sampleProducts.find((p) => p.id === id);
}
