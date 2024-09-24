"use client";

import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import { useForm } from "react-hook-form";
import { QuestionTypeInputs } from "@/components/ui/Molecules/dashboard/QuestionTypeInputs";
import { Button } from "@/components";
import DatePicker from "@/components/ui/Molecules/dashboard/DatePicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DateRange, IExamGeneratorForm, IParsedQuestionsData } from "@/types";
import ScrollToTop from "react-scroll-to-top";
import Papa, { ParseResult } from "papaparse";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import {
  setExamName,
  setExamPayload,
  setParsedExamQuestionsData,
  setQuestionFetchType,
} from "@/features/examSlice/examSlice";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { generateExamFormSchema } from "@/validations";
import { isValidTimeRange } from "@/utils";
import { useGetCoursesByInstituteId } from "@/server/queries";
import { getQuestionsByTagsForExam } from "@/server";
import Spinner from "@/components/ui/Atoms/Spinner";
import { nanoid } from "nanoid";

const ExamGeneratorPage = ({ instituteId }: { instituteId: string }) => {
  const {
    data: coursesData,
    isLoading,
    isError,
    error,
  } = useGetCoursesByInstituteId(instituteId);

  const router = useRouter();
  const dispatch = useDispatch();
  const courseOptions = coursesData?.courses.map((course) => course.courseName);
  const numberOfQuestionsOptions = ["5", "10", "15", "20"];
  const difficultyLevelOptions = ["Easy", "Medium", "Hard", "Very Hard"];
  const [questionsCountValidity, setQuestionsCountValidity] = useState(false);
  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);

  const [examDate, setExamDate] = useState<DateRange>({
    startDate: null,
    endDate: new Date(new Date().setMonth(11)), // Ensure this is a valid date
  });
  const [availableTimeSlotTo, setAvailableTimeSlotTo] = useState<string[]>([]);
  const subjectsMap = new Map<string, string[]>();
  const topicsMap = new Map<string, string[]>();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IExamGeneratorForm>({
    resolver: yupResolver(generateExamFormSchema),
  });

  const onSubmit = async (data: IExamGeneratorForm) => {
    // ? if past exams material exists, then dispatch csv data
    if (data.pastExamMaterial[0]) {
      Papa.parse(data.pastExamMaterial[0], {
        header: true,
        complete: (result: ParseResult<IParsedQuestionsData>) => {
          const questionsDataWithTagsAndInstituteId = result.data.map(
            (question: IParsedQuestionsData) => {
              return {
                ...question,
                tags: `${data.course},${data.subject},${data.topic}`,
                instituteId,
                id: nanoid(),
              };
            }
          );
          dispatch(
            setParsedExamQuestionsData(questionsDataWithTagsAndInstituteId)
          );
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
      dispatch(setQuestionFetchType("manual"));
      dispatch(setExamName(data.examName));
      // TODO: Send quiz payload to backend here
    }

    // if there is no pastExam Material, get data from backend
    if (!data.pastExamMaterial[0]) {
      // generate questions from db
      toast.success("Questions Generated from DB");
      const questionsData = await getQuestionsByTagsForExam({
        course: data.course,
        subject: data.subject,
        topic: data.topic,
        essayQuestionCount: data.questionTypeEssayCount as number,
        fillInTheBlanksCount: data.questionTypeFillInTheBlanksCount as number,
        mcqQuestionCount: data.questionTypeMcqCount as number,
        shortAnswerCount: data.questionTypeShortAnswerCount as number,
        trueFalseQuestionCount: data.questionTypeTrueFalseCount as number,
        instituteId: instituteId,
      });
      dispatch(setQuestionFetchType("db"));
      dispatch(setParsedExamQuestionsData(questionsData.questions));
      // ? call ai to generate questions
      if (!questionsData.questions.length)
        console.log("No questions found for the selected filters");
    }

    const timeRangeValid = isValidTimeRange(data.timeSlotFrom, data.timeSlotTo);
    // check validity of exam data
    if (timeRangeValid && questionsCountValidity) {
      // TODO: Send exam payload to backend here

      const payload = {
        ...data,
        instituteId,
        examDate,
        numberOfQuestions: "20",
      };
      dispatch(setExamPayload(payload));
      toast.success("Exam generated successfully");
      router.push(`${PATHS.showQuestions}/exam-questions`);
    } else {
      toast.error("Exam Time Slot range is not valid");
    }
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
  const watchAllFields = watch();
  const watchQuestionTypeFields = watch([
    "questionTypeMcqCount",
    "questionTypeTrueFalseCount",
    "questionTypeShortAnswerCount",
    "questionTypeEssayCount",
    "questionTypeFillInTheBlanksCount",
  ]);

  useEffect(() => {
    // Destructure the watched fields for easier access
    const [
      questionTypeMcqCount,
      questionTypeTrueFalseCount,
      questionTypeShortAnswerCount,
      questionTypeEssayCount,
      questionTypeFillInTheBlanksCount,
    ] = watchQuestionTypeFields;

    // Convert watched fields to numbers
    const mcqCount = Number(questionTypeMcqCount || 0);
    const trueFalseCount = Number(questionTypeTrueFalseCount || 0);
    const shortAnswerCount = Number(questionTypeShortAnswerCount || 0);
    const essayCount = Number(questionTypeEssayCount || 0);
    const fillInTheBlanksCount = Number(questionTypeFillInTheBlanksCount || 0);
    const totalQuestionCount =
      mcqCount +
      trueFalseCount +
      shortAnswerCount +
      essayCount +
      fillInTheBlanksCount;

    console.log("TOTAL QUESTIONS COUNT: ", totalQuestionCount);

    // Compare totalQuestionCount with numberOfQuestions
    const numberOfQuestionsCount = Number(
      watchAllFields.numberOfQuestions || 0
    );

    if (totalQuestionCount !== numberOfQuestionsCount) {
      toast.error("Total Question Count must be equal to number of questions");
      setQuestionsCountValidity(false);
    } else {
      setQuestionsCountValidity(true);
    }
  }, [
    watchQuestionTypeFields[0],
    watchQuestionTypeFields[1],
    watchQuestionTypeFields[2],
    watchQuestionTypeFields[3],
    watchQuestionTypeFields[4],
  ]);

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

  if (isLoading) return <Spinner loadingText="Fetching Exams" />;
  if (isError) return <div>ERROR OCCURED: {error.message}</div>;

  return (
    <div>
      <ParentCardDashboard heading="Exam Generator" marginBottom="mb-[7.37rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <p
              onClick={() => toast.error("Template not present")}
              className="text-xs underline italic cursor-pointer text-app-purple"
            >
              Download sample Template
            </p>
          </div>

          <div className="space-y-[2.66rem]">
            <FormInput
              labelText="Past Exams: "
              name={"pastExamMaterial"}
              placeholder="pastExamMaterial"
              register={register}
              inputType="file"
              fileInputTypeInfo="CSV files only"
              fileUploadType={["text/csv"]}
            />

            <FormInput
              labelText="Exam Name: "
              name="examName"
              placeholder="Enter Exam Name"
              register={register}
              inputType="default"
              errorMessage={errors?.examName?.message}
            />
            <FormInput
              labelText="Additional Notes or Instructions:"
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
          <div className="space-y-[2.66rem]">
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
            Exam Preference
          </h5>
          <div className="space-y-[2.66rem]">
            <FormInput
              labelText="Number of Questions:"
              name="numberOfQuestions"
              placeholder="Select Number of Questions"
              register={register}
              inputType="select"
              selectOptions={numberOfQuestionsOptions}
              errorMessage={errors?.numberOfQuestions?.message}
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

          {/* date picker */}
          <DatePicker
            dateSetter={setExamDate}
            dateValue={examDate}
            label="Select Exam Date"
          />

          <div className="mt-[2.75rem] ">
            <label className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]">
              Exam Time Slot:
            </label>
            <div className="flex flex-col tablet:flex-row justify-start items-center gap-[1.13rem] mt-[1.5rem]">
              <div className="flex flex-col tablet:flex-row space-x-0 space-y-4 tablet:space-y-0 tablet:space-x-4 items-center">
                <FormInput
                  name="timeSlotFrom"
                  placeholder="Hour"
                  register={register}
                  inputType="time"
                  errorMessage={errors?.timeSlotFrom?.message}
                />

                <span className="text-[0.94006rem] italic text-sub-heading px-4">
                  to
                </span>
                <FormInput
                  name="timeSlotTo"
                  placeholder="Hour"
                  register={register}
                  inputType="time"
                  disabledOptions={availableTimeSlotTo}
                  errorMessage={errors?.timeSlotTo?.message}
                />
              </div>
            </div>
          </div>
          {/* question types */}
          <div className="mt-[3.44rem]">
            <label className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem]">
              Question Types:
            </label>
            <div className="mt-[1.87rem]">
              <QuestionTypeInputs
                checkboxState={watchAllFields.questionTypeMcq}
                checkboxName="questionTypeMcq"
                checkboxRegister={register}
                checkboxLabelText="Multiple Choice"
                checkboxPlaceholder="Multiple Choice"
                inputName="questionTypeMcqCount"
                inputRegister={register}
                inputPlaceholder="count"
              />
              <QuestionTypeInputs
                checkboxState={watchAllFields.questionTypeTrueFalse}
                checkboxName="questionTypeTrueFalse"
                checkboxRegister={register}
                checkboxLabelText="True / False"
                checkboxPlaceholder="True / False"
                inputName="questionTypeTrueFalseCount"
                inputRegister={register}
                inputPlaceholder="count"
              />
              <QuestionTypeInputs
                checkboxState={watchAllFields.questionTypeShortAnswer}
                checkboxName="questionTypeShortAnswer"
                checkboxRegister={register}
                checkboxLabelText="Short Answer"
                checkboxPlaceholder="Short Answer"
                inputName="questionTypeShortAnswerCount"
                inputRegister={register}
                inputPlaceholder="count"
              />
              <QuestionTypeInputs
                checkboxState={watchAllFields.questionTypeEssay}
                checkboxName="questionTypeEssay"
                checkboxRegister={register}
                checkboxLabelText="Essay"
                checkboxPlaceholder="Essay"
                inputName="questionTypeEssayCount"
                inputRegister={register}
                inputPlaceholder="count"
              />
              <QuestionTypeInputs
                checkboxState={watchAllFields.questionTypeFillInTheBlanks}
                checkboxName="questionTypeFillInTheBlanks"
                checkboxRegister={register}
                checkboxLabelText="Fill in the Blanks"
                checkboxPlaceholder="Fill in the Blanks"
                inputName="questionTypeFillInTheBlanksCount"
                inputRegister={register}
                inputPlaceholder="count"
              />
            </div>
          </div>
          {/* exam preferences */}
          <div className="mt-[3.44rem]">
            <label className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem] pt-[2.60rem]">
              Exam Time:
            </label>
            <div className="flex flex-wrap items-center gap-[4.37rem] pt-[1.87rem]">
              <FormInput
                name="examTime"
                placeholder="Exam Time"
                register={register}
                labelText="10 min"
                inputType="radio"
              />
              <FormInput
                name="examTime"
                placeholder="Exam Time"
                register={register}
                labelText="20 min"
                inputType="radio"
              />
              <FormInput
                name="examTime"
                placeholder="Exam Time"
                register={register}
                labelText="30 min"
                inputType="radio"
              />
              <FormInput
                name="examTime"
                placeholder="Exam Time"
                register={register}
                labelText="40 min"
                inputType="radio"
              />
              <FormInput
                name="examTime"
                placeholder="Exam Time"
                register={register}
                labelText="50 min"
                inputType="radio"
              />

              <FormInput
                name="examTime"
                placeholder="Exam Time"
                register={register}
                labelText="custom"
                inputType="radio"
              />
            </div>
          </div>

          {watchAllFields.examTime === "custom" && (
            <span className="flex items-center w-full tablet:w-1/4 mt-[2.88rem] gap-[0.56rem] mb-[3.25rem]">
              <FormInput
                name="customQuizTimeHour"
                placeholder="Hour"
                register={register}
                defaultInputTypeValue="number"
              />
              <span>:</span>
              <FormInput
                name="customQuizTimeMin"
                placeholder="Min"
                register={register}
                defaultInputTypeValue="number"
              />
            </span>
          )}
          {/* other options  */}
          <div className="mt-[3.25rem]">
            <label className="text-input-label text-[0.875rem] font-semibold leading-[115%] tracking-[0.04375rem] ">
              Other Options
            </label>
            <div className="grid tablet:grid-cols-2 gap-[2.12rem] mt-[1.81rem]">
              <FormInput
                name="randomizeQuestions"
                register={register}
                placeholder="Randomize Questions"
                inputType="checkbox"
                labelText="Randomize Questions"
              />
              <FormInput
                name="includeAnswerKey"
                register={register}
                placeholder="Include Answer Key"
                inputType="checkbox"
                labelText="Include Answer Key"
              />
              <FormInput
                name="generateFeedbackForIncorrectAnswers"
                register={register}
                placeholder="Generate Feedback for Incorrect Answers"
                inputType="checkbox"
                labelText="Generate Feedback for Incorrect Answers"
              />
              <FormInput
                name="constraintQuizToTopicsOnly"
                register={register}
                placeholder="Constraint Quiz to Topics Only"
                inputType="checkbox"
                labelText="Constraint Quiz to Topics Only"
              />
            </div>
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
    </div>
  );
};

export default ExamGeneratorPage;
