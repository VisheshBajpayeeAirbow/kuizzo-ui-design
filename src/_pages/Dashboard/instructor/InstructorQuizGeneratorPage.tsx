"use client";

import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import { useForm } from "react-hook-form";
import { Button } from "@/components";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { IQuizGeneratorForm } from "@/types";
import ScrollToTop from "react-scroll-to-top";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { useDispatch } from "react-redux";
import {
  setParsedQuizQuestionsData,
  setQuizName,
} from "@/features/quizSlice/quizSlice";
import { generateQuizFormSchema } from "@/validations";

const InstructorQuizGeneratorPage = () => {
  const courseOptions = ["Course 1", "Course 2", "Course 3", "Course 4"];
  const subjectOptions = ["Mathematics", "Science", "History", "Geography"];
  const topicOptions = ["Algebra", "Biology", "World War II", "Continents"];
  const typeOptions = ["Multiple Choice", "True / False"];

  const router = useRouter();
  const dispatch = useDispatch();
  const difficultyLevelOptions = ["Easy", "Medium", "Hard", "Very Hard"];
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IQuizGeneratorForm>({
    resolver: yupResolver(generateQuizFormSchema),
  });

  const onSubmit = (data: IQuizGeneratorForm) => {
    // ? Questions generated by AI
    if (data.additionalNotesOrInstructions?.length === 0) {
      // generate questions by randomly from db
      toast.success("Questions Generated from DB");
      // TODO: need to call api with randomized questions list and store in redux
      dispatch(
        setParsedQuizQuestionsData([
          {
            id: "20q9wijefmdx",
            instituteId: "0923rwefijogdn",
            question: "Question 1(FROM DB)",
            category: "Category 1",
            subCategory: "Sub Category 1",
            type: "mcq",
            correctAnswer: "Option-1",
            options: "Option-1,Option-2,Option-3,Option-4",
            keywords: "Keyword-1,Keyword-2,Keyword-3,Keyword-4",
          },
          {
            id: "q3je10q293ijwenofcdj",
            question: "Question 2(FROM DB)",
            instituteId: "0923rwefijogdn",
            category: "Category 1",
            subCategory: "Sub Category 1",
            type: "true/false",
            correctAnswer: "True",
            options: "True,False",
            keywords: "Keyword-1,Keyword-2,Keyword-3,Keyword-4",
          },
        ])
      );
      // ? Questions generated randomly from DB
    } else {
      toast.success("Questions Created from AI");
      dispatch(
        setParsedQuizQuestionsData([
          {
            id: "20q9wijefmdx",
            question: "Question 1(FROM AI)",
            instituteId: "0923rwefijogdn",
            category: "Category 1",
            subCategory: "Sub Category 1",
            type: "mcq",
            correctAnswer: "Option-1",
            options: "Option-1,Option-2,Option-3,Option-4",
            keywords: "Keyword-1,Keyword-2,Keyword-3,Keyword-4",
          },
          {
            id: "q3je10q293ijwenofcdj",
            instituteId: "0923rwefijogdn",
            question: "Question 2(FROM AI)",
            category: "Category 1",
            subCategory: "Sub Category 1",
            type: "true/false",
            correctAnswer: "True",
            options: "True,False",
            keywords: "Keyword-1,Keyword-2,Keyword-3,Keyword-4",
          },
        ])
      );
    }
    // TODO: Send quiz payload to backend here
    console.log("GENERATE QUIZ DATA: ", { ...data, numberOfQuestions: 20 });
    dispatch(setQuizName(data.quizName));
    toast.success("Quiz generated successfully");
    router.push(`${PATHS.showQuestions}/quiz-questions`);
  };

  return (
    <>
      <ParentCardDashboard heading="Quiz Generator" marginBottom="mb-[7.37rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* file inputs */}
          <div className="space-y-[2.75rem]">
            <FormInput
              labelText="Quiz Name"
              name="quizName"
              placeholder="Quiz Name"
              register={register}
              inputType="default"
              errorMessage={errors.quizName?.message}
            />
            <FormInput
              labelText="Additional Notes or Instructions (optional):"
              name="additionalNotesOrInstructions"
              placeholder="Any specific instructions or notes"
              register={register}
              inputType="textarea"
              errorMessage={errors.additionalNotesOrInstructions?.message}
            />
          </div>
          <h5 className="my-[2.75rem] font-caladea text-[1.125rem] font-bold leading-[115%]">
            Select Course, Subject and Topic
          </h5>
          <div className="space-y-[2.75rem]">
            <FormInput
              labelText="Course:"
              name="course"
              placeholder="Select Course"
              register={register}
              inputType="select"
              selectOptions={courseOptions}
              errorMessage={errors?.course?.message}
            />
            <FormInput
              labelText="Subject:"
              name="subject"
              placeholder="Select Subject"
              register={register}
              inputType="select"
              selectOptions={subjectOptions}
              errorMessage={errors?.subject?.message}
            />
            <FormInput
              labelText="Topic:"
              name="topic"
              placeholder="Select Topic"
              register={register}
              inputType="select"
              selectOptions={topicOptions}
              errorMessage={errors?.topic?.message}
            />
          </div>
          <p className="text-[0.75rem] font-inter leading-[150%] text-sub-heading mt-[1.6rem]">
            E.g., &quot;Algebra&quot;, &quot;World War II&quot;,
            &quot;Photosynthesis&quot;
          </p>
          <h5 className="my-[2.75rem] font-caladea text-[1.125rem] font-bold leading-[115%]">
            Quiz Preference
          </h5>
          <div className="space-y-[2.75rem]">
            <FormInput
              labelText="Type:"
              name="type"
              placeholder="Select Type"
              register={register}
              inputType="select"
              selectOptions={typeOptions}
              errorMessage={errors?.type?.message}
            />

            <FormInput
              labelText="Difficulty Level:"
              name="difficultyLevel"
              placeholder="Select Difficulty Level"
              register={register}
              inputType="select"
              selectOptions={difficultyLevelOptions}
              errorMessage={errors?.difficultyLevel?.message}
            />
          </div>

          <div className="flex justify-center md:justify-start">
            <Button
              btnColor={"plainOrange"}
              className="mt-[2.88rem] w-[13rem] h-[3.9375rem] mb-[8.25rem]"
            >
              Generate
            </Button>
          </div>
        </form>
      </ParentCardDashboard>

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
    </>
  );
};

export default InstructorQuizGeneratorPage;
