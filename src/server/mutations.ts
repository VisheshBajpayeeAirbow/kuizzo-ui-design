import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createCourse,
  createExam,
  createInstructor,
  createInstructorCourseEnrollment,
  createInstructorsInBulk,
  createQuestionsInBulk,
  createQuiz,
  createStudent,
  createStudentCourseEnrollment,
  createStudentInBulk,
  deleteCourseById,
  deleteExamById,
  deleteInstructorById,
  deleteQuizById,
  deleteStudentById,
  editExamById,
  editInstitutionById,
  editInstructorById,
  editQuiz,
  editStudentById,
  loginUser,
  registerUser,
  updateCourseById,
  uploadFiles,
} from ".";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PATHS } from "@/constants";
import { clearLocalStorageFormData } from "@/utils";
import {
  ICourseData,
  IEnrolledInstructorCourseData,
  IEnrolledStudentCourseData,
  IExamData,
  IInstructorData,
  IQuizData,
  IUploadFilesRequestPayloadData,
} from "@/types/api";
import { useDispatch } from "react-redux";
import { resetCreateCourseForms } from "@/features/courseSlice/courseSlice";
import { useSession } from "next-auth/react";

// * __________AUTH MUTATIONS START____________
export const useRegisterUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({
      data,
      role,
    }: {
      data: any;
      role: "student" | "instructor" | "institution";
    }) => {
      return registerUser(data, role);
    },
    onError: (error: AxiosError) => console.error("Registration error:", error),
    onSuccess: (data) => {
      toast.success("USER CREATED SUCCESSFULLY");
      router.push(PATHS.signin);
      console.log("REGISTERED USER DATA: ", data);
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: async ({
      data,
      role,
    }: {
      data: {
        username: string;
        password: string;
      };
      role: "student" | "instructor" | "institution";
    }) => {
      return loginUser(data, role);
    },
    onError: (error: AxiosError) => console.error("Login error:", error),
  });
};
// * __________AUTH MUTATIONS END____________

// * __________INSTITUTION MUTATIONS START____________
export const useUpdateInstitutionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string | undefined; data: any }) => {
      if (id) {
        return editInstitutionById(id, data);
      }
    },
    onSuccess: (_data, variables) => {
      clearLocalStorageFormData();
      queryClient.invalidateQueries({
        queryKey: ["get-institute-by-id", { institutionId: variables.id }],
      });
      toast.success("INSTITUTION UPDATED SUCCESSFULLY");
    },
    onError: (error: AxiosError) => console.error("Edit error:", error),
  });
};
// * __________INSTITUTION MUTATIONS END____________

// * __________COURSE MUTATIONS START____________
export const useCreateCourseMutation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  return useMutation({
    mutationKey: ["create-course"],
    mutationFn: async (data: ICourseData) => {
      return createCourse(data);
    },

    onSuccess: (data) => {
      toast.success("COURSE CREATED SUCCESSFULLY");
      console.log("DATA AFTER CREATING COURSE: ", data);
      queryClient.invalidateQueries({
        queryKey: [
          "get-enriched-courses-by-institute-id",
          { id: session?.user?.id },
        ],
        refetchType: "all", // Ensures that it refetches even if within staleTime
      });
      dispatch(resetCreateCourseForms());
      router.push(PATHS.courseList);
    },
    onError: (error: AxiosError) =>
      console.error("Create course error:", error),
  });
};

export const useDeleteCourseByIdMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return deleteCourseById(id);
    },
    onError: (error: AxiosError) =>
      console.error("Delete course error:", error),

    onSuccess: (data) => {
      toast.success("COURSE DELETED SUCCESSFULLY");
      queryClient.invalidateQueries({
        queryKey: [
          "get-enriched-courses-by-institute-id",
          { id: session?.user?.id },
        ],
        refetchType: "all",
      });
    },
  });
};

export const useUpdateCourseByIdMutation = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ICourseData }) => {
      return updateCourseById(id, data);
    },
    onError: (error: AxiosError) =>
      console.error("Update course error:", error),

    onSuccess: (_data) => {
      toast.success("COURSE UPDATED SUCCESSFULLY");
      dispatch(resetCreateCourseForms());
      router.push(PATHS.courseList);
    },
  });
};

// * __________COURSE MUTATIONS END____________

// * __________INSTRUCTOR MUTATIONS START____________
export const useCreateInstructorMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-instructor"],
    mutationFn: async (data: IInstructorData) => {
      return createInstructor(data);
    },
    onSuccess: (data) => {
      toast.success("INSTRUCTOR CREATED SUCCESSFULLY");
      console.log("CREATED INSTRUCTOR: ", data);
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-instructors-by-institute-id",
          { id: session?.user?.id },
        ],
      });
    },
  });
};

export const useUpdateInstructorMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-instructor"],
    mutationFn: async ({ id, data }: { id: string; data: IInstructorData }) =>
      editInstructorById(id, data),
    onSuccess: (_data) => {
      toast.success("INSTRUCTOR UPDATED SUCCESSFULLY");
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-instructors-by-institute-id",
          { id: session?.user.id },
        ],
      });
    },
  });
};

export const useDeleteInstructorByIdMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-instructor"],
    mutationFn: async (id: string) => deleteInstructorById(id),
    onSuccess: (_data) => {
      toast.success("INSTRUCTOR DELETED SUCCESSFULLY");
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-instructors-by-institute-id",
          { id: session?.user.id },
        ],
      });
    },
  });
};

export const useCreateInstructorsInBulkMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-instructors-in-bulk"],
    mutationFn: async (data: IInstructorData[]) => {
      return createInstructorsInBulk(data);
    },
    onSuccess: (_data) => {
      toast.success("INSTRUCTORS CREATED SUCCESSFULLY");
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-instructors-by-institute-id",
          { id: session?.user.id },
        ],
      });
    },
  });
};

// * __________INSTRUCTOR MUTATIONS END____________

// * __________STUDENT MUTATIONS START ____________
export const useCreateStudentMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-student"],
    mutationFn: async (data: any) => {
      return createStudent(data);
    },
    onSuccess: (_data) => {
      toast.success("STUDENT CREATED SUCCESSFULLY");
      console.log("CREATED STUDENT DATA: ", _data);
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-students-by-institute-id",
          { id: session?.user.id },
        ],
      });
    },
  });
};

export const useUpdateStudentMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-student"],
    mutationFn: async ({ id, data }: { id: string; data: any }) =>
      editStudentById(id, data),
    onSuccess: (_data) => {
      toast.success("STUDENT UPDATED SUCCESSFULLY");
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-students-by-institute-id",
          { id: session?.user.id },
        ],
      });
    },
  });
};
export const useDeleteStudentByIdMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-student"],
    mutationFn: async (id: string) => deleteStudentById(id),
    onSuccess: (_data) => {
      toast.success("STUDENT DELETED SUCCESSFULLY");
      queryClient.invalidateQueries({
        queryKey: [
          "get-all-students-by-institute-id",
          { id: session?.user.id },
        ],
      });
    },
  });
};

export const useCreateStudentsInBulkMutation = () => {
  const queryClinet = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationKey: ["create-students-in-bulk"],
    mutationFn: async (data: any) => {
      return createStudentInBulk(data);
    },
    onSuccess: (_data) => {
      toast.success("STUDENTS CREATED SUCCESSFULLY");
      queryClinet.invalidateQueries({
        queryKey: [
          "get-all-students-by-institute-id",
          { id: session?.user.id },
        ],
      });
    },
  });
};

// * __________STUDENT MUTATIONS END ____________

// * __________ENROLLMENT MUTATIONS START____________
export const useCreateInstructorCourseEnrollmentMutation = () => {
  return useMutation({
    mutationKey: ["create-instructor-course-enrollment"],
    mutationFn: async (data: IEnrolledInstructorCourseData) => {
      return createInstructorCourseEnrollment(data);
    },
    onSuccess: (_data) => {
      toast.success("INSTRUCTOR ENROLLED SUCCESSFULLY");
    },
  });
};

export const useCreateStudentCourseEnrollmentMutation = () => {
  return useMutation({
    mutationKey: ["create-student-course-enrollment"],
    mutationFn: async (data: IEnrolledStudentCourseData) => {
      return createStudentCourseEnrollment(data);
    },
    onSuccess: (_data) => toast.success("STUDENT ENROLLED SUCCESSFULLY"),
  });
};

// * __________ENROLLMENT MUTATIONS END____________

// * __________FILES MUTATIONS START____________
export const useUploadFiles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["upload-files"],
    mutationFn: async (data: IUploadFilesRequestPayloadData) => {
      return uploadFiles(data);
    },
    onSuccess: () => {
      toast.success("File Uploaded successfully");
      console.log("FILE UPLOADED SUCCESSFULLY");
      queryClient.invalidateQueries({ queryKey: ["get-files"] });
    },
    onError: (error) => {
      toast.error("File Upload Failed");
      console.log("FILE UPLOAD ERROR", error);
    },
  });
};

// * __________FILES MUTATIONS END____________

// * __________QUESTION MUTATIONS START__________
export const useCreateQuestionsInBulkMutation = () => {
  return useMutation({
    mutationKey: ["create-questions-in-bulk"],
    mutationFn: async (data: any) => {
      return createQuestionsInBulk(data);
    },
    onSuccess: () => {
      toast.success("Questions created successfully");
      console.log("Questions created successfully");
    },
    onError: (error) => {
      toast.error("Questions creation failed");
      console.log("Questions creation failed", error);
    },
  });
};
// * __________QUESTION MUTATIONS END__________

// * __________QUIZ MUTATIONS START__________
export const useCreateQuiz = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const instituteId = session?.user?.id;

  return useMutation({
    mutationKey: ["create-quiz"],
    mutationFn: async (data: IQuizData) => {
      return createQuiz(data);
    },
    onSuccess: () => {
      toast.success("QUIZ CREATED SUCCESSFULLY");
      console.log("QUIZ CREATED SUCCESSFULLY");
      router.push(PATHS.quizAndExamList);
      queryClient.invalidateQueries({
        queryKey: ["get-all-quizes-by-institute-id", { id: instituteId }],
        refetchType: "all",
      });
    },
  });
};

export const useUpdateQuizById = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const instituteId = session?.user?.id;

  return useMutation({
    mutationKey: ["update-quiz"],
    mutationFn: async ({
      quizId,
      quizData,
    }: {
      quizId: string;
      quizData: any;
    }) => {
      return editQuiz(quizId, quizData);
    },
    onSuccess: (_data) => {
      toast.success("QUIZ UPDATED SUCCESSFULLY");
      console.log("EDITED QUIZ DATA: ", _data);
      queryClient.invalidateQueries({
        queryKey: ["get-all-quizes-by-institute-id", { id: instituteId }],
        refetchType: "all",
      });
    },
  });
};

export const useDeleteQuiz = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const instituteId = session?.user?.id;

  return useMutation({
    mutationKey: ["delete-quiz"],
    mutationFn: async (id: string) => deleteQuizById(id),
    onSuccess: (_data) => {
      toast.success("QUIZ DELETED SUCCESSFULLY");
      console.log("DELETED QUIZ DATA: ", _data);
      queryClient.invalidateQueries({
        queryKey: ["get-all-quizes-by-institute-id", { id: instituteId }],
        refetchType: "all",
      });
    },
  });
};

// * __________QUIZ MUTATIONS END__________

// * __________EXAM MUTATIONS START__________
export const useCreateExamMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: ["create-exam"],
    mutationFn: async (data: IExamData) => {
      return createExam(data);
    },
    onSuccess: (_data) => {
      toast.success("EXAM CREATED SUCCESSFULLY");
      console.log("EXAM CREATED SUCCESSFULLY", _data);
      router.push(PATHS.quizAndExamList);
      queryClient.invalidateQueries({
        queryKey: ["get-all-exams-by-institute-id", { id: session?.user?.id }],
        refetchType: "all",
      });
    },
  });
};

export const useDeleteExamMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-exam"],
    mutationFn: async (examId: string) => {
      return deleteExamById(examId);
    },
    onSuccess: (_data) => {
      toast.success("EXAM DELETED SUCCESSFULLY");
      console.log("DELETED EXAM DATA: ", _data);
      queryClient.invalidateQueries({
        queryKey: ["get-all-exams-by-institute-id", { id: session?.user?.id }],
        refetchType: "all",
      });
    },
  });
};

export const useUpdateExamByIdMutation = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-exam"],
    mutationFn: async ({
      examId,
      examData,
    }: {
      examId: string;
      examData: any;
    }) => {
      return editExamById(examId, examData);
    },
    onSuccess: (_data) => {
      toast.success("EXAM UPDATED SUCCESSFULLY");
      console.log("EDITED EXAM DATA: ", _data);
      queryClient.invalidateQueries({
        queryKey: ["get-all-exams-by-institute-id", { id: session?.user?.id }],
        refetchType: "all",
      });
    },
  });
};
// * __________EXAM MUTATIONS END__________
