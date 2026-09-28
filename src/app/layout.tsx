import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

// One clear, modern sans for the whole store (D-21). Variable font, French accents via latin-ext.
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  // Placeholder: final SEO description to be supplied by the client.
  description: siteConfig.name,
  // Keep the site out of search engines until launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#111215",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // Dark by default (brand reference); a saved choice is applied before first paint (D-20).
    <html
      lang={siteConfig.lang}
      data-theme="dark"
      suppressHydrationWarning
      className={jakarta.variable}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1 pt-header">{children}</main>
        <SiteFooter />
        <WhatsAppButton />
      </body>
    </html>
  );
}
