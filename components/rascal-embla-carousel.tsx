import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { RascalItem } from './rascal-gang-section';
import Image from 'next/image';

type PropType = {
  slides: RascalItem[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, /*emblaApi*/] = useEmblaCarousel(options)

  return (
    <section className="embla w-full max-w-full mx-auto">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item) => (
            <div className="embla__slide" key={item.id}>
              <div className="embla__slide__number">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col mx-2">
                    <div className="relative w-full h-40 sm:h-48 md:h-56 flex-shrink-0">
                        <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                    <div className="mt-4 flex flex-col flex-grow px-2 pb-2">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
                        {item.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 flex-grow text-center">
                        {item.description}
                        </p>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel