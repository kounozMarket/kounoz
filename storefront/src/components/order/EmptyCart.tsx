import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, BagIcon } from "@/components/ui/icons";

export function EmptyCart() {
  return (
    <div className="card mx-auto flex max-w-lg flex-col items-center rounded-[2rem] px-6 py-14 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <BagIcon className="size-8" />
      </span>
      <h2 className="mt-6 text-h3">Votre panier est vide</h2>
      <p className="mt-2 max-w-xs text-sm text-muted">Ajoutez un produit depuis la boutique pour commencer.</p>
      <Link href="/boutique" className={buttonClasses("primary", "mt-8 w-full sm:w-auto")}>
        Voir la boutique
        <ArrowRightIcon />
      </Link>
    </div>
  );
}
