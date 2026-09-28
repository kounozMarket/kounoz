"use client";

import { CodFields } from "@/components/order/CodFields";
import { EmptyCart } from "@/components/order/EmptyCart";
import { OrderSummary } from "@/components/order/OrderSummary";
import { SubmitNotice } from "@/components/order/SubmitNotice";
import { useCartLines } from "@/components/order/useCartLines";
import { useCodForm } from "@/components/order/useCodForm";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Checkout (D-22): the same 4 COD fields as the product page, then "Votre commande".
 * Mobile order follows the owner's spec: contact → delivery → your order → submit.
 */
export function CheckoutView() {
  const { lines } = useCartLines();
  const form = useCodForm();

  if (!lines.length) return <EmptyCart />;

  return (
    <form noValidate onSubmit={form.onSubmit} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="card rounded-[1.75rem] p-5 sm:p-8 lg:col-span-7">
        <CodFields values={form.values} errors={form.errors} onChange={form.onChange} />
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <OrderSummary lines={lines} editHref="/panier" step={3}>
            {form.status === "pending-backend" ? (
              <SubmitNotice />
            ) : (
              <button type="submit" className={buttonClasses("primary", "w-full")}>
                Confirmer la commande
                <ArrowRightIcon />
              </button>
            )}
          </OrderSummary>
        </div>
      </div>
    </form>
  );
}
