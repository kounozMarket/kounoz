import type { Metadata } from "next";
import { CartView } from "@/components/order/CartView";
import { PageHeader } from "@/components/page/PageHeader";

export const metadata: Metadata = { title: "Panier" };

export default function CartPage() {
  return (
    <>
      <PageHeader
        eyebrow="Panier"
        title={
          <>
            Votre <span className="text-gold">panier</span>
          </>
        }
      />
      <div className="container-site pb-section lg:pb-section-lg">
        <CartView />
      </div>
    </>
  );
}
