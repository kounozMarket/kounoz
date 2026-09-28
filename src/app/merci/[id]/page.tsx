import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice } from "@/components/product/Price";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, CashIcon, CheckIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { decodeEntities } from "@/lib/html";
import { getOrderForThankYou } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false, follow: false },
};

const badgeIcons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

/**
 * Thank-you page (D-28). Rendered per request: the order is shown only when the
 * id AND WooCommerce's order_key (?cle=) match. The Purchase tracking event
 * (Meta Pixel + CAPI, TikTok) will be fired from here, once — next batch.
 */
export default async function ThankYouPage({ params, searchParams }: PageProps<"/merci/[id]">) {
  const { id } = await params;
  const { cle } = await searchParams;
  const order = typeof cle === "string" ? await getOrderForThankYou(id, cle) : null;
  if (!order) notFound();

  const firstName = order.billing.first_name;
  const phone = order.billing.phone.replace(/^\+212(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, "+212 $1 $2 $3 $4 $5");

  return (
    <section className="relative -mt-header overflow-hidden pt-header">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]">
        <div className="bg-motif absolute inset-0 opacity-55 lg:opacity-80" />
        <div className="absolute -top-1/3 left-1/2 size-[56rem] max-w-none -translate-x-1/2 bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
      </div>

      <div className="container-site relative max-w-3xl pt-12 pb-section lg:pt-16 lg:pb-section-lg">
        <div className="text-center">
          <span className="intro-fade inline-flex size-16 items-center justify-center rounded-full bg-gold text-on-accent shadow-gold">
            <CheckIcon className="size-8" />
          </span>
          <h1 className="intro-fade mt-6 text-h1" style={{ "--d": 100 } as CSSProperties}>
            Merci{firstName ? ` ${firstName}` : ""}, <span className="text-gold">c&apos;est commandé !</span>
          </h1>
          <p className="intro-fade mx-auto mt-4 max-w-md text-lead text-muted" style={{ "--d": 200 } as CSSProperties}>
            Notre équipe vous appelle au <strong className="whitespace-nowrap text-text">{phone}</strong> pour confirmer votre commande.
          </p>
        </div>

        <div className="card mt-10 rounded-[1.75rem] p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
            <p className="text-sm text-muted">
              Commande <span className="font-bold text-text">n° {order.number}</span>
            </p>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">Paiement à la réception</span>
          </div>

          <ul className="divide-y divide-line">
            {order.line_items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-4">
                <p className="min-w-0 text-sm">
                  <span className="font-bold">{decodeEntities(item.name)}</span>
                  <span className="text-muted"> × {item.quantity}</span>
                </p>
                <p className="text-sm font-bold tabular-nums">{formatPrice(Number(item.total))}</p>
              </li>
            ))}
          </ul>

          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4">
            <p className="font-bold">Total à payer à la livraison</p>
            <p className="text-price font-extrabold tabular-nums text-accent">{formatPrice(Number(order.total))}</p>
          </div>

          <p className="mt-4 text-sm text-muted">
            Livraison à <span className="text-text">{order.billing.address_1}, {order.billing.city}</span>
          </p>
        </div>

        <ul className="mt-6 grid gap-2 sm:grid-cols-3">
          {siteConfig.reassurance.map((b) => {
            const Icon = badgeIcons[b.id];
            return (
              <li key={b.id} className="card flex items-center gap-3 rounded-2xl p-4 text-xs font-medium">
                <Icon className="size-5 flex-none text-accent" />
                {b.label}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link href="/boutique" className={buttonClasses("secondary", "w-full sm:w-auto")}>
            Continuer mes achats
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
