import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

type Props = {
  customClassName: string;
};

export const CustomCarousel = ({ customClassName }: Props) => {
  return (
    <div className={customClassName}>
      <Carousel
        className="w-full h-full bg-zinc-900 text-white"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="w-full h-full">
          <CarouselItem className="w-full h-full flex justify-center items-center px-12">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident assumenda repudiandae in doloribus natus ea debitis ex corrupti ad tempora, et consectetur officiis quis perferendis atque, aspernatur recusandae! Minus, sequi?
          </CarouselItem>
          <CarouselItem className="w-full h-full flex justify-center items-center px-12">2</CarouselItem>
          <CarouselItem className="w-full h-full flex justify-center items-center px-12">3</CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
