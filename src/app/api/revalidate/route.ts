import { createHmac, timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * POST /api/revalidate — WooCommerce webhook receiver (D-29).
 * Topics product.created / updated / deleted / restored → refresh every cached
 * WooCommerce read and every page, so the next visitor sees the change at once.
 *
 * Security: WooCommerce signs each delivery with HMAC-SHA256 (base64) of the raw
 * body using the webhook secret → header X-WC-Webhook-Signature. Must match
 * WOO_WEBHOOK_SECRET. Unsigned requests are rejected (except Woo's ping).
 */
export async function POST(request: Request) {
  const secret = process.env.WOO_WEBHOOK_SECRET;
  if (!secret || secret.length < 16) return Response.json({ error: "Webhook not configured." }, { status: 503 });

  const raw = await request.text();
  const signature = request.headers.get("x-wc-webhook-signature");
  const topic = request.headers.get("x-wc-webhook-topic") ?? "";

  // WooCommerce "ping" sent when a webhook is saved: form body `webhook_id=N`, no topic.
  if (!topic && /^webhook_id=\d+$/.test(raw.trim())) return Response.json({ ok: true, ping: true });

  const expected = createHmac("sha256", secret).update(raw, "utf8").digest("base64");
  const valid =
    signature !== null &&
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  if (!valid) return Response.json({ error: "Invalid signature." }, { status: 401 });

  if (!topic.startsWith("product.")) return Response.json({ ok: true, ignored: topic });

  // Stale data must not be served: the next request fetches fresh from WooCommerce.
  revalidateTag("woo", { expire: 0 });
  revalidatePath("/", "layout");

  let product = "";
  try {
    const data = JSON.parse(raw) as { id?: number; slug?: string };
    product = data.slug ?? String(data.id ?? "");
  } catch {
    // Body shape is irrelevant for invalidation.
  }
  console.info(`[revalidate] ${topic} ${product} → site refreshed`);
  return Response.json({ ok: true, topic, revalidated: true });
}
