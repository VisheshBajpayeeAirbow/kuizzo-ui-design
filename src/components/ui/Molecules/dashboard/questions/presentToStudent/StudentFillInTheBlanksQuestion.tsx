"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { Separator } from "@/components/custom/separator";
import { setAnswer } from "@/features/studentTestSlice/studentTestSlice";

export interface IStudentFillInTheBlanksQuestionProps {
  questionId: string;
  question: string;
  correctAnswer: string;
}

const StudentFillInTheBlanksQuestion = ({
  questionId,
  question,
  correctAnswer,
}: IStudentFillInTheBlanksQuestionProps) => {
  const dispatch = useDispatch();
  const { register, watch } = useForm();

  const watchAllFields = watch();

  // Dispatch the fill-in-the-blank answer to Redux
  useEffect(() => {
    if (watchAllFields.fillInTheBlanksAnswer) {
      const payload = {
        questionId,
        answer: watchAllFields.fillInTheBlanksAnswer,
        correctAnswer, // For potential evaluation or tracking
      };
      // Dispatch the answer to Redux
      dispatch(setAnswer(payload));
    }
  }, [watchAllFields, questionId, correctAnswer, dispatch]);

  return (
    <div>
      <p className="font-inter text-[0.875rem] font-bold text-input-label">
        Question: Choose the correct word and fill in the blanks:
      </p>

      <p className="text-[0.875rem] leading-[200%] mt-[1.69rem] text-input-label">
        {question}
      </p>
      <div className="w-[16.625rem] mt-[1.69rem]">
        <FormInput
          name="fillInTheBlanksAnswer"
          placeholder="Enter your answer here"
          register={register}
          inputType="default"
        />
      </div>
      <Separator
        orientation="horizontal"
        className="mb-[1.38rem] mt-[2.8rem] bg-card-seperator"
      />
    </div>
  );
};

export default StudentFillInTheBlanksQuestion;
