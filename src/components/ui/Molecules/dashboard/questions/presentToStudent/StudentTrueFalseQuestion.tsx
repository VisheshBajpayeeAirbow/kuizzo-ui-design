"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { Separator } from "@/components/custom/separator";
import { setAnswer } from "@/features/studentTestSlice/studentTestSlice";

export interface IStudentTrueFalseQuestionProps {
  questionId: string;
  question: string;
  correctAnswer: string;
}

const StudentTrueFalseQuestion = ({
  questionId,
  question,
  correctAnswer,
}: IStudentTrueFalseQuestionProps) => {
  const dispatch = useDispatch();
  const { register, watch } = useForm();

  const watchAllFields = watch();

  // Dispatch the selected true/false option to Redux
  useEffect(() => {
    if (watchAllFields[questionId]) {
      const payload = {
        questionId,
        answer: watchAllFields[questionId],
        correctAnswer, // For potential evaluation or tracking
      };
      // Dispatch the answer to Redux
      dispatch(setAnswer(payload));
    }
  }, [watchAllFields, questionId, correctAnswer, dispatch]);

  return (
    <div>
      <p className="font-inter text-[0.875rem] font-bold text-input-label">
        Question: {question}
      </p>
      <div className="mt-[1.81rem] flex flex-col gap-[2.5rem]">
        <FormInput
          name={questionId} // Unique name based on the question ID
          placeholder=""
          register={register}
          inputType="radio"
          labelText={"True"}
        />
        <FormInput
          name={questionId} // Unique name based on the question ID
          placeholder=""
          register={register}
          inputType="radio"
          labelText={"False"}
        />
      </div>

      <Separator
        orientation="horizontal"
        className="mb-[1.38rem] mt-[2.8rem] bg-card-seperator"
      />
    </div>
  );
};

export default StudentTrueFalseQuestion;
