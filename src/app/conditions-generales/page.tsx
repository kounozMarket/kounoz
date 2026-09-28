import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { termsOfSale } from "@/content/legal";

export const metadata: Metadata = {
  title: termsOfSale.title,
  description: termsOfSale.intro,
};

export default function Page() {
  return <LegalPage page={termsOfSale} />;
}
