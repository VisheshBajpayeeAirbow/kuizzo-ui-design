import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { IMcqProps, IMcqQuestionProps } from "@/types";
import { mcqQuestionFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const McqQuestion = ({
  questionId,
  defaultValues,
  mode,
  mcqSubmitHandler,
  resetQuestionTypeForm,
}: IMcqQuestionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IMcqProps>({
    resolver: yupResolver(mcqQuestionFormSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = (data: IMcqProps) => {
    mcqSubmitHandler({
      id: questionId,
      question: data.question,
      type: "mcq",
      correctAnswer: data.correctAnswer,
      options: `${data.optionOne},${data.optionTwo},${data.optionThree},${data.optionFour}`,
    });
    resetQuestionTypeForm({ questionType: "" });
    toast.success(
      `MCQ question ${mode === "edit" ? "edited" : "added"} successfully`
    );
  };

  return (
    <form className="space-y-[0.5rem]" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        name="question"
        placeholder="Enter Question"
        register={register}
        inputType="default"
        labelText="Question"
        errorMessage={errors.question?.message}
      />
      <FormInput
        name="optionOne"
        placeholder="Add first option"
        register={register}
        inputType="default"
        labelText="Option One"
        errorMessage={errors.optionOne?.message}
      />
      <FormInput
        name="optionTwo"
        placeholder="Add second option"
        register={register}
        inputType="default"
        labelText="Option Two"
        errorMessage={errors.optionTwo?.message}
      />
      <FormInput
        name="optionThree"
        placeholder="Add third option"
        register={register}
        inputType="default"
        labelText="Option Three"
        errorMessage={errors.optionThree?.message}
      />
      <FormInput
        name="optionFour"
        placeholder="Add fourth option"
        register={register}
        inputType="default"
        labelText="Option Four"
        errorMessage={errors.optionFour?.message}
      />
      <FormInput
        name="correctAnswer"
        placeholder="Correct Answer"
        labelText="Correct Answer"
        register={register}
        inputType="select"
        selectOptions={["Option 1", "Option 2", "Option 3", "Option 4"]}
        errorMessage={errors.correctAnswer?.message}
      />
      <div className="flex justify-center mt-4">
        <Button type="submit" className="w-[10rem]" btnColor="purple">
          {mode === "add" ? "Add" : "Edit"} Question
        </Button>
      </div>
    </form>
  );
};

export default McqQuestion;
