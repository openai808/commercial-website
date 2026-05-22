import type { Metadata } from "next";
import { getCareers } from "@/lib/careers/getCareers";
import CareersHero from "@/features/careers/CareersHero";
import CareersGrid from "@/features/careers/CareersGrid";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at RE/MAX Commercial Philippines. Find open positions and join our growing team.",
};

export default async function CareersPage() {
  const careers = await getCareers();

  return (
    <main className="bg-white text-[#000759]">
      <CareersHero />

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8 lg:px-10 lg:py-14">
        {careers.length > 0 && (
          <p className="mb-6 text-xs text-[#4a5f9a]">
            {careers.length} open{" "}
            {careers.length === 1 ? "position" : "positions"}
          </p>
        )}

        <CareersGrid careers={careers} />
      </section>
    </main>
  );
}
