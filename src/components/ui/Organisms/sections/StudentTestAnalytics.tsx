"use client";
import { Separator } from "@/components/custom/separator";
import { IoMdCheckmark } from "react-icons/io";
import { Button } from "@/components";
import { IStudentTestAnalyticsProps } from "@/types";
import StudentQuickSummaryCard from "../../Molecules/dashboard/cards/StudentQuickSummaryCard";
import StudentBreakdownCard from "../../Molecules/dashboard/cards/StudentBreakdownCard";
import StudentExamTimeCard from "../../Molecules/dashboard/cards/StudentExamTimeCard";
import StudentCourseStatisticsCard from "../../Molecules/dashboard/cards/StudentCourseStatisticsCard";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";

const StudentTestAnalytics = ({
  courseStatistics,
  questionsData,
  timingDetails,
}: IStudentTestAnalyticsProps) => {
  const router = useRouter();
  return (
    <div className="relative bg-background rounded-[1.25rem] pb-[5.19rem] mb-[5rem]">
      <div className="w-[90%] mx-auto">
        <div className="flex items-center gap-[1.69rem] pt-[3.56rem] ">
          <div
            className={` p-2 tablet:p-4 flex justify-center items-center rounded-full ${
              questionsData.status === "Passed" ? "bg-app-green" : "bg-red-500"
            }`}
          >
            <IoMdCheckmark className="text-white w-[1.875rem] h-[1.875rem]" />
          </div>
          <h1 className="font-caladea text-[1.25rem] tablet:text-[1.875rem] font-bold leading-[115%]">
            {questionsData.status === "Passed"
              ? "Congratulation, You’ve passed the test."
              : "Sorry, You didn't pass the test."}
          </h1>
        </div>

        <Separator className="bg-card-border w-auto tablet:w-[55.25rem] mb-[2.56rem] mt-[3.44rem]" />

        <div className="grid grid-cols-1 tablet:grid-cols-12 gap-[1.56rem] tablet:gap-[1rem]">
          {/* quick summary card */}
          <StudentQuickSummaryCard
            correctAnswers={questionsData.correctAnswers}
            percentage={questionsData.percentage}
            rank={questionsData.rank}
            status={questionsData.status}
            totalQuestions={questionsData.totalQuestions}
            wrongAnswers={questionsData.wrongAnswers}
          />

          {/* breakdown card desktop version */}
          <StudentBreakdownCard
            correctAnswers={questionsData.correctAnswers}
            totalQuestions={questionsData.totalQuestions}
            wrongAnswers={questionsData.wrongAnswers}
          />

          {/* exam time */}
          <StudentExamTimeCard
            timeTaken={timingDetails.timeTaken}
            totalTime={timingDetails.totalTime}
          />

          {/* course statistics */}
          <StudentCourseStatisticsCard
            successRate={courseStatistics.successRate}
            totalExams={courseStatistics.totalExams}
            totalExamsTaken={courseStatistics.totalExamsTaken}
            totalPass={courseStatistics.totalPass}
          />
        </div>
        {/* buttons */}
        <div className="flex justify-center mt-[6rem]">
          <div className=" flex flex-col  gap-[2.25rem] w-[28.1875rem]">
            <Button
              onClick={() => router.push(PATHS.studentAnswerList)}
              className="bg-transparent border-[1px] border-card-border"
            >
              Show Answers
            </Button>
            <Button>Go back to profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTestAnalytics;
