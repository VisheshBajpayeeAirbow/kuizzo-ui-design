import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthSliceInitialState {
  phoneNumber: string;
}

const initialState: AuthSliceInitialState = {
  phoneNumber: "",
};

const authSlice = createSlice({
  name: "auth-slice",
  initialState,
  reducers: {
    getPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
  },
});

export const { getPhoneNumber } = authSlice.actions;

export default authSlice.reducer;
