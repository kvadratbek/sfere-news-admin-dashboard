import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IFeedContent,
  IFeedContentUpdate,
  IFeedContentsResponse,
  IGetAllContentsParams,
} from "@/shared/model/content";

export const feedContentApi = createApi({
  reducerPath: "feedContentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api1.sfere.pro",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      headers.set("Content-Type", "application/json");

      const apiKey = import.meta.env.VITE_API_KEY;
      if (apiKey) {
        headers.set("Authorization", `Bearer ${apiKey}`);
      }

      return headers;
    },
  }),
  tagTypes: ["FeedContent"], // For cache invalidation
  endpoints: (builder) => ({
    // GET /v1/admin/feeds/content
    getFeedContent: builder.query<IFeedContent, string>({
      query: (id) => ({
        url: `/v1/admin/feeds/content`,
        params: { id },
      }),
      providesTags: (result, error, id) => [{ type: "FeedContent", id }],
    }),

    // POST /v1/admin/feeds/content
    createFeedContent: builder.mutation<IFeedContent, IFeedContent>({
      query: (feedContent) => ({
        url: `/v1/admin/feeds/content`,
        method: "POST",
        body: feedContent,
      }),
      invalidatesTags: ["FeedContent"],
    }),

    // GET /v1/admin/feeds/content/all
    getAllFeedContents: builder.query<
      IFeedContentsResponse,
      IGetAllContentsParams
    >({
      query: ({ feedId, categoryId, lang }) => ({
        url: `/v1/admin/feeds/content/all`,
        params: {
          feedId,
          ...(categoryId && { categoryId }),
          ...(lang && { lang }),
        },
      }),
      transformResponse: (response: {
        feedContents: { contents: IFeedContent[] };
      }) => {
        return response;
      },
      providesTags: (result) =>
        result?.feedContents.contents &&
        Array.isArray(result.feedContents.contents)
          ? [
              ...result.feedContents.contents.map(({ id }) => ({
                type: "FeedContent" as const,
                id,
              })),
              { type: "FeedContent", id: "LIST" },
            ]
          : [{ type: "FeedContent", id: "LIST" }],
    }),

    // PUT /v1/admin/feeds/content/{id}
    updateFeedContent: builder.mutation<
      IFeedContent,
      { id: number; data: IFeedContentUpdate }
    >({
      query: ({ id, data }) => ({
        url: `/v1/admin/feeds/content/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "FeedContent", id }],
    }),

    // DELETE /v1/admin/feeds/content/{id}
    deleteFeedContent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/admin/feeds/content/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "FeedContent", id }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetFeedContentQuery,
  useCreateFeedContentMutation,
  useGetAllFeedContentsQuery,
  useUpdateFeedContentMutation,
  useDeleteFeedContentMutation,
} = feedContentApi;
