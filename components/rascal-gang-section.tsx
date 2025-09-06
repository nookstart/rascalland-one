"use client";
import RascalCarousel from "./rascal-carousel";

const RascalGangSection = () => {
  return (
    <section
      id="rascal-gang"
      className="min-h-screen  flex flex-col items-center justify-center relative p-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800"
    >
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl mt-8 font-bold mb-6 text-gray-800 dark:text-white">
          Rascal Gang
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10">
          Join our exclusive community of Solana enthusiasts and NFT collectors.
          The Rascal Gang is a collection of 8,888 unique NFTs living on the
          Solana blockchain.
        </p>

        {/* Carousel Component */}
        <RascalCarousel />
      </div>
    </section>
  );
};

export default RascalGangSection;