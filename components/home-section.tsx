"use client";

import { ChevronDown } from "lucide-react";

const HomeSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
          Welcome to Rascal Land
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10">
          The New Hit Kids Animation Series.
          Earn your 15% royalty stake in the new TV Kids Animated Series now !!!
        </p>
        <button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all transform hover:scale-105">
          Mint Now
        </button>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <ChevronDown
          size={40}
          className="text-gray-500 dark:text-gray-400 cursor-pointer"
          onClick={() =>
            document
              .getElementById("rascal-gang")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </div>
    </section>
  );
};

export default HomeSection;