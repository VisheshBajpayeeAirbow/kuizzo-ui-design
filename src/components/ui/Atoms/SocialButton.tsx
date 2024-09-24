import { ISocialMediaButton } from "@/types";
import Image from "next/image";
import React from "react";

const SocialButton = (props: ISocialMediaButton) => {
  const { icon, text } = props;
  return (
    <button
      {...props}
      className="cursor-pointer rounded-[10px]  border-input-border border-[1px] text-heading md:w-[8.75rem] h-[2.8125rem] inline-flex justify-center items-center w-full"
    >
      <div className="flex gap-[0.78rem] p-[0.62rem]">
        <Image
          width={100}
          height={100}
          style={{ width: "auto", height: "auto" }}
          src={icon}
          alt="social-icon"
        />
        <span>{text}</span>
      </div>
    </button>
  );
};

export default SocialButton;
