import type { Metadata } from "next";
import { CheckoutView } from "@/components/order/CheckoutView";
import { PageHeader } from "@/components/page/PageHeader";

export const metadata: Metadata = { title: "Commande" };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Commande"
        title={
          <>
            Finaliser la <span className="text-gold">commande</span>
          </>
        }
        intro="Paiement à la réception. Notre équipe vous appelle pour confirmer."
      />
      <div className="container-site pb-section lg:pb-section-lg">
        <CheckoutView />
      </div>
    </>
  );
}
