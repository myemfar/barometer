import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { externalApi } from "./cocktailDBSlice.js";
import { barometerApi } from "./apiSlice.js";
import searchReducer from "./drinkSearchSlice.js";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    [barometerApi.reducerPath]: barometerApi.reducer,
    [externalApi.reducerPath]: externalApi.reducer,
    search: searchReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      barometerApi.middleware,
      externalApi.middleware // Add the externalApi middleware here
    ),
});
