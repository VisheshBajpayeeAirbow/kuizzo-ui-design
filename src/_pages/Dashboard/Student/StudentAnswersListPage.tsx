"use client";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import { RootState } from "@/store/store";
import { renderQuestion } from "@/utils";
import { useSelector } from "react-redux";
import { IParsedQuestionsData, IAnswerPayload } from "@/types"; // Assuming types are imported from somewhere
import { IoMdCheckmark } from "react-icons/io";
import { Separator } from "@/components/custom/separator";
const StudentAnswersListPage = () => {
  const testType = useSelector(
    (state: RootState) => state.studentTest.activeTestType
  );
  const examQuestions = useSelector(
    (state: RootState) => state.studentTest.studentTestExamData?.examQuestions
  );
  const quizQuestions = useSelector(
    (state: RootState) => state.studentTest.studentTestQuizData?.quizQuestions
  );
  const userAnswers = useSelector(
    (state: RootState) => state.studentTest.answers
  );

  const getUserAnswerForQuestion = (
    questionId: string
  ): IAnswerPayload | undefined => {
    return userAnswers.find((answer) => answer.questionId === questionId);
  };

  const questionReviewMessage = (userAnswer: string, correctAnswer: string) => {
    if (userAnswer === correctAnswer) {
      return (
        <>
          <div className="flex items-center gap-[1.06rem]">
            <div className=" bg-app-green w-[1.6875rem] h-[1.6875rem] rounded-full flex justify-center items-center">
              <IoMdCheckmark className=" text-white" />
            </div>
            <div className="leading-[150%] font-semibold font-inter text-[1rem]">
              Your answer is correct
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <div className="flex items-center gap-[1.06rem]">
            <div className=" bg-red-500 w-[1.6875rem] h-[1.6875rem] rounded-full flex justify-center items-center">
              <IoMdCheckmark className=" text-white" />
            </div>
            <div className="leading-[150%] font-semibold font-inter text-[1rem]">
              Your answer is incorrect
            </div>
          </div>
          <div className="bg-card-background flex gap-[1.06rem] rounded-[0.625rem] p-4 mt-[1.75rem]">
            <span className="font-semibold leading-[150%] text-[1rem] font-inter">
              Right Answer:{" "}
            </span>
            <div className=" bg-app-green w-[1.6875rem] h-[1.6875rem] rounded-full flex justify-center items-center">
              <IoMdCheckmark className=" text-white" />
            </div>
            <span className="italic leading-[150%] text-[1rem] font-inter">
              {correctAnswer}
            </span>
          </div>

          <Separator
            orientation="horizontal"
            className="mb-[1.38rem] mt-[2.8rem] bg-card-seperator"
          />
        </div>
      );
    }
  };

  return (
    <div>
      <ParentCardDashboard heading="Your Answers" marginBottom="mb-[5rem]">
        <div className="flex flex-col gap-[1.25rem]">
          {testType === "quiz" &&
            quizQuestions?.map((question: IParsedQuestionsData) => {
              const userAnswer = getUserAnswerForQuestion(question.id);
              return (
                <div key={question.id}>
                  {renderQuestion(question)}
                  <p className="text-sm text-gray-500">
                    <strong>Your Answer:</strong>{" "}
                    {userAnswer?.answer || "No answer provided"}
                  </p>
                  <p>
                    <strong>Correct Answer: </strong>{" "}
                    {userAnswer?.correctAnswer
                      ? userAnswer?.correctAnswer
                      : userAnswer?.keywords
                      ? userAnswer?.keywords
                      : "No answer provided"}
                  </p>
                </div>
              );
            })}

          {testType === "exam" &&
            examQuestions?.map((question: IParsedQuestionsData) => {
              const userAnswer = getUserAnswerForQuestion(question.id);
              return (
                <div key={question.id}>
                  {renderQuestion(question)}

                  {questionReviewMessage(
                    userAnswer?.correctAnswer as string,
                    userAnswer?.answer as string
                  )}
                </div>
              );
            })}
        </div>
      </ParentCardDashboard>
    </div>
  );
};

export default StudentAnswersListPage;
