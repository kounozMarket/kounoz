"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRightIcon, BagIcon, CashIcon, ParcelCheckIcon, TruckIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { useCart } from "@/lib/cart";

const badgeIcons = { delivery: TruckIcon, cod: CashIcon, check: ParcelCheckIcon } as const;

function isActive(href: string, pathname: string) {
  if (href.includes("#")) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * Floating glass capsule header. It gets denser (more opaque + shadow) once the
 * page scrolls; its height never changes (no layout shift). Pages reserve
 * `--header-h` (layout.tsx). Mobile: full-screen sheet. Motion is CSS only.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrolled(window.scrollY > 12));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const dense = scrolled || open;
  const { count } = useCart();

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 pt-2 lg:pt-4">
        <div className="container-site">
          <div
            className={`flex h-16 items-center justify-between gap-4 rounded-full border pr-2 pl-5 backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-500 ease-premium lg:h-[4.25rem] lg:pr-2.5 lg:pl-6 ${
              dense
                ? "border-line-strong bg-(--header-glass-dense) shadow-float"
                : "border-line bg-(--header-glass)"
            }`}
          >
            <Link href="/" aria-label="KONOUZ MARKET — accueil" className="inline-flex flex-none" onClick={() => setOpen(false)}>
              <Logo variant="monogram" preload className="h-8 w-auto lg:h-9" />
            </Link>

            {/* Desktop navigation — bold items, pill highlight */}
            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {siteConfig.mainNav.map((item) => {
                  const active = isActive(item.href, pathname);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`inline-flex h-10 items-center rounded-full px-4 text-sm font-bold transition-colors duration-300 ${
                          active ? "bg-text/[0.08] text-text" : "text-text/75 hover:bg-text/[0.05] hover:text-text"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex flex-none items-center gap-2">
              <ThemeToggle />
              <Link
                href="/panier"
                onClick={() => setOpen(false)}
                aria-label={count ? `Panier, ${count} article${count > 1 ? "s" : ""}` : "Panier"}
                className="relative inline-flex size-10 items-center justify-center rounded-full border border-line-strong text-text transition-[border-color,color,background-color] duration-300 hover:border-accent-line hover:bg-accent-soft hover:text-accent"
              >
                <BagIcon className="size-[18px]" />
                {count ? (
                  <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[0.625rem] font-bold tabular-nums text-on-accent">
                    {count}
                  </span>
                ) : null}
              </Link>
              <span className="hidden lg:block">
                <Link href="/boutique" className={buttonClasses("primary", "", "sm")}>
                  Voir la boutique
                  <ArrowRightIcon />
                </Link>
              </span>

              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="site-menu"
                onClick={() => setOpen((v) => !v)}
                className="relative inline-flex size-12 items-center justify-center rounded-full bg-text text-bg transition-transform duration-300 active:scale-95 lg:hidden"
              >
                <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <span
                    className={`absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-premium ${
                      open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute right-0 h-[1.5px] rounded-full bg-current transition-[transform,width] duration-500 ease-premium ${
                      open ? "top-1/2 w-5 -translate-y-1/2 -rotate-45" : "bottom-0 w-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu sheet */}
      <div
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`fixed inset-0 z-30 flex flex-col bg-bg/95 pt-[calc(var(--header-h)+1rem)] backdrop-blur-2xl transition-[opacity,visibility] duration-500 ease-premium lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Navigation mobile" className="container-site flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {siteConfig.mainNav.map((item, i) => {
              const active = isActive(item.href, pathname);
              return (
                <li
                  key={item.href}
                  style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
                  className={`transition-[opacity,transform] duration-600 ease-premium ${
                    open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center justify-between rounded-2xl border px-5 py-4 text-2xl font-bold tracking-tight transition-colors ${
                      active ? "border-accent-line bg-accent-soft text-text" : "border-line bg-surface/60 text-text active:bg-surface"
                    }`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </span>
                    <ArrowRightIcon className="size-5 text-muted transition-transform group-active:translate-x-1" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          style={{ transitionDelay: open ? "360ms" : "0ms" }}
          className={`container-site pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-opacity duration-700 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          <Link href="/boutique" onClick={() => setOpen(false)} className={buttonClasses("primary", "mb-6 w-full")}>
            Voir la boutique
            <ArrowRightIcon />
          </Link>
          <ul className="grid gap-2 text-sm">
            {siteConfig.reassurance.map((b) => {
              const Icon = badgeIcons[b.id];
              return (
                <li key={b.id} className="flex items-center gap-3 text-muted">
                  <Icon className="size-5 text-accent" />
                  {b.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
