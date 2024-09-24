import { Separator } from "@/components/custom/separator";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { avatarsData } from "@/mappings";
import AvatarGroup from "../../AvatarGroup";
import Button from "@/components/ui/Atoms/Button";

export interface IInstructorMyCoursesProps {
  id: number;
  name: string;
  studyMaterialCount: number;
  quizCount: number;
  studentCount: number;
}

const CoursesCard = ({
  id,
  name,
  quizCount,
  studentCount,
  studyMaterialCount,
}: IInstructorMyCoursesProps) => {
  return (
    <div className="w-full flex-shrink-0 col-span-1">
      <div className="flex flex-col  items-start gap-[0.625rem] py-[1.8125rem] px-[2rem] rounded-[1.875rem] border border-card-border  bg-top-flashcards-card-background">
        {/* heading and options icon container */}
        <div className="flex justify-center items-center gap-[0.625rem] h-[2.6875rem] pt-[0.125rem] pb-[0.625rem]">
          <h1 className="font-caladea text-[1.125rem] font-bold leading-[112%]">
            {name}
          </h1>
          <BsThreeDotsVertical className="text-white text-xl cursor-pointer" />
        </div>
        <Separator className="my-[0.3rem] bg-card-border " />
        {/* study material container */}
        <div className="flex justify-between w-full gap-[3.4375rem] flex-shrink-0">
          <h2 className="font-inter text-[0.75rem] leading-[150%] font-medium">
            Study Materials <span>({studyMaterialCount})</span>
          </h2>
          <FiEdit className="w-[0.9375rem] h-[0.9375rem]" />
        </div>
        <Separator className=" my-[0.3rem] bg-card-border " />
        {/* quizzes container */}
        <div className="flex justify-between w-full gap-[3.4375rem] flex-shrink-0">
          <h2 className="font-inter text-[0.75rem] leading-[150%] font-medium">
            Quizes <span>({quizCount})</span>
          </h2>
          <FiEdit className="w-[0.9375rem] h-[0.9375rem]" />
        </div>
        <Separator className=" my-[0.3rem] bg-card-border " />
        {/* students container */}
        <div className="flex justify-between items-center w-full flex-shrink-0">
          <h2 className="font-inter text-[0.75rem] leading-[150%] font-medium text-nowrap">
            Students <span>({studentCount})</span>
          </h2>
          <AvatarGroup size="small" avatars={avatarsData} />
        </div>
        <Separator className=" my-[0.3rem] bg-card-border " />
        {/* button */}
        <Button
          className="h-[2.1875rem] border border-card-border hover:bg-app-orange"
          btnColor={"plainOrange"}
        >
          Create Quiz or Exam
        </Button>
      </div>
    </div>
  );
};

export default CoursesCard;
