"use client";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosStar, IoIosArrowDroprightCircle } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { Separator } from "@/components/custom/separator";
import Button from "@/components/ui/Atoms/Button";
import { IStudentDashboardCourseCardProps } from "@/types";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";

const StudentDashboardCourseCard = ({
  course,
}: IStudentDashboardCourseCardProps) => {
  const router = useRouter();
  return (
    <div className="w-full tablet:w-[15rem]  bg-background flex flex-col rounded-[1.875rem] border-[1px] border-card-border">
      <div className="flex items-center justify-between pb-[1rem] p-[1.875rem]">
        <h1 className="font-caladea text-[1.125rem] font-bold leading-[115%]">
          {course.courseName}
        </h1>
        <HiDotsVertical className="text-xl cursor-pointer" />
      </div>
      <div className="flex justify-between items-center px-[1.37rem] pb-[1rem]">
        <div className="flex flex-col">
          <div className="flex items-center gap-[0.44rem]">
            <div className="p-3 rounded-full bg-app-green"></div>
            <p className="text-[0.625rem]">Adam Smith</p>
          </div>

          <div className="flex justify-end gap-1 my-1">
            <div className="flex items-center gap-[0.19rem]">
              <IoIosStar className="text-yellow-500 w-[0.62744rem] h-[0.62744rem]" />
              <IoIosStar className="text-yellow-500 w-[0.62744rem] h-[0.62744rem]" />
              <IoIosStar className="text-yellow-500 w-[0.62744rem] h-[0.62744rem]" />
              <IoIosStar className="text-yellow-500 w-[0.62744rem] h-[0.62744rem]" />
              <IoIosStar className="w-[0.62744rem] h-[0.62744rem]" />
            </div>
            <p className="text-[0.625rem] text-sub-heading">(1)</p>
          </div>
        </div>
        <FaRegBookmark className="cursor-pointer" />
      </div>
      <div className=" px-[1.48rem] pt-[0.5rem] flex flex-col gap-[0.75rem]">
        <Separator className="bg-card-border w-full" />
        <div className="flex justify-between items-center">
          <h2 className="text-[0.75rem]">Study Materials</h2>
          <IoIosArrowDroprightCircle className="text-app-green cursor-pointer" />
        </div>
        <Separator className="bg-card-border w-full" />

        <div className="flex justify-between items-center">
          <h2 className="text-[0.75rem]">Notes</h2>
          <IoIosArrowDroprightCircle className="text-app-green cursor-pointer" />
        </div>
        <Separator className="bg-card-border w-full" />
        <div className="flex justify-between items-center">
          <h2 className="text-[0.75rem]">Flashcards</h2>
          <IoIosArrowDroprightCircle className="text-app-green cursor-pointer" />
        </div>
        <Separator className="bg-card-border w-full" />

        <div className="flex justify-between items-center">
          <h2 className="text-[0.75rem]">Quiz/Exam (Taken)</h2>
          <IoIosArrowDroprightCircle className="text-app-green cursor-pointer" />
        </div>
      </div>

      <div className="flex justify-center w-full pt-[1.25rem] pb-[1.81rem] mt-auto">
        <Button
          onClick={() =>
            router.push(`${PATHS.studentExamAndQuizList}/${course.id}`)
          }
          className="w-[20.1875rem] tablet:w-[12.19388rem] p-[0.625rem]"
        >
          Give Quiz or Exam
        </Button>
      </div>
    </div>
  );
};

export default StudentDashboardCourseCard;
