import type { Metadata } from "next";
import ServiceDetailHero from "@/features/services/ServiceDetailHero";
import ServiceDetailOverview from "@/features/services/ServiceDetailOverview";

export const metadata: Metadata = {
  title: "Title Conveyancing Service",
  description:
    "RE/MAX 8 Commercial title conveyancing services: transfer ownership, complete legal documents, close transactions smoothly.",
};

export default function TitleConveyancingServicePage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ServiceDetailHero
        title="Title Conveyancing Service"
        tagline="List your property, attract qualifies tenants, close profitable leases."
        imageSrc="/images/services/title-conveyancing-hero.jpg"
      />
      <ServiceDetailOverview
        heading="Mitigating Risk. Ensuring Seamless Property Ownership."
        body="A successful real estate transaction depends entirely on a flawless transfer of ownership. At RE/MAX 8 Commercial, our title and conveyancing services provide the rigorous legal scrutiny and administrative precision required to protect your investment. We meticulously handle title searches, clear encumbrances, and manage the transfer process from contract to closing. By identifying and resolving potential legal hurdles early, we safeguard your equity and ensure a secure, undisputable title transition."
        imageSrc="/images/services/title-conveyancing-overview.jpg"
        imageAlt="Two people exchanging a signed document across a desk"
      />
    </main>
  );
}
