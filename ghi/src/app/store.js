import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'


import { barometerApi } from './apiSlice.js'

export const store = configureStore({
  reducer: {
    [barometerApi.reducerPath]: barometerApi.reducer  //api state
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(barometerApi.middleware),
})