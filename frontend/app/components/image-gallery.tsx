import Image from "next/image";
import { TImagePost } from "../types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

const ImageGallery = ({ images }: { images: TImagePost[] }) => {
  const imageCount = images?.length;
  const [isEnabled, setIsEnabled] = useState(false);

  if (!images || imageCount === 0) {
    return null; // or some placeholder
  }

  function closeCarousel() {
    setIsEnabled(false);
  }

  return (
    <>
      <div
        className={`grid gap-2 ${
          imageCount === 1
            ? "grid-cols-1"
            : imageCount === 2
            ? "grid-cols-2"
            : imageCount === 3
            ? "grid-cols-2 grid-rows-2"
            : "grid-cols-2 grid-rows-2"
        }`}
      >
        {images.slice(0, 3).map((image: TImagePost, key: number) => (
          <div
            key={key}
            className={`${
              imageCount === 3 && key === 2 ? "col-span-2" : ""
            } overflow-hidden`}
          >
            <Image
              src={image.url}
              alt={`image-${key}`}
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-sm hover:brightness-90 cursor-pointer duration-200 hover:rounded-lg"
              onClick={() => setIsEnabled(true)}
            />
          </div>
        ))}
        {imageCount > 3 && (
          <div
            className="relative rounded-sm hover:brightness-90 cursor-pointer duration-200 hover:rounded-lg"
            onClick={() => setIsEnabled(true)}
          >
            <Image
              src={images[3].url}
              alt={`image-3`}
              width={500}
              height={500}
              className="w-full h-full object-cover "
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-bold">
              +{imageCount - 3}
            </div>
          </div>
        )}
      </div>
      {isEnabled && (
        <div className="fixed inset-0 flex items-center justify-center py-2 bg-black bg-opacity-65 z-[100]">
          <Carousel className="h-screen m-2  flex items-center justify-center">
            <CarouselContent>
              {images.map((image, key) => (
                <CarouselItem className="w-[100px]">
                  <Image
                    src={image.url}
                    alt={`image-${key}`}
                    width={500}
                    height={500}
                    className="w-full h-screen object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious variant={"circleGhost"} />
            <CarouselNext />
            <Button
              className="fixed bottom-0  m-1 mx-auto"
              variant={"outline"}
              onClick={closeCarousel}
            >
              Close
            </Button>
          </Carousel>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
