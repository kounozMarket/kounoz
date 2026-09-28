import { CheckIcon } from "@/components/ui/icons";

/** Shown after a valid submit while order sending is not connected yet. Honest: nothing was sent. */
export function SubmitNotice() {
  return (
    <div role="status" data-placeholder="order-backend" className="rounded-2xl border border-dashed border-accent-line bg-accent-soft/40 p-4 text-sm">
      <p className="flex items-center gap-2 font-bold">
        <CheckIcon className="size-4 text-accent" />
        Formulaire valide
      </p>
      <p className="mt-1 text-muted">
        L&apos;envoi des commandes (WooCommerce, Google Sheets) sera connecté dans une prochaine étape. Aucune commande
        n&apos;a été envoyée.
      </p>
    </div>
  );
}
