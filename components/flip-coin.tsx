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

  return (
    <div className="flex items-center justify-center relative top-2 mb-4">
      <div className={`${GrandstanderFont.className} w-full max-w-7xl mx-auto text-center`}>
        {/* ... (h1 at p tags) ... */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
          {images.map((image) => (
            <div
              key={image.id}
              className="nft-card w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 cursor-pointer"
            >
              <Image
                src={image.frontImage} // Siguraduhing .webp na ito
                alt={image.altText}
                fill
                className="nft-card-image object-contain p-2"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, 224px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlipCoin;