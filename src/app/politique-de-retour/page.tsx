import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { returnPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: returnPolicy.title,
  description: returnPolicy.intro,
};

export default function Page() {
  return <LegalPage page={returnPolicy} />;
}
