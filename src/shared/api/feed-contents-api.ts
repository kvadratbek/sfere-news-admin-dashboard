import {
  IFeedContent,
  IFeedContentUpdate,
  IFeedContentsResponse,
  IGetAllContentsParams,
} from "@/shared/model/feed-contents";
import { baseApi } from "./base_api";

export const feedContentsApi = baseApi.injectEndpoints({
// For cache invalidation
  endpoints: (builder) => ({
    // GET /v1/admin/feeds/content
    getFeedContent: builder.query<IFeedContent, number>({
      query: (id) => ({
        url: `/v1/admin/feeds/content/${id}`,
        method: "GET",
      }),
      providesTags: ["FeedContent"],
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
      invalidatesTags: ["FeedContent"],
    }),

    // DELETE /v1/admin/feeds/content/{id}
    deleteFeedContent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/admin/feeds/content/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FeedContent"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLazyGetFeedContentQuery,
  useCreateFeedContentMutation,
  useGetAllFeedContentsQuery,
  useUpdateFeedContentMutation,
  useDeleteFeedContentMutation,
} = feedContentsApi;
