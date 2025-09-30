"use client";

import Image from 'next/image';
import { motion, useTransform, MotionValue } from 'framer-motion';

interface CharacterCardProps {
  index: number;
  totalCards: number;
  image: {
    id: number;
    frontImage: string;
    altText: string;
  };
  progress: MotionValue<number>; // Ipasa ang smoothProgress mula sa parent
  screenSize: { width: number; height: number };
  containerWidth: number;
}

const CharacterCard = ({ index, totalCards, image, progress, screenSize, containerWidth }: CharacterCardProps) => {
  // Ang Hooks ay nasa top-level na, kaya ito ay LIGTAS.
  const angle = (index / totalCards) * 360;
  const radius = 35;
  const cardWidth = 192;
  const maxHorizontalMove = (containerWidth / 2) - (cardWidth / 2) - 20;

  const smallerDimension = Math.min(screenSize.width, screenSize.height);
  const finalX = Math.cos(angle * (Math.PI / 180)) * radius * (smallerDimension / 100);
  const finalY = Math.sin(angle * (Math.PI / 180)) * radius * (smallerDimension / 100);

  const xPos = useTransform(
    progress,
    [0, 0.5, 1],
    [
      (index - totalCards / 2) * -5,
      Math.max(-maxHorizontalMove, Math.min(maxHorizontalMove, (index - totalCards / 2) * 60)),
      finalX
    ]
  );

  const yPos = useTransform(
    progress,
    [0, 0.5, 1],
    [
      index * 4,
      (index - totalCards / 2) * 10,
      finalY
    ]
  );

  const scale = useTransform(progress, [0, 0.2], [0.8, 1]);
  const rotate = useTransform(progress, [0, 0.5], [index * 5 - (totalCards / 2) * 5, 0]);

  return (
    <motion.div
      key={image.id}
      className="absolute w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
      style={{ x: xPos, y: yPos, scale, rotate, zIndex: index }}
    >
      <Image
        src={image.frontImage}
        alt={image.altText}
        fill
        className="object-contain p-2 rounded-lg shadow-2xl bg-white/10 backdrop-blur-sm"
        sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
      />
    </motion.div>
  );
};

export default CharacterCard;