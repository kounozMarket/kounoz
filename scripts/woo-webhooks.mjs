/**
 * Registers (or updates) the WooCommerce webhooks that refresh the storefront
 * when a product changes (D-29). Idempotent: matches existing webhooks by name.
 *
 *   node --env-file=.env.local scripts/woo-webhooks.mjs [deliveryUrl]
 *
 * Needs WOO_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET, WOO_WEBHOOK_SECRET.
 * The site at deliveryUrl must already run with the same WOO_WEBHOOK_SECRET,
 * because WooCommerce pings the URL when a webhook is activated.
 */
const { WOO_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET, WOO_WEBHOOK_SECRET } = process.env;
const deliveryUrl = process.argv[2] || "https://konouzmarket.com/api/revalidate";
const topics = ["product.created", "product.updated", "product.deleted", "product.restored"];

if (!WOO_URL || !WOO_CONSUMER_KEY || !WOO_CONSUMER_SECRET || !WOO_WEBHOOK_SECRET) {
  console.error("Missing WOO_URL / WOO_CONSUMER_KEY / WOO_CONSUMER_SECRET / WOO_WEBHOOK_SECRET.");
  process.exit(1);
}

const auth = "Basic " + Buffer.from(`${WOO_CONSUMER_KEY}:${WOO_CONSUMER_SECRET}`).toString("base64");
async function api(method, path, body) {
  const res = await fetch(`${WOO_URL.replace(/\/$/, "")}/wp-json/wc/v3/${path}`, {
    method,
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${data?.message ?? ""}`);
  return data;
}

const existing = await api("GET", "webhooks?per_page=100");
for (const topic of topics) {
  const name = `Storefront refresh — ${topic}`;
  const payload = { name, topic, delivery_url: deliveryUrl, secret: WOO_WEBHOOK_SECRET, status: "active" };
  const found = existing.find((w) => w.name === name);
  const saved = found ? await api("PUT", `webhooks/${found.id}`, payload) : await api("POST", "webhooks", payload);
  console.log(`${found ? "updated" : "created"} #${saved.id} ${topic} → ${saved.delivery_url} [${saved.status}]`);
}
