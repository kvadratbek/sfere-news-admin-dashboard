import {
  IGetAllCategories,
  ICategoryResponse,
  IPostCategory,
  IGetCategoriesParams,
} from "@/shared/model/feed-categories";
import { baseApi } from "./base_api";

export const feedCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<ICategoryResponse, IPostCategory>({
      query: (category) => ({
        url: "/v1/admin/feeds/categories/",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategories: builder.query<IGetAllCategories, IGetCategoriesParams>({
      query: ({ limit, page, lang }) => ({
        url: "/v1/admin/feeds/categories/all",
        params: { limit, page, lang },
      }),
      // transformResponse: (response: { categories: ICategoryResponse[] }) =>
      //   response.categories,
      providesTags: ["Category"],
    }),
    serveCategoryIcon: builder.query<ICategoryResponse, string>({
      query: (icon_name) => ({
        url: "/v1/admin/feeds/categories/icon",
        params: { icon_name },
      }),
      providesTags: ["Category"],
    }),
    getCategoryById: builder.query<ICategoryResponse, number>({
      query: (id) => `/v1/admin/feeds/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),
    updateCategory: builder.mutation<
      ICategoryResponse,
      { id: number; category: IPostCategory }
    >({
      query: ({ id, category }) => ({
        url: `/v1/admin/feeds/categories/${id}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/admin/feeds/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useLazyGetAllCategoriesQuery,
  useServeCategoryIconQuery,
  useLazyGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = feedCategoriesApi;
