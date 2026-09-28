import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";

/**
 * Submit button + error message + honeypot (anti-spam: bots fill every field,
 * humans never see this one).
 */
export function SubmitArea({ status, message }: { status: "idle" | "submitting" | "success"; message: string | null }) {
  const busy = status !== "idle";
  return (
    <div className="space-y-3">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" defaultValue="" />
      {message ? (
        <p role="alert" className="rounded-2xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm font-medium text-red-300">
          {message}
        </p>
      ) : null}
      <button type="submit" disabled={busy} aria-busy={busy} className={buttonClasses("primary", "w-full disabled:opacity-80")}>
        {busy ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
            Envoi de la commande…
          </>
        ) : (
          <>
            Confirmer la commande
            <ArrowRightIcon />
          </>
        )}
      </button>
    </div>
  );
}
