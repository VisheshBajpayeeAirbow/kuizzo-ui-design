import { RegisterPayload } from "@/types";
import {
  ICourseData,
  IEnrichedCourseDataGetRequest,
  IExamData,
  IExamGetRequestPayloadData,
  IInstitutionData,
  IInstructorData,
  InstituteAnalyticsData,
  IQuestionsGetRequestPayloadData,
  IQuizData,
  IQuizGetRequestPayloadData,
  IUploadFilesRequestPayloadData,
} from "@/types/api";
import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // ! headers are not required to be stored here as they are already specified in aws console
  // ! { Authorization: "allow" } is set insinterceptors request function
});

// add authorization header based on session
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = "allow";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// * __________AUTH APIS START____________

export const registerUser = async (
  data: RegisterPayload,
  role: "student" | "instructor" | "institution"
) => {
  return (await axiosInstance.post(`/auth/register?role=${role}`, data)).data;
};

export const loginUser = async (
  data: {
    username: string;
    password: string;
  },
  role: "student" | "instructor" | "institution"
) => {
  return (await axiosInstance.post(`/auth/login?role=${role}`, data)).data;
};

// * __________AUTH APIS END____________

// * __________INSTITUTION APIS START____________

export const getInstitutionById = async (
  id: string
): Promise<IInstitutionData> => {
  return (await axiosInstance.get(`/institution/get-institute-by-id/${id}`))
    .data;
};

export const editInstitutionById = async (id: string, data: any) => {
  return (await axiosInstance.put(`/institution/edit-institute/${id}`, data))
    .data;
};

export const getAllInstitutions = async () => {
  return (await axiosInstance.get("/institution/get-all-institutes")).data;
};

export const getInstituteBySlug = async (slug: string) => {
  return (await axiosInstance.get(`/institution/get-institute-by-slug/${slug}`))
    .data;
};

// * __________INSTITUTION APIS END____________

// * __________COURSE APIS START____________
export const createCourse = async (data: ICourseData) => {
  return (await axiosInstance.post("/course/create-course", data)).data;
};

export const getAllCourses = async () => {
  return (await axiosInstance.get("/course/get-all-courses")).data;
};

export const getCoursesByInstituteId = async (id: string) => {
  return (await axiosInstance.get(`/course/get-courses-by-instituteId/${id}`))
    .data;
};

export const deleteCourseById = async (id: string) => {
  return (await axiosInstance.delete(`/course/delete-course/${id}`)).data;
};

export const updateCourseById = async (id: string, data: ICourseData) => {
  return (await axiosInstance.put(`/course/update-course/${id}`, data)).data;
};

export const getCourseByCourseId = async (id: string) => {
  return (await axiosInstance.get(`/course/get-course-by-courseId/${id}`)).data;
};

export const getEnrichedCoursesByInstituteId = async (
  instituteId: string
): Promise<IEnrichedCourseDataGetRequest> => {
  return (await axiosInstance.get(`course/get-enriched-courses/${instituteId}`))
    .data;
};

// * __________COURSE APIS END____________

// * __________INSTRUCTOR APIS START____________

export const getInstructorsByInstutiteId = async (id: string) => {
  return (
    await axiosInstance.get(
      `/institution/get-all-instructors-by-instituteId/${id}`
    )
  ).data;
};

export const createInstructor = async (data: IInstructorData) => {
  return await axiosInstance.post(`/instructor/create-instructor`, data);
};

export const editInstructorById = async (id: string, data: any) => {
  return (
    await axiosInstance.put(`/instructor/edit-instructor-by-id/${id}`, data)
  ).data;
};

export const deleteInstructorById = async (id: string) => {
  return (await axiosInstance.delete(`/instructor/delete-instructor/${id}`))
    .data;
};

export const createInstructorsInBulk = async (data: IInstructorData[]) => {
  return (
    await axiosInstance.post(`/instructor/create-instructors-in-bulk`, data)
  ).data;
};

// * __________ INSTRUCTOR APIS END ____________

// * __________STUDENT APIS START ____________

export const getStudentsByInstituteId = async (id: string) => {
  return (
    await axiosInstance.get(
      `/institution/get-all-students-by-instituteId/${id}`
    )
  ).data;
};
export const createStudent = async (data: any) => {
  return (await axiosInstance.post(`/student/create-student`, data)).data;
};

export const editStudentById = async (id: string, data: any) => {
  return (await axiosInstance.put(`/student/edit-student/${id}`, data)).data;
};

export const deleteStudentById = async (id: string) => {
  return (await axiosInstance.delete(`/student/delete-student/${id}`)).data;
};

export const createStudentInBulk = async (data: any) => {
  return (await axiosInstance.post(`/student/create-students-in-bulk`, data))
    .data;
};

export const getStudentById = async (id: string) => {
  return (await axiosInstance.get(`/student/get-student-by-id/${id}`)).data;
};

// * __________STUDENT APIS END ____________

// * __________ ENROLLMENT APIS START ____________
export const createInstructorCourseEnrollment = async (data: any) => {
  return (
    await axiosInstance.post(
      `/enrollment/create-instructor-course-enrollment`,
      data
    )
  ).data;
};

export const createStudentCourseEnrollment = async (data: any) => {
  return (
    await axiosInstance.post(
      `/enrollment/create-student-course-enrollment`,
      data
    )
  ).data;
};

// * __________ ENROLLMENT APIS END ____________

// * __________ FILE UPLOAD APIS START __________

export const uploadFiles = async ({
  files,
  uploadMeta,
}: IUploadFilesRequestPayloadData) => {
  const formData = new FormData();
  files.forEach((file) => formData.append("file", file));

  const { folder, subDirectory } = uploadMeta;

  formData.append("folder", folder);
  const response = await axios.post(
    `/api/documents?subDirectory=${subDirectory}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// * __________ FILE UPLOAD APIS END __________

// * __________ QUIZ APIS START __________
export const getAllQuizesByInstituteId = async (
  instituteId: string
): Promise<IQuizGetRequestPayloadData> => {
  const response = await axiosInstance.get(
    `/quiz/get-all-quizes-by-instituteId/${instituteId}`
  );
  return response.data; // Make sure to return the data
};

export const createQuiz = async (data: IQuizData) => {
  return (await axiosInstance.post(`/quiz/create-quiz`, data)).data;
};

export const editQuiz = async (quizId: string, quizData: any) => {
  return (await axiosInstance.put(`/quiz/edit-quiz-by-id/${quizId}`, quizData))
    .data;
};

export const deleteQuizById = async (quizId: string) => {
  return (await axiosInstance.delete(`/quiz/delete-quiz/${quizId}`)).data;
};

export const getQuizById = async (quizId: string) => {
  return (await axiosInstance.get(`/quiz/get-quiz-by-id/${quizId}`)).data;
};

export const getAllQuizezByCourseId = async (courseId: string) => {
  return (
    await axiosInstance.get(`/quiz/get-all-quizes-by-courseId/${courseId}`)
  ).data;
};

// * __________ QUIZ APIS END __________

// * __________ QUESTIONS APIS START __________
export const createQuestionsInBulk = async (questionsData: any) => {
  return (
    await axiosInstance.post(
      `/question/create-questions-in-bulk`,
      questionsData
    )
  ).data;
};

export const getQuestionsByTags = async (tags: {
  course: string;
  subject: string;
  topic: string;
  type: string;
  instituteId: string;
}) => {
  return (
    await axiosInstance.get<IQuestionsGetRequestPayloadData>(
      `/question/get-questions-by-tags?course=${tags.course}&subject=${tags.subject}&topic=${tags.topic}&type=${tags.type}&instituteId=${tags.instituteId}`
    )
  ).data;
};

export const getQuestionsByTagsForExam = async (tags: {
  course: String;
  subject: string;
  topic: string;
  mcqQuestionCount: number;
  trueFalseQuestionCount: number;
  essayQuestionCount: number;
  shortAnswerCount: number;
  fillInTheBlanksCount: number;
  instituteId: string;
}) => {
  return (
    await axiosInstance.get(
      `/question/get-questions-by-query-params-exam?course=${tags.course}&subject=${tags.subject}&topic=${tags.topic}&mcqQuestionCount=${tags.mcqQuestionCount}&trueFalseCount=${tags.trueFalseQuestionCount}&essayCount=${tags.essayQuestionCount}&shortAnswerCount=${tags.shortAnswerCount}&fillInTheBlanksCount=${tags.fillInTheBlanksCount}&instituteId=${tags.instituteId}`
    )
  ).data;
};
// * __________ QUESTIONS APIS END __________

// * __________ EXAM APIS START __________
export const getExamsByInstituteId = async (instituteId: string) => {
  return (
    await axiosInstance.get<IExamGetRequestPayloadData>(
      `/exam/get-exams-by-instituteId/${instituteId}`
    )
  ).data;
};

export const createExam = async (data: IExamData) => {
  return (await axiosInstance.post(`/exam/create-exam`, data)).data;
};

export const editExamById = async (examId: string, examData: any) => {
  return (await axiosInstance.put(`/exam/edit-exam-by-id/${examId}`, examData))
    .data;
};

export const deleteExamById = async (examId: string) => {
  return (await axiosInstance.delete(`/exam/delete-exam/${examId}`)).data;
};

export const getAllExamsByCourseId = async (courseId: string) => {
  return (
    await axiosInstance.get(`/exam/get-all-exams-by-courseId/${courseId}`)
  ).data;
};

// * __________ EXAM APIS END __________

// * __________ ANALYTICS APIS START __________

export const getInstituteOverview = async (instituteId: string) => {
  return (
    await axiosInstance.get<InstituteAnalyticsData>(
      `/analytics/get-institute-overview/${instituteId}`
    )
  ).data;
};

// * __________ ANALYTICS APIS END __________

export const createdSignedUrl = async (data: any) => {
  return (await axiosInstance.post(`/upload-files/upload-to-s3`, data)).data;
};

// not using axiosInstance because we dont require auth headers when calling s3, else it will not work.
export const uploadFilesToS3 = async (url: string, file: File) => {
  try {
    const response = await axios.put(url, file);
    return response.data; // Ensure this returns the expected data
  } catch (error: any) {
    console.error(
      "Error during file upload:",
      error.response?.data || error.message
    );
    throw error; // Rethrow the error to catch it in onSubmit
  }
};
