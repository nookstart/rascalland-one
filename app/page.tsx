import Navigation from "@/components/navigation";
import HomeSection from "@/components/home-section";
import RascalGangSection from "@/components/rascal-gang-section";
import RoadmapSection from "@/components/roadmap-section";
import SectionNavigation from "@/components/section-navigation";


export default function Home() {
  return (
    <>
      <Navigation />
      <main 
      role="main" 
      className="relative min-h-screen flex flex-col items-center snap-y snap-mandatory"
      
      >
        <HomeSection />
        <RascalGangSection />
        <RoadmapSection />
        <SectionNavigation />
      </main>
      <footer role="contentinfo" className="w-full grandstander flex flex-col sm:flex-row items-center justify-center border-t mx-auto text-center text-xs gap-4 sm:gap-8 py-8 sm:py-16">
          <p>
            Rascal Land &copy; 2025 
          </p>
      </footer>
    </>
  );
}
