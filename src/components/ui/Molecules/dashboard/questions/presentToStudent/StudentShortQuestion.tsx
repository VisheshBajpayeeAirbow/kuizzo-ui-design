"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { Separator } from "@/components/custom/separator";
import { setAnswer } from "@/features/studentTestSlice/studentTestSlice";

export interface IStudentShortQuestionProps {
  questionId: string;
  question: string;
  keywords: string; // Keywords are used for evaluation
}

const StudentShortQuestion = ({
  questionId,
  question,
  keywords,
}: IStudentShortQuestionProps) => {
  const dispatch = useDispatch();
  const { register, watch } = useForm();

  const watchAllFields = watch();

  // Dispatch the answer whenever the user inputs an answer
  useEffect(() => {
    if (watchAllFields.shortAnswer) {
      const payload = {
        questionId,
        answer: watchAllFields.shortAnswer,
        keywords, // Optionally include the keywords if needed
      };
      // Dispatch the answer payload to Redux
      dispatch(setAnswer(payload));
    }
  }, [watchAllFields, questionId, keywords, dispatch]);

  return (
    <div>
      <div className="1.88rem">
        <FormInput
          name="shortAnswer"
          register={register}
          labelText={`Question: ${question}`}
          inputType="default"
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

export default StudentShortQuestion;
