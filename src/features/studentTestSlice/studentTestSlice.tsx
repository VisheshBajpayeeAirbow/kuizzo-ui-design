import { IAnswerPayload, IEvaluationResult } from "@/types";
import { IExamData, IQuizData } from "@/types/api";
import { evaluateTestAnswers } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentTestSliceInitialState {
  studentTestExamData: IExamData | null;
  studentTestQuizData: IQuizData | null;
  activeTestType: "quiz" | "exam" | null;
  answers: IAnswerPayload[]; // Use an array for answers
  IEvaluationResult: IEvaluationResult | null;
}

const initialState: StudentTestSliceInitialState = {
  studentTestExamData: null,
  studentTestQuizData: null,
  activeTestType: null,
  IEvaluationResult: null,
  answers: [],
};

const studentTestSlice = createSlice({
  name: "student-test-slice",
  initialState,
  reducers: {
    setStudentTestExamData: (
      state,
      action: PayloadAction<IExamData | null>
    ) => {
      state.studentTestExamData = action.payload;
    },
    setStudentTestQuizData: (
      state,
      action: PayloadAction<IQuizData | null>
    ) => {
      state.studentTestQuizData = action.payload;
    },
    setActiveTestType: (
      state,
      action: PayloadAction<"quiz" | "exam" | null>
    ) => {
      state.activeTestType = action.payload;
    },
    setAnswer: (state, action: PayloadAction<IAnswerPayload>) => {
      const { questionId } = action.payload;
      // Remove any existing answer for this question
      state.answers = state.answers.filter(
        (answer) => answer.questionId !== questionId
      );
      // Add the new answer to the array
      state.answers.push(action.payload);
    },

    evaluateTestAnalytics: (state) => {
      state.IEvaluationResult = evaluateTestAnswers(state.answers);
    },
  },
});

export const {
  setStudentTestExamData,
  setActiveTestType,
  setStudentTestQuizData,
  setAnswer,
  evaluateTestAnalytics,
} = studentTestSlice.actions;
export default studentTestSlice.reducer;
