"use client";
import React from "react";
import OverviewCard from "@/components/ui/Molecules/dashboard/OverviewCard";
import FileIcon from "@/assets/icons/file_icon.svg";
import RegisteredUserIcon from "@/assets/icons/registered_user_icon.svg";
import RegisteredInstructorIcon from "@/assets/icons/add_remove_instructor_icon.svg";
import ExamsCreatedIcon from "@/assets/icons/course_list_icon.svg";
import DoughnutChart from "@/components/ui/Molecules/dashboard/charts/DoughnutChart";
import Heading from "@/components/ui/Atoms/Heading";
import AverageGradeBarChart from "@/components/ui/Molecules/dashboard/charts/AverageGradeBarChart";
import AdImageOne from "@/assets/images/adsDummyImages/Rectangle 2901.png";
import AdImageTwo from "@/assets/images/adsDummyImages/Rectangle 2902.png";
import PerformanceMetricsChart from "@/components/ui/Molecules/dashboard/charts/PerformanceMetricsChart";
import { useForm } from "react-hook-form";
import {
  averageGradeBarChartData,
  performanceMetricsBarChartData,
} from "@/mappings";
import Image from "next/image";
import {
  useGetAllInstructorsByInstituteId,
  useGetInstituteOverviewByInstituteId,
} from "@/server/queries";
import Spinner from "@/components/ui/Atoms/Spinner";
import FormInput from "@/components/ui/Atoms/form/input/FormInput";
import { GrPowerReset } from "react-icons/gr";
import { ChartOptions } from "chart.js";

// for fil upload

interface ISelectInstructorForAnalytics {
  selectedInstructor: string;
}

const InstitutionOverviewPage = ({ instituteId }: { instituteId: string }) => {
  // chart data
  const data = {
    labels: ["Material", "Quiz", "Exam"],
    datasets: [
      {
        label: "Content Created: ",
        data: [60, 25, 15],
        backgroundColor: [
          "rgba(175, 164, 240, 1)",
          "rgba(0, 198, 133,1)",
          "rgba(255, 105, 5,1)",
        ],
        borderColor: [
          "rgba(175, 164, 240, 1)",
          "rgba(0, 198, 133, 1)",
          "rgba(255, 105, 5, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  // chart options
  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
        },
      },
      tooltip: {
        usePointStyle: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
    cutout: "50%",
  };

  // queries
  const {
    data: overviewData,
    isLoading,
    isError,
    error,
  } = useGetInstituteOverviewByInstituteId(instituteId);

  const {
    data: instructorData,
    isLoading: instructorIsLoading,
    isError: instructorIsError,
    error: instructorError,
  } = useGetAllInstructorsByInstituteId(instituteId);

  // form
  const {
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<ISelectInstructorForAnalytics>({
    defaultValues: {
      selectedInstructor: "",
    },
  });

  const resetInstructorPieChart = () => {
    resetField("selectedInstructor");
  };

  const watchAllFields = watch();

  if (isLoading || instructorIsLoading)
    return <Spinner loadingText="Overview Data fetching" />;
  if (isError || instructorIsError)
    return (
      <div>ERROR: {isError ? error.message : instructorError?.message}</div>
    );

  return (
    <div>
      <div className="flex justify-between w-full gap-[1.5rem] relative">
        <div>
          <Heading
            heading="Overview"
            className="text-[1.875rem] font-bold leading-[115%]"
          />
          {/* top section */}
          <div className="flex gap-[1.25rem] mt-[2.19rem]">
            {/* donoughnut chart card */}
            <div className="w-[15.625rem] flex flex-col justify-between items-center gap-[1rem] h-[16.5rem] bg-top-flashcards-card-background rounded-[1.25rem] p-[1.19rem]">
              <h1 className="w-[13.25rem] h-[1.5625rem] flex justify-between items-center text-center text-heading flex-shrink-0 text-[0.875rem] -tracking-[0.00963rem]">
                Instructor Content{" "}
                <GrPowerReset
                  onClick={resetInstructorPieChart}
                  className="cursor-pointer text-lg hover:rotate-[360deg] hover:text-xl transition ease-in-out duration-300 text-app-purple "
                />
              </h1>

              {instructorData ? (
                instructorData?.length > 0 && (
                  <div className="w-[12rem] h-[12rem] flex flex-col justify-center items-center">
                    {!watchAllFields.selectedInstructor && (
                      <div>
                        <FormInput
                          labelText="Select Instructor"
                          register={register}
                          inputType="select"
                          name="selectedInstructor"
                          placeholder="Select Instructor"
                          selectOptions={instructorData?.map((instructor) => {
                            return {
                              id: instructor.id,
                              value: instructor.title,
                            };
                          })}
                        />
                      </div>
                    )}
                    {watchAllFields.selectedInstructor && (
                      <DoughnutChart
                        data={data}
                        options={options}
                        cssClasses="w-full"
                      />
                    )}
                  </div>
                )
              ) : (
                <p>No instructors found</p>
              )}
            </div>
            {/* overview cards section */}
            <div className="flex flex-col  gap-[1.25rem]">
              <div className="flex gap-[1.25rem]">
                <OverviewCard
                  icon={FileIcon}
                  number={overviewData?.totalCourses as number}
                  text="Total Courses"
                  circleColor="bg-app-orange"
                />
                <OverviewCard
                  icon={RegisteredUserIcon}
                  number={overviewData?.totalStudents as number}
                  text="Registered Students"
                  circleColor="bg-app-green"
                />
              </div>
              <div className="flex gap-[1.25rem]">
                <OverviewCard
                  icon={RegisteredInstructorIcon}
                  number={overviewData?.totalInstructors as number}
                  text="Registered Instructor"
                  circleColor="bg-rating-star-color"
                />
                <OverviewCard
                  icon={ExamsCreatedIcon}
                  number={overviewData?.totalExams as number}
                  text="Exam Created"
                  circleColor="bg-rating-count"
                />
              </div>
            </div>
          </div>
          {/* average grade chart */}
          <div className="bg-top-flashcards-card-background rounded-[1.25rem] relative">
            <Heading
              heading="Average Score"
              className="text-[0.875rem] font-semibold font-inter absolute top-[1.87rem] left-[1.25rem]"
            />
            <div className=" px-[1.25rem] mt-[1.5rem] py-[2.16rem] ">
              <AverageGradeBarChart data={averageGradeBarChartData} />
            </div>
          </div>
          {/* performance metrics chart */}
          <div className="bg-top-flashcards-card-background rounded-[1.25rem] relative">
            <Heading
              heading="Performance Metrics"
              className="text-[0.875rem] font-semibold font-inter absolute top-[1.87rem] left-[1.25rem]"
            />
            {/* legends for performance metric chart */}
            <div className="flex gap-[0.75rem] absolute top-[1.8rem] right-[2.13rem]">
              <div className="flex gap-[0.75rem]  items-center">
                <span className="text-[0.5625rem] font-medium">GRADE</span>
                <div className="w-[1rem] h-[1rem] bg-badge-background rounded-full"></div>
              </div>
              <div className="flex gap-[0.75rem]  items-center">
                <span className="text-[0.5625rem] font-medium">STUDENTS</span>
                <div className="w-[1rem] h-[1rem] bg-[#8081C9] rounded-full"></div>
              </div>
            </div>
            <div className=" px-[1.25rem] mt-[1.5rem] py-[2.16rem]">
              <PerformanceMetricsChart data={performanceMetricsBarChartData} />
            </div>
          </div>
        </div>
        <div>
          <Image className="h-[35.875rem]" src={AdImageOne} alt="ad image" />
          <Image
            className="h-[21.9375rem] mt-[1.69rem]"
            src={AdImageTwo}
            alt="ad image"
          />
        </div>
      </div>
    </div>
  );
};

export default InstitutionOverviewPage;
