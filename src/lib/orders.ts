import "server-only";
import { decodeEntities } from "@/lib/html";
import { normalizePhone, validateOrder, type OrderFields } from "@/lib/validation";
import { QTY_MAX, QTY_MIN } from "@/lib/cart-limits";
import { wooRequest, type WooOrder, type WooProduct } from "@/lib/woo";

/**
 * COD order creation (D-28). Server-only.
 * - Fields validated again server-side (never trust the browser).
 * - Products re-read live from WooCommerce: must be published, purchasable, in stock.
 *   Prices are NOT sent: WooCommerce computes line totals from its own prices.
 * - Order: payment "cod", not paid, status "processing" (new order to confirm by phone).
 */
export type OrderItemInput = { id: string; qty: number };
export type CreateOrderResult =
  | { ok: true; orderId: number; orderKey: string }
  | { ok: false; status: number; error: string; fields?: Partial<Record<keyof OrderFields, string>> };

function splitName(full: string) {
  const parts = full.trim().replace(/\s+/g, " ").split(" ");
  return parts.length > 1 ? { first: parts.slice(0, -1).join(" "), last: parts.at(-1)! } : { first: parts[0], last: "" };
}

export async function createCodOrder(fields: OrderFields, items: OrderItemInput[]): Promise<CreateOrderResult> {
  const errors = validateOrder(fields);
  if (Object.keys(errors).length) return { ok: false, status: 422, error: "Veuillez corriger les champs indiqués.", fields: errors };

  // Merge duplicates, clamp quantities, cap the number of lines.
  const merged = new Map<number, number>();
  for (const it of items.slice(0, 20)) {
    const id = Number.parseInt(it.id, 10);
    if (!Number.isInteger(id) || id <= 0) continue;
    merged.set(id, Math.min(QTY_MAX, Math.max(QTY_MIN, (merged.get(id) ?? 0) + Math.round(it.qty || 0))));
  }
  if (!merged.size) return { ok: false, status: 422, error: "Votre commande ne contient aucun produit." };

  // Live availability check.
  for (const id of merged.keys()) {
    const res = await wooRequest<WooProduct>("GET", `wc/v3/products/${id}`);
    const p = res.data;
    if (!res.ok || !p || p.status !== "publish" || !p.purchasable) {
      return { ok: false, status: 409, error: "Un produit de votre commande n'est plus disponible." };
    }
    if (p.stock_status === "outofstock") {
      return { ok: false, status: 409, error: `« ${decodeEntities(p.name)} » est en rupture de stock.` };
    }
  }

  const phone = normalizePhone(fields.phone)!;
  const { first, last } = splitName(fields.name);
  const address = { first_name: first, last_name: last, address_1: fields.address.trim(), city: fields.city.trim(), country: "MA" };

  const res = await wooRequest<WooOrder & { message?: string }>("POST", "wc/v3/orders", {
    payment_method: "cod",
    payment_method_title: "Paiement à la livraison",
    set_paid: false,
    status: "processing",
    billing: { ...address, phone },
    shipping: address,
    line_items: [...merged].map(([product_id, quantity]) => ({ product_id, quantity })),
    meta_data: [{ key: "_km_source", value: "storefront" }],
  });

  if (!res.ok || !res.data?.id) {
    console.error("[orders] WooCommerce order creation failed:", res.status, res.data?.message);
    return { ok: false, status: 502, error: "La commande n'a pas pu être enregistrée. Réessayez ou contactez-nous sur WhatsApp." };
  }
  return { ok: true, orderId: res.data.id, orderKey: res.data.order_key };
}

/** Thank-you page: the order is only shown when id AND order_key match. */
export async function getOrderForThankYou(id: string, key: string): Promise<WooOrder | null> {
  if (!/^\d+$/.test(id) || !/^wc_order_[A-Za-z0-9]+$/.test(key)) return null;
  const res = await wooRequest<WooOrder>("GET", `wc/v3/orders/${id}`);
  return res.ok && res.data?.order_key === key ? res.data : null;
}
