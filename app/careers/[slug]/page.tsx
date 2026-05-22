import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCareerBySlug } from "@/lib/careers/getCareers";
import CareerDetailHero from "@/features/careers/CareerDetailHero";
import CareerDetailContent from "@/features/careers/CareerDetailContent";

type CareerDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CareerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);

  if (!career) {
    return { title: "Position not found" };
  }

  const parts = [career.title];
  if (career.department) parts.push(career.department);
  if (career.location) parts.push(career.location);

  return {
    title: career.title,
    description: `${parts.join(" — ")} at RE/MAX Commercial Philippines.`,
  };
}

export default async function CareerDetailPage({
  params,
}: CareerDetailPageProps) {
  const { slug } = await params;
  const career = await getCareerBySlug(slug);

  if (!career) {
    notFound();
  }

  return (
    <main className="bg-white text-[#000759]">
      <CareerDetailHero career={career} />
      <CareerDetailContent career={career} />
    </main>
  );
}
