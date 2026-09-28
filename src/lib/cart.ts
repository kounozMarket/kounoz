"use client";

import { useSyncExternalStore } from "react";

import type { ProductSummary } from "@/types/product";

/**
 * Lightweight cart (D-22): product id + quantity + a display snapshot, persisted
 * in localStorage. Secondary flow only — the primary flow is the direct COD order
 * on the product page. The snapshot is for display: the server re-reads prices
 * from WooCommerce when the order is created.
 */
export type CartProduct = Omit<ProductSummary, "descriptionHtml" | "gallery">;
export type CartLine = { id: string; qty: number; product: CartProduct };

import { QTY_MAX, QTY_MIN } from "@/lib/cart-limits";

export { QTY_MAX, QTY_MIN };

const KEY = "km-cart";
const EVENT = "km-cart-change";
const EMPTY: CartLine[] = [];

let cache: { raw: string | null; lines: CartLine[] } = { raw: null, lines: EMPTY };

export function clampQty(n: number) {
  return Math.min(QTY_MAX, Math.max(QTY_MIN, Math.round(n) || QTY_MIN));
}

function parse(raw: string | null): CartLine[] {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return EMPTY;
    return data
      .filter((l): l is CartLine => typeof l?.id === "string" && typeof l?.qty === "number" && typeof l?.product?.name === "string")
      .map((l) => ({ id: l.id, qty: clampQty(l.qty), product: l.product }));
  } catch {
    return EMPTY;
  }
}

function read(): CartLine[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    // Storage blocked: behave as an empty, in-memory cart.
    return cache.lines;
  }
  if (raw !== cache.raw) cache = { raw, lines: parse(raw) };
  return cache.lines;
}

function write(lines: CartLine[]) {
  const raw = JSON.stringify(lines);
  cache = { raw, lines };
  try {
    localStorage.setItem(KEY, raw);
  } catch {
    // Storage blocked: the cart lasts for this page only.
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && onChange();
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export const cartActions = {
  add(product: ProductSummary, qty = 1) {
    const { descriptionHtml: _d, gallery: _g, ...snapshot } = product;
    void _d;
    void _g;
    const lines = read();
    const existing = lines.find((l) => l.id === product.id);
    write(
      existing
        ? lines.map((l) => (l.id === product.id ? { ...l, qty: clampQty(l.qty + qty), product: snapshot } : l))
        : [...lines, { id: product.id, qty: clampQty(qty), product: snapshot }],
    );
  },
  setQty(id: string, qty: number) {
    write(read().map((l) => (l.id === id ? { ...l, qty: clampQty(qty) } : l)));
  },
  remove(id: string) {
    write(read().filter((l) => l.id !== id));
  },
  clear() {
    write([]);
  },
};

export function useCart() {
  const lines = useSyncExternalStore(subscribe, read, () => EMPTY);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  return { lines, count, ...cartActions };
}
