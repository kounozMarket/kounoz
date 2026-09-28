"use client";

import Link from "next/link";
import { EmptyCart } from "@/components/order/EmptyCart";
import { OrderSummary } from "@/components/order/OrderSummary";
import { QtyStepper } from "@/components/order/QtyStepper";
import { useCartLines } from "@/components/order/useCartLines";
import { formatPrice } from "@/components/product/Price";
import { ProductThumb } from "@/components/product/ProductThumb";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, TrashIcon } from "@/components/ui/icons";

export function CartView() {
  const { lines, count, setQty, remove } = useCartLines();

  if (!lines.length) return <EmptyCart />;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <div className="card rounded-[1.75rem] p-2 sm:p-3">
          <p className="px-3 pt-3 pb-1 text-sm font-bold sm:px-4">
            {count} article{count > 1 ? "s" : ""}
          </p>
          <ul className="divide-y divide-line">
            {lines.map(({ product, qty }) => (
              <li key={product.id} className="flex gap-4 p-3 sm:p-4">
                <Link href={product.href} className="flex-none">
                  <ProductThumb media={product.media} className="size-24 sm:size-28" sizes="112px" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs text-muted">{product.category.name}</p>
                      <Link href={product.href} className="mt-0.5 block truncate font-bold hover:text-accent">
                        {product.name}
                      </Link>
                      <p className="mt-1 text-sm text-muted">{formatPrice(product.price)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.id)}
                      aria-label={`Retirer ${product.name} du panier`}
                      className="inline-flex size-9 flex-none items-center justify-center rounded-full text-muted transition-colors hover:bg-text/[0.06] hover:text-text"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <QtyStepper size="sm" value={qty} onChange={(q) => setQty(product.id, q)} />
                    <p className="font-bold tabular-nums">{formatPrice(product.price * qty)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/boutique" className={buttonClasses("link", "mt-5")}>
          Continuer mes achats
        </Link>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <OrderSummary lines={lines} title="Récapitulatif">
            <Link href="/commande" className={buttonClasses("primary", "w-full")}>
              Passer la commande
              <ArrowRightIcon />
            </Link>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
