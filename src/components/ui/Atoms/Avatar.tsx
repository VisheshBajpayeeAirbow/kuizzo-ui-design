import { IAvatarProps } from "@/types";
import Image from "next/image";
import React from "react";

const sizeClasses = {
  small: "w-8 h-8",
  medium: "w-[1.5625rem] h-[1.5625rem]",
  large: "w-16 h-16",
};

const getSizeValues = (size: "small" | "medium" | "large") => {
  const sizeClass = sizeClasses[size];
  const [width, height] = sizeClass
    .split(" ")
    .map((s) => parseInt(s.replace(/\D/g, ""), 10));
  return { width, height };
};

const Avatar: React.FC<IAvatarProps> = ({
  image,
  alt = "Avatar",
  size = "medium",
  onClick,
}) => {
  const { width, height } = getSizeValues(size);

  return (
    <Image
      onClick={onClick}
      src={image}
      alt={alt}
      width={width}
      height={height}
      className={`rounded-full object-cover ${sizeClasses[size]}`}
    />
  );
};

export default Avatar;
