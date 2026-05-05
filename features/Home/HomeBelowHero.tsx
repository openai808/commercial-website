import HomeBlogSlider from "@/features/Home/HomeBlogSlider";
import HomeContact from "@/features/Home/HomeContact";
import HomeNewsInsights from "@/features/Home/HomeNewsInsights";
import HomePillars from "@/features/Home/HomePillars";
import HomeServices from "@/features/Home/HomeServices";
import HomeTicker from "@/features/Home/HomeTicker";

export default function HomeBelowHero() {
  return (
    <>
      <HomeTicker />
      <HomeNewsInsights />
      <HomeBlogSlider />
      <HomeServices />
      <HomePillars />
      <HomeContact />
    </>
  );
}
