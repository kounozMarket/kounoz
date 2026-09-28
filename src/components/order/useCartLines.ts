"use client";

import { useCart } from "@/lib/cart";
import type { SummaryLine } from "@/components/order/OrderSummary";

/** Cart lines with their display snapshot. */
export function useCartLines() {
  const cart = useCart();
  const lines: SummaryLine[] = cart.lines.map((l) => ({ product: l.product, qty: l.qty }));
  return { ...cart, lines };
}
