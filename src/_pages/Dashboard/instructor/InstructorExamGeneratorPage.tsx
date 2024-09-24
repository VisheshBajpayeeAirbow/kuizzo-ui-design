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
  setParsedExamQuestionsData,
} from "@/features/examSlice/examSlice";
import { useRouter } from "next/navigation";
import { PATHS } from "@/constants";
import { generateExamFormSchema } from "@/validations";
import { isValidTimeRange } from "@/utils";

const InstructorExamGeneratorPage = () => {
  const subjectOptions = ["Mathematics", "Science", "History", "Geography"];
  const topicOptions = ["Algebra", "Biology", "World War II", "Continents"];
  const typeOptions = [
    "Multiple Choice",
    "True / False",
    "Short Answer",
    "Essay",
    " Fill in the blanks",
  ];
  const router = useRouter();
  const dispatch = useDispatch();
  const courseOptions = ["Course 1", "Course 2", "Course 3", "Course 4"];
  const numberOfQuestionsOptions = ["5", "10", "15", "20"];
  const difficultyLevelOptions = ["Easy", "Medium", "Hard", "Very Hard"];
  const [questionsCountValidity, setQuestionsCountValidity] = useState(false);

  const [examDate, setExamDate] = useState<DateRange>({
    startDate: null,
    endDate: new Date(new Date().setMonth(11)), // Ensure this is a valid date
  });
  const [availableTimeSlotTo, setAvailableTimeSlotTo] = useState<string[]>([]);
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IExamGeneratorForm>({
    resolver: yupResolver(generateExamFormSchema),
  });

  // TODO:  issue with parsed question types, fix later
  // const onSubmit = (data: IExamGeneratorForm) => {
  //   // parse json here
  //   if (data.pastExamMaterial[0]) {
  //     Papa.parse(data.pastExamMaterial[0], {
  //       header: true,
  //       complete: (result: ParseResult<IParsedQuestionsData>) => {
  //         const questionsDataWithTags = result.data.map(
  //           (question: IParsedQuestionsData) => {
  //             return {
  //               ...question,
  //               tags: [data.course, data.subject, data.topic],
  //             };
  //           }
  //         );
  //         dispatch(setParsedExamQuestionsData(questionsDataWithTags));
  //       },

  //       error: (error) => {
  //         console.error("Error parsing CSV:", error);
  //       },
  //     });

  //     dispatch(setExamName(data.examName));
  //     // TODO: Send quiz payload to backend here
  //   }
  //   if (!data.pastExamMaterial[0]) {
  //     // generate questions by randomly from db
  //     toast.success("Questions Generated from DB");
  //     // TODO: need to call api with rnadomized questions list and store in redux
  //     dispatch(
  //       setParsedExamQuestionsData([
  //         {
  //           id: "20q9wijefmdx",
  //           instituteId: "219-qe3wdfin",
  //           question: "Question 1(FROM DB)",
  //           category: "Category 1",
  //           subCategory: "Sub Category 1",
  //           type: "mcq",
  //           correctAnswer: "Option-1",
  //           options: "Option-1,Option-2,Option-3,Option-4",
  //           keywords: "",
  //         },
  //         {
  //           id: "q3je10q293ijwenofcdj",
  //           instituteId: "219-qe3wdfin",
  //           question: "Question 2(FROM DB)",
  //           category: "Category 1",
  //           subCategory: "Sub Category 1",
  //           type: "true/false",
  //           correctAnswer: "True",
  //           options: "True,False",
  //           keywords: "",
  //         },
  //       ])
  //     );
  //   }
  //   // TODO: Send exam payload to backend here
  //   console.log("GENERATE EXAM DATA: ", {
  //     ...data,
  //     examDate,
  //     numberOfQuestions: 20,
  //   });
  //   const timeRangeValid = isValidTimeRange(data.timeSlotFrom, data.timeSlotTo);
  //   if (timeRangeValid && questionsCountValidity) {
  //     toast.success("Exam generated successfully");
  //     router.push(`${PATHS.showQuestions}/exam-questions`);
  //   } else {
  //     toast.error("Exam Time Slot range is not valid");
  //   }
  // };

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

  return (
    <div>
      <ParentCardDashboard heading="Exam Generator" marginBottom="mb-[7.37rem]">
        {/* todo: onSubmit={handleSubmit(onSubmit)} */}
        <form>
          <div className="flex justify-end">
            <p
              onClick={() => toast.error("Template not present")}
              className="text-xs underline italic cursor-pointer text-app-orange"
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
    </div>
  );
};

export default InstructorExamGeneratorPage;
