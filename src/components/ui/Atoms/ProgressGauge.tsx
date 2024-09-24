"use client";
import { IProgressGauseProps } from "@/types";
import { motion } from "framer-motion";
import React from "react";

const ProgressGauge = ({
  progress,
  maxTime = 30,
  extraClasses,
}: IProgressGauseProps) => {
  // Calculate the rotation degree based on progress
  const rotationDegree = (progress / maxTime) * 180;

  return (
    <div className={`flex flex-col items-center ${extraClasses}`}>
      {/* Semicircle container */}
      <div className="relative flex items-center justify-center">
        {/* Semicircle background (Total Time) */}
        <div className="relative w-[8rem] h-[4rem]">
          <div className="absolute inset-0 border-t-[8px] border-l-[8px] border-r-[8px] border-gray-300 rounded-t-full"></div>
          {/* Semicircle foreground (Progress) */}
          <div
            className="absolute inset-0 border-t-[8px] border-l-[8px] border-r-[8px] border-orange-500 rounded-t-full"
            style={{
              clipPath: `polygon(0% 0%, 100% 0%, 100% ${rotationDegree}%, 0% ${rotationDegree}%)`,
            }}
          ></div>
        </div>
        {/* Needle indicator */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-[2px] h-[4rem] bg-orange-600 origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${rotationDegree - 90}deg)`,
          }}
          initial={{ rotate: -90 }}
          animate={{ rotate: rotationDegree - 90 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        />
      </div>

      {/* Labels and Time */}
      <div className="flex justify-between w-[8rem] text-sm text-gray-300">
        <span>0 m</span>
        <span>{maxTime} h</span>
      </div>
      <div className="w-10 text-center text-white text-base font-semibold font-inter leading-normal">
        {maxTime}m
      </div>
      <div className="text-sm text-gray-400">Total Exam time</div>
    </div>
  );
};

export default ProgressGauge;
