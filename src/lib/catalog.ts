import "server-only";
import { cache } from "react";
import { cleanDescription, decodeEntities } from "@/lib/html";
import { wooConfigured, wooGet, type WooCategory, type WooProduct, type WpMedia } from "@/lib/woo";
import type { Presentation, ProductMedia, ProductSummary } from "@/types/product";

/**
 * Catalogue access point (D-27): WooCommerce products mapped to ProductSummary.
 * Data-driven only (D-12): presentation comes from the category's ACF field
 * `presentation` ("stage" | "studio"); default "studio". Image ratios come from
 * the real media dimensions. On any API failure the catalogue is empty (pages
 * show their empty states) so builds never break.
 */
const UNCATEGORIZED = new Set(["non-classe", "uncategorized"]);

function presentationOf(cat: WooCategory | undefined): Presentation {
  const acf = cat?.acf;
  const value = acf && !Array.isArray(acf) ? (acf as { presentation?: string }).presentation : undefined;
  return value === "stage" ? "stage" : "studio";
}

function toNumber(v: string) {
  const n = Number.parseFloat(v);
  return Number.isFinite(n) ? n : 0;
}

function mapProduct(p: WooProduct, categories: Map<number, WooCategory>, sizes: Map<number, WpMedia>): ProductSummary {
  const name = decodeEntities(p.name);
  const catRef = p.categories.find((c) => !UNCATEGORIZED.has(c.slug)) ?? p.categories[0];
  const cat = catRef ? categories.get(catRef.id) : undefined;
  const price = toNumber(p.price);
  const regular = toNumber(p.regular_price);

  const media: ProductMedia[] = p.images.map((img, i) => {
    const d = sizes.get(img.id)?.media_details;
    const ratio = d?.width && d?.height ? d.width / d.height : 1;
    return { src: img.src, ratio, alt: img.alt || (i === 0 ? name : `${name} — vue ${i + 1}`) };
  });
  const main = media[0] ?? { ratio: 1, alt: "Visuel produit à venir" };
  const html = cleanDescription(p.description || p.short_description || "");

  return {
    id: String(p.id),
    slug: p.slug,
    name,
    href: `/produit/${p.slug}`,
    category: { name: catRef ? decodeEntities(catRef.name) : "", presentation: presentationOf(cat) },
    price,
    compareAtPrice: p.on_sale && regular > price ? regular : undefined,
    media: main,
    gallery: media.slice(1),
    descriptionHtml: html || undefined,
    inStock: p.stock_status !== "outofstock",
  };
}

/** All visible, published products (deduplicated per request). */
export const getProducts = cache(async (): Promise<ProductSummary[]> => {
  if (!wooConfigured()) {
    console.warn("[catalog] WooCommerce not configured — empty catalogue.");
    return [];
  }
  try {
    const [products, categories] = await Promise.all([
      wooGet<WooProduct[]>("wc/v3/products?status=publish&per_page=100&orderby=menu_order&order=asc"),
      wooGet<WooCategory[]>("wc/v3/products/categories?per_page=100"),
    ]);
    const visible = products.filter((p) => p.catalog_visibility !== "hidden" && p.catalog_visibility !== "search");
    const ids = [...new Set(visible.flatMap((p) => p.images.map((i) => i.id)))];
    const media = ids.length
      ? await wooGet<WpMedia[]>(`wp/v2/media?include=${ids.join(",")}&per_page=100&_fields=id,media_details`, { auth: false }).catch(
          () => [] as WpMedia[],
        )
      : [];
    const catMap = new Map(categories.map((c) => [c.id, c]));
    const sizeMap = new Map(media.map((m) => [m.id, m]));
    return visible.map((p) => mapProduct(p, catMap, sizeMap));
  } catch (err) {
    console.error("[catalog] WooCommerce request failed:", err);
    return [];
  }
});

export async function getProductBySlug(slug: string): Promise<ProductSummary | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}
