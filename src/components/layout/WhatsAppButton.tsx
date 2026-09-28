import { siteConfig, whatsappHref } from "@/config/site";

const baseClass =
  "fixed right-5 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 inline-flex size-14 items-center justify-center rounded-full border border-line-strong bg-surface/80 text-accent shadow-float backdrop-blur-md transition-[transform,border-color,background-color] duration-300 ease-premium hover:-translate-y-0.5 hover:border-accent-line hover:bg-surface-2 lg:right-8 lg:bottom-8";

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11.5a8 8 0 0 1-11.8 7.04L4 20l1.5-4.1A8 8 0 1 1 20 11.5Z" />
      <path d="M9.2 9.3c.2 1.9 2.4 4.4 4.9 5 .5.1 1.2-.3 1.4-.8l.2-.6-1.6-.8-.7.7c-.8-.3-1.8-1.2-2.1-2l.7-.7-.8-1.6-.6.2c-.5.2-.9.9-.8 1.4" />
    </svg>
  );
}

/**
 * Floating WhatsApp button (CDC §3: present on all pages).
 * PLACEHOLDER: inactive until NEXT_PUBLIC_WHATSAPP_NUMBER is configured.
 */
export function WhatsAppButton() {
  const href = whatsappHref(siteConfig.whatsappNumber);

  if (!href) {
    return (
      <span
        data-fab
        className={`${baseClass} cursor-not-allowed opacity-60`}
        role="img"
        aria-label="WhatsApp — numéro à configurer"
        title="WhatsApp — numéro à configurer (NEXT_PUBLIC_WHATSAPP_NUMBER)"
        data-placeholder="whatsapp-number"
      >
        <ChatIcon />
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Nous contacter sur WhatsApp" data-fab className={baseClass}>
      <ChatIcon />
    </a>
  );
}
