import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { siteConfig, whatsappHref } from "@/config/site";


/**
 * Compact black footer (D-19). One slim band:
 * mobile = centred stack; desktop = logo | legal links | contact + ©.
 * Legal links come from `siteConfig.legalPages`.
 * Background follows the theme (`--color-footer`): black in dark, #EAE7E1 in light.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const whatsapp = whatsappHref(siteConfig.whatsappNumber);

  return (
    <footer className="mt-auto bg-footer transition-colors duration-400">
      <div className="rule-gold" />
      <div className="container-site flex flex-col items-center gap-6 pt-10 pb-24 text-center text-xs text-muted lg:flex-row lg:justify-between lg:gap-10 lg:py-8 lg:text-left">
        <Logo variant="monogram" className="h-8 w-auto" />

        <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {siteConfig.legalPages.map((page) => (
            <li key={page.href}>
              <Link href={page.href} className="link-sweep pb-0.5 transition-colors hover:text-text">
                {page.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-6">
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="link-sweep pb-0.5 font-semibold text-text hover:text-accent">
              WhatsApp
            </a>
          ) : (
            <span data-placeholder="whatsapp-number" className="text-text/60" title="Numéro à configurer (NEXT_PUBLIC_WHATSAPP_NUMBER)">
              WhatsApp
            </span>
          )}
          <span>
            © {year} {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
