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
    createDrink: builder.mutation({
      query: (data) => ({
        url: "/api/drinks",
        method: "POST",
        credentials: "include",
        body: data,
      }),

      invalidatesTags: ["DrinksList"],
    }),
    updateDrink: builder.mutation({
      query: (data) => ({
        url: "/api/drinks",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["DrinksList"],
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
      providesTags: ["DrinksList"],
      transformResponse: (response) => response?.drinks || [],
    }),
    getIngredients: builder.query({
      query: () => ({
        url: `/api/ingredients`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => response?.ingredients || [],
    }),
    createRecipe: builder.mutation({
      query: (data) => ({
        url: "/api/recipes",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation({
      query: ({ drink_id, recipe_id }) => ({
        url: `/api/recipes/${drink_id}/${recipe_id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Recipe"],
    }),
    getRecipeForDrink: builder.query({
      query: (drink_id) => ({
        url: `/api/recipes/${drink_id}/steps`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Recipe"],
      transformResponse: (response) => response?.steps || [],
    }),
    getDrinkByName: builder.query({
      query: (id) => ({
        url: `api/drinks/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    getTags: builder.query({
      query: () => ({
        url: `/api/tags`,
        method: "GET",
        credentials: "include",
      }),

      transformResponse: (response) => response?.tags || [],
    }),
    createDrinkTags: builder.mutation({
      query: (data) => ({
        url: "/api/drink_tags",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["drinkTags"],
      providesTags: ["updatedDrinkTags"],
    }),
    createInventory: builder.mutation({
      query: (data) => ({
        url: "/api/inventory",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteIngredient: builder.mutation({
      query: (data) => ({
        url: "/api/inventory/mine",
        method: "DELETE",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteDrink: builder.mutation({
      query: ({ drink_id, data }) => ({
        url: `/api/drinks/${drink_id}`,
        method: "DELETE",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["DrinksList"],
    }),
    getDrinkTagsByDrink: builder.query({
      query: (drink_id) => ({
        url: `/api/drink_tags/mine/${drink_id}`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (data) => data || [],
      providesTags: ["drinkTags"],
      invalidatesTags: ["updatedDrinkTags"],
    }),
    deleteDrinkTag: builder.mutation({
      query: (data) => ({
        url: `/api/drink_tags/mine`,
        method: "DELETE",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["drinkTags"],
      providesTags: ["updatedDrinkTags"],
    }),
    getDrinkTags: builder.query({
      query: () => ({
        url: `/api/drink_tags/mine/names`,
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response) => response?.drink_tags || [],
      providesTags: ["drinkTags"],
      invalidatesTags: ["updatedDrinkTags"],
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
  useCreateDrinkMutation,
  useGetIngredientsQuery,
  useCreateRecipeMutation,
  useGetTagsQuery,
  useCreateDrinkTagsMutation,
  useGetRecipeForDrinkQuery,
  useDeleteRecipeMutation,
  useCreateInventoryMutation,
  useDeleteIngredientMutation,
  useDeleteDrinkMutation,
  useUpdateDrinkMutation,
  useDeleteDrinkTagMutation,
  useGetDrinkTagsByDrinkQuery,
  useGetDrinkTagsQuery,
} = barometerApi;
