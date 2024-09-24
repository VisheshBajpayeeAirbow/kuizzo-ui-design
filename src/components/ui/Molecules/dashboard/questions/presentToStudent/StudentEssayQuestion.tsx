"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { Separator } from "@/components/custom/separator";
import { setAnswer } from "@/features/studentTestSlice/studentTestSlice";

export interface IStudentEssayQuestionProps {
  questionId: string;
  question: string;
  keywords: string; // Keywords are used for evaluation
}

const StudentEssayQuestion = ({
  questionId,
  question,
  keywords,
}: IStudentEssayQuestionProps) => {
  const dispatch = useDispatch();
  const { register, watch } = useForm();

  const watchAllFields = watch();

  // Dispatch the answer whenever the user inputs an essay answer
  useEffect(() => {
    if (watchAllFields.essayAnswer) {
      const payload = {
        questionId,
        answer: watchAllFields.essayAnswer,
        keywords, // Optionally include the keywords if needed
      };
      // Dispatch the answer payload to Redux
      dispatch(setAnswer(payload));
    }
  }, [watchAllFields, questionId, keywords, dispatch]);

  return (
    <div>
      <div>
        <FormInput
          name="essayAnswer"
          register={register}
          labelText={`Question: ${question}`}
          inputType="textarea"
          placeholder="Enter your answer"
        />
      </div>
      <Separator
        orientation="horizontal"
        className="mb-[1.38rem] mt-[2.8rem] bg-card-seperator"
      />
    </div>
  );
};

export default StudentEssayQuestion;
