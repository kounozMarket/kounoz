import { BagIcon } from "@/components/ui/icons";

/** Shown when WooCommerce has no published product (or is unreachable). */
export function EmptyCatalog() {
  return (
    <div className="card mx-auto flex max-w-lg flex-col items-center rounded-[2rem] px-6 py-14 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-accent-soft text-accent">
        <BagIcon className="size-8" />
      </span>
      <p className="mt-6 text-h3">Nos produits arrivent bientôt</p>
      <p className="mt-2 max-w-xs text-sm text-muted">Revenez très vite pour découvrir la sélection.</p>
    </div>
  );
}
