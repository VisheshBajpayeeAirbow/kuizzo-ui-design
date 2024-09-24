import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExamGeneratorForm, IParsedQuestionsData } from "@/types";

interface ExamSliceInitialState {
  questionFetchType: "ai" | "db" | "manual";
  parsedExamQuestionsData: IParsedQuestionsData[] | [];
  examName: string;
  examPayload: IExamGeneratorForm;
}

const initialState: ExamSliceInitialState = {
  questionFetchType: "db",
  parsedExamQuestionsData: [],
  examName: "",
  examPayload: {
    examName: "",
    additionalNotesOrInstructions: "",
    course: "",
    subject: "",
    topic: "",
    numberOfQuestions: "",
    difficultyLevel: "",
    timeSlotFrom: "",
    timeSlotTo: "",
  },
};

const examSlice = createSlice({
  name: "exam-slice",
  initialState,
  reducers: {
    setQuestionFetchType: (
      state,
      action: PayloadAction<"ai" | "db" | "manual">
    ) => {
      state.questionFetchType = action.payload;
    },
    setParsedExamQuestionsData: (
      state,
      action: PayloadAction<IParsedQuestionsData[]>
    ) => {
      state.parsedExamQuestionsData = action.payload;
    },

    setExamPayload: (state, action: PayloadAction<IExamGeneratorForm>) => {
      state.examPayload = action.payload;
    },
    editSpecificQuestion: (
      state,
      action: PayloadAction<IParsedQuestionsData>
    ) => {
      const { id } = action.payload;
      const questionIndex = state.parsedExamQuestionsData.findIndex(
        (question) => question.id === id
      );
      if (questionIndex !== -1) {
        state.parsedExamQuestionsData[questionIndex] = action.payload;
      }
    },
    setExamName: (state, action: PayloadAction<string>) => {
      state.examName = action.payload;
    },
    deleteSpecificQuestion: (state, action: PayloadAction<string>) => {
      state.parsedExamQuestionsData = state.parsedExamQuestionsData.filter(
        (question) => question.question !== action.payload
      );
    },
  },
});

export const {
  setQuestionFetchType,
  setParsedExamQuestionsData,
  editSpecificQuestion,
  setExamName,
  deleteSpecificQuestion,
  setExamPayload,
} = examSlice.actions;

export default examSlice.reducer;
