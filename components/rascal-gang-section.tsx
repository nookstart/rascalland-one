"use client";

import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/rascal-embla-carousel';
import '@/app/css/embla.css';
import RascalGang from '@/public/images/rascal-gang.png';
import Image from 'next/image';

export interface RascalItem {
  id: number;
  title: string;
  description: string;
  src: string;
}
const rascalItems: RascalItem[] = [
    {
      id: 1,
      title: "Mooner Man",
      description: "Unique traits and attributes that make this Rascal special.",
      src: "/images/mooner-man.png",
    },
    {
      id: 2,
      title: "Ana Wanna",
      description: "Another unique Rascal with special abilities and features.",
      src: "/images/anna-wanna.png"
    },
    {
      id: 3,
      title: "Sassy",
      description: "This Rascal stands out with its distinctive appearance.",
      src: "/images/sassy.png"
    },
    {
      id: 4,
      title: "Rude Boy",
      description: "A rare Rascal with exclusive traits and characteristics.",
      src: "/images/rude-boy.png",
    },
    {
      id: 5,
      title: "Pancho",
      description: "This Rascal has unique powers that set it apart from others.",
      src: "/images/pancho.png",
    },
    {
      id: 6,
      title: "Prince Asahd",
      description: "A special edition Rascal with limited availability.",
      src: "/images/prince-asahd.png",
    },
    {
      id: 7,
      title: "Bolly",
      description: "A special edition Rascal with limited availability.",
      src: "/images/bolly.png",
    },
    {
      id: 8,
      title: "Little Matriache",
      description: "A special edition Rascal with limited availability.",
      src: "/images/little-mariache.png",
    },
];
const OPTIONS: EmblaOptionsType = {
  align: 'start',
  loop: true,
  skipSnaps: false,
  containScroll: 'trimSnaps'
}

const SLIDES = rascalItems;

const RascalGangSection = () => {
  return (
    <section
      id="rascal-gang"
      className="min-h-screen flex flex-col items-center justify-center max-w-full overflow-hidden px-4 py-12 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800"
    >
      <div className="text-center w-full max-w-full mx-auto px-0 sm:px-4">
       
        <Image src={RascalGang}
        alt="Rascal Gang"
        />
        <p className="text-base sm:text-lg md:text-xl font-bold text-gray-600 dark:text-gray-300 mb-8 md:mb-10 p-4">
          Join the Little Rascals on their wild adventures! Explore magical worlds, learn important life lessons, and dive into exciting games and activities—all designed to entertain and educate your little ones!
        </p>

        {/* Carousel Component */}
        <div className="w-full max-w-full overflow-hidden">
          <EmblaCarousel 
            slides={SLIDES}
            options={OPTIONS}
          />
        </div>
      </div>
    </section>
  );
};

export default RascalGangSection;