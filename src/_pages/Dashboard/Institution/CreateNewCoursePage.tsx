"use client";
import Stepper from "@/components/ui/Molecules/Stepper";
import ParentCardDashboard from "@/components/ui/Molecules/dashboard/cards/ParentCardDashboard";
import CourseModuleForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseModuleForm";
import CourseForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseForm";
import CourseSubjectForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseSubjectForm";
import CourseTopicForm from "@/components/ui/Organisms/forms/dashboard/institution/CourseTopicForm";
import { RootState } from "@/store/store";
import { IoArrowUpCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import ScrollToTop from "react-scroll-to-top";

const CreateNewCoursePage = () => {
  const activeStep = useSelector((state: RootState) => state.course.activeStep);

  const renderFormBasedOnActiveState = (
    activeStep: "course" | "subject" | "module" | "topic"
  ) => {
    switch (activeStep) {
      case "course":
        return <CourseForm mode="create" />;
      case "subject":
        return <CourseSubjectForm mode="create" />;
      case "topic":
        return <CourseTopicForm mode="create" />;
      case "module":
        return <CourseModuleForm mode="create" />;
      default:
        return <CourseForm mode="create" />;
    }
  };

  return (
    <div>
      <ParentCardDashboard
        marginBottom="mb-[7.31rem]"
        heading="Create New Course"
      >
        <Stepper mode="create" />

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

export default CreateNewCoursePage;
