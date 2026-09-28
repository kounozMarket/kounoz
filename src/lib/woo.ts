import "server-only";

/**
 * Minimal WooCommerce REST client (D-27). Server-only: the consumer key/secret
 * never reach the browser. Reads are cached and revalidated every 5 minutes
 * (tag "woo") so product edits in WordPress appear without a redeploy.
 */
export const WOO_REVALIDATE = 300;

function config() {
  const url = process.env.WOO_URL?.replace(/\/$/, "");
  const key = process.env.WOO_CONSUMER_KEY;
  const secret = process.env.WOO_CONSUMER_SECRET;
  return url && key && secret ? { url, auth: "Basic " + Buffer.from(`${key}:${secret}`).toString("base64") } : null;
}

export function wooConfigured() {
  return config() !== null;
}

/** GET a WooCommerce (wc/v3) or WordPress (wp/v2) REST path. Throws on HTTP errors. */
export async function wooGet<T>(path: string, { auth = true }: { auth?: boolean } = {}): Promise<T> {
  const cfg = config();
  if (!cfg) throw new Error("WooCommerce is not configured (WOO_URL / WOO_CONSUMER_KEY / WOO_CONSUMER_SECRET).");
  const res = await fetch(`${cfg.url}/wp-json/${path}`, {
    headers: auth ? { Authorization: cfg.auth, Accept: "application/json" } : { Accept: "application/json" },
    next: { revalidate: WOO_REVALIDATE, tags: ["woo"] },
  });
  if (!res.ok) throw new Error(`WooCommerce ${res.status} on ${path}`);
  return res.json() as Promise<T>;
}

/* ---- Raw API shapes (only the fields we use) ---- */
export type WooImage = { id: number; src: string; alt: string };
export type WooCategoryRef = { id: number; name: string; slug: string };
export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  status: string;
  type: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  catalog_visibility: string;
  description: string;
  short_description: string;
  categories: WooCategoryRef[];
  images: WooImage[];
};
export type WooCategory = WooCategoryRef & { acf?: { presentation?: string } | unknown[] };
export type WpMedia = { id: number; media_details?: { width?: number; height?: number } };
