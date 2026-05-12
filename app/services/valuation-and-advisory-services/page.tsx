import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import ValuationAndAdvisoryServicesHero from "@/features/services/ValuationAndAdvisoryServicesHero";
import ValuationAndAdvisoryServicesSecondaryTabs from "@/features/services/ValuationAndAdvisoryServicesSecondaryTabs";
import ValuationAndAdvisoryServicesTabs from "@/features/services/ValuationAndAdvisoryServicesTabs";

export const metadata: Metadata = {
  title: "Valuation and Advisory Services",
  description:
    "Professional property development and investment advice for your real estate and business needs, with REMAX/8 as your trusted advisors.",
};

export default function ValuationAndAdvisoryServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ValuationAndAdvisoryServicesHero />
      <ValuationAndAdvisoryServicesTabs />
      <ValuationAndAdvisoryServicesSecondaryTabs />
      <ContactUsForm />
    </main>
  );
}
