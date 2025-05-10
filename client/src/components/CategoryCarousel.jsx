import React from "react";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/index";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 p-2">
              <Button
                onClick={() => searchJobHandler(category)}
                variant="outline"
                className="rounded-full w-full py-2 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6A38C2]"
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          aria-label="Previous"
          className="absolute left-0 z-10"
        >
          <Button variant="outline" className="rounded-full p-2">
            {"<"}
          </Button>
        </CarouselPrevious>
        <CarouselNext aria-label="Next" className="absolute right-0 z-10">
          <Button variant="outline" className="rounded-full p-2">
            {">"}
          </Button>
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
