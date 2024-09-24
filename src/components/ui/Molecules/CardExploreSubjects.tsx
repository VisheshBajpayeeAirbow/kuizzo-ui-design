import { IconType } from "react-icons";
import IconBadge from "../Atoms/IconBadge";
import { IExploreSubjectsCardProps } from "@/types";

const CardExploreSubjects = ({
  title,
  iconBgColor,
  cardIcon,
}: IExploreSubjectsCardProps) => {
  return (
    <div className="hover:scale-[105%] transition ease-in-out duration-200 col-span-1 cursor-pointer md:col-span-1 rounded-[0.9375rem] bg-card-background py-[1.69rem] px-[2.19rem] w-full h-[11.43963rem] md:w-[11.5625rem] flex  justify-center items-center">
      <div className="flex flex-col items-center justify-center  gap-[1.12rem]">
        <IconBadge
          vectorSize="medium"
          size="xl"
          iconColor="text-white"
          Icon={cardIcon}
          bgColor={iconBgColor}
        />
        <h1 className="text-[1rem] md:text-[1.375rem] text-heading font-semibold text-nowrap">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default CardExploreSubjects;
