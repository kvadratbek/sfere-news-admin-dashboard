import {
  IGetAllFeedsResponse,
  IFeedResponse,
  IPostFeed,
  IGetFeedsParams,
} from "@/shared/model/feeds";
import { IAllFeedItemsResponse } from "@/shared/model/feed-items";

import { baseApi } from "./base_api";



export const feedsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeed: builder.mutation<IFeedResponse, IPostFeed>({
      query: (feed) => ({
        url: "/v1/admin/feeds/feed/",
        method: "POST",
        body: feed,
      }),
      invalidatesTags: ["Feed"],
    }),

    getAllFeeds: builder.query<IGetAllFeedsResponse, IGetFeedsParams>({

      query: ({ limit = 10, page = 1, priority = true, lang = "uz" }) => ({
        url: "/v1/admin/feeds/feed/all",
        params: { limit, page, priority, lang },
      }),
      // transformResponse: (response: { feeds: IFeedResponse[] }) =>
      //   response.feeds,
      providesTags: ["Feed"],
    }),
    refreshFeedItemsByFeedId: builder.query<IAllFeedItemsResponse, number>({
      query: (id) => `/v1/admin/feeds/feed/refresh/${id}`,
      providesTags: ["Feed"],
    }),
    getFeedById: builder.query<IFeedResponse, number>({
      query: (id) => `/v1/admin/feeds/feed/${id}`,
      providesTags: (result, error, id) => [{ type: "Feed", id }],
    }),
    updateFeed: builder.mutation<
      IFeedResponse,
      { id: number; feed: IPostFeed }
    >({
      query: ({ id, feed }) => ({
        url: `/v1/admin/feeds/feed/${id}`,
        method: "PUT",
        body: feed,
      }),
      invalidatesTags: ["Feed"],
    }),
    deleteFeed: builder.mutation<void, number>({
      query: (id) => ({
        url: `/v1/admin/feeds/feed/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feed"],
    }),
  }),
});

export const {
  useCreateFeedMutation,
  useGetAllFeedsQuery,
  useLazyGetAllFeedsQuery,
  useLazyRefreshFeedItemsByFeedIdQuery,
  useLazyGetFeedByIdQuery,
  useUpdateFeedMutation,
  useDeleteFeedMutation,
} = feedsApi;
