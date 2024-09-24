import StudentOverviewPage from "@/_pages/Dashboard/Student/StudentOverviewPage";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { BASE_URL } from "@/server";
import { ICourseData } from "@/types/api";
import axios from "axios";
import { getServerSession } from "next-auth";
import React from "react";

const StudentDashboard = async () => {
  const session = await getServerSession(options);
  const studentId = session?.user?.id;
  const studentObject = (
    await axios.get(`${BASE_URL}/student/get-student-by-id/${studentId}`, {
      headers: {
        Authorization: "allow",
      },
    })
  ).data;
  const instituteId = studentObject.instituteId;
  const studentCourseId = studentObject.courseId;
  const courses = (
    await axios.get(
      `${BASE_URL}/course/get-courses-by-instituteId/${instituteId}`,
      {
        headers: {
          Authorization: "allow",
        },
      }
    )
  ).data;

  return (
    <>
      <StudentOverviewPage
        studentId={studentId}
        instituteId={instituteId}
        studentCourseId={studentCourseId}
        coursesData={courses}
      />
    </>
  );
};

export default StudentDashboard;
