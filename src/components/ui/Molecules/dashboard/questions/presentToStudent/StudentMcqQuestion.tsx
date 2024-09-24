"use client";
import React, { useEffect } from "react";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { Separator } from "@/components/custom/separator";
import { setAnswer } from "@/features/studentTestSlice/studentTestSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export interface IStudentMcqQuestionProps {
  questionId: string;
  question: string;
  options: string;
  correctAnswer: string;
}

const StudentMcqQuestion = ({
  questionId,
  question,
  correctAnswer,
  options,
}: IStudentMcqQuestionProps) => {
  const optionsList = options.split(",");
  const { register, watch } = useForm();
  const dispatch = useDispatch();

  const watchAllFields = watch();

  useEffect(() => {
    if (watchAllFields[questionId]) {
      const payload = {
        questionId,
        answer: watchAllFields[questionId],
        correctAnswer,
      };
      // Dispatch the answer payload to Redux
      dispatch(setAnswer(payload));
    }
  }, [watchAllFields, questionId, correctAnswer, dispatch]);

  return (
    <div>
      <p className="font-inter text-[0.875rem] font-bold text-input-label">
        Question: {question}
      </p>
      <div className="mt-[1.81rem] flex flex-col gap-[2.5rem]">
        {optionsList.map((option, index) => (
          <FormInput
            key={`${questionId}-${index}`}
            name={questionId} // Dynamic name based on the question ID
            placeholder=""
            register={register}
            inputType="radio"
            labelText={option}
          />
        ))}
      </div>

      <Separator
        orientation="horizontal"
        className="mb-[1.38rem] mt-[2.8rem] bg-card-seperator"
      />
    </div>
  );
};

export default StudentMcqQuestion;
