import { editQuestionDialogFormSchema } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/dialog";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import Button from "../../Atoms/Button";
import { IEditQuestionDialogProps } from "@/types";
import {
  useUpdateExamByIdMutation,
  useUpdateQuizById,
} from "@/server/mutations";
import ExamQuestions from "@/app/(private)/institution-dashboard/@dashboard/review-questions/exam-questions/page";

const EditQuestionDialog = ({
  questionCategoryType,
  dataToBeEdited,
  questionsList,
  dialogToggle,
  categoryId,
  refetch,
  refetchSetter,
  setDialogToggle,
}: IEditQuestionDialogProps) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editQuestionDialogFormSchema),
  });

  const watchQuestionType = watch("type");

  // mutations
  const updateQuizMutation = useUpdateQuizById();
  const updateExamMutation = useUpdateExamByIdMutation();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("EDITED QUESTION DATA: ", data);
    toast.success("EDIT DATA LOGGED SUCCESSFULLY");
    const updatedQuestionsPool = questionsList.map((question) => {
      if (question.id === dataToBeEdited.id) {
        return data;
      } else {
        return question;
      }
    });

    if (questionCategoryType === "Quiz") {
      updateQuizMutation.mutate(
        {
          quizId: categoryId,
          quizData: {
            quizQuestions: updatedQuestionsPool,
          },
        },
        {
          onSuccess: () => {
            refetchSetter(!refetch);
          },
        }
      );
    }

    if (questionCategoryType === "Exam") {
      updateExamMutation.mutate(
        {
          examId: categoryId,
          examData: {
            examQuestions: updatedQuestionsPool,
          },
        },
        {
          onSuccess: () => {
            refetchSetter(!refetch);
          },
        }
      );
    }

    setDialogToggle(false);
  };

  useEffect(() => {
    reset(dataToBeEdited);
    console.log("DATA TO BE EDITED: ", dataToBeEdited);
  }, [dataToBeEdited, reset]);

  return (
    <Dialog open={dialogToggle} onOpenChange={(open) => setDialogToggle(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              register={register}
              placeholder="Question"
              labelText="Question"
              name="question"
              inputType="default"
            />
            <FormInput
              register={register}
              placeholder="Question Type"
              labelText="Question Type"
              name="type"
              inputType="select"
              selectOptions={[
                "mcq",
                "true/false",
                "essay",
                "short-answer",
                "fill-in-the-blanks",
              ]}
            />
            {watchQuestionType === "mcq" && (
              <>
                <FormInput
                  register={register}
                  placeholder="Correct Answer"
                  name="correctAnswer"
                  inputType="default"
                  labelText="Correct Answer"
                />
                <FormInput
                  register={register}
                  placeholder="Options"
                  name="options"
                  inputType="default"
                  labelText="Options"
                />
              </>
            )}
            {watchQuestionType === "true/false" && (
              <FormInput
                register={register}
                placeholder="Correct Answer"
                name="correctAnswer"
                inputType="select"
                labelText="Correct Answer"
                selectOptions={["True", "False"]}
              />
            )}
            {watchQuestionType === "essay" && (
              <FormInput
                register={register}
                placeholder="Keywords"
                name="keywords"
                inputType="default"
                labelText="Keywords"
              />
            )}
            {watchQuestionType === "short-answer" && (
              <FormInput
                register={register}
                placeholder="Keywords"
                name="keywords"
                inputType="default"
                labelText="Keywords"
              />
            )}
            {watchQuestionType === "fill-in-the-blanks" && (
              <FormInput
                register={register}
                placeholder="Correct Answer"
                name="correctAnswer"
                inputType="default"
                labelText="Correct Answer"
              />
            )}
          </div>
          <Button className="mt-4" btnColor="purple" type="submit">
            Edit Question
          </Button>
        </form>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default EditQuestionDialog;
