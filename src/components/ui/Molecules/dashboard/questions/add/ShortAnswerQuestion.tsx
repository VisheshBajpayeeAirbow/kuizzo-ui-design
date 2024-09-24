import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IShortAnswerProps, IShortAnswerQuestionProps } from "@/types";
import { shortAnswerQuestionFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ShortAnswerQuestion = ({
  questionId,
  shortAnswerSubmitHandler,
  resetQuestionTypeForm,
  defaultValues,
  mode,
}: IShortAnswerQuestionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IShortAnswerProps>({
    resolver: yupResolver(shortAnswerQuestionFormSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = (data: IShortAnswerProps) => {
    shortAnswerSubmitHandler({
      ...data,
      id: questionId,
      type: "short-answer",
    });
    resetQuestionTypeForm({ questionType: "" });

    toast.success(
      `Short Answer question ${
        mode === "edit" ? "edited" : "added"
      } successfully`
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
        name="keywords"
        placeholder="Keywords"
        labelText="Enter Keywords (seperated by comma)"
        register={register}
        inputType="default"
        errorMessage={errors.keywords?.message}
      />
      <div className="flex justify-center my-[5rem]">
        <Button type="submit" className="w-[10rem]" btnColor="purple">
          {mode === "add" ? "Add" : "Edit"} Question
        </Button>
      </div>
    </form>
  );
};

export default ShortAnswerQuestion;
