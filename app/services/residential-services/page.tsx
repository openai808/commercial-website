import type { Metadata } from "next";
import ServiceDetailHero from "@/features/services/ServiceDetailHero";
import ServiceDetailOverview from "@/features/services/ServiceDetailOverview";

export const metadata: Metadata = {
  title: "Residential Services",
  description:
    "RE/MAX 8 Commercial residential services: buy or sell your home, lease with confidence, move hassle-free.",
};

export default function ResidentialServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ServiceDetailHero
        title="Residential Services"
        tagline="Buy or sell your home, lease with confidence move hassle-free."
        imageSrc="/images/services/residential-services-hero.jpg"
      />
      <ServiceDetailOverview
        heading="Connecting You to the Perfect Neighborhood and Next Chapter."
        body="Finding the right home is about more than just square footage—it is about finding where your life happens. Our dedicated residential team is committed to guiding you through every step of the buying or selling process with transparency, integrity, and personalized care. We handle the complexities of the market, the paperwork, and the negotiations so you can focus on the excitement of your next move."
        imageSrc="/images/services/residential-services-overview.jpg"
        imageAlt="A couple shaking hands with their real estate agent"
      />
    </main>
  );
}
