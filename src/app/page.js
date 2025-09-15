import { DemoHeroGeometric } from "@/components/DemoHeroGeometric";
import BulkBuyerSection from "@/components/home/BulkBuyerSection";
import CategoryMain from "@/components/home/CategoryMain";
import NewProductsSlider from "@/components/home/NewProductsSlider";
import NewRequestSlider from "@/components/home/NewRequestSlider";
import PlatformIntro from "@/components/home/PlatformIntro";
import SliderHome from "@/components/home/SliderHome";

export default async function Home() {
  return (
    <>
      <SliderHome />
      <CategoryMain />
      <NewProductsSlider />
      <NewRequestSlider />
      {/* <DemoHeroGeometric /> */}
      <BulkBuyerSection />
      <PlatformIntro />
    </>
  );
}
