import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const barometerApi = createApi({
  reducerPath: "authentication",
  tagTypes: ["Token"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_HOST,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (info) => {
        let formData = null;
        if (info instanceof HTMLElement) {
          formData = new FormData(info);
        } else {
          formData = new FormData();
          formData.append("username", info.username);
          formData.append("password", info.password);
        }
        return {
          url: "/token",

          method: "post",
          body: formData,
          credentials: "include",
        };
      },
      invalidatesTags: (result) => {
        return (result && ["Account"]) || [];
      },
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",

        credentials: "include",
      }),
      providesTags: ["Token"],
      transformResponse: (response) => response?.account || null,
    }),
  }),
});

export const { useGetTokenQuery, useLoginMutation } = barometerApi;
