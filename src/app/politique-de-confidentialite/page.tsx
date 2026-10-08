import type { Metadata } from "next";
import { LegalPage } from "@/components/page/LegalPage";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.intro,
};

export default function Page() {
  return <LegalPage page={privacyPolicy} />;
}
