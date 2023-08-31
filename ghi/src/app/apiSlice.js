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
        return (result && ["Account", "Inventory"]) || [];
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/token",
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Account", "Inventory"],
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/api/accounts",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Account"],
    }),
    getToken: builder.query({
      query: () => ({
        url: "/token",
        credentials: "include",
      }),
      providesTags: ["Token", "Account"],
      transformResponse: (response) => response?.account || null,
    }),
    getInventoryByUser: builder.query({
      query: () => ({
        url: `/api/inventory/mine`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Inventory"],
      transformResponse: (response) => response?.inventory || [],
    }),
    getDrink: builder.query({
      query: () => ({
        url: `/api/drinks`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => response?.drinks || [],
    }),
    getDrinkByName: builder.query({
      query: (id) => ({
        url: `/api/drinks/${id}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => response?.drinks || [],
    }),
  }),
});

export const {
  useGetTokenQuery,
  useLoginMutation,
  useLogOutMutation,
  useSignUpMutation,
  useGetInventoryByUserQuery,
  useGetDrinkQuery,
  useGetDrinkByNameQuery,
} = barometerApi;

