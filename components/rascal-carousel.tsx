"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Image from 'next/image';

interface RascalItem {
  id: number;
  title: string;
  description: string;
  src: string;
}

const RascalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Sample data for the carousel
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

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= rascalItems.length - itemsPerView ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? rascalItems.length - itemsPerView : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto mt-12">
      {/* Carousel container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {rascalItems.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 px-4"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow h-full">
                <div className="relative w-full h-48 md:h-56">
                    <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-all text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(rascalItems.length / itemsPerView) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * itemsPerView)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex >= index * itemsPerView && 
              currentIndex < (index + 1) * itemsPerView
                ? "bg-purple-600"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RascalCarousel;