"use client";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import FormCardDashboard from "@/components/ui/Molecules/dashboard/cards/FormCardDashboard";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import CustomTable from "@/components/ui/Organisms/CustomTable";
import CreateQuestionForm from "@/components/ui/Organisms/forms/dashboard/institution/CreateQuestionForm";
import { quetionsListColumnMapping } from "@/mappings";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import EditQuestionDialog from "@/components/ui/Organisms/dialogs/EditQuestionDialog";
import DeleteDialog from "@/components/ui/Organisms/dialogs/DeleteDialog";
import {
  IParsedQuestionsData,
  IQuestionCategories,
  IQuestionEditObject,
} from "@/types";
import { getAllQuizesByInstituteId, getExamsByInstituteId } from "@/server";
import {
  IExamGetRequestPayloadData,
  IQuizGetRequestPayloadData,
} from "@/types/api";
import Spinner from "@/components/ui/Atoms/Spinner";
import {
  useCreateQuestionsInBulkMutation,
  useUpdateExamByIdMutation,
  useUpdateQuizById,
} from "@/server/mutations";

const CreateQuestionsPage = ({ instituteId }: { instituteId: string }) => {
  // states
  const [dialogToggle, setDialogToggle] = useState<boolean>(false);
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [dataToBeDeletedId, setDataToBeDeletedId] = useState();
  const [dataToBeEdited, setDataToBeEdited] = useState<IQuestionEditObject>({
    question: "DEFAULT QUESTION",
    category: "DEFAULT CATEGORY",
    subCategory: "DEFAULT SUBCATEGORY",
    type: "mcq",
    correctAnswer: "DEFAULT CORRECT ANSWER",
    options: "DEFAULT OPTIONS",
    keyWords: "DEFAULT KEYWORDS",
  });
  const [quizData, setQuizData] = useState<IQuizGetRequestPayloadData | null>(
    null
  );
  const [examData, setExamData] = useState<IExamGetRequestPayloadData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedQuestionsData, setSelectedQuestionsData] = useState<
    IParsedQuestionsData[] | []
  >([]);
  const [refetchQuiz, setRefetchQuiz] = useState<boolean>(false);
  const [refetchExam, setRefetchExam] = useState<boolean>(false);

  // mutations
  const updateQuizMutation = useUpdateQuizById();
  const updateExamMutation = useUpdateExamByIdMutation();
  const createQuestionsInBulkMutation = useCreateQuestionsInBulkMutation();

  // form
  const { register, watch } = useForm<IQuestionCategories>();
  const watchAllFields = watch();

  const handleEditQuestion = (editData: IQuestionEditObject) => {
    console.log("EDIT QUESTION DATA: ", editData);
    setDialogToggle((prevState) => !prevState);
    setDataToBeEdited(editData);
  };

  const handleDeleteQuestion = () => {
    const updatedQuestionsList = selectedQuestionsData.filter(
      (question) => question.id !== dataToBeDeletedId
    );

    console.log("UPDATED QUESTION LIST: ", updatedQuestionsList);

    if (watchAllFields.questionsFor === "Exam") {
      updateExamMutation.mutate(
        {
          examId: watchAllFields.subCategory,
          examData: {
            examQuestions: updatedQuestionsList,
          },
        },
        {
          onSuccess: () => {
            setRefetchExam((prevState) => !prevState);
            setDeleteDialogToggle(false);
          },
        }
      );
    }
    if (watchAllFields.questionsFor === "Quiz") {
      updateQuizMutation.mutate(
        {
          quizId: watchAllFields.subCategory,
          quizData: {
            quizQuestions: updatedQuestionsList,
          },
        },
        {
          onSuccess: () => {
            setRefetchQuiz((prevState) => !prevState);
            setDeleteDialogToggle(false);
          },
        }
      );
    }
  };

  const handleOpenDeleteQuestionDialog = (deleteData: any) => {
    console.log("DELETE QUESTION DATA: ", deleteData);
    setDeleteDialogToggle((prevState) => !prevState);
    setDataToBeDeletedId(deleteData.id);
  };

  const handleSubmitQuestionsList = (questionList: IParsedQuestionsData[]) => {
    const updatedQuestionsList = [...selectedQuestionsData, ...questionList];
    const questionListWithInstituteId = questionList.map((question) => ({
      ...question,
      instituteId,
    }));

    // adding questions to questions table
    createQuestionsInBulkMutation.mutateAsync(questionListWithInstituteId, {
      onSuccess: () => {
        // adding questions to quiz
        if (watchAllFields.questionsFor === "Quiz") {
          updateQuizMutation.mutateAsync(
            {
              quizId: watchAllFields.subCategory,
              quizData: {
                quizQuestions: updatedQuestionsList,
              },
            },
            {
              onSuccess: () => {
                setRefetchQuiz((prevState) => !prevState);
                toast.success("Questions added successfully to quiz");
              },
            }
          );
        }

        if (watchAllFields.questionsFor === "Exam") {
          updateExamMutation.mutateAsync(
            {
              examId: watchAllFields.subCategory,
              examData: {
                examQuestions: updatedQuestionsList,
              },
            },
            {
              onSuccess: () => {
                setRefetchExam((prevState) => !prevState);
                toast.success("Questions added successfully to exam");
              },
            }
          );
        }
      },
    });

    questionList.length === 0
      ? toast.error("No questions created")
      : toast.success("Questions created successfully");
  };

  // effects
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (watchAllFields.questionsFor === "Quiz") {
          const data = await getAllQuizesByInstituteId(instituteId);
          setQuizData(data);
        }
        if (watchAllFields.questionsFor === "Exam") {
          const data = await getExamsByInstituteId(instituteId);
          setExamData(data);
        }
      } catch (error) {
        setIsError(true);
        toast.error("Failed to fetch quizes");
      } finally {
        setIsLoading(false);
      }
    };
    // specifics are provided to the controllable components
    fetchData();
  }, [watchAllFields.questionsFor, refetchQuiz, refetchExam]);

  useEffect(() => {
    if (watchAllFields.questionsFor === "Quiz" && watchAllFields.subCategory) {
      const questionsPool =
        quizData?.quizzes.find((quiz) => quiz.id === watchAllFields.subCategory)
          ?.quizQuestions || [];
      setSelectedQuestionsData(questionsPool);
    }
    if (watchAllFields.questionsFor === "Exam" && watchAllFields.subCategory) {
      const questionsPool =
        examData?.exams.find((quiz) => quiz.id === watchAllFields.subCategory)
          ?.examQuestions || [];
      setSelectedQuestionsData(questionsPool);
    }
  }, [watchAllFields.subCategory, quizData, examData]);

  // loading state
  if (isLoading) return <Spinner loadingText="Fetching Quizes" />;
  return (
    <div>
      <ParentCardDashboard heading="Create Questions" marginBottom="mb-[3rem]">
        <div className="space-y-[2.69rem] pb-[2.69rem]">
          <FormInput
            name="questionsFor"
            placeholder="Questions For"
            labelText="Questions For"
            register={register}
            inputType="select"
            selectOptions={["Exam", "Quiz"]}
          />
          {watchAllFields.questionsFor && (
            <FormInput
              name="subCategory"
              placeholder="Sub Category"
              labelText={`Select ${
                watchAllFields.questionsFor === "Exam" ? "Exam" : "Quiz"
              }`}
              register={register}
              inputType="select"
              selectOptions={
                watchAllFields.questionsFor === "Exam"
                  ? examData?.exams.map((exam) => ({
                      id: exam.id,
                      value: exam.examName,
                    }))
                  : quizData?.quizzes.map((quiz) => ({
                      id: quiz.id,
                      value: quiz.quizName,
                    }))
              }
            />
          )}
          {watchAllFields.subCategory && watchAllFields.questionsFor && (
            <FormCardDashboard
              heading="Create"
              marginAuto={false}
              fullWidthOnMediumDevices
              headingTextSize="text-[1.125rem]"
            >
              <CreateQuestionForm
                questionListHandler={handleSubmitQuestionsList}
                categoryData={{
                  category: watchAllFields.questionsFor,
                  subCategory: watchAllFields.subCategory,
                }}
              />
            </FormCardDashboard>
          )}
        </div>
      </ParentCardDashboard>

      {watchAllFields.questionsFor && (
        <>
          <CustomTable
            header="Questions List"
            tableColumns={quetionsListColumnMapping}
            tableData={selectedQuestionsData}
            pageSize={6}
            hasActions
            handleDelete={handleOpenDeleteQuestionDialog}
            handleEdit={handleEditQuestion}
          />
          <EditQuestionDialog
            categoryId={watchAllFields.subCategory}
            questionCategoryType={watchAllFields.questionsFor}
            refetchSetter={
              watchAllFields.questionsFor === "Exam"
                ? setRefetchExam
                : setRefetchQuiz
            }
            refetch={
              watchAllFields.questionsFor === "Exam" ? refetchExam : refetchQuiz
            }
            questionsList={selectedQuestionsData}
            dataToBeEdited={dataToBeEdited}
            dialogToggle={dialogToggle}
            setDialogToggle={setDialogToggle}
          />
          <DeleteDialog
            dialogTitle="Are you sure you want to delete this question?"
            dialogToggle={deleteDialogToggle}
            setDialogToggle={setDeleteDialogToggle}
            dialogHandler={handleDeleteQuestion}
          />
        </>
      )}
      <ScrollToTop
        smooth
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
        component={
          <IoArrowUpCircleOutline className="text-2xl text-app-purple hover:scale-[200%] transition ease-in-out duration-300 absolute right-0" />
        }
      />
    </div>
  );
};

export default CreateQuestionsPage;
