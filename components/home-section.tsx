"use client";
import '@/app/rascalland.css';
import VideoPlayer from './video-player';
import { useTheme } from "next-themes";
import Image from "next/image";
import Rascal from "@/public/images/rascal.png";
import RascalLandHeader from "@/public/images/rascal-land-header-view.png";
import Hero8 from "@/public/images/hero8.png";

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
          <h2 className="text-white grandstander text-2xl sm:text-5xl font-bold text-center mx-auto">
            JOIN THE CREW
          </h2>
          <Image src={Rascal} 
          alt="Rascal"
          className="w-1/2 max-w-[500px] md:max-w-[300px] lg:max-w-[500px] mx-auto"
          />
      </div>
      
      <div className="text-center mx-auto">
        <h1 className="text-5xl md:text-6xl grandstander font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
          
          Welcome to Rascal Land
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10">
          The New Hit Kids Animation Series.
          Earn your 15% royalty stake in the new TV Kids Animated Series now !!!
        </p>
        {/* TV Container */}
        <div className="relative max-w-4xl mx-auto mb-12 bg-opacity-100">
          <VideoPlayer 
          playbackId= { theme == "dark" ? "2v1uyGlSJj3IXMxPrsBk02kUyjWSIjXfMK1VfcwoNf8M" : "IwNopqcC6bXfDzfTiYbaiWx5efwUVGKMTepa3SVqvh8" }
          />
        </div>
      </div>
    </section>
  );
};

export default HomeSection;