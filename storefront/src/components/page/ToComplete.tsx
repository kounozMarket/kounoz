/**
 * Visible marker for information the client has not supplied yet.
 * Never replace it with invented content — only with client-provided text.
 */
type ToCompleteProps = {
  /** What is missing, e.g. "Frais de livraison". */
  label: string;
  /** Open question reference in docs/decisions/decisions.md, e.g. "Q-04". */
  question?: string;
};

export function ToComplete({ label, question }: ToCompleteProps) {
  return (
    <div
      data-placeholder="client-content"
      className="flex items-start gap-3 rounded-2xl border border-dashed border-accent-line bg-accent-soft/40 px-4 py-3 text-left text-sm text-muted [overflow-wrap:anywhere]"
    >
      <span className="mt-0.5 inline-flex size-5 flex-none items-center justify-center rounded-full bg-accent-soft text-[0.625rem] font-bold text-accent" aria-hidden="true">
        !
      </span>
      <p>
        <span className="font-semibold text-text">À compléter par le client — </span>
        {label}
        {question ? (
          <span className="ml-2 rounded-full border border-line-strong px-1.5 py-px text-[0.625rem] font-semibold tabular-nums">
            {question}
          </span>
        ) : null}
      </p>
    </div>
  );
}
