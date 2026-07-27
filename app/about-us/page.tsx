import type { Metadata } from "next";
import AboutIntroHero from "@/features/about-us/AboutIntroHero";
import AboutCoreValues from "@/features/about-us/AboutCoreValues";
import AboutAwards from "@/features/about-us/AboutAwards";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about RE/MAX 8 Realty's vision, mission, and core values behind Beyond Real Estate.",
};

export default function AboutUsPage() {
  return (
    <main className="bg-white text-[#000759]">
      <AboutIntroHero />
      <AboutCoreValues />
      <AboutAwards />
    </main>
  );
}
