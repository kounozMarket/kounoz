import { createCodOrder, type OrderItemInput } from "@/lib/orders";
import type { OrderFields } from "@/lib/validation";
import { wooConfigured } from "@/lib/woo";

/**
 * POST /api/commande — creates a WooCommerce COD order (D-28).
 * Protections (single Node process on Hostinger, so in-memory is enough):
 * - honeypot field `website` must be empty, form must have been open ≥ 3 s
 * - max 5 orders / 10 min per IP
 * - `requestId` idempotency: a double click / retry returns the same order
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();
const done = new Map<string, { at: number; body: unknown }>();

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.set(ip, recent);
  return recent.length >= RATE_MAX;
}

type Body = {
  fields?: Partial<OrderFields>;
  items?: OrderItemInput[];
  website?: string;
  startedAt?: number;
  requestId?: string;
};

export async function POST(request: Request) {
  if (!wooConfigured()) return Response.json({ error: "Commandes indisponibles pour le moment." }, { status: 503 });

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const requestId = typeof body.requestId === "string" && body.requestId.length <= 64 ? body.requestId : null;
  const now = Date.now();
  for (const [k, v] of done) if (now - v.at > RATE_WINDOW_MS) done.delete(k);
  if (requestId && done.has(requestId)) return Response.json(done.get(requestId)!.body);

  // Bots: honeypot filled or form submitted implausibly fast.
  if (body.website || (typeof body.startedAt === "number" && now - body.startedAt < 3000)) {
    return Response.json({ error: "Envoi refusé. Réessayez dans quelques secondes." }, { status: 400 });
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return Response.json({ error: "Trop de commandes en peu de temps. Réessayez plus tard ou contactez-nous sur WhatsApp." }, { status: 429 });
  }

  const f = body.fields ?? {};
  const fields: OrderFields = {
    name: String(f.name ?? "").slice(0, 120),
    phone: String(f.phone ?? "").slice(0, 30),
    city: String(f.city ?? "").slice(0, 80),
    address: String(f.address ?? "").slice(0, 250),
  };
  const items = Array.isArray(body.items) ? body.items : [];

  const result = await createCodOrder(fields, items);
  if (!result.ok) return Response.json({ error: result.error, fields: result.fields }, { status: result.status });

  hits.get(ip)!.push(now);
  const payload = { orderId: result.orderId, orderKey: result.orderKey };
  if (requestId) done.set(requestId, { at: now, body: payload });
  return Response.json(payload, { status: 201 });
}
