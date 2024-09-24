import React from "react";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { fillInTheBlanksQuestionFormSchema } from "@/validations";
import Button from "@/components/ui/Atoms/Button";
import { IFillInTheBlanksProps, IFillInTheBlanksQuestionProps } from "@/types";

const FillInTheBlanksQuestion = ({
  mode,
  questionId,
  resetQuestionTypeForm,
  defaultValues,
  fillInTheBlanksSubmitHandler,
}: IFillInTheBlanksQuestionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFillInTheBlanksProps>({
    resolver: yupResolver(fillInTheBlanksQuestionFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: IFillInTheBlanksProps) => {
    fillInTheBlanksSubmitHandler({
      ...data,
      id: questionId,
      type: "fill-in-the-blanks",
    });
    resetQuestionTypeForm({ questionType: "" });
    console.log("EDITED TF DATA: ", data);
    toast.success(
      `True False question ${mode === "edit" ? "edited" : "added"} successfully`
    );
  };

  return (
    <form className="space-y-[2.69rem]" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="question"
        placeholder="Enter Question"
        register={register}
        inputType="default"
        labelText="Question"
        errorMessage={errors.question?.message}
      />
      <FormInput
        name="correctAnswer"
        placeholder="Correct Answer"
        labelText="Correct Answer"
        register={register}
        inputType="default"
        errorMessage={errors.correctAnswer?.message}
      />
      <div className="flex justify-center my-[5rem]">
        <Button type="submit" className="w-[10rem]" btnColor="purple">
          {mode === "add" ? "Add" : "Edit"} Question
        </Button>
      </div>
    </form>
  );
};

export default FillInTheBlanksQuestion;
