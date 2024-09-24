import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPerk {
  perkOption: string | number | boolean;
  perkDescription: string;
}

export interface IPlanDetails {
  title: string;
  subTitle: string;
  price: string | number;
  redirectLink: string;
  perks: IPerk[];
}

export interface PaymentSliceInitialState {
  planDetails: IPlanDetails;
}

const initialState: PaymentSliceInitialState = {
  planDetails: {
    title: "",
    subTitle: "",
    redirectLink: "",
    perks: [],
    price: "",
  },
};

const paymentSlice = createSlice({
  name: "payment-slice",
  initialState,
  reducers: {
    setPlanDetails: (state, action: PayloadAction<IPlanDetails>) => {
      state.planDetails = action.payload;
    },
  },
});

export const { setPlanDetails } = paymentSlice.actions;
export default paymentSlice.reducer;
