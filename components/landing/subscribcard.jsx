"use client";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import SectionHeading from "./sectionHeading";

const SubscribCard = () => {
    const images = [
        "/images/amcslogo/1.webp",
        "/images/amcslogo/2.webp",
        "/images/amcslogo/3.webp",
        "/images/amcslogo/4.webp",
        "/images/amcslogo/5.webp",
        "/images/amcslogo/6.webp",
        "/images/amcslogo/7.webp",
        "/images/amcslogo/8.webp",
        "/images/amcslogo/9.webp",
        "/images/amcslogo/10.webp",
        "/images/amcslogo/11.webp",
        "/images/amcslogo/12.webp",
        "/images/amcslogo/13.webp",
        "/images/amcslogo/14.webp",
        "/images/amcslogo/15.webp",
    ];
    return (
        <div className="max-w-screen-xl px-4 mx-auto mb-20">
            <SectionHeading title="Our Partners" description="Our Partners" />
            <Carousel
                className="w-full mx-auto"
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
            >
                <CarouselContent className="-ml-1">
                    {images.map((src, index) => (
                        <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/5">
                            <div className="px-5 py-10">
                                <Image
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    width={160}
                                    height={180}
                                    className="opacity-80 hover:opacity-100 transition ease-in-out duration-75"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default SubscribCard;
