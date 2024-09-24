import Button from "@/components/ui/Atoms/Button";
import React from "react";
import { IoSearch } from "react-icons/io5";

const StudentDashboardCard = () => {
  return (
    <div className="h-[16.75rem] inline-flex flex-col items-start shrink-0 gap-[0.625rem] py-[1.9375rem] px-[2rem] rounded-[1.875rem] bg-background border-[1px] border-card-border">
      <div className="flex flex-col items-start gap-[3.5rem]">
        {/* first line */}
        <div className="flex items-center gap-[0.75rem]">
          <Button className="w-[8.0625rem] h-[1.8125rem] rounded-[1rem] font-inter text-[0.75rem] font-semibold leading-[125%]">
            Resume Studying
          </Button>
          <p className="font-inter text-[0.75rem] font-normal leading-[125%] text-[#9E9ABC]">
            Recently Viewed
          </p>
        </div>
        {/* second line */}
        <div className="flex gap-[1.25rem]">
          {/* circles */}
          <div className="relative flex items-center justify-center">
            {/* Smallest Circle */}
            <div className="flex justify-center items-center absolute w-[2rem] h-[2rem] bg-app-green opacity-90 rounded-full z-30">
              <IoSearch />
            </div>
            {/* Middle Circle */}
            <div className="absolute w-[4rem] h-[4rem] bg-app-green opacity-60 rounded-full z-20"></div>
            {/* Largest Circle */}
            <div className="w-[6rem] h-[6rem] bg-app-green opacity-30 rounded-full z-10"></div>
          </div>
          {/* browse paragraph */}
          <div className="flex flex-col gap-[1rem]">
            <h1 className="text-[1.125rem] font-caladea w-[12rem] h-[2.265rem] font-bold">
              Browse over 1.5 million notes & flashcards
            </h1>
            <p className="w-[13.875rem] text-[0.625rem] font-inter leading-[150%] text-[#D2D2FF]">
              Search an exam, or keyword and find what you’re looking for.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardCard;
