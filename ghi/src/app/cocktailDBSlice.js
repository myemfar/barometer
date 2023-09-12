import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const externalApi = createApi({
  reducerPath: "external",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.thecocktaildb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    getRandomCocktail: builder.query({
      query: () => "random.php",
    }),
  }),
});

export const { useGetRandomCocktailQuery } = externalApi;
