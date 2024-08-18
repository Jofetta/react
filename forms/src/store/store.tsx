import { configureStore } from "@reduxjs/toolkit";
import ReactHookReducer from "./ReactHookFormSlice";
import UncontrolledReducer from "./UncontrolledComponentsSlice";
import CountriesSlice from "./CountriesSlice";

export const store = configureStore({
  reducer: {
    reactHook: ReactHookReducer,
    uncontrolledComponent: UncontrolledReducer,
    countries: CountriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
