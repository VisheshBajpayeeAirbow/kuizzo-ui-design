import { IStudentQuickSummaryProps } from "@/types";

const StudentQuickSummaryCard = ({
  correctAnswers,
  percentage,
  rank,
  status,
  totalQuestions,
  wrongAnswers,
}: IStudentQuickSummaryProps) => {
  return (
    <div className="col-span-1 tablet:col-span-5 bg-input-background rounded-[1.25rem] py-[1.5625rem] px-[1.6875rem]">
      <div className="flex flex-col gap-[1.88rem]">
        {/* summary */}
        <div className="flex flex-col gap-[1.19rem]">
          {/* quick summary */}
          <div className="flex justify-between">
            <h4 className="font-inter text-[1rem] font-bold leading-[129%]">
              Quick Summary
            </h4>
            <span className="p-[0.62rem] h-[1.75rem] inline-flex justify-center items-center bg-dashboard-sidebar-border rounded-[0.375rem] text-[0.875rem] font-bold leading-[129%]">
              {rank}
            </span>
          </div>
          {/* total question */}
          <div className="flex justify-between">
            <h4 className="text-[0.875rem] leading-[129%] text-sub-heading">
              Total Questions
            </h4>
            <span className="text-[0.875rem] leading-[129%] font-bold font-inter">
              {totalQuestions}
            </span>
          </div>
          {/* correct answers */}
          <div className="flex justify-between">
            <h4 className="text-[0.875rem] leading-[129%] text-sub-heading">
              Correct Answers
            </h4>
            <span className="text-[0.875rem] leading-[129%] font-bold font-inter">
              {correctAnswers}
            </span>
          </div>
          {/* wrong answers */}
          <div className="flex justify-between">
            <h4 className="text-[0.875rem] leading-[129%] text-sub-heading">
              Wrong Answers
            </h4>
            <span className="text-[0.875rem] leading-[129%] font-bold font-inter">
              {wrongAnswers}
            </span>
          </div>
          {/* percentage */}
          <div className="flex justify-between">
            <h4 className="text-[0.875rem] leading-[129%] text-sub-heading">
              Percent (%)
            </h4>
            <span className="text-[0.875rem] leading-[129%] font-bold font-inter">
              {percentage}%
            </span>
          </div>
        </div>
        {/* status */}
        <div>
          <div className="flex justify-between">
            <h4 className="font-inter text-[1rem] font-bold leading-[129%]">
              Status
            </h4>
            <span className="p-[0.62rem] h-[1.75rem] inline-flex justify-center items-center bg-dashboard-sidebar-border rounded-[0.375rem] text-[0.875rem] font-bold leading-[129%]">
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuickSummaryCard;
