import type { Metadata } from "next";
import ServiceDetailHero from "@/features/services/ServiceDetailHero";
import ServiceDetailOverview from "@/features/services/ServiceDetailOverview";

export const metadata: Metadata = {
  title: "Property Vetting Service",
  description:
    "RE/MAX 8 Commercial property vetting services: verify ownership, access risks, ensure property legitimacy.",
};

export default function PropertyVettingServicePage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ServiceDetailHero
        title="Property Vetting Service"
        tagline="List your property, attract qualifies tenants, close profitable leases."
        imageSrc="/images/services/property-vetting-hero.jpg"
      />
      <ServiceDetailOverview
        heading="Comprehensive Asset Vetting. Total Peace of Mind."
        body="Don't inherit someone else's property headaches. Our property vetting services offer thorough, objective due diligence for buyers, tenants, and lenders alike. From structural integrity and HVAC longevity to local zoning restrictions and encumbrances, we leave no stone unturned. Our expert team ensures that the property you are buying or leasing is exactly what you expect—legally sound, structurally secure, and fully optimized for your operational needs."
        imageSrc="/images/services/property-vetting-overview.jpg"
        imageAlt="A woman in a red blazer reviewing a property document"
      />
    </main>
  );
}
