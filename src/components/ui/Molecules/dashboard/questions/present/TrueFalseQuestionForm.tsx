"use client";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { CiEdit } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/dialog";
import TrueFalseQuestion from "../add/TrueFalseQuestion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSpecificQuestion as deleteSpecificQuizQuestion,
  editSpecificQuestion as editSpecificQuizQuestion,
} from "@/features/quizSlice/quizSlice";
import {
  deleteSpecificQuestion as deleteSpecificExamQuestion,
  editSpecificQuestion as editSpecificExamQuestion,
} from "@/features/examSlice/examSlice";
import toast from "react-hot-toast";
import { IParsedQuestionsData, ITrueFalseQuestionFormProps } from "@/types";

const TrueFalseQuestionForm = ({
  id,
  correctAnswer,
  question,
  formCategory,
}: ITrueFalseQuestionFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register } = useForm();

  const dispatch = useDispatch();

  const handleDelete = () => {
    toast.success("QUESTION DELETED");
    switch (formCategory) {
      case "exam":
        dispatch(deleteSpecificExamQuestion(question));
      case "quiz":
        dispatch(deleteSpecificQuizQuestion(question));
      default:
        break;
    }
  };

  const handleEdit = (data: IParsedQuestionsData) => {
    console.log("EDITED MCQ DATA: ", data);
    switch (formCategory) {
      case "exam":
        dispatch(editSpecificExamQuestion(data));
      case "quiz":
        dispatch(editSpecificQuizQuestion(data));
      default:
        break;
    }
    setIsDialogOpen((prevState) => !prevState);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="space-y-[3rem]">
        <div className="flex justify-between">
          <label className="font-inter text-[0.875rem] font-bold tracking-[0.04375rem] text-input-label">
            {question}
          </label>
          <div className="flex items-center gap-[0.69rem] ">
            <DialogTrigger>
              <CiEdit className="text-input-label text-xl" />
            </DialogTrigger>
            <IoIosCloseCircleOutline
              onClick={() => handleDelete()}
              className="text-input-label text-xl cursor-pointer"
            />
          </div>
        </div>

        <FormInput
          name={"question"}
          placeholder="Question"
          register={register}
          labelText="True"
          inputType="radio"
        />
        <FormInput
          name={"question"}
          placeholder="Question"
          register={register}
          labelText="False"
          inputType="radio"
        />
        <p className="text-input-label font-bold text-sm">
          Correct Answer: {correctAnswer}
        </p>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <TrueFalseQuestion
            questionId={id}
            mode="edit"
            trueFalseSubmitHandler={(data: IParsedQuestionsData) =>
              handleEdit(data)
            }
            resetQuestionTypeForm={() => {}}
            defaultValues={{
              question: question || "",
              correctAnswer: correctAnswer || "",
            }}
          />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default TrueFalseQuestionForm;
