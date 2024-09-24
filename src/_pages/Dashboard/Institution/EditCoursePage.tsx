"use client";
import Stepper from "@/components/ui/Molecules/Stepper";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import CourseModuleForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseModuleForm";
import CourseForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseForm";
import CourseSubjectsForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseSubjectForm";
import CourseTopicsForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseTopicForm";
import { RootState } from "@/store/store";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";
import { useSearchParams } from "next/navigation";
import { useGetCourseByCourseId } from "@/server/queries";
import { useEffect, useState } from "react";
import { reverseTransformCourseState } from "@/utils";
import {
  CourseSliceInitialState,
  setCreateCourseForm,
  setCreateModuleForm,
  setCreateSubjectForm,
  setCreateTopicForm,
  setModulesExist,
  setTopicsExist,
} from "@/features/courseSlice/courseSlice";
import Spinner from "@/components/ui/Atoms/Spinner";

const EditCoursePage = () => {
  const activeStep = useSelector((state: RootState) => state.course.activeStep);
  const dispatch = useDispatch();
  const [convertedCourseData, setConvertedCourseData] =
    useState<CourseSliceInitialState | null>(null);
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId");

  const {
    data: courseData,
    isLoading,
    isError,
    error,
  } = useGetCourseByCourseId(courseId !== null ? courseId : "");

  const renderFormBasedOnActiveState = (
    activeStep: "course" | "subject" | "module" | "topic"
  ) => {
    switch (activeStep) {
      case "course":
        return convertedCourseData ? (
          <CourseForm mode="edit" />
        ) : (
          <p>Loading Course Form...</p>
        );
      case "subject":
        return convertedCourseData ? (
          <CourseSubjectsForm mode="edit" />
        ) : (
          <p>Loading Subjects Form...</p>
        );
      case "topic":
        return convertedCourseData && courseId ? (
          <CourseTopicsForm courseId={courseId} mode="edit" />
        ) : (
          <p>Loading Topics Form...</p>
        );
      case "module":
        return convertedCourseData && courseId ? (
          <CourseModuleForm courseId={courseId} mode="edit" />
        ) : (
          <p>Loading Modules Form...</p>
        );
      default:
        return <CourseForm mode="edit" />;
    }
  };

  useEffect(() => {
    if (courseData?.course) {
      const transformedData = reverseTransformCourseState(courseData.course);
      setConvertedCourseData(transformedData);
      dispatch(setCreateCourseForm(transformedData.createCourseForm));
      dispatch(setCreateSubjectForm(transformedData.createSubjectForm));
      dispatch(setCreateTopicForm(transformedData.createTopicForm));
      dispatch(setCreateModuleForm(transformedData.createModuleForm));
      dispatch(setTopicsExist(transformedData.topicsExist));
      dispatch(setModulesExist(transformedData.modulesExist));
    }
  }, [courseData]);

  if (isLoading) return <Spinner loadingText="Loading Course" />;
  if (isError) return <p>ERROR OCCURRED: {error.message}</p>;

  return (
    <div>
      <ParentCardDashboard marginBottom="mb-[7.31rem]" heading="Edit Course">
        <Stepper mode="edit" />
        {renderFormBasedOnActiveState(activeStep)}
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

export default EditCoursePage;
