import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}