"use client";

import { Button } from "@/components";
import FormCardDashboard from "@/components/ui/Molecules/dashboard/cards/FormCardDashboard";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import { Separator } from "@/components/custom/separator";
import { PATHS } from "@/constants";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  TfiControlBackward,
  TfiControlSkipBackward,
  TfiControlSkipForward,
  TfiControlForward,
} from "react-icons/tfi";
import toast from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import Link from "next/link";
import { useCreateQuiz } from "@/server/mutations";
import Spinner from "@/components/ui/Atoms/Spinner";
import { renderQuestionsBasedOnType } from "@/utils";

// * items per page should be total items + 1
const ITEMS_PER_PAGE = 6;

const ReviewQuizQuestions = () => {
  const router = useRouter();
  const quiz = useSelector((state: RootState) => state.quiz);
  const [currentPage, setCurrentPage] = useState(0);

  // mutation
  const createQuizMutation = useCreateQuiz();
  const handleSubmitQuiz = () => {
    toast.success("Quiz Submitted");
    const { course, subject, topic } = quiz.quizPayload;
    const tagsString = [course, subject, topic].join(",");
    const questionsWithTags = quiz.parsedQuizQuestionsData.map((question) => {
      return {
        ...question,
        tags: tagsString,
      };
    });
    const payloadWithQuestions = {
      ...quiz.quizPayload,
      quizQuestions: questionsWithTags,
    };
    createQuizMutation.mutate(payloadWithQuestions);
    console.log(
      "QUIZ GENERATED PAYLOAD WITH QUESTIONS: ",
      payloadWithQuestions
    );
  };

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentQuestions = quiz.parsedQuizQuestionsData.slice(
    startIndex,
    endIndex
  );
  const pageCount = Math.ceil(
    quiz.parsedQuizQuestionsData.length / ITEMS_PER_PAGE
  );
  const pages = Array.from({ length: pageCount }, (_, i) => i);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < quiz.parsedQuizQuestionsData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    if (quiz.parsedQuizQuestionsData.length === 0) {
      router.push(PATHS.quizGenerator);
    }
  }, [quiz, router]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  if (createQuizMutation.isPending)
    return <Spinner loadingText="Generating Quiz" />;

  return (
    <div>
      <ParentCardDashboard heading={quiz.quizName} marginBottom="mb-[6rem]">
        {/* <pre>{JSON.stringify(quiz.parsedQuizQuestionsData, null, 2)}</pre> */}
        <div className="space-y-[2rem] pb-[3.5rem]">
          {currentQuestions.map((question, index) => (
            <div key={index}>
              <FormCardDashboard
                fullWidthOnMediumDevices
                headingTextSize="text-[1.25rem]"
                marginAuto
                heading={`Question ${startIndex + index + 1}`}
              >
                <div className="space-y-[2.5rem] pb-[3rem]">
                  {renderQuestionsBasedOnType(question, "quiz")}
                </div>
              </FormCardDashboard>
              {index !== currentQuestions.length - 1 && (
                <Separator className="bg-input-border" />
              )}
            </div>
          ))}
          {currentQuestions.length === 0 && (
            <div className="flex justify-center flex-col items-center space-y-5">
              <h1 className="text-center font-caladea text-2xl">
                No Questions Found
              </h1>
              <Button btnColor="blue" className="w-[12rem]">
                <Link href={PATHS.quizGenerator}>Go Back</Link>
              </Button>
            </div>
          )}
          {/* pagination */}
          <div className="flex justify-center">
            <div className="flex justify-between items-center gap-[1.19rem] mt-4 rounded-full border border-input-text p-2">
              <button
                className="rounded-full bg-background p-2"
                onClick={() => setCurrentPage(0)}
                disabled={currentPage === 0}
              >
                <TfiControlBackward />
              </button>
              <button
                className="rounded-full bg-background p-2"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                <TfiControlSkipBackward />
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  className={`${
                    currentPage === page &&
                    "bg-app-purple px-2 rounded-full flex items-center justify-center"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page + 1}
                </button>
              ))}
              <button
                className="rounded-full bg-background p-2"
                onClick={handleNextPage}
                disabled={endIndex >= quiz.parsedQuizQuestionsData.length}
              >
                <TfiControlSkipForward />
              </button>
              <button
                className="rounded-full bg-background p-2"
                onClick={() => setCurrentPage(pageCount - 1)}
                disabled={currentPage === pageCount - 1}
              >
                <TfiControlForward />
              </button>
            </div>
          </div>

          <div>
            <Button onClick={handleSubmitQuiz}>Submit</Button>
          </div>
        </div>
      </ParentCardDashboard>
      <ScrollToTop
        smooth
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        component={
          <IoArrowUpCircleOutline className="text-2xl text-app-purple hover:scale-[200%] transition ease-in-out duration-300 absolute right-0" />
        }
      />
    </div>
  );
};

export default ReviewQuizQuestions;
