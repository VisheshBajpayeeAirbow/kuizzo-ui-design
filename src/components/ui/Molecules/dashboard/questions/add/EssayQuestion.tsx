import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IEssayProps, IEssayQuestionProps } from "@/types";
import { essayQuestionFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EssayQuestion = ({
  questionId,
  essaySubmitHandler,
  resetQuestionTypeForm,
  defaultValues,
  mode,
}: IEssayQuestionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEssayProps>({
    resolver: yupResolver(essayQuestionFormSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data: IEssayProps) => {
    essaySubmitHandler({
      ...data,
      id: questionId,
      type: "essay",
    });
    resetQuestionTypeForm({ questionType: "" });

    toast.success(
      `Essay Question ${mode === "edit" ? "edited" : "added"} successfully`
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

export default EssayQuestion;
