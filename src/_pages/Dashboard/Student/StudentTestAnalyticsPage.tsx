"use client";
import StudentTestAnalytics from "@/components/ui/Organisms/sections/StudentTestAnalytics";
import { RootState } from "@/store/store";
import { IStudentTestAnalyticsProps } from "@/types";
import { useSelector } from "react-redux";

const StudentTestAnalyticsPage = () => {
  const testAnalytics = useSelector(
    (state: RootState) => state.studentTest.IEvaluationResult
  );
  const PASS_PERCENTAGE = 60;

  // dummy data
  const props: IStudentTestAnalyticsProps = {
    questionsData: {
      rank: "1st",
      totalQuestions: testAnalytics?.totalQuestions as number,
      correctAnswers: testAnalytics?.correctAnswers as number,
      wrongAnswers: testAnalytics?.wrongAnswers as number,
      percentage: testAnalytics?.percentage as number,
      status:
        (testAnalytics?.percentage as number) >= PASS_PERCENTAGE
          ? "Passed"
          : "Failed",
    },
    timingDetails: {
      totalTime: "22:30",
      timeTaken: "15:20",
    },
    courseStatistics: {
      totalExams: 10,
      totalExamsTaken: 7,
      totalPass: 3,
      // ? calculating success rate by dividing totalPass by totalExams and multiplying by 100
      successRate: Math.trunc((3 / 7) * 100),
    },
  };

  return (
    <>
      <StudentTestAnalytics
        questionsData={props.questionsData}
        courseStatistics={props.courseStatistics}
        timingDetails={props.timingDetails}
      />
    </>
  );
};

export default StudentTestAnalyticsPage;
