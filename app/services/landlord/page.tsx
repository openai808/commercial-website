import type { Metadata } from "next";
import ServiceDetailHero from "@/features/services/ServiceDetailHero";
import ServiceDetailOverview from "@/features/services/ServiceDetailOverview";

export const metadata: Metadata = {
  title: "Landlord Representation",
  description:
    "RE/MAX 8 Commercial landlord representation: list your property, attract qualified tenants, and close profitable leases.",
};

export default function LandlordRepresentationPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ServiceDetailHero
        title="Landlord Representation"
        tagline="List your property, attract qualifies tenants, close profitable leases."
        imageSrc="/images/services/landlord-hero.jpg"
      />
      <ServiceDetailOverview
        heading="Maximizing Asset Value through Strategic Leasing."
        body="Your property is a significant investment, and maximizing its return requires a proactive approach. At RE/MAX 8 Commercial, our landlord representation services combine deep market intelligence with targeted marketing strategies to position your asset ahead of the competition. We don't just wait for inquiries—we aggressively pursue creditworthy tenants, minimize vacancy periods, and negotiate stable, high-yield leases that enhance your property's long-term valuation."
        imageSrc="/images/services/landlord-overview.jpg"
        imageAlt="Hands presenting a small house model over a lease document"
      />
    </main>
  );
}
