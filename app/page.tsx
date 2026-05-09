import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HomeHero from "@/features/home/HomeHero";

function HomeBelowHeroFallback() {
  return (
    <div className="w-full space-y-0" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`home-below-skel-${i}`}
          className="animate-pulse border-b border-zinc-100 bg-zinc-50/80 py-16"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <div className="h-7 w-40 rounded bg-zinc-200" />
            <div className="mt-6 h-32 w-full max-w-3xl rounded-lg bg-zinc-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

const HomeBelowHero = dynamic(
  () => import("@/features/home/HomeBelowHero"),
  {
    loading: () => <HomeBelowHeroFallback />,
  },
);

export const metadata: Metadata = {
  title: {
    absolute: "RE/MAX Commercial Philippines | Commercial Real Estate",
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-white font-sans">
      <main className="w-full min-w-0">
        <HomeHero />
        <HomeBelowHero />
      </main>
    </div>
  );
}
