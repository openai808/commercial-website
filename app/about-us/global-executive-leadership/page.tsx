import type { Metadata } from "next";
import AboutHero from "@/features/about-us/AboutHero";
import AboutFeaturedLeaders from "@/features/about-us/AboutFeaturedLeaders";
import AboutLeadershipGrid from "@/features/about-us/AboutLeadershipGrid";
import { getAvatarsByName } from "@/lib/people/getAvatarsByName";
import {
  getFeaturedLeaders,
  getLeadershipTeam,
} from "@/lib/people/leadershipTeam";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership team behind RE/MAX 8 Philippines — one team, one mission, your success.",
};

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80";

export default async function GlobalExecutiveLeadershipPage() {
  const avatarsByName = await getAvatarsByName();

  const featuredLeaders = getFeaturedLeaders().map((leader) => ({
    ...leader,
    avatarUrl: avatarsByName.get(leader.name.toLowerCase()) ?? DEFAULT_AVATAR,
  }));

  const leadershipTeam = getLeadershipTeam().map((member) => ({
    ...member,
    avatarUrl: avatarsByName.get(member.name.toLowerCase()) ?? DEFAULT_AVATAR,
  }));

  return (
    <main className="bg-white text-[#000759]">
      <AboutHero
        eyebrow="Leadership"
        title="One Team. One Mission. Your Success."
      />
      <AboutFeaturedLeaders leaders={featuredLeaders} />
      <AboutLeadershipGrid members={leadershipTeam} />
    </main>
  );
}
