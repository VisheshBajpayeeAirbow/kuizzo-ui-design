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
  setQuizPayload,
} from "@/features/quizSlice/quizSlice";
import { generateQuizFormSchema } from "@/validations";
import { useGetCoursesByInstituteId } from "@/server/queries";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getQuestionsByTags } from "@/server";
import { quizTypeOptions } from "@/mappings";
import Spinner from "@/components/ui/Atoms/Spinner";

const QuizGeneratorPage = ({ instituteId }: { instituteId: string }) => {
  const difficultyLevelOptions = ["Easy", "Medium", "Hard", "Very Hard"];

  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);
  const { data: session } = useSession();
  const {
    data: coursesData,
    isLoading,
    isError,
    error,
  } = useGetCoursesByInstituteId(session?.user.id);
  const courseOptions = coursesData?.courses.map((course) => course.courseName);
  // Create a map for subjects and topics
  const subjectsMap = new Map<string, string[]>();
  const topicsMap = new Map<string, string[]>();
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IQuizGeneratorForm>({
    resolver: yupResolver(generateQuizFormSchema),
  });

  const onSubmit = async (data: IQuizGeneratorForm) => {
    if (data.additionalNotesOrInstructions?.length === 0) {
      // generate questions by randomly from db
      toast.success("Questions Generated from DB");

      const questionsData = await getQuestionsByTags({
        course: data.course,
        subject: data.subject,
        topic: data.topic,
        type: data.type,
        instituteId: instituteId,
      });
      // dispatching questions data from db
      dispatch(setParsedQuizQuestionsData(questionsData.questions));

      // ? Questions generated by AI
    } else {
      toast.success("Questions Created from AI");
      // dummy dispatch

      dispatch(
        setParsedQuizQuestionsData([
          {
            id: "20394wrefijndv-0pkoqwfe-sj",
            instituteId: instituteId,
            question: "Question 1(FROM AI)",
            category: "Category 1",
            subCategory: "Sub Category 1",
            type: "mcq",
            correctAnswer: "Option-1",
            options: "Option-1,Option-2,Option-3,Option-4",
            keywords: "Keyword-1,Keyword-2,Keyword-3,Keyword-4",
            tags: "Mathematics Advance Course,Algebra,Variables",
          },
          {
            id: "092qewfijnodukaposjkdfn2sdf",
            instituteId: instituteId,
            question: "Question 2(FROM AI)",
            category: "Category 1",
            subCategory: "Sub Category 1",
            type: "true/false",
            correctAnswer: "True",
            options: "True,False",
            keywords: "Keyword-1,Keyword-2,Keyword-3,Keyword-4",
            tags: "Mathematics Advance Course,Algebra,Variables",
          },
        ])
      );
    }

    const payload = {
      ...data,
      instituteId,
      numberOfQuestions: 10,
    };

    dispatch(setQuizPayload(payload));
    dispatch(setQuizName(data.quizName));
    router.push(`${PATHS.showQuestions}/quiz-questions`);
  };

  // Populate the maps with subjects and topics
  coursesData?.courses.forEach((course) => {
    const courseSubjects = course.subjects.map(
      (subject) => subject.subjectName
    );
    subjectsMap.set(course.courseName, courseSubjects);

    course.subjects.forEach((subject) => {
      const subjectTopics =
        subject.topics?.map((topic) => topic.topicName) || [];
      topicsMap.set(subject.subjectName, subjectTopics);
    });
  });

  const watchCourse = watch("course");
  const watchSubject = watch("subject");

  useEffect(() => {
    if (watchCourse) {
      setFilteredSubjects(subjectsMap.get(watchCourse) || []);
      setFilteredTopics([]); // Reset topics when course changes
    }
  }, [watchCourse]);

  useEffect(() => {
    if (watchSubject) {
      setFilteredTopics(topicsMap.get(watchSubject) || []);
    }
  }, [watchSubject]);

  if (isLoading) return <Spinner loadingText="Loading..." />;
  if (isError) return <div>ERROR OCCURED: {error.message}</div>;

  return (
    <>
      <ParentCardDashboard heading="Quiz Generator" marginBottom="mb-[7.37rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              selectOptions={courseOptions}
              inputType="select"
              errorMessage={errors?.course?.message}
            />
            <FormInput
              labelText="Subject:"
              name="subject"
              placeholder="Select Subject"
              register={register}
              inputType="select"
              selectOptions={filteredSubjects}
              errorMessage={errors?.subject?.message}
            />
            <FormInput
              labelText="Topic:"
              name="topic"
              placeholder="Select Topic"
              register={register}
              inputType="select"
              selectOptions={filteredTopics}
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
              selectOptions={quizTypeOptions}
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
              btnColor={"purple"}
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

export default QuizGeneratorPage;
