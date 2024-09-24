import React from "react";
import IconBadge from "../Atoms/IconBadge";
import Button from "../Atoms/Button";
import { ICardBrowseSectionProps } from "@/types";

const CardBrowseSection = ({
  cardIconBgColor,
  cardIconColor,
  cardIcon,
  buttonText,
  buttonColor,
  buttonIcon,
  title,
}: ICardBrowseSectionProps) => {
  return (
    <div className="rounded-[1.875rem] border-2     border-[#AFA4F04D] bg-transparent w-full  md:w-[24.375rem] lg:w-full h-[19.375rem] md:h-[10.25rem]">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:pt-[1.94rem] pt-[2.5rem]  pb-[1.56rem] md:px-[1.86rem]  md:pb-[3.94rem]">
          <IconBadge
            iconColor={cardIconColor}
            vectorSize="large"
            size="xl"
            bgColor={cardIconBgColor}
            Icon={cardIcon}
          />
        </div>
        <div className="flex flex-col md:gap-[1.06rem]  ">
          <h1
            className={`text-heading text-center pb-[1.63rem] md:pb-0 text-[1.875rem] font-caladea leading-[115%] font-bold `}
          >
            {title}
          </h1>
          <Button
            className="md:pr-[1.64rem]"
            btnType="withIcon"
            size="sm"
            btnColor={buttonColor}
            Icon={buttonIcon}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardBrowseSection;
