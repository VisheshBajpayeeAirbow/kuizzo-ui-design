import { ICourseModuleForm } from "@/components/ui/Organisms/forms/dashboard/institution/CourseModuleForm";
import { ICourseForm } from "@/components/ui/Organisms/forms/dashboard/institution/CourseForm";
import { ICourseSubjectsForm } from "@/components/ui/Organisms/forms/dashboard/institution/CourseSubjectForm";
import { ICourseTopicForm } from "@/components/ui/Organisms/forms/dashboard/institution/CourseTopicForm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CourseSliceInitialState {
  activeStep: "course" | "subject" | "module" | "topic";
  createCourseForm: ICourseForm;
  createSubjectForm: ICourseSubjectsForm;
  createTopicForm: ICourseTopicForm;
  createModuleForm: ICourseModuleForm;
  topicsExist: boolean;
  modulesExist: boolean;
}

const initialState: CourseSliceInitialState = {
  activeStep: "course",
  createCourseForm: {
    courseName: "",
    courseDescription: "",
    courseObjective: "",
    youtubeUrl: "",
    courseMaterials: null,
  },
  createSubjectForm: {
    subjects: [{ subjectName: "", subjectDescription: "" }],
  },
  createTopicForm: {
    topics: [{ topicName: "", topicDescription: "", selectedSubject: "" }],
  },
  createModuleForm: {
    modules: [{ moduleName: "", moduleDescription: "", selectedTopic: "" }],
  },
  topicsExist: false,
  modulesExist: false,
};

const courseSlice = createSlice({
  name: "course-slice",
  initialState,
  reducers: {
    setActiveStep: (
      state,
      action: PayloadAction<"course" | "subject" | "module" | "topic">
    ) => {
      state.activeStep = action.payload;
    },
    setCreateCourseForm: (state, action: PayloadAction<ICourseForm>) => {
      state.createCourseForm = action.payload;
    },
    setCreateSubjectForm: (
      state,
      action: PayloadAction<ICourseSubjectsForm>
    ) => {
      state.createSubjectForm = action.payload;
    },

    setCreateTopicForm: (state, action: PayloadAction<ICourseTopicForm>) => {
      state.createTopicForm = action.payload;
    },

    setCreateModuleForm: (state, action: PayloadAction<ICourseModuleForm>) => {
      state.createModuleForm = action.payload;
    },

    setTopicsExist: (state, action: PayloadAction<boolean>) => {
      state.topicsExist = action.payload;
    },
    setModulesExist: (state, action: PayloadAction<boolean>) => {
      state.modulesExist = action.payload;
    },
    resetCreateCourseForms: (state) => {
      state.activeStep = "course";
      state.createCourseForm = {
        courseName: "",
        courseDescription: "",
        courseObjective: "",
        youtubeUrl: "",
        courseMaterials: null,
      };
      state.createSubjectForm = {
        subjects: [{ subjectName: "", subjectDescription: "" }],
      };
      state.createTopicForm = {
        topics: [{ topicName: "", topicDescription: "", selectedSubject: "" }],
      };
      state.createModuleForm = {
        modules: [{ moduleName: "", moduleDescription: "", selectedTopic: "" }],
      };

      state.topicsExist = false;
      state.modulesExist = false;
    },
  },
});

export const {
  setActiveStep,
  setCreateCourseForm,
  setCreateSubjectForm,
  setCreateTopicForm,
  setCreateModuleForm,
  setTopicsExist,
  setModulesExist,
  resetCreateCourseForms,
} = courseSlice.actions;
export default courseSlice.reducer;
