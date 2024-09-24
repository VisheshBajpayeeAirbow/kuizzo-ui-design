import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "../features/appSlice/appSlice";
import authReducer from "../features/authSlice/authSlice";
import courseReducer from "../features/courseSlice/courseSlice";
import quizReducer from "../features/quizSlice/quizSlice";
import examReducer from "../features/examSlice/examSlice";
import paymentReducer from "../features/paymentSlice/paymentSlice";
import studentTestReducer from "../features/studentTestSlice/studentTestSlice";
export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    auth: authReducer,
    course: courseReducer,
    quiz: quizReducer,
    exam: examReducer,
    payment: paymentReducer,
    studentTest: studentTestReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
