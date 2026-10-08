"use client";

import { CodFields } from "@/components/order/CodFields";
import { EmptyCart } from "@/components/order/EmptyCart";
import { OrderSummary } from "@/components/order/OrderSummary";
import { SubmitArea } from "@/components/order/SubmitArea";
import { useCartLines } from "@/components/order/useCartLines";
import { useCodForm } from "@/components/order/useCodForm";

/**
 * Checkout (D-22): the same 4 COD fields as the product page, then "Votre commande".
 * Mobile order follows the owner's spec: contact → delivery → your order → submit.
 */
export function CheckoutView() {
  const { lines, clear } = useCartLines();
  const form = useCodForm({ getItems: () => lines.map((l) => ({ id: l.product.id, qty: l.qty })), onSuccess: clear });

  // After success the cart is cleared while we navigate: don't flash the empty state.
  if (!lines.length && form.status !== "success") return <EmptyCart />;

  return (
    <form noValidate onSubmit={form.onSubmit} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="card min-w-0 rounded-[1.75rem] p-5 sm:p-8 lg:col-span-7">
        <CodFields values={form.values} errors={form.errors} onChange={form.onChange} />
      </div>

      <div className="min-w-0 lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <OrderSummary lines={lines} editHref="/panier" step={3}>
            <SubmitArea status={form.status} message={form.message} />
          </OrderSummary>
        </div>
      </div>
    </form>
  );
}
