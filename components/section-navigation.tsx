"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const SectionNavigation = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      if (!isMounted) return;
      
      // Determine current section based on scroll position
      const sections = ["home", "rascal-gang", "roadmap"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentSection(section);
            break;
          }
        }
      }

      // Hide navigation when at the bottom of the page
      setIsVisible(
        window.innerHeight + window.scrollY <
          document.documentElement.scrollHeight - 100
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getNextSection = () => {
    const sections = ["home", "rascal-gang", "roadmap"];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1
      ? sections[currentIndex + 1]
      : sections[0];
  };

  const getPrevSection = () => {
    const sections = ["home", "rascal-gang", "roadmap"];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex > 0
      ? sections[currentIndex - 1]
      : sections[sections.length - 1];
  };

  if (!isMounted || !isVisible) return null;

  return (
    <div className="fixed right-6 bottom-6 z-40 flex flex-col space-y-4">
      <button
        onClick={() => scrollToSection(getPrevSection())}
        className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
        aria-label="Scroll to previous section"
      >
        <ChevronUp size={24} />
      </button>
      <button
        onClick={() => scrollToSection(getNextSection())}
        className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={24} />
      </button>
    </div>
  );
};

export default SectionNavigation;