import type { Metadata } from "next";
import AboutHero from "@/features/about-us/AboutHero";
import AboutFounderCeo from "@/features/about-us/AboutFounderCeo";
import AboutCommercialTeamHead from "@/features/about-us/AboutCommercialTeamHead";
import AboutLeadershipGrid from "@/features/about-us/AboutLeadershipGrid";
import {
  getFeaturedLeaders,
  getLeadershipTeam,
} from "@/lib/people/leadershipTeam";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership team behind RE/MAX 8 Philippines — one team, one mission, your success.",
};

export default function GlobalExecutiveLeadershipPage() {
  const [founderCeo, commercialTeamHead] = getFeaturedLeaders();

  return (
    <main className="bg-white text-[#2b2b2b]">
      <AboutHero title="One Team. One Mission. Your Success." />
      <AboutFounderCeo leader={founderCeo} />
      <AboutCommercialTeamHead leader={commercialTeamHead} />
      <AboutLeadershipGrid members={getLeadershipTeam()} />
    </main>
  );
}
