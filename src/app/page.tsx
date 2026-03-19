import { Hero } from "@/components/hero";
import { WorkSection } from "@/components/work-section";
import { Marquee } from "@/components/marquee";
import { Experience } from "@/components/experience";
import { HardwareSection } from "@/components/hardware-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkSection />
      <Marquee />
      <Experience />
      <HardwareSection />
      <Footer />
    </>
  );
}
