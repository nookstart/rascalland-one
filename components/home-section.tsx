"use client";
import VideoPlayer from './video-player';
import { useTheme } from "next-themes";
import Image from "next/image";
import CharacterDeck from './character-deck';
import Rascal from "@/public/images/rascal.png";
import RascalLandHeader from "@/public/images/rascal-land-header-view.png";
import Hero8 from "@/public/images/hero8.webp";
import { Grandstander } from "next/font/google";

const GrandstanderFont = Grandstander({
  variable: "--font-granstander",
  display: "swap",
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

const NFTImages = [
  {
    id: 1,
    frontImage: '/images/aboutus-character1.webp',
    altText: 'Mooner Man NFT #1',
  },
  {
    id: 2,
    frontImage: '/images/aboutus-character2.webp',
    altText: 'Mooner Man NFT #2',
  },
  {
    id: 3,
    frontImage: '/images/aboutus-character3.webp',
    altText: 'Mooner Man NFT #3',
  },
  {
    id: 4,
    frontImage: '/images/aboutus-character4.webp',
    altText: 'Mooner Man NFT #4',
  },
  {
    id: 5,
    frontImage: '/images/aboutus-character5.webp',
    altText: 'Mooner Man NFT #5',
  },
  {
    id: 6,
    frontImage: '/images/aboutus-character6.webp',
    altText: 'Mooner Man NFT #6',
  },
  {
    id: 7,
    frontImage: '/images/aboutus-character7.webp',
    altText: 'Mooner Man NFT #7',
  },
];
const HomeSection = () => {
  const { theme } = useTheme();
  return (
    <section
      id="home"
      className="flex flex-col items-center w-full justify-center mt-16 relative px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${Hero8.src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top"
       }}
    >
      <div className="w-full items-center justify-center">
          <Image 
          src={RascalLandHeader}
          alt="Welcome to Rascal Land"
          className="w-1/2 max-w-[640px] md:max-w-[320px] lg:max-w-[640px] mx-auto pt-2 pb-2 sm:pt-10 sm:pb-5"
          />
          <h2 className={`${GrandstanderFont.className} text-white text-2xl sm:text-5xl font-bold text-center mx-auto`}>
            JOIN THE CREW
          </h2>
          <Image src={Rascal} 
          alt="Rascal"
          className="w-1/2 max-w-[500px] md:max-w-[300px] lg:max-w-[500px] mx-auto"
          />
      </div>
      <section id="character-deck" className="relative w-full">
        <CharacterDeck images={NFTImages} />
      </section>
      <section id="video-player-section" className="text-center mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mx-auto">
          {/* TV Container */}
          <div className="relative max-w-4xl mx-auto">
            <VideoPlayer 
            playbackId= { theme == "dark" ? "2v1uyGlSJj3IXMxPrsBk02kUyjWSIjXfMK1VfcwoNf8M" : "IwNopqcC6bXfDzfTiYbaiWx5efwUVGKMTepa3SVqvh8" }
            />
          </div>
        </div>
      </section>
    </section>
  );
};

export default HomeSection;