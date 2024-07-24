import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokeAPI } from './api';

export const store = configureStore({
  reducer: {
    [pokeAPI.reducerPath]: pokeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokeAPI.middleware),
});

setupListeners(store.dispatch);
