import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getAllCourses,
  getAllExamsByCourseId,
  getAllInstitutions,
  getAllQuizesByInstituteId,
  getAllQuizezByCourseId,
  getCourseByCourseId,
  getCoursesByInstituteId,
  getEnrichedCoursesByInstituteId,
  getExamsByInstituteId,
  getInstituteBySlug,
  getInstituteOverview,
  getInstitutionById,
  getInstructorsByInstutiteId,
  getStudentsByInstituteId,
} from ".";
import {
  ICourseData,
  ICourseDataMany,
  ICourseDataSingle,
  IEnrichedCourseDataGetRequest,
  IExamGetRequestPayloadData,
  IInstitutionData,
  IInstitutionList,
  IInstructorData,
  InstituteAnalyticsData,
  IQuizGetRequestPayloadData,
} from "@/types/api";

// * __________INSTITUTION QUERIES START__________
export const useCachedInstitutionById = (institutionId: string) => {
  return useQuery<IInstitutionData>({
    queryKey: ["get-institute-by-id", { institutionId }],
    queryFn: () => getInstitutionById(institutionId),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });
};

export const useGetAllInstitutions = () => {
  return useQuery<IInstitutionList[]>({
    queryKey: ["get-institutions"],
    queryFn: () => getAllInstitutions(),
  });
};

export const useGetInstituteBySlug = (slug: string) => {
  return useQuery<IInstitutionData>({
    queryKey: ["get-institute-by-slug", { slug }],
    queryFn: () => getInstituteBySlug(slug),
  });
};

// * __________INSTITUTION QUERIES END________

// * __________COURSE QUERIES START__________
export const useGetAllCourses = () => {
  return useQuery<ICourseDataMany>({
    queryKey: ["get-courses"],
    queryFn: () => getAllCourses(),
  });
};

export const useGetCoursesByInstituteId = (id: string) => {
  return useQuery<ICourseDataMany>({
    queryKey: ["get-courses-by-institute-id", { id }],
    queryFn: () => getCoursesByInstituteId(id),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
  });
};

export const useGetCourseByCourseId = (id: string) => {
  return useQuery<ICourseDataSingle>({
    queryKey: ["get-course-by-course-id", { id }],
    queryFn: () => getCourseByCourseId(id),
    refetchOnWindowFocus: false,
  });
};

export const useGetCoursesByCourseIds = (
  ids: (string | undefined)[] | undefined
) => {
  return useQueries({
    queries: (ids ?? [])
      .filter((id): id is string => id !== undefined) // Filter out undefined values
      .map((id) => {
        return {
          queryKey: ["get-courses-by-course-ids", { id }],
          queryFn: () => getCourseByCourseId(id),
        };
      }),
  });
};

export const useGetEnrichedCoursesByInstituteId = (id: string) => {
  return useQuery<IEnrichedCourseDataGetRequest>({
    queryKey: ["get-enriched-courses-by-institute-id", { id }],
    queryFn: () => getEnrichedCoursesByInstituteId(id),
  });
};

// * __________COURSE QUERIES END________

// * __________INSTRUCTOR QUERIES START__________
export const useGetAllInstructorsByInstituteId = (id: string) => {
  return useQuery<IInstructorData[]>({
    queryKey: ["get-all-instructors-by-institute-id", { id }],
    queryFn: () => getInstructorsByInstutiteId(id),
  });
};

// * __________INSTRUCTOR QUERIES END________

// * __________STUDENT QUERIES START__________
export const useGetAllStudentsByInstituteId = (id: string) => {
  return useQuery<any>({
    queryKey: ["get-all-students-by-institute-id", { id }],
    queryFn: () => getStudentsByInstituteId(id),
  });
};

// * __________STUDENT QUERIES END__________

// * __________QUIZ QUERIES START__________
export const useGetAllQuizesByInstituteId = (instituteId: string) => {
  return useQuery<IQuizGetRequestPayloadData>({
    queryKey: ["get-all-quizes-by-institute-id", { id: instituteId }],
    queryFn: () => getAllQuizesByInstituteId(instituteId),
    refetchOnWindowFocus: false,
  });
};
export const useGetAllQuizesByCourseId = (courseId: string) => {
  return useQuery<ICourseData[]>({
    queryKey: ["get-all-quizes-by-course-id", { id: courseId }],
    queryFn: () => getAllQuizezByCourseId(courseId),
    // stale for 10 minutes
    staleTime: 1000 * 60 * 10,
  });
};

// * __________QUIZ QUERIES END__________

// * __________EXAM QUERIES START___________
export const useGetAllExamsByInstituteId = (instituteId: string) => {
  return useQuery<IExamGetRequestPayloadData>({
    queryKey: ["get-all-exams-by-institute-id", { id: instituteId }],
    queryFn: () => getExamsByInstituteId(instituteId),
  });
};

export const useGetAllExamsByCourseId = (courseId: string) => {
  return useQuery<ICourseData[]>({
    queryKey: ["get-all-exams-by-course-id", { id: courseId }],
    queryFn: () => getAllExamsByCourseId(courseId),
    // stale for 10 minutes
    staleTime: 1000 * 60 * 10,
  });
};

// * __________EXAM QUERIES END___________

// * __________ANALYTICS QUERIES START____________
export const useGetInstituteOverviewByInstituteId = (instituteId: string) => {
  return useQuery<InstituteAnalyticsData>({
    queryKey: ["get-institute-overview-by-institute-id", { id: instituteId }],
    queryFn: () => getInstituteOverview(instituteId),
  });
};

// * __________ANALYTICS QUERIES END____________
