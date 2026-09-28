"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { QtyStepper } from "@/components/order/QtyStepper";
import { formatPrice } from "@/components/product/Price";
import { CashIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import type { ProductSummary } from "@/types/product";

export type SummaryLine = { product: ProductSummary; qty: number };

const badgeIcons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

export function subtotalOf(lines: SummaryLine[]) {
  return lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
}

/**
 * "Votre commande": lines, totals, payment method (COD only), reassurance.
 * Delivery fee is NOT specified (Q-04), so it shows "À confirmer" — never "gratuite".
 */
type OrderSummaryProps = {
  lines: SummaryLine[];
  /** Editable quantities (product page); read-only otherwise. */
  onQtyChange?: (id: string, qty: number) => void;
  editHref?: string;
  children?: ReactNode;
  title?: string;
  /** Step number shown before the title (checkout / product form). */
  step?: number;
};

export function OrderSummary({ lines, onQtyChange, editHref, children, title = "Votre commande", step }: OrderSummaryProps) {
  const subtotal = subtotalOf(lines);

  return (
    <div className="card rounded-[1.75rem] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-xs font-bold tracking-[0.14em] uppercase">
          {step ? (
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-accent-soft text-[0.6875rem] text-accent">{step}</span>
          ) : null}
          {title}
        </h2>
        {editHref ? (
          <Link href={editHref} className="text-xs font-semibold text-accent hover:underline">
            Modifier
          </Link>
        ) : null}
      </div>

      <ul className="mt-5 divide-y divide-line">
        {lines.map(({ product, qty }) => (
          <li key={product.id} className="flex items-center gap-4 py-4 first:pt-0">
            <div className="relative flex size-16 flex-none items-center justify-center rounded-2xl border border-line bg-surface-2/50 text-[0.5rem] font-semibold tracking-wider text-muted uppercase">
              Visuel
              {!onQtyChange ? (
                <span className="absolute -top-2 -right-2 inline-flex size-6 items-center justify-center rounded-full bg-text text-[0.6875rem] font-bold text-bg">
                  {qty}
                </span>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{product.name}</p>
              <p className="mt-0.5 text-xs text-muted">{formatPrice(product.price)} / unité</p>
              {onQtyChange ? (
                <div className="mt-2">
                  <QtyStepper size="sm" value={qty} onChange={(q) => onQtyChange(product.id, q)} />
                </div>
              ) : null}
            </div>
            <p className="text-sm font-bold tabular-nums">{formatPrice(product.price * qty)}</p>
          </li>
        ))}
      </ul>

      <dl className="mt-2 space-y-3 border-t border-line pt-4 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Sous-total</dt>
          <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Livraison</dt>
          <dd className="font-semibold text-muted" data-placeholder="shipping-fee" title="Frais de livraison non spécifiés (Q-04)">
            À confirmer
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
          <dt className="font-bold">
            Total <span className="text-xs font-medium text-muted">(hors livraison)</span>
          </dt>
          <dd className="text-price font-extrabold tabular-nums text-accent">{formatPrice(subtotal)}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-accent-line bg-accent-soft/50 p-4">
        <span className="inline-flex size-9 flex-none items-center justify-center rounded-xl bg-accent-soft text-accent">
          <CashIcon className="size-5" />
        </span>
        <div className="text-sm">
          <p className="font-bold">Paiement à la réception</p>
          <p className="text-xs text-muted">Aucun paiement en ligne.</p>
        </div>
      </div>

      {children ? <div className="mt-5">{children}</div> : null}

      <ul className="mt-5 space-y-2 text-xs text-muted">
        {siteConfig.reassurance.map((b) => {
          const Icon = badgeIcons[b.id];
          return (
            <li key={b.id} className="flex items-center gap-2.5">
              <Icon className="size-4 flex-none text-accent" />
              {b.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
