import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { barometerApi } from "./apiSlice.js";
import searchReducer from "./drinkSearchSlice.js";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    [barometerApi.reducerPath]: barometerApi.reducer, //api state
    search: searchReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(barometerApi.middleware),
});
