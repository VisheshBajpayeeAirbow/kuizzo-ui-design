import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IParsedQuestionsData, IQuizGeneratorForm } from "@/types";

interface QuizSliceInitialState {
  parsedQuizQuestionsData: IParsedQuestionsData[] | [];
  quizName: string;
  quizPayload: IQuizGeneratorForm;
}

const initialState: QuizSliceInitialState = {
  parsedQuizQuestionsData: [],
  quizName: "",
  quizPayload: {
    additionalNotesOrInstructions: "",
    course: "",
    difficultyLevel: "",
    numberOfQuestions: 0,
    subject: "",
    topic: "",
    type: "",
    quizName: "",
  },
};

const quizSlice = createSlice({
  name: "quiz-slice",
  initialState,
  reducers: {
    setParsedQuizQuestionsData: (
      state,
      action: PayloadAction<IParsedQuestionsData[]>
    ) => {
      state.parsedQuizQuestionsData = action.payload;
    },
    setQuizPayload: (state, action: PayloadAction<IQuizGeneratorForm>) => {
      state.quizPayload = action.payload;
    },
    editSpecificQuestion: (
      state,
      action: PayloadAction<IParsedQuestionsData>
    ) => {
      const { id } = action.payload;
      const questionIndex = state.parsedQuizQuestionsData.findIndex(
        (question) => question.id === id
      );
      if (questionIndex !== -1) {
        state.parsedQuizQuestionsData[questionIndex] = action.payload;
      }
    },
    setQuizName: (state, action: PayloadAction<string>) => {
      state.quizName = action.payload;
    },
    deleteSpecificQuestion: (state, action: PayloadAction<string>) => {
      state.parsedQuizQuestionsData = state.parsedQuizQuestionsData.filter(
        (question) => question.question !== action.payload
      );
    },
  },
});

export const {
  setParsedQuizQuestionsData,
  editSpecificQuestion,
  deleteSpecificQuestion,
  setQuizName,
  setQuizPayload,
} = quizSlice.actions;
export default quizSlice.reducer;
