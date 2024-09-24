"use client";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/dialog";
import McqQuestion from "../add/McqQuestion";
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
import { IMcqQuestionFormProps, IParsedQuestionsData } from "@/types";

const McqQuestionForm = ({
  id,
  options,
  question,
  correctAnswer,
  formCategory,
}: IMcqQuestionFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const optionsArray = options.split(",");

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
              className="text-input-label cursor-pointer text-xl"
            />
          </div>
        </div>
        {optionsArray.map((optionItem) => {
          return (
            <FormInput
              key={optionItem}
              name={"question"}
              placeholder="Question"
              register={register}
              labelText={optionItem}
              inputType="radio"
            />
          );
        })}
        <p className="text-input-label font-bold text-sm">
          Correct Answer: {correctAnswer}
        </p>
      </div>

      <DialogContent className="h-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
        </DialogHeader>
        <McqQuestion
          questionId={id}
          mode="edit"
          mcqSubmitHandler={(data: IParsedQuestionsData) => handleEdit(data)}
          resetQuestionTypeForm={() => {}}
          defaultValues={{
            question: question || "",
            optionOne: optionsArray[0] || "",
            optionTwo: optionsArray[1] || "",
            optionThree: optionsArray[2] || "",
            optionFour: optionsArray[3] || "",
            correctAnswer: correctAnswer || "",
          }}
        />
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default McqQuestionForm;
