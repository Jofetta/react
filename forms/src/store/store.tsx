import { configureStore } from "@reduxjs/toolkit";
import ReactHookReducer from "./ReactHookFormSlice";
import UncontrolledReducer from "./UncontrolledComponentsSlice";

export const store = configureStore({
  reducer: {
    reactHook: ReactHookReducer,
    uncontrolledComponent: UncontrolledReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
