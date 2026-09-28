"use client";

import { useSyncExternalStore } from "react";

/**
 * Lightweight cart (D-22): product id + quantity, persisted in localStorage.
 * Secondary flow only — the primary flow is the direct COD order on the product page.
 * No prices are stored: they are always read from the catalogue.
 */
export type CartLine = { id: string; qty: number };

export const QTY_MIN = 1;
/** UI cap per line (Recommendation; stock rules not specified — Q-18). */
export const QTY_MAX = 10;

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
      .filter((l): l is CartLine => typeof l?.id === "string" && typeof l?.qty === "number")
      .map((l) => ({ id: l.id, qty: clampQty(l.qty) }));
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
  add(id: string, qty = 1) {
    const lines = read();
    const existing = lines.find((l) => l.id === id);
    write(
      existing
        ? lines.map((l) => (l.id === id ? { ...l, qty: clampQty(l.qty + qty) } : l))
        : [...lines, { id, qty: clampQty(qty) }],
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
