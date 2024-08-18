import { createSlice } from "@reduxjs/toolkit";

type CountryState = {
  countries: string[];
};

const initialState: CountryState = {
  countries: [
    "Australia",
    "Austria",
    "Brazil",
    "Croatia",
    "China",
    "Denmark",
    "Egypt",
    "France",
    "Germany",
    "Hungary",
    "Japan",
    "Kenia",
    "Portugal",
    "Russia",
    "Spain",
    "India",
    "United States",
    "United Kingdom",
  ],
};

const CountrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default CountrySlice.reducer;
