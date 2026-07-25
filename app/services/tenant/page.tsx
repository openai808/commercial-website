import type { Metadata } from "next";
import ServiceDetailHero from "@/features/services/ServiceDetailHero";
import ServiceDetailOverview from "@/features/services/ServiceDetailOverview";

export const metadata: Metadata = {
  title: "Tenant Representation",
  description:
    "RE/MAX 8 Commercial tenant representation: find the right property, negotiate lease terms, and secure the best space.",
};

export default function TenantRepresentationPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ServiceDetailHero
        title="Tenant Representation"
        tagline={"Find the right property, negotiate\nlease terms, secure the best space."}
        imageSrc="/images/services/tenant-hero.jpg"
        underlineTarget="epre"
      />
      <ServiceDetailOverview
        heading="Spaces That Inspire. Terms That Protect."
        body="Don't go into lease negotiations alone. Our tenant representation experts at RE/MAX 8 bridges the gap between your ideal workspace and the perfect contract. We level the playing field against landlords, utilizing data-driven insights and proven negotiation tactics to secure competitive rates, tenant improvement allowances, and terms that safeguard your bottom line."
        imageSrc="/images/services/tenant-overview.jpg"
        imageAlt="Tenant representation team meeting in an office"
      />
    </main>
  );
}
