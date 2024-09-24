"use client";
import { useEffect, useState } from "react";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import QuestionsNavigationTab from "@/components/ui/Molecules/dashboard/navigation/QuestionsNavigationTab";
import { Separator } from "@/components/custom/separator";
import { IParsedQuestionsData } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { renderQuestion } from "@/utils";
import { Button } from "@/components";
import { evaluateTestAnalytics } from "@/features/studentTestSlice/studentTestSlice";

const ITEMS_PER_PAGE = 5;

const QuestionsAssessmentPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // state
  const [currentPage, setCurrentPage] = useState(1);
  // local state for handling questions
  const [questionsList, setQuestionsList] = useState<IParsedQuestionsData[]>(
    []
  );
  const testExamData = useSelector(
    (state: RootState) => state.studentTest.studentTestExamData
  );
  const testQuizData = useSelector(
    (state: RootState) => state.studentTest.studentTestQuizData
  );
  const activeTestType = useSelector(
    (state: RootState) => state.studentTest.activeTestType
  );

  // questions data
  const examQuestions = testExamData?.examQuestions;
  const quizQuestions = testQuizData?.quizQuestions;

  // pagination variables
  const totalPages = Math.ceil(questionsList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = questionsList.slice(startIndex, endIndex);

  const handleBackClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleForwardClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmitTest = () => {
    router.push(PATHS.studentTestAnalyitcs);
    dispatch(evaluateTestAnalytics());
  };

  useEffect(() => {
    if (activeTestType === "quiz") {
      setQuestionsList(quizQuestions as IParsedQuestionsData[]);
    } else if (activeTestType === "exam") {
      setQuestionsList(examQuestions as IParsedQuestionsData[]);
    }
  }, [activeTestType, quizQuestions, examQuestions]);

  useEffect(() => {
    if (activeTestType === null) {
      router.push(PATHS.studentDashboard);
    }
  }, [activeTestType, router]);

  return (
    <ParentCardDashboard
      marginBottom="mb-[5rem]"
      heading="Assessment: Introduction to Philosophy"
      hideSeparator
    >
      {/* <pre>{JSON.stringify(testData, null, 2)}</pre> */}
      {/* Pagination component */}
      <div className="flex justify-center items-center py-8">
        <QuestionsNavigationTab
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
      <div className="flex justify-between mt-[5.37rem]">
        <div className="text-[1rem] font-semibold leading-[150%] font-inter">
          Page No: {currentPage}/{totalPages}
        </div>
        <div className="text-[1rem] font-semibold leading-[150%] font-inter">
          Time Remaining: 0:58:11
        </div>
      </div>

      <Separator
        orientation="horizontal"
        className="mt-[0.5rem] mb-[2.69rem] bg-card-seperator"
      />

      <div className="flex flex-col">{currentItems.map(renderQuestion)}</div>

      <div className="flex justify-between py-[2rem]">
        <Button
          className={`w-[16.25rem] bg-transparent border border-input-text ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleBackClick}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          className={`w-[16.25rem] ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleForwardClick}
          disabled={currentPage === totalPages}
        >
          Forward
        </Button>
      </div>

      {currentPage === totalPages ? (
        <Button btnColor="purple" onClick={handleSubmitTest}>
          Submit Test
        </Button>
      ) : null}
    </ParentCardDashboard>
  );
};

export default QuestionsAssessmentPage;
