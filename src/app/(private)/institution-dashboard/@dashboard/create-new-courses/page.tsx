import CreateNewCoursePage from "@/_pages/Dashboard/Institution/CreateNewCoursePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Courses",
  description: "Create New Courses",
};

const InstitutionCreateNewCourses = async () => {
  return (
    <>
      <CreateNewCoursePage />
    </>
  );
};

export default InstitutionCreateNewCourses;
