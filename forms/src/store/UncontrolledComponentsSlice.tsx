import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FormFields } from "../types/formTypes";

const initialState: FormFields = {
  name: "",
  age: 0,
  email: "",
  password: "",
  password2: "",
  gender: "male",
  acceptTC: false,
  image: "",
  country: "",
};

export const UncontrolledComponentSlice = createSlice({
  name: "ucontrolledComponentSlice",
  initialState,
  reducers: {
    saveData: (state, action: PayloadAction<FormFields>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { saveData } = UncontrolledComponentSlice.actions;
export default UncontrolledComponentSlice.reducer;
