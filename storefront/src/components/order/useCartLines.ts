"use client";

import { useCart } from "@/lib/cart";
import { getProductById } from "@/lib/catalog";
import type { SummaryLine } from "@/components/order/OrderSummary";

/** Cart lines joined with catalogue data; unknown ids are ignored. */
export function useCartLines() {
  const cart = useCart();
  const lines: SummaryLine[] = cart.lines.flatMap((l) => {
    const product = getProductById(l.id);
    return product ? [{ product, qty: l.qty }] : [];
  });
  return { ...cart, lines };
}
