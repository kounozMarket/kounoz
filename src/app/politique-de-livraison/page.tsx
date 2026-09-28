import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { shippingPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: shippingPolicy.title,
  description: shippingPolicy.intro,
};

export default function Page() {
  return <LegalPage page={shippingPolicy} />;
}
