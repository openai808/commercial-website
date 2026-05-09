import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import CapitalMarketsExperts from "@/features/services/CapitalMarketsExperts";
import CapitalMarketsHero from "@/features/services/CapitalMarketsHero";
import CapitalMarketsOverview from "@/features/services/CapitalMarketsOverview";
import CapitalMarketsResearchInsights from "@/features/services/CapitalMarketsResearchInsights";

export const metadata: Metadata = {
  title: "Capital Markets & Investment Services",
  description:
    "Property acquisition, ownership, and disposition advisory designed to grow portfolio value and support investment outcomes.",
};

export default function CapitalMarketsAndInvestmentServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <CapitalMarketsHero />
      <CapitalMarketsOverview />
      <CapitalMarketsResearchInsights />
      <CapitalMarketsExperts />
      <ContactUsForm />
    </main>
  );
}
