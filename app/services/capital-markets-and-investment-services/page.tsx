import type { Metadata } from "next";
import ServiceDetailHero from "@/features/services/ServiceDetailHero";
import ServiceDetailOverview from "@/features/services/ServiceDetailOverview";

export const metadata: Metadata = {
  title: "Capital Markets & Investment Service",
  description:
    "RE/MAX 8 Commercial capital markets & investment services: identify opportunities, maximize returns, grow your real estate portfolio.",
};

export default function CapitalMarketsAndInvestmentServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ServiceDetailHero
        title="Capital Markets & Investment Service"
        tagline="Identify opportunities, maximize returns, grow your real estate portfolio."
        imageSrc="/images/services/capital-markets-and-investment-services-hero.jpg"
      />
      <ServiceDetailOverview
        heading="Maximizing Liquidity. Optimizing Returns."
        body="We streamline the complexities of real estate capital markets. From underwriting and asset positioning to debt advisory and final execution, our investment services team provides the end-to-end guidance needed to complete high-stakes transactions seamlessly. Our global reach and deep market penetration ensure your assets receive maximum exposure to qualified global capital, driving competitive bidding and securing the highest possible asset valuations."
        imageSrc="/images/services/capital-markets-and-investment-services-overview.jpg"
        imageAlt="Two colleagues discussing investment documents in an office"
      />
    </main>
  );
}
