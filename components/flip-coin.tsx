import { useState } from 'react';
import Image from 'next/image';
import { Grandstander } from "next/font/google";

const GrandstanderFont = Grandstander({
  variable: "--font-granstander",
  display: "swap",
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
});

import '@/app/css/flip-coin.css';
interface FlipImage {
  id: number;
  frontImage: string;
  altText: string;
}

interface FlipCoinProps {
  images: FlipImage[];
}
// const bgImage = '/images/background_about_final.png';
const FlipCoin = ({ images }: FlipCoinProps) => {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <div className="flex items-center justify-center relative top-2 mb-4">
      <div className={`${GrandstanderFont.className} w-full max-w-7xl mx-auto text-center`}>
        <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-yellow-500 bg-clip-text text-transparent`}>
          Welcome to Rascal Land
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10">
          The New Hit Kids Animation Series.
          Earn your 15% royalty stake in the new TV Kids Animated Series now !!!
        </p>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 cursor-pointer"
              onMouseEnter={() => setFlipped(image.id)}
              onMouseLeave={() => setFlipped(null)}
              onClick={() => setFlipped(flipped === image.id ? null : image.id)}
            >
              {/* Front of the card - PNG image */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  flipped === image.id 
                    ? 'opacity-0 rotate-y-180' 
                    : 'opacity-100 rotate-y-0'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-full h-full rounded-lg shadow-lg overflow-hidden p-2">
                  <Image
                    src={image.frontImage}
                    alt={image.altText}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, 224px"
                  />
                </div>
              </div>
              
              {/* Back of the card - Coin image */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  flipped === image.id 
                    ? 'opacity-100 rotate-y-0' 
                    : 'opacity-0 rotate-y-180'
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-full h-full rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-red-200 to-yellow-500 flex items-center justify-center p-2">
                  <div className="relative w-full h-full">
                    <Image
                      src="/images/coinv3.png"
                      alt="Coin"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, 224px"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlipCoin;