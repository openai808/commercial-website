import HomeBlogSlider from "@/features/home/HomeBlogSlider";
import HomeContact from "@/features/home/HomeContact";
import HomeNewsInsights from "@/features/home/HomeNewsInsights";
import HomePillars from "@/features/home/HomePillars";
import HomeServices from "@/features/home/HomeServices";

export default function HomeBelowHero() {
  return (
    <>
      <HomeNewsInsights />
      <HomeBlogSlider />
      <HomeServices />
      <HomePillars />
      <HomeContact />
    </>
  );
}
