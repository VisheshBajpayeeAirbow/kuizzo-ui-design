import { IIconProps } from "@/types";
import Image from "next/image";
import React from "react";

const sizeClasses = {
  small: "w-[2rem] h-[2rem]",
  medium: "w-12 h-12",
  large: "w-[4.49013rem] h-[4.375rem]",
  xl: "w-[5.3125rem] h-[5.3125rem]",
};

const vectorSizeClasses = {
  small: "w-[1.02563rem] h-[1.02563rem]",
  medium: "w-[3rem] h-[3rem]",
  large: "text-6xl",
  xl: "text-8xl",
};

const IconBadge = ({
  Icon,
  bgColor,
  size,
  vectorSize,
  iconColor,
}: IIconProps) => {
  return (
    <div
      className={`${
        sizeClasses[size]
      }  rounded-full flex flex-shrink-0 justify-center items-center ${
        bgColor === "bg-browse-by-exams-icon-background-1"
          ? "bg-browse-by-exams-icon-background-1"
          : bgColor === "bg-browse-by-exams-icon-background-2"
          ? "bg-browse-by-exams-icon-background-2"
          : bgColor === "bg-browse-by-exams-icon-background-3"
          ? "bg-browse-by-exams-icon-background-3"
          : bgColor
      }`}
    >
      <Image
        className={`${iconColor} ${vectorSizeClasses[vectorSize]} `}
        src={Icon}
        alt="icon"
      />
    </div>
  );
};

export default IconBadge;
