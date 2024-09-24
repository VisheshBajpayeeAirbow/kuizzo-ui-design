import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import EssayQuestion from "@/components/ui/Molecules/dashboard/questions/add/EssayQuestion";
import FillInTheBlanksQuestion from "@/components/ui/Molecules/dashboard/questions/add/FillInTheBlanksQuestion";
import McqQuestion from "@/components/ui/Molecules/dashboard/questions/add/McqQuestion";
import ShortAnswerQuestion from "@/components/ui/Molecules/dashboard/questions/add/ShortAnswerQuestion";
import TrueFalseQuestion from "@/components/ui/Molecules/dashboard/questions/add/TrueFalseQuestion";
import {
  ICreateQuestionFormProps,
  IParsedQuestionsData,
  IQuestionTypeForm,
} from "@/types";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useForm } from "react-hook-form";

const questionTypes = [
  "MCQ",
  "True/False",
  "Short Answer",
  "Essay",
  "Fill in the blanks",
];

const CreateQuestionForm = ({
  questionListHandler,
  categoryData,
}: ICreateQuestionFormProps) => {
  // states
  const [questionPool, setQuestionPool] = useState<IParsedQuestionsData[]>([]);

  // form
  const { register, watch, reset } = useForm<IQuestionTypeForm>();
  const watchAllQuestionFields = watch();

  const handleGetQuestionDetails = (questionDetails: IParsedQuestionsData) => {
    setQuestionPool((prevState) => [
      ...prevState,
      { ...questionDetails, ...categoryData },
    ]);
  };

  // we are using nanoid because id is required for filtering out the questions therefore nanoid is required
  const renderQuestionBasedOnType = (
    questionType:
      | "MCQ"
      | "True/False"
      | "Short Answer"
      | "Essay"
      | "Fill in the blanks"
  ) => {
    switch (questionType) {
      case "MCQ":
        return (
          <McqQuestion
            questionId={nanoid()}
            mode="add"
            resetQuestionTypeForm={reset}
            mcqSubmitHandler={handleGetQuestionDetails}
          />
        );

      case "True/False":
        return (
          <TrueFalseQuestion
            questionId={nanoid()}
            mode="add"
            resetQuestionTypeForm={reset}
            trueFalseSubmitHandler={handleGetQuestionDetails}
          />
        );

      case "Essay":
        return (
          <EssayQuestion
            questionId={nanoid()}
            mode="add"
            resetQuestionTypeForm={reset}
            essaySubmitHandler={handleGetQuestionDetails}
          />
        );

      case "Short Answer":
        return (
          <ShortAnswerQuestion
            questionId={nanoid()}
            mode="add"
            resetQuestionTypeForm={reset}
            shortAnswerSubmitHandler={handleGetQuestionDetails}
          />
        );

      case "Fill in the blanks":
        return (
          <FillInTheBlanksQuestion
            questionId={nanoid()}
            mode="add"
            resetQuestionTypeForm={reset}
            fillInTheBlanksSubmitHandler={handleGetQuestionDetails}
          />
        );

      default:
        return (
          <McqQuestion
            questionId={nanoid()}
            mode="add"
            resetQuestionTypeForm={reset}
            mcqSubmitHandler={handleGetQuestionDetails}
          />
        );
    }
  };

  return (
    <>
      <div className="border-[1px] border-input-border rounded-[1.25rem] py-[1.69rem] px-[2.06rem]">
        {/* <span>CATEGORY(testing): {categoryData.category}</span>
        <span>SUB CATEGORY(testing): {categoryData.subCategory}</span> */}
        <div className="my-[2.69rem]">
          <FormInput
            name="questionType"
            placeholder="Questions For"
            labelText="Type of Question"
            register={register}
            inputType="select"
            selectOptions={questionTypes}
          />
        </div>
        {watchAllQuestionFields.questionType &&
          renderQuestionBasedOnType(watchAllQuestionFields.questionType)}
      </div>
      <Button
        className="my-[3rem]"
        onClick={() => questionListHandler(questionPool)}
        btnColor="purple"
      >
        Submit Questions List
      </Button>
    </>
  );
};

export default CreateQuestionForm;
