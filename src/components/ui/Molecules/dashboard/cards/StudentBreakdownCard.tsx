import { IStudentBreakdownProps } from "@/types";
import React from "react";
import ProgressBar from "../../../Atoms/ProgressBar";

const StudentBreakdownCard = ({
  correctAnswers,
  totalQuestions,
  wrongAnswers,
}: IStudentBreakdownProps) => {
  return (
    <div className="col-span-1 tablet:col-span-7 lg:w-auto bg-input-background rounded-[20px] pl-[1.75rem]">
      <h3 className=" pt-[2.06rem]  font-inter text-[1rem] font-bold leading-[129%]">
        Breakdown
      </h3>
      {/* total questions */}
      <div className="flex flex-col tablet:flex-row gap-[1.94rem] pr-[2.56rem] pt-[3rem] tablet:pt-[3.69rem]">
        <div className="flex justify-between">
          <p className=" font-inter text-[0.875rem] leading-[129%] text-sub-heading font-normal text-nowrap">
            Total Questions
          </p>
          <span className="text-[0.875rem] font-bold tablet:hidden block">
            {totalQuestions}
          </span>
        </div>

        <ProgressBar
          accent="bg-yellow-500"
          progress={totalQuestions}
          maxValue={totalQuestions}
        />
        <span className="text-[0.875rem] font-bold hidden tablet:block">
          {totalQuestions}
        </span>
      </div>
      {/* correct answers */}
      <div className="flex flex-col tablet:flex-row gap-[1.94rem] pr-[2.56rem] pt-[1.94rem]">
        <div className="flex justify-between">
          <p className=" font-inter text-[0.875rem] leading-[129%] text-sub-heading font-normal text-nowrap">
            Correct Answers
          </p>
          <span className="text-[0.875rem] font-bold tablet:hidden block">
            {correctAnswers}
          </span>
        </div>

        <ProgressBar
          accent="bg-app-green"
          progress={correctAnswers}
          maxValue={totalQuestions}
        />
        <span className="text-[0.875rem] font-bold hidden tablet:block">
          {correctAnswers}
        </span>
      </div>

      {/* wrong answers */}
      <div className="flex flex-col tablet:flex-row gap-[1.94rem] pr-[2.56rem] pt-[1.94rem]">
        <div className="flex justify-between">
          <p className=" font-inter text-[0.875rem] leading-[129%] text-sub-heading font-normal text-nowrap">
            Correct Answers
          </p>
          <span className="text-[0.875rem] font-bold tablet:hidden block">
            {wrongAnswers}
          </span>
        </div>

        <ProgressBar
          accent="bg-red-500"
          progress={wrongAnswers}
          maxValue={totalQuestions}
          extraClasses="pb-[3rem]"
        />
        <span className="text-[0.875rem] font-bold hidden tablet:block">
          {wrongAnswers}
        </span>
      </div>
    </div>
  );
};

export default StudentBreakdownCard;
