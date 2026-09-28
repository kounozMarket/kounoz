"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

// The <html data-theme> attribute is the single source of truth.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** Dark / light switch: a sun and a moon crossing inside a round button. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode): the choice lasts for this page only.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "light" ? "Activer le mode clair" : "Activer le mode sombre"}
      title={next === "light" ? "Mode clair" : "Mode sombre"}
      className={`relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border border-line-strong text-text transition-[border-color,color,background-color] duration-300 hover:border-accent-line hover:bg-accent-soft hover:text-accent ${className}`}
    >
      {/* Moon: visible in dark mode */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`absolute size-[18px] transition-[transform,opacity] duration-500 ease-premium ${
          theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 translate-y-6 opacity-0"
        }`}
      >
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
      {/* Sun: visible in light mode */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={`absolute size-[18px] transition-[transform,opacity] duration-500 ease-premium ${
          theme === "light" ? "rotate-0 opacity-100" : "rotate-90 -translate-y-6 opacity-0"
        }`}
      >
        <circle cx="12" cy="12" r="3.6" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
}
