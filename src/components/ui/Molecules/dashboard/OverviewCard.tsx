"use client";
import { IOverviewCardProps } from "@/types";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";

const OverviewCard = (props: IOverviewCardProps) => {
  const { circleColor, icon, number, text } = props;
  return (
    <div className="inline-flex  gap-[1.14rem] pt-[1.1875rem] pr-[0.92431rem] pb-[2.125rem] pl-[1.0625rem] bg-top-flashcards-card-background rounded-[1.25rem]">
      {/* circle */}
      <div
        className={` ${circleColor} w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center`}
      >
        <Image
          src={icon}
          className="w-[24px] h-[24px] flex-shrink-0"
          alt="file icon"
        />
      </div>
      {/* text */}
      <div>
        <h1 className="text-sub-heading w-[9rem] h-[1.4375rem] text-[0.875rem] leading-[1.5rem] flex-shrink tracking-[-0.0175rem]">
          {text}
        </h1>
        {/* number */}
        <CountUp
          className="w-[9rem] h-[1.9375rem] flex-shrink-0 text-[1.5rem] font-bold leading-[2rem] font-dmSans"
          end={number}
          duration={3}
        />
      </div>
    </div>
  );
};

export default OverviewCard;
