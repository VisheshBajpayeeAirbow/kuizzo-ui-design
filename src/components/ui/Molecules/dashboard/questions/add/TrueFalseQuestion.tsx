import Button from "@/components/ui/Atoms/Button";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { ITrueFalseProps, ITrueFalseQuestionProps } from "@/types";
import { trueFalseQuestionFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const TrueFalseQuestion = ({
  questionId,
  defaultValues,
  mode,
  trueFalseSubmitHandler,
  resetQuestionTypeForm,
}: ITrueFalseQuestionProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITrueFalseProps>({
    resolver: yupResolver(trueFalseQuestionFormSchema),
    defaultValues: defaultValues,
  });
  const onSubmit = (data: ITrueFalseProps) => {
    trueFalseSubmitHandler({ ...data, id: questionId, type: "true/false" });
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
        inputType="select"
        selectOptions={["True", "False"]}
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

export default TrueFalseQuestion;
