/** Visible marker for temporary content (copy or data not supplied by the client). */
export function PlaceholderTag({ children = "Contenu provisoire" }: { children?: string }) {
  return (
    <span
      data-placeholder="content"
      className="inline-flex items-center gap-2 rounded-full border border-dashed border-line-strong px-3 py-1 text-[0.6875rem] font-medium text-muted"
    >
      <span className="size-1.5 rounded-full bg-accent/70" aria-hidden="true" />
      {children}
    </span>
  );
}
