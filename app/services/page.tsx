import type { Metadata } from "next";
import ServicesHero from "@/features/services/ServicesHero";
import ServiceLines from "@/features/services/ServiceLines";
import ContactUsForm from "@/components/ContactUsForm";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore RE/MAX Commercial Philippines services for investment, leasing, valuation, and property solutions.",
};

export default function ServicesPage() {
  return (
    <main className="bg-white text-[#1f2d57]">
      <ServicesHero />
      <ServiceLines />
      <ContactUsForm />
    </main>
  );
}
