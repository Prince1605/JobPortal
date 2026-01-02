import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend developer",
  "Backend developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl x-auto my-20">
        <CarouselContent>
          {
            category.map((cat,index)=>(
                <CarouselItem className='md:basis-1/2 lg:basis-1/3' key ={index}>
                    <Button variant="outline" className="rounded-full">{cat}</Button>
                </CarouselItem>

            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
