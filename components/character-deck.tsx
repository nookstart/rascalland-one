"use client";

import { useRef, useEffect, useState } from 'react';
import { useScroll,  useSpring } from 'framer-motion';
import { Grandstander } from "next/font/google";
import CharacterCard from './character-card';

const GrandstanderFont = Grandstander({
  variable: "--font-granstander",
  display: "swap",
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

interface NFTImage {
  id: number;
  frontImage: string;
  altText: string;
}

const CharacterDeck = ({ images }: { images: NFTImage[] }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (scrollContainerRef.current) {
        setContainerWidth(scrollContainerRef.current.offsetWidth);
      }
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Ang Hooks na ito ay nasa top-level, kaya TAMA.
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 40,
    mass: 0.5,
  });

  if (screenSize.width === 0) {
    return <div ref={scrollContainerRef} className="relative h-[300vh] w-full" />;
  }

  return (
    <div ref={scrollContainerRef} className="relative h-[100vh] w-full">
      <div className="sticky top-1/4 left-0 w-full">
        <div className={`${GrandstanderFont.className} w-full max-w-7xl mx-auto text-center mb-10 px-4`}>
            <h1 className={`text-5xl z-90 md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent`}>
              Welcome to Rascal Land
            </h1>
            <p className="text-xl z-90 md:text-2xl text-gray-700 dark:text-gray-300">
              The New Hit Kids Animation Series.
            </p>
        </div>
        <div className="relative w-full h-[50vh] flex items-center justify-center mb-10">
          {/* Ngayon, nag-ma-map na lang tayo sa bagong component */}
          {images.map((image, index) => (
            <CharacterCard
              key={image.id}
              index={index}
              totalCards={images.length}
              image={image}
              progress={smoothProgress} // Ipasa ang scroll progress
              screenSize={screenSize}
              containerWidth={containerWidth}
            />
          ))}
        </div>
        <div className={`${GrandstanderFont.className} w-full max-w-7xl mx-auto text-center mb-10 px-4`}>
            <h1 className={`text-5xl z-90 md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent`}>
              &nbsp;
            </h1>
            <p className="text-xl z-90 md:text-2xl text-gray-700 dark:text-gray-300">
              &nbsp;
            </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDeck;