import type { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";
import ResidentialServicesHero from "@/features/services/ResidentialServicesHero";
import ResidentialServicesFeaturedProperties from "@/features/services/ResidentialServicesFeaturedProperties";
import ResidentialServicesLeadership from "@/features/services/ResidentialServicesLeadership";
import ResidentialServicesOverview from "@/features/services/ResidentialServicesOverview";

export const metadata: Metadata = {
  title: "Residential Services",
  description:
    "REMAX/8 residential specialists bring deep experience across every facet of residential real estate.",
};

export default function ResidentialServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ResidentialServicesHero />
      <ResidentialServicesOverview />
      <ResidentialServicesLeadership />
      <ResidentialServicesFeaturedProperties />
      <ContactUsForm />
    </main>
  );
}
