import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppSliceInitialState {
  authFormState: "institution" | "instructor" | "student";
}

const initialState: AppSliceInitialState = {
  authFormState: "institution",
};

const appSlice = createSlice({
  name: "app-slice",
  initialState,
  reducers: {
    setAuthFormState: (
      state,
      action: PayloadAction<"institution" | "instructor" | "student">
    ) => {
      state.authFormState = action.payload;
    },
  },
});

export const { setAuthFormState } = appSlice.actions;
export default appSlice.reducer;
