import Button from "@/components/ui/Atoms/Button";
import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
const StudentDashboardCardTwo = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[0.625rem] flex-shrink-0 tablet:w-[22.25rem] h-[16.75rem] py-[1.125rem] px-[0.6875rem] bg-background rounded-[1.875rem] border-[1px] border-card-border">
      <div className="flex flex-col gap-[1.06rem]">
        {/* first line */}
        <div className="flex justify-center items-center gap-[3.62rem]">
          <h1 className="text-[0.875rem] leading-[1.75rem] font-semibold w-[11.125rem]">
            Recommended
          </h1>
          <IoAddCircleSharp className="w-[1.9375rem] h-[1.9375rem] text-app-green" />
        </div>
        {/* second line */}
        <div className="py-[0.62rem]">
          <h1 className="text-[1.125rem] text-center font-caladea font-bold">
            You don’t have any exams added!
          </h1>
          <div className="flex justify-center">
            <p className="w-[13.125rem] mt-[0.62rem] text-center  text-[0.625rem] leading-[150%] font-normal font-inter text-[#D2D2FF]">
              Add the exams that you’re studying for to quickly access them
              here.
            </p>
          </div>
        </div>
        {/* button */}
        <div className="flex justify-center">
          <Button className="w-[6.8125rem] h-[1.8125rem] py-[0.4375rem] px-[1.375rem] text-[0.75rem] leading-[125%] font-semibold font-inter">
            Add exams
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardCardTwo;
