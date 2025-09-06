import { ThemeSwitcher } from "@/components/theme-switcher";
import Navigation from "@/components/navigation";
import HomeSection from "@/components/home-section";
import RascalGangSection from "@/components/rascal-gang-section";
import RoadmapSection from "@/components/roadmap-section";
import SectionNavigation from "@/components/section-navigation";

import './rascalland.css';

export default function Home() {
  return (
    <>
      <main className="relative">
        <Navigation />
        <HomeSection />
        <RascalGangSection />
        <RoadmapSection />
        <SectionNavigation />
      </main>
      <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
          <p>
            Powered by{" "}mz
          </p>
          <ThemeSwitcher />
      </footer>
    </>
  );
}
