import type { Metadata } from "next";
import { OrderSteps } from "@/components/page/OrderSteps";
import { PageHeader } from "@/components/page/PageHeader";
import { ToComplete } from "@/components/page/ToComplete";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { siteConfig, whatsappHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez KONOUZ MARKET sur WhatsApp pour toute question sur un produit ou une commande.",
};

const { contact } = siteConfig;

// Official client details (2026-10-04). WhatsApp is the card on the left.
const details = [
  { label: "Siège administratif", value: contact.address },
  { label: "Code postal", value: contact.postalCode },
  { label: "E-mail", value: contact.email, href: `mailto:${contact.email}` },
  { label: "Activité", value: contact.activity },
];

function WhatsAppGlyph({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11.5a8 8 0 0 1-11.8 7.04L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M9.2 9.3c.2 1.9 2.4 4.4 4.9 5 .5.1 1.2-.3 1.4-.8l.2-.6-1.6-.8-.7.7c-.8-.3-1.8-1.2-2.1-2l.7-.7-.8-1.6-.6.2c-.5.2-.9.9-.8 1.4" />
    </svg>
  );
}

export default function ContactPage() {
  const whatsapp = whatsappHref(siteConfig.whatsappNumber);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Nous <span className="text-gold">contacter</span>
          </>
        }
        intro="Une question sur un produit ou sur votre commande ? Écrivez-nous directement sur WhatsApp."
      />

      <section aria-label="Coordonnées" className="container-site grid gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="card relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:col-span-7 lg:p-12">
          <div aria-hidden="true" className="pointer-events-none absolute -top-1/2 -right-1/4 size-[40rem] max-w-none bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
          <div className="bg-motif pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <span className="relative inline-flex size-14 items-center justify-center rounded-2xl bg-gold text-on-accent shadow-gold">
            <WhatsAppGlyph />
          </span>
          <h2 className="relative mt-8 text-h2">
            Réponse <span className="text-gold">directe</span>
          </h2>
          <p className="relative mt-3 max-w-sm text-muted">
            Service client {contact.company} : le moyen le plus simple de nous joindre pour toute question sur un
            produit ou une commande.
          </p>
          <div className="relative mt-8 max-w-md">
            {whatsapp ? (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "w-full sm:w-auto")}>
                Écrire sur WhatsApp
                <ArrowRightIcon />
              </a>
            ) : (
              <ToComplete label="Numéro WhatsApp (NEXT_PUBLIC_WHATSAPP_NUMBER)." question="Q-05" />
            )}
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-3">
          {details.map((d) => (
            <div key={d.label} className="card rounded-2xl p-5">
              <dt className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">{d.label}</dt>
              <dd className="mt-3 font-semibold">
                {d.href ? (
                  <a href={d.href} className="break-all transition-colors hover:text-accent">
                    {d.value}
                  </a>
                ) : (
                  d.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <OrderSteps />
    </>
  );
}
