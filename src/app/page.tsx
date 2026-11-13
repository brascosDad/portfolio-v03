import { Hero } from "@/components/hero";
import { WalkthroughsSection } from "@/components/walkthroughs-section";
import { WorkSection } from "@/components/work-section";
import { Marquee } from "@/components/marquee";
import { HardwareSection } from "@/components/hardware-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div className="mt-[120px]"><WalkthroughsSection /></div>
      <div className="mt-[60px]"><WorkSection /></div>
      <div className="mt-[60px]"><Marquee /></div>
      <div className="mt-[60px]"><HardwareSection /></div>
      <div className="mt-[30px] md:mt-[-10px] lg:mt-[-50px]"><Footer /></div>
    </div>
  );
}
