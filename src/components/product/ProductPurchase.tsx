"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CodFields } from "@/components/order/CodFields";
import { OrderSummary } from "@/components/order/OrderSummary";
import { QtyStepper } from "@/components/order/QtyStepper";
import { SubmitNotice } from "@/components/order/SubmitNotice";
import { useCodForm } from "@/components/order/useCodForm";
import { Price, formatPrice } from "@/components/product/Price";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, BagIcon, CheckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { cartActions, clampQty } from "@/lib/cart";
import type { ProductSummary } from "@/types/product";

/**
 * Buy box + inline COD order form (D-22).
 * - Primary "Commander maintenant": scrolls to the form on this page (CDC flow).
 * - Secondary "Ajouter au panier": adds to the cart and stays on the page.
 * - Mobile: sticky bottom bar when neither the buttons nor the form are visible.
 */
export function ProductPurchase({ product }: { product: ProductSummary }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const buyRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const form = useCodForm();
  const nameId = `order-name-${product.id}`;

  useEffect(() => {
    const seen = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      setShowBar(![...seen.values()].some(Boolean));
    });
    [buyRef.current, formRef.current].forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2600);
    return () => clearTimeout(t);
  }, [added]);

  function orderNow() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    document.getElementById(nameId)?.focus({ preventScroll: true });
  }

  function addToCart() {
    cartActions.add(product, qty);
    setAdded(true);
  }

  if (product.inStock === false) {
    // Out-of-stock behaviour not specified (Q-18): safest default is no ordering.
    return (
      <div className="mt-8 rounded-2xl border border-line-strong bg-surface/60 p-5 text-center">
        <p className="font-bold">Rupture de stock</p>
        <p className="mt-1 text-sm text-muted">Ce produit n&apos;est pas disponible pour le moment.</p>
        <Link href="/boutique" className={buttonClasses("secondary", "mt-4 w-full")}>
          Voir la boutique
        </Link>
      </div>
    );
  }

  return (
    <>
      <div ref={buyRef} className="mt-8 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-semibold">Quantité</span>
          <QtyStepper value={qty} onChange={(q) => setQty(clampQty(q))} />
        </div>

        <button type="button" onClick={orderNow} className={buttonClasses("primary", "w-full")}>
          {siteConfig.orderCtaLabel}
          <ArrowRightIcon />
        </button>
        <button type="button" onClick={addToCart} className={buttonClasses("secondary", "w-full")} aria-live="polite">
          {added ? (
            <>
              <CheckIcon className="size-5 text-accent" /> Ajouté au panier
            </>
          ) : (
            <>
              <BagIcon /> {siteConfig.addToCartLabel}
            </>
          )}
        </button>
        {added ? (
          <p className="text-center text-sm text-muted">
            {qty} × {product.name} ajouté.{" "}
            <Link href="/panier" className="font-semibold text-accent underline underline-offset-4">
              Voir le panier
            </Link>
          </p>
        ) : null}
      </div>

      {/* Inline COD order form (CDC §3) */}
      <section
        ref={formRef}
        id="commander"
        aria-labelledby="commander-title"
        className="mt-10 scroll-mt-[calc(var(--header-h)+1rem)] rounded-[2rem] border border-accent-line bg-surface/60 p-4 sm:p-6"
      >
        <div className="px-1 pb-5">
          <p className="eyebrow">Paiement à la réception</p>
          <h2 id="commander-title" className="mt-4 text-h3 font-extrabold">
            {siteConfig.orderCtaLabel}
          </h2>
          <p className="mt-1 text-sm text-muted">Remplissez le formulaire, notre équipe vous appelle pour confirmer.</p>
        </div>

        <form noValidate onSubmit={form.onSubmit} className="space-y-6">
          <div className="card rounded-[1.75rem] p-5 sm:p-6">
            <CodFields values={form.values} errors={form.errors} onChange={form.onChange} nameInputId={nameId} />
          </div>
          <OrderSummary step={3} lines={[{ product, qty }]} onQtyChange={(_, q) => setQty(clampQty(q))}>
            {form.status === "pending-backend" ? (
              <SubmitNotice />
            ) : (
              <button type="submit" className={buttonClasses("primary", "w-full")}>
                Confirmer la commande
                <ArrowRightIcon />
              </button>
            )}
          </OrderSummary>
        </form>
      </section>

      {/* Sticky mobile CTA bar */}
      <div
        data-sticky-cta
        data-visible={showBar}
        aria-hidden={!showBar}
        inert={!showBar}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-(--header-glass-dense) px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-2xl transition-transform duration-500 ease-premium lg:hidden ${
          showBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted">{product.name}</p>
            <Price price={product.price} compareAtPrice={product.compareAtPrice} size="sm" showDiscount={false} />
          </div>
          <button type="button" onClick={orderNow} className={buttonClasses("primary", "flex-none", "sm")}>
            {siteConfig.orderCtaLabel}
          </button>
        </div>
        <span className="sr-only">Total : {formatPrice(product.price * qty)}</span>
      </div>
    </>
  );
}
